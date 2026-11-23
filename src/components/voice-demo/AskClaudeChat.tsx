"use client";

import { FormEvent, useState } from "react";

type Turn = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Summarize this call",
  "What action items came up?",
  "What was the caller's mood?",
];

export function AskClaudeChat({ transcript }: { transcript: string }) {
  const [history, setHistory] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function ask(question: string) {
    if (!question.trim() || loading) return;
    setError("");
    setLoading(true);
    const nextHistory: Turn[] = [...history, { role: "user", content: question }];
    setHistory(nextHistory);
    setInput("");

    try {
      const res = await fetch("/api/voice-demo/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript, question, history }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error ?? "Something went wrong.");
      setHistory([...nextHistory, { role: "assistant", content: body.answer }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setHistory(history);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    ask(input);
  }

  return (
    <div className="surface rounded-2xl border bg-white p-5">
      <h4 className="font-[family-name:var(--font-heading)] text-sm font-bold text-ink">
        Ask Claude about this call
      </h4>

      {history.length === 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => ask(s)}
              className="rounded-full border border-soft-border px-3 py-1.5 text-xs font-semibold text-ink hover:border-orange"
            >
              {s}
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-3 max-h-72 space-y-3 overflow-y-auto pr-1">
          {history.map((turn, i) => (
            <div
              key={i}
              className={`max-w-[90%] rounded-xl px-3 py-2 text-sm ${
                turn.role === "user"
                  ? "ml-auto bg-soft text-ink"
                  : "bg-cream text-text ring-1 ring-inset ring-line"
              }`}
            >
              {turn.content}
            </div>
          ))}
          {loading ? (
            <div className="max-w-[90%] rounded-xl bg-cream px-3 py-2 text-sm text-muted ring-1 ring-inset ring-line">
              Thinking…
            </div>
          ) : null}
        </div>
      )}

      {error ? (
        <p role="alert" className="mt-2 text-xs text-red-700">
          {error}
        </p>
      ) : null}

      <form onSubmit={onSubmit} className="mt-3 flex gap-2">
        <label htmlFor="ask-claude-input" className="sr-only">
          Ask a question about this call
        </label>
        <input
          id="ask-claude-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about this call…"
          className="min-w-0 flex-1 rounded-full border border-soft-border px-4 py-2 text-sm focus:border-orange focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-full bg-orange px-4 py-2 text-sm font-semibold font-[family-name:var(--font-heading)] text-ink hover:bg-orange-3 disabled:opacity-50"
        >
          Ask
        </button>
      </form>
    </div>
  );
}
