import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email";
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

  const { holidaySummary, dateCount, dashboardPayload } = buildHolidaySubmission(input);

  // Main destination: the Holiday requests inbox in the Lion Switch dashboard (/admin).
  const dashboard = await sendToDashboard(dashboardPayload);

  const email = await sendEmail({
    to: COMPANY.email,
    replyTo: input.email,
    subject: `Holiday preferences: ${input.companyName} (${dateCount} date${dateCount === 1 ? "" : "s"})`,
    text: holidaySummary,
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
