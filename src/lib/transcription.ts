// Transcription provider abstraction. The provider is chosen entirely by
// env var so it can be swapped without touching the API route or the
// client. Currently supports OpenAI's transcription API (Whisper-family
// models) over plain `fetch`, avoiding an extra SDK dependency for a single
// REST call.
//
// Calls are transcribed AFTER they end — this function is only ever invoked
// once the visitor has stopped recording. Nothing here runs "live."

const PROVIDER = process.env.TRANSCRIPTION_PROVIDER ?? "openai";

export class TranscriptionNotConfiguredError extends Error {}
export class TranscriptionFailedError extends Error {}

export async function transcribeAudio(
  audio: Blob,
  filename: string,
): Promise<string> {
  if (PROVIDER !== "openai") {
    throw new TranscriptionNotConfiguredError(
      `Unknown TRANSCRIPTION_PROVIDER "${PROVIDER}". Only "openai" is implemented.`,
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new TranscriptionNotConfiguredError(
      "OPENAI_API_KEY is not set — transcription is not configured.",
    );
  }

  const model = process.env.TRANSCRIPTION_MODEL ?? "whisper-1";

  const form = new FormData();
  form.append("file", audio, filename);
  form.append("model", model);

  const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new TranscriptionFailedError(
      `Transcription provider returned ${res.status}: ${body.slice(0, 300)}`,
    );
  }

  const data = (await res.json()) as { text?: string };
  if (!data.text) {
    throw new TranscriptionFailedError("Transcription provider returned no text.");
  }

  return data.text.trim();
}
