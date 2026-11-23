"use client";

import Image from "next/image";
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

const VIEW_TABS = ["Today", "Users", "Queues", "Trends", "Call tree"];

const KPIS = [
  { label: "Calls today", value: "128", highlight: true },
  { label: "Incoming", value: "86" },
  { label: "Outgoing", value: "42" },
  { label: "Avg talk", value: "3:42" },
];

const QUEUES = [
  { name: "Sales", waiting: 2, longestWait: "0:46", agents: 3 },
  { name: "Support", waiting: 0, longestWait: "—", agents: 2 },
  { name: "Billing", waiting: 1, longestWait: "0:12", agents: 1 },
];

const AGENTS = [
  { name: "Dana R.", status: "on-call" as const },
  { name: "Marcus T.", status: "on-call" as const },
  { name: "Priya K.", status: "on-call" as const },
  { name: "Sam W.", status: "available" as const },
  { name: "Elena V.", status: "available" as const },
  { name: "Tom B.", status: "away" as const },
];

const CHART = [3, 5, 4, 7, 9, 12, 14, 10, 8, 6, 4, 2];

const RECENT_CALLS = [
  { time: "11:42 AM", number: "(347) 555-0118", outcome: "answered" as const, talk: "3:12" },
  { time: "11:29 AM", number: "(718) 555-0172", outcome: "voicemail" as const, talk: "0:48" },
  { time: "11:14 AM", number: "(212) 555-0199", outcome: "answered" as const, talk: "5:03" },
  { time: "10:58 AM", number: "(646) 555-0143", outcome: "missed" as const, talk: "—" },
  { time: "10:41 AM", number: "(917) 555-0187", outcome: "answered" as const, talk: "1:55" },
];

function formatDuration(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

const STATUS_STYLES: Record<string, string> = {
  "on-call": "bg-orange/20 text-label",
  available: "bg-[#dcf3e3] text-[#14532d]",
  away: "bg-[#eceef1] text-[#1f2937]",
};

const OUTCOME_STYLES: Record<string, string> = {
  answered: "bg-[#dcf3e3] text-[#14532d]",
  missed: "bg-[#fde2e2] text-[#8b1414]",
  voicemail: "bg-[#ffe9c7] text-[#7a3e00]",
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

  const maxChart = Math.max(...CHART);

  return (
    <div
      aria-hidden="true"
      className="glass-card glow-orange relative overflow-hidden rounded-3xl p-4 text-on-dark sm:p-6"
    >
      <div className="tech-grid pointer-events-none absolute inset-0" />

      <div className="relative">
        {/* Top bar — brand + view tabs, like the real dashboard's header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <Image
              src="/lion-switch-logo.png"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 rounded-lg"
            />
            <span className="font-[family-name:var(--font-heading)] text-base font-bold text-on-dark">
              Lion Switch
            </span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-white/5 p-1">
            {VIEW_TABS.map((tab, i) => (
              <span
                key={tab}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  i === 0 ? "bg-white text-ink" : "text-on-dark-2"
                }`}
              >
                {tab}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1.5 text-xs text-on-dark-2">
            <span className="h-2 w-2 rounded-full bg-[#86efac]" />
            Live
          </span>
        </div>

        <p className="mt-4 text-center text-[11px] font-bold uppercase tracking-[0.15em] text-orange-3">
          Illustrative sample data — not a real customer&apos;s calls
        </p>

        {/* KPI strip */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {KPIS.map((kpi) => (
            <div
              key={kpi.label}
              className={`rounded-2xl p-3 text-center ${
                kpi.highlight ? "bg-orange text-ink" : "bg-white/5"
              }`}
            >
              <p className="font-[family-name:var(--font-heading)] text-2xl font-bold tabular-nums">
                {kpi.value}
              </p>
              <p
                className={`mt-1 text-[10px] font-bold uppercase tracking-wider ${
                  kpi.highlight ? "text-ink/70" : "text-on-dark-2"
                }`}
              >
                {kpi.label}
              </p>
            </div>
          ))}
        </div>

        {/* Main panels — live calls / queues / users, like the real dashboard */}
        <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
          <div className="rounded-2xl bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-on-dark-2">
                Live now
              </h3>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold tabular-nums">
                {calls.length}
              </span>
            </div>
            <ul className="mt-3 space-y-2">
              {calls.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center justify-between gap-2 rounded-xl bg-white/5 px-3 py-2 text-xs"
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        c.direction === "in" ? "bg-orange" : "bg-on-dark-2"
                      }`}
                    />
                    <span className="truncate tabular-nums">{c.caller}</span>
                  </span>
                  <span className="tabular-nums text-on-dark-2">{formatDuration(c.seconds)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-white/5 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-dark-2">Queues</h3>
            <ul className="mt-3 space-y-2">
              {QUEUES.map((q) => (
                <li key={q.name} className="rounded-xl bg-white/5 px-3 py-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{q.name}</span>
                    <span className="tabular-nums text-on-dark-2">
                      {q.agents} agent{q.agents === 1 ? "" : "s"}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-on-dark-2">
                    <span>{q.waiting} waiting</span>
                    <span className="tabular-nums">longest {q.longestWait}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-white/5 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-dark-2">Users</h3>
            <ul className="mt-3 space-y-1.5">
              {AGENTS.map((a) => (
                <li key={a.name} className="flex items-center justify-between text-xs">
                  <span>{a.name}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${STATUS_STYLES[a.status]}`}
                  >
                    {a.status.replace("-", " ")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Chart + recent calls, like the real dashboard's bottom row */}
        <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-5">
          <div className="rounded-2xl bg-white/5 p-4 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-on-dark-2">
                Calls by hour
              </h3>
              <span className="flex items-center gap-2 text-[10px] text-on-dark-2">
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-sm bg-orange" /> In
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-sm bg-on-dark-2" /> Out
                </span>
              </span>
            </div>
            <div className="mt-4 flex h-20 items-end gap-1.5">
              {CHART.map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-orange/70"
                  style={{ height: `${(v / maxChart) * 100}%` }}
                />
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 p-4 lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-dark-2">
              Recent calls
            </h3>
            <ul className="mt-3 space-y-1.5">
              {RECENT_CALLS.map((c, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-2 rounded-xl px-1 py-1.5 text-xs"
                >
                  <span className="w-16 shrink-0 text-on-dark-2">{c.time}</span>
                  <span className="min-w-0 flex-1 truncate tabular-nums">{c.number}</span>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${OUTCOME_STYLES[c.outcome]}`}
                  >
                    {c.outcome}
                  </span>
                  <span className="w-10 shrink-0 text-right tabular-nums text-on-dark-2">
                    {c.talk}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
