import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email";
import { COMPANY } from "@/lib/constants";
import { sendToDashboard } from "@/lib/dashboard-intake";

// Call preferences: same fields and summary wording as the original form.
// Delivered to the dashboard's Website forms inbox and emailed to the team.

const RING_LABEL = { phone_app: "Phone app (mobile)", desktop_app: "Desktop app", cell_number: "Cell phone number" } as const;
const ringKeys = ["not_needed", "phone_app", "desktop_app", "cell_number"] as const;
const digits = z.string().regex(/^\d{0,3}$/);

const schema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  companyName: z.string().trim().min(1).max(200),
  currentExtension: z.string().trim().min(1).max(20),
  emailAddress: z.string().trim().email().max(254),
  ring: z.array(z.enum(ringKeys)).min(1).max(4),
  delays: z.object({ phone_app: digits.optional(), desktop_app: digits.optional(), cell_number: digits.optional() }).partial().default({}),
  cellPhoneNumber: z.string().trim().max(30).optional().default(""),
  voicemail: z.enum(["email_only", "app_only", "both"]),
  missedCallEmail: z.enum(["yes", "no"]),
  additionalNotes: z.string().trim().max(500).optional().default(""),
  phone_alt: z.string().optional().default(""),
});

export async function POST(req: NextRequest) {
  const { allowed } = rateLimit(`call-preferences:${getClientIp(req.headers)}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!allowed) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 400 });
  const d = parsed.data;
  if (d.phone_alt.trim()) return NextResponse.json({ ok: true });

  const notNeeded = d.ring.includes("not_needed");
  const devices = (Object.keys(RING_LABEL) as (keyof typeof RING_LABEL)[]).filter((k) => !notNeeded && d.ring.includes(k));
  for (const k of devices) if (!d.delays[k]) return NextResponse.json({ error: "Please add a ring delay for each device." }, { status: 400 });
  if (devices.includes("cell_number") && !d.cellPhoneNumber) return NextResponse.json({ error: "Please add the cell phone number." }, { status: 400 });

  const ringText = (k: keyof typeof RING_LABEL) => (notNeeded ? "Not needed" : devices.includes(k) ? `Yes - after ${d.delays[k]} sec` : "No");
  const fields = {
    firstName: d.firstName,
    lastName: d.lastName,
    companyName: d.companyName,
    currentExtension: d.currentExtension,
    emailAddress: d.emailAddress,
    ringPhoneApp: ringText("phone_app"),
    ringDesktopApp: ringText("desktop_app"),
    ringCell: ringText("cell_number"),
    cellPhoneNumber: devices.includes("cell_number") ? d.cellPhoneNumber : "",
    voicemailDestination: d.voicemail === "email_only" ? "Email only" : d.voicemail === "app_only" ? "App only" : "Both",
    missedCallEmail: d.missedCallEmail === "yes" ? "Yes" : "No",
    additionalNotes: d.additionalNotes,
  };
  const summary = [
    "CALL PREFERENCES",
    `Client: ${d.firstName} ${d.lastName} | ${d.companyName} | ext ${d.currentExtension} | ${d.emailAddress}`,
    "",
    `Phone app (mobile): ${fields.ringPhoneApp}`,
    `Desktop app: ${fields.ringDesktopApp}`,
    `Cell phone: ${fields.ringCell}${fields.cellPhoneNumber ? ` (${fields.cellPhoneNumber})` : ""}`,
    `Voicemail: ${fields.voicemailDestination}`,
    `Missed call email: ${fields.missedCallEmail}`,
    d.additionalNotes ? `Notes: ${d.additionalNotes}` : "",
  ].filter((l, i) => l || i === 2).join("\n");

  const dashboard = await sendToDashboard("call-preferences", {
    name: `${d.firstName} ${d.lastName}`,
    email: d.emailAddress,
    company: d.companyName,
    phone: fields.cellPhoneNumber,
    fields: [
      { label: "Current extension", value: d.currentExtension },
      { label: "Phone app (mobile)", value: fields.ringPhoneApp },
      { label: "Desktop app", value: fields.ringDesktopApp },
      { label: "Cell phone (ring)", value: fields.ringCell },
      { label: "Cell phone number", value: fields.cellPhoneNumber },
      { label: "Voicemail goes to", value: fields.voicemailDestination },
      { label: "Email after every missed call", value: fields.missedCallEmail },
      { label: "Notes", value: d.additionalNotes },
    ],
    details: { ring: notNeeded ? [] : devices.map((k) => ({ device: k, label: RING_LABEL[k], seconds: Number(d.delays[k]) })) },
    summary,
  });
  const email = await sendEmail({
    to: COMPANY.email,
    replyTo: d.emailAddress,
    subject: `Call preferences: ${d.companyName}, ext ${d.currentExtension}`,
    text: summary,
  });

  const configured = dashboard.configured || !!process.env.SMTP_HOST;
  if (configured && !dashboard.sent && !email.sent) {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
