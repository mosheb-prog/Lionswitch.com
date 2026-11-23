import Anthropic from "@anthropic-ai/sdk";

export class ClaudeNotConfiguredError extends Error {}

let client: Anthropic | null = null;

function getClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new ClaudeNotConfiguredError("ANTHROPIC_API_KEY is not set.");
  }
  if (!client) {
    client = new Anthropic({ apiKey });
  }
  return client;
}

export type ChatTurn = { role: "user" | "assistant"; content: string };

// Answers a visitor's question about a finished call transcript. Claude only
// ever sees the already-finished transcript — never live audio, never a
// call in progress.
export async function askAboutTranscript(opts: {
  transcript: string;
  question: string;
  history: ChatTurn[];
}): Promise<string> {
  const anthropic = getClient();
  const model = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-5";

  const response = await anthropic.messages.create({
    model,
    max_tokens: 500,
    system: [
      "You are a helpful assistant answering questions about a single finished phone call transcript for a Lion Switch website demo.",
      "Only use the transcript below as your source of truth. If the answer isn't in the transcript, say so — do not make anything up.",
      "Keep answers short and conversational (a few sentences).",
      "",
      "TRANSCRIPT:",
      opts.transcript,
    ].join("\n"),
    messages: [
      ...opts.history.map((turn) => ({ role: turn.role, content: turn.content })),
      { role: "user" as const, content: opts.question },
    ],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  return textBlock && "text" in textBlock ? textBlock.text : "";
}
