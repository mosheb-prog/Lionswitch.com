import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { ClaudeNotConfiguredError, askAboutTranscript } from "@/lib/claude";

const schema = z.object({
  transcript: z.string().trim().min(1).max(20000),
  question: z.string().trim().min(1).max(500),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(2000),
      }),
    )
    .max(12)
    .optional()
    .default([]),
});

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const { allowed } = rateLimit(`voice-demo-ask:${ip}`, {
    limit: 20,
    windowMs: 10 * 60 * 1000,
  });
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  try {
    const answer = await askAboutTranscript(parsed.data);
    return NextResponse.json({ answer });
  } catch (err) {
    if (err instanceof ClaudeNotConfiguredError) {
      console.error("[voice-demo] Claude not configured:", err.message);
      return NextResponse.json(
        { error: "The \"ask Claude\" demo isn't configured yet. Please try again later." },
        { status: 503 },
      );
    }
    console.error("[voice-demo] ask error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
