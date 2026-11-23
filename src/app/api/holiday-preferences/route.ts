import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email";
import { postToSheetWebhook } from "@/lib/sheets";
import { buildHolidaySubmission } from "@/lib/holiday-submission";
import { COMPANY } from "@/lib/constants";

const time = z.string().max(8);

const schema = z.object({
  dates: z
    .record(
      z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      z.object({ type: z.enum(["closed", "custom"]), openTime: time.optional(), closeTime: time.optional() }),
    )
    .refine((d) => Object.keys(d).length > 0 && Object.keys(d).length <= 500),
  officeClosed: z.boolean(),
  useStandardGreeting: z.boolean(),
  customGreeting: z.string().trim().max(500),
  setUpEmergencyRouting: z.boolean(),
  forwardingType: z.enum(["", "external", "internal", "both"]),
  forwardingValue: z.string().trim().max(200),
  genPhoneNumber: z.string().trim().max(50),
  voicemailDestination: z.string().trim().max(200),
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  companyName: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(254),
  additionalNotes: z.string().trim().max(500),
  // Honeypot (hidden from people; bots fill it in)
  phone_alt: z.string().optional().default(""),
});

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const { allowed } = rateLimit(`holiday-preferences:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 400 });
  }
  const { phone_alt, ...input } = parsed.data;
  if (phone_alt.trim()) return NextResponse.json({ ok: true });

  const { fields, holidaySummary, dateCount } = buildHolidaySubmission(input);

  // Same urlencoded fields the original form posted to its Apps Script.
  await postToSheetWebhook("HOLIDAY_SHEET_WEBHOOK_URL", fields, "form");

  await sendEmail({
    to: COMPANY.email,
    replyTo: input.email,
    subject: `Holiday preferences: ${input.companyName} (${dateCount} date${dateCount === 1 ? "" : "s"})`,
    text: holidaySummary,
  });

  return NextResponse.json({ ok: true });
}
