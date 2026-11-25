import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email";
import { COMPANY } from "@/lib/constants";
import { sendToDashboard } from "@/lib/dashboard-intake";
import { MAX_SCHEDULE_BYTES, MAX_SCHEDULE_FILES, safeFileName, sniffSchedule } from "@/lib/schedule-files";

// Free bill review: the visitor's details plus up to 3 phone bills (PDF,
// photo, Word, Excel or text; checked by their bytes), emailed to the team.
const schema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(30).optional().default(""),
  company: z.string().trim().min(1).max(200),
  currentProvider: z.string().trim().max(120).optional().default(""),
  phoneCount: z.string().trim().max(40).optional().default(""),
  notes: z.string().trim().max(1000).optional().default(""),
  files: z.array(z.object({ name: z.string().max(255), data: z.string().max(15_000_000) })).max(MAX_SCHEDULE_FILES).optional().default([]),
  company_website: z.string().max(0).optional().default(""),
});

export async function POST(req: NextRequest) {
  const { allowed } = rateLimit(`bill-review:${getClientIp(req.headers)}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!allowed) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please check the form for missing or invalid fields." }, { status: 400 });
  const { files: raw, company_website, ...d } = parsed.data;
  if (company_website) return NextResponse.json({ ok: true });

  const files: { filename: string; content: Buffer; contentType: string }[] = [];
  let total = 0;
  for (const f of raw) {
    const content = Buffer.from(f.data.replace(/^data:[^,]*,/, ""), "base64");
    total += content.length;
    const mime = content.length ? sniffSchedule(f.name, content) : null;
    if (!mime) {
      return NextResponse.json({ error: `"${safeFileName(f.name)}" isn't a supported file. Please upload a PDF, photo, Word, Excel or text file.` }, { status: 400 });
    }
    files.push({ filename: safeFileName(f.name), content, contentType: mime });
  }
  if (total > MAX_SCHEDULE_BYTES) return NextResponse.json({ error: "Uploaded files are too large (10 MB total)." }, { status: 400 });

  const summaryLines = [
      `Name: ${d.firstName} ${d.lastName}`,
      `Email: ${d.email}`,
      `Phone: ${d.phone || "(not provided)"}`,
      `Company: ${d.company}`,
      `Current provider: ${d.currentProvider || "(not provided)"}`,
      `Number of phones: ${d.phoneCount || "(not provided)"}`,
      `Notes: ${d.notes || "(none)"}`,
      `Bills attached: ${files.map((f) => f.filename).join(", ") || "none"}`,
  ];
  const summary = summaryLines.join("\n");

  const dashboard = await sendToDashboard("bill-review", {
    name: `${d.firstName} ${d.lastName}`,
    email: d.email,
    company: d.company,
    phone: d.phone,
    fields: [
      { label: "Current provider", value: d.currentProvider },
      { label: "Number of phones", value: d.phoneCount },
      { label: "Notes", value: d.notes },
    ],
    summary,
    files: files.map((f) => ({ filename: f.filename, data: f.content.toString("base64") })),
  });
  const email = await sendEmail({
    to: COMPANY.email,
    replyTo: d.email,
    subject: `Free bill review request: ${d.company}${files.length ? ` (${files.length} file${files.length === 1 ? "" : "s"})` : ""}`,
    text: summary,
    attachments: files,
  });

  if ((dashboard.configured || !!process.env.SMTP_HOST) && !dashboard.sent && !email.sent) {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
