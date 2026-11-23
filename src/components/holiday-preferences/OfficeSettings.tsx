"use client";

import { useState } from "react";
import { CalendarEntry } from "./types";

export type OfficeSettingsValue = {
  fullyClosed: boolean;
  greetingChoice: "standard" | "custom";
  customGreeting: string;
};

function SparkleIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3l1.8 4.9L19 9.5l-5.2 1.6L12 16l-1.8-4.9L5 9.5l5.2-1.6L12 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" fill="currentColor" />
    </svg>
  );
}

export function OfficeSettings({
  value,
  onChange,
  companyName,
  dates,
}: {
  value: OfficeSettingsValue;
  onChange: (value: OfficeSettingsValue) => void;
  companyName: string;
  dates: CalendarEntry[];
}) {
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState("");

  async function generateGreeting() {
    setGenerateError("");
    setGenerating(true);
    try {
      const res = await fetch("/api/holiday-preferences/generate-greeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: companyName || "our office",
          dates,
        }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) throw new Error(body?.error ?? "Couldn't generate a greeting.");
      onChange({ ...value, greetingChoice: "custom", customGreeting: body.greeting });
    } catch (err) {
      setGenerateError(err instanceof Error ? err.message : "Couldn't generate a greeting.");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="space-y-5">
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={value.fullyClosed}
          onChange={(e) => onChange({ ...value, fullyClosed: e.target.checked })}
          className="h-4 w-4 rounded border-soft-border text-orange focus:ring-orange"
        />
        <span className="text-sm font-semibold text-ink">
          Office fully closed <span className="font-normal text-muted">(overall, in addition to the dates above)</span>
        </span>
      </label>

      <fieldset>
        <legend className="text-sm font-semibold text-ink">Auto Attendant Greeting</legend>
        <div className="mt-2 space-y-2">
          <label className="flex items-center gap-2 text-sm text-text">
            <input
              type="radio"
              name="greeting-choice"
              checked={value.greetingChoice === "standard"}
              onChange={() => onChange({ ...value, greetingChoice: "standard" })}
              className="h-4 w-4 border-soft-border text-orange focus:ring-orange"
            />
            Use standard holiday greeting
          </label>
          <label className="flex items-center gap-2 text-sm text-text">
            <input
              type="radio"
              name="greeting-choice"
              checked={value.greetingChoice === "custom"}
              onChange={() => onChange({ ...value, greetingChoice: "custom" })}
              className="h-4 w-4 border-soft-border text-orange focus:ring-orange"
            />
            Write custom greeting
          </label>
        </div>
        {value.greetingChoice === "custom" ? (
          <div className="mt-3">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="custom-greeting" className="text-xs font-semibold text-muted">
                Greeting script
              </label>
              <button
                type="button"
                onClick={generateGreeting}
                disabled={generating}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange to-orange-3 px-3 py-1.5 text-xs font-bold text-ink shadow-[0_0_16px_-4px_rgba(245,138,11,0.7)] transition-transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
              >
                <SparkleIcon />
                {generating ? "Writing with Claude…" : "Generate with Claude"}
              </button>
            </div>
            <textarea
              id="custom-greeting"
              value={value.customGreeting}
              onChange={(e) => onChange({ ...value, customGreeting: e.target.value })}
              rows={3}
              placeholder="e.g. Thank you for calling Lion Switch. Our office is closed for the holiday... or tap “Generate with Claude” to draft one from your selected dates."
              className="mt-2 w-full rounded-xl border border-soft-border px-4 py-2.5 text-sm"
            />
            {generateError ? (
              <p role="alert" className="mt-1.5 text-xs text-red-700">
                {generateError}
              </p>
            ) : (
              <p className="mt-1.5 text-xs text-muted">
                Claude drafts a greeting from the dates you&apos;ve marked above — review and edit before saving.
              </p>
            )}
          </div>
        ) : null}
      </fieldset>
    </div>
  );
}
