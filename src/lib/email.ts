import nodemailer from "nodemailer";
import { COMPANY } from "./constants";

// Email is fully optional at build/dev time: if SMTP env vars aren't set,
// `sendEmail` logs and no-ops instead of throwing, so local dev and preview
// deploys without secrets configured don't crash on every form submission.

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: { user, pass },
  });
}

export async function sendEmail(opts: {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer; contentType?: string }[];
}): Promise<{ sent: boolean }> {
  const transport = getTransport();

  if (!transport) {
    console.warn(
      "[email] SMTP not configured (SMTP_HOST/PORT/USER/PASS) — skipping send:",
      opts.subject,
    );
    return { sent: false };
  }

  await transport.sendMail({
    from: process.env.EMAIL_FROM ?? `Lion Switch Website <${COMPANY.email}>`,
    to: opts.to,
    replyTo: opts.replyTo,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
    attachments: opts.attachments,
  });

  return { sent: true };
}
