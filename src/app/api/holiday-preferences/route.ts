import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email";
import { postToSheetWebhook } from "@/lib/sheets";
import { COMPANY } from "@/lib/constants";

const dateEntrySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  status: z.enum(["closed", "custom-hours"]),
  openTime: z.string().max(5).optional(),
  closeTime: z.string().max(5).optional(),
  label: z.string().max(100).optional(),
});

const schema = z.object({
  dates: z.array(dateEntrySchema).max(500),
  office: z.object({
    fullyClosed: z.boolean(),
    greetingChoice: z.enum(["standard", "custom"]),
    customGreeting: z.string().max(2000).optional().default(""),
  }),
  emergency: z.object({
    enabled: z.boolean(),
    contactName: z.string().max(200).optional().default(""),
    phoneNumbers: z.string().max(300).optional().default(""),
    routingOrder: z.string().max(500).optional().default(""),
    notes: z.string().max(1000).optional().default(""),
  }),
  contact: z.object({
    firstName: z.string().trim().min(1).max(100),
    lastName: z.string().trim().min(1).max(100),
    companyName: z.string().trim().min(1).max(200),
    email: z.string().trim().email().max(254),
    notes: z.string().max(500).optional().default(""),
  }),
  // Honeypot
  company_website: z.string().max(0).optional().default(""),
});

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const { allowed } = rateLimit(`holiday-preferences:${ip}`, {
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form for missing or invalid fields." },
      { status: 400 },
    );
  }

  if (parsed.data.company_website) {
    return NextResponse.json({ ok: true });
  }

  const { dates, office, emergency, contact } = parsed.data;
  const submittedAt = new Date().toISOString();

  // Structured JSON, ready to feed automation downstream.
  await postToSheetWebhook("HOLIDAY_SHEET_WEBHOOK_URL", {
    type: "holiday_preferences",
    submittedAt,
    contact,
    office,
    emergency,
    dates,
  });

  const dateSummary = dates.length
    ? dates
        .map(
          (d) =>
            `${d.date}: ${
              d.status === "closed" ? "Fully Closed" : `Custom Hours (${d.openTime}-${d.closeTime})`
            }${d.label ? ` [${d.label}]` : ""}`,
        )
        .join("\n")
    : "(no specific dates submitted)";

  await sendEmail({
    to: COMPANY.email,
    replyTo: contact.email,
    subject: `Holiday preferences from ${contact.firstName} ${contact.lastName} (${contact.companyName})`,
    text: [
      `Contact: ${contact.firstName} ${contact.lastName} <${contact.email}>`,
      `Company: ${contact.companyName}`,
      `Office fully closed (overall): ${office.fullyClosed ? "yes" : "no"}`,
      `Greeting: ${office.greetingChoice}${
        office.greetingChoice === "custom" ? ` — "${office.customGreeting}"` : ""
      }`,
      `Emergency routing requested: ${emergency.enabled ? "yes" : "no"}`,
      ...(emergency.enabled
        ? [
            `  Contact: ${emergency.contactName}`,
            `  Phone(s): ${emergency.phoneNumbers}`,
            `  Routing order: ${emergency.routingOrder}`,
            `  Notes: ${emergency.notes}`,
          ]
        : []),
      `Notes: ${contact.notes || "(none)"}`,
      "",
      "Dates:",
      dateSummary,
    ].join("\n"),
  });

  await sendEmail({
    to: contact.email,
    subject: `We received your holiday preferences — ${COMPANY.name}`,
    text: [
      `Hi ${contact.firstName},`,
      "",
      `Thanks — we've received your holiday preferences for ${contact.companyName}. Our team will configure these and follow up if we have any questions.`,
      "",
      "Summary:",
      dateSummary,
      "",
      `If anything looks wrong, just reply to this email or call us at ${COMPANY.phoneDisplay}.`,
      "",
      `— ${COMPANY.name}`,
    ].join("\n"),
  });

  return NextResponse.json({ ok: true });
}
