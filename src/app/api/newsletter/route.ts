import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { postToSheetWebhook } from "@/lib/sheets";

const schema = z.object({
  email: z.string().trim().email().max(254),
  // Honeypot field — real users never fill this in.
  company_website: z.string().max(0).optional().default(""),
});

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const { allowed } = rateLimit(`newsletter:${ip}`, {
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
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  if (parsed.data.company_website) {
    // Honeypot tripped — pretend success, do nothing.
    return NextResponse.json({ ok: true });
  }

  await postToSheetWebhook("NEWSLETTER_SHEET_WEBHOOK_URL", {
    type: "newsletter_signup",
    email: parsed.data.email,
    submittedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
