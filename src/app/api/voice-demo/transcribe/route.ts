import { NextRequest, NextResponse } from "next/server";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import {
  TranscriptionFailedError,
  TranscriptionNotConfiguredError,
  transcribeAudio,
} from "@/lib/transcription";

// Generous cap to catch abuse while comfortably covering a 2-minute browser
// recording at typical WebM/Opus bitrates.
const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const { allowed } = rateLimit(`voice-demo-transcribe:${ip}`, {
    limit: 10,
    windowMs: 10 * 60 * 1000,
  });
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  const form = await req.formData().catch(() => null);
  const audio = form?.get("audio");

  if (!audio || !(audio instanceof Blob) || audio.size === 0) {
    return NextResponse.json({ error: "No audio received." }, { status: 400 });
  }

  if (audio.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      { error: "Recording is too long for the demo. Please keep it under 2 minutes." },
      { status: 413 },
    );
  }

  try {
    const transcript = await transcribeAudio(audio, "demo-call.webm");
    return NextResponse.json({ transcript });
  } catch (err) {
    if (err instanceof TranscriptionNotConfiguredError) {
      console.error("[voice-demo] transcription not configured:", err.message);
      return NextResponse.json(
        { error: "The voice demo isn't configured yet. Please try again later." },
        { status: 503 },
      );
    }
    if (err instanceof TranscriptionFailedError) {
      console.error("[voice-demo] transcription failed:", err.message);
      return NextResponse.json(
        { error: "We couldn't transcribe that recording. Please try again." },
        { status: 502 },
      );
    }
    console.error("[voice-demo] unexpected transcription error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
