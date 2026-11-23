"use client";

import { useEffect, useState } from "react";

type Call = {
  id: number;
  caller: string;
  agent: string;
  direction: "in" | "out";
  seconds: number;
};

const INITIAL_CALLS: Call[] = [
  { id: 1, caller: "(347) 555-0118", agent: "Dana R.", direction: "in", seconds: 14 },
  { id: 2, caller: "(718) 555-0172", agent: "Marcus T.", direction: "in", seconds: 142 },
  { id: 3, caller: "(212) 555-0199", agent: "Priya K.", direction: "out", seconds: 58 },
];

const QUEUE_STATS = [
  { label: "Calls Waiting", value: 2 },
  { label: "Longest Wait", value: "0:46" },
  { label: "Agents Available", value: 4 },
  { label: "Service Level", value: "94%" },
];

const AGENTS = [
  { name: "Dana R.", status: "on-call" as const },
  { name: "Marcus T.", status: "on-call" as const },
  { name: "Priya K.", status: "on-call" as const },
  { name: "Sam W.", status: "available" as const },
  { name: "Elena V.", status: "available" as const },
  { name: "Tom B.", status: "away" as const },
];

function formatDuration(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

// Colors match the existing dashboard app's status pill palette
// (lionswitch-dashboard/public/style.css: .pill.answered / .pill.unanswered).
const STATUS_STYLES: Record<string, string> = {
  "on-call": "bg-orange/20 text-label",
  available: "bg-[#dcf3e3] text-[#14532d]",
  away: "bg-[#eceef1] text-[#1f2937]",
};

export function DashboardMock() {
  const [calls, setCalls] = useState(INITIAL_CALLS);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCalls((prev) => prev.map((c) => ({ ...c, seconds: c.seconds + 1 })));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="glass-card glow-orange relative overflow-hidden rounded-3xl p-5 text-on-dark sm:p-6"
    >
      <div className="tech-grid pointer-events-none absolute inset-0" />
      <p className="relative mb-4 text-center text-[11px] font-bold uppercase tracking-[0.15em] text-orange-3">
        Illustrative sample data — not a real customer&apos;s calls
      </p>

      <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4">
        {QUEUE_STATS.map((s) => (
          <div key={s.label} className="rounded-2xl bg-white/5 p-3 text-center">
            <p className="font-[family-name:var(--font-heading)] text-2xl font-bold tabular-nums">
              {s.value}
            </p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-on-dark-2">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <div className="relative mt-4 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="rounded-2xl bg-white/5 p-4 lg:col-span-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-on-dark-2">
            Live Calls
          </h3>
          <ul className="mt-3 space-y-2">
            {calls.map((c) => (
              <li
                key={c.id}
                className="flex items-center justify-between gap-3 rounded-xl bg-white/5 px-3 py-2 text-sm"
              >
                <span className="flex items-center gap-2 truncate">
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${
                      c.direction === "in" ? "bg-orange" : "bg-on-dark-2"
                    }`}
                  />
                  <span className="truncate tabular-nums">{c.caller}</span>
                </span>
                <span className="truncate text-on-dark-2">{c.agent}</span>
                <span className="tabular-nums">{formatDuration(c.seconds)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-white/5 p-4 lg:col-span-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-on-dark-2">
            Agent Status
          </h3>
          <ul className="mt-3 space-y-1.5">
            {AGENTS.map((a) => (
              <li key={a.name} className="flex items-center justify-between text-sm">
                <span>{a.name}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${STATUS_STYLES[a.status]}`}
                >
                  {a.status.replace("-", " ")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
