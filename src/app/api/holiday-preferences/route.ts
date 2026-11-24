import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email";
import { buildHolidaySubmission } from "@/lib/holiday-submission";
import { MAX_SCHEDULE_BYTES, MAX_SCHEDULE_FILES, safeFileName, sniffSchedule } from "@/lib/schedule-files";
import { COMPANY } from "@/lib/constants";

const time = z.string().max(8);

const schema = z.object({
  dates: z
    .record(
      z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      z.object({ type: z.enum(["closed", "custom"]), openTime: time.optional(), closeTime: time.optional() }),
    )
    .refine((d) => Object.keys(d).length <= 500),
  files: z
    .array(z.object({ name: z.string().max(255), data: z.string().max(15_000_000) }))
    .max(MAX_SCHEDULE_FILES)
    .optional()
    .default([]),
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
  const { phone_alt, files: rawFiles, ...input } = parsed.data;
  if (phone_alt.trim()) return NextResponse.json({ ok: true });

  // Uploaded schedule files: real type checked from the bytes, size capped.
  const files: { filename: string; mime: string; content: Buffer }[] = [];
  let total = 0;
  for (const f of rawFiles) {
    const content = Buffer.from(f.data.replace(/^data:[^,]*,/, ""), "base64");
    total += content.length;
    const mime = sniffSchedule(f.name, content);
    if (!content.length || !mime) {
      return NextResponse.json({ error: `"${safeFileName(f.name)}" isn't a supported file. Please upload a PDF, photo, Word, Excel or text file.` }, { status: 400 });
    }
    files.push({ filename: safeFileName(f.name), mime, content });
  }
  if (total > MAX_SCHEDULE_BYTES) {
    return NextResponse.json({ error: "Uploaded files are too large (10 MB total)." }, { status: 400 });
  }
  if (Object.keys(input.dates).length === 0 && files.length === 0) {
    return NextResponse.json({ error: "Please select at least one date or upload your schedule." }, { status: 400 });
  }

  const built = buildHolidaySubmission(input);
  const { dateCount } = built;
  const holidaySummary = files.length
    ? `${built.holidaySummary}\nUploaded schedule: ${files.map((f) => f.filename).join(", ")}`
    : built.holidaySummary;
  const dashboardPayload = {
    ...built.dashboardPayload,
    summary: holidaySummary,
    files: files.map((f) => ({ filename: f.filename, mime: f.mime, data: f.content.toString("base64") })),
  };

  // Main destination: the Holiday requests inbox in the Lion Switch dashboard (/admin).
  const dashboard = await sendToDashboard(dashboardPayload);

  const email = await sendEmail({
    to: COMPANY.email,
    replyTo: input.email,
    subject: `Holiday preferences: ${input.companyName} (${dateCount} date${dateCount === 1 ? "" : "s"}${files.length ? `, ${files.length} file${files.length === 1 ? "" : "s"}` : ""})`,
    text: holidaySummary,
    attachments: files.map((f) => ({ filename: f.filename, content: f.content, contentType: f.mime })),
  });

  // Only fail the visitor when a destination is set up and nothing got through,
  // so a request is never silently lost (they can try again or call).
  const configured = dashboard.configured || !!process.env.SMTP_HOST;
  if (configured && !dashboard.sent && !email.sent) {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

async function sendToDashboard(payload: Record<string, unknown>): Promise<{ configured: boolean; sent: boolean }> {
  const url = process.env.HOLIDAY_DASHBOARD_URL;
  const secret = process.env.HOLIDAY_INTAKE_SECRET;
  if (!url || !secret) {
    console.warn("[holiday] HOLIDAY_DASHBOARD_URL / HOLIDAY_INTAKE_SECRET not set — skipping dashboard delivery");
    return { configured: false, sent: false };
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${secret}` },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) console.error(`[holiday] dashboard intake responded ${res.status}`);
    return { configured: true, sent: res.ok };
  } catch (err) {
    console.error("[holiday] dashboard intake failed", err);
    return { configured: true, sent: false };
  }
}
