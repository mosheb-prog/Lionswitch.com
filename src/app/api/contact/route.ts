import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email";
import { COMPANY } from "@/lib/constants";

const schema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(30).optional().default(""),
  company: z.string().trim().min(1).max(200),
  interest: z.string().trim().min(1).max(100),
  phoneCount: z.string().trim().max(40).optional().default(""),
  currentProvider: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(1).max(500),
  smsConsent: z.union([z.boolean(), z.string()]).optional().default(false),
  // Honeypot — real users never fill this in.
  company_website: z.string().max(0).optional().default(""),
});

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const { allowed } = rateLimit(`contact:${ip}`, {
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
    // Honeypot tripped — pretend success, do nothing.
    return NextResponse.json({ ok: true });
  }

  const { firstName, lastName, email, phone, company, interest, phoneCount, currentProvider, message, smsConsent } =
    parsed.data;

  await sendEmail({
    to: COMPANY.email,
    replyTo: email,
    subject: `New demo/contact request from ${firstName} ${lastName} (${company})`,
    text: [
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      `Phone: ${phone || "(not provided)"}`,
      `Company: ${company}`,
      `Interested in: ${interest}`,
      `Number of phones: ${phoneCount || "(not provided)"}`,
      `Current provider: ${currentProvider || "(not provided)"}`,
      `SMS consent: ${smsConsent ? "yes" : "no"}`,
      "",
      "Message:",
      message,
    ].join("\n"),
  });

  return NextResponse.json({ ok: true });
}
