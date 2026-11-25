"use client";

import { CallTreeView, QueuesView, TranscriptsView, TrendsView, UsersView } from "./DashboardTabs";
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

const VIEW_TABS = ["Today", "Users", "Queues", "Trends", "Call tree", "Transcripts"] as const;
type ViewTab = (typeof VIEW_TABS)[number];

const LIST_TABS = ["Recent calls", "Follow-ups", "Repeat"] as const;
type ListTab = (typeof LIST_TABS)[number];

const KPIS = [
  { label: "Open follow-ups", value: "2", sub: "0 missed today", highlight: true },
  { label: "Upset callers today", value: "0", sub: "None so far" },
  { label: "Calls today", value: "128", sub: "" },
  { label: "Incoming", value: "86", sub: "" },
  { label: "Outgoing", value: "42", sub: "" },
  { label: "Avg talk", value: "3:42", sub: "Longest 11:05" },
];

const QUEUES = [
  { name: "Sales", ext: "510", waiting: 2, users: "2/3" },
  { name: "Support", ext: "520", waiting: 0, users: "1/2" },
  { name: "Billing", ext: "530", waiting: 1, users: "1/1" },
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
  { time: "11:42 AM", number: "(347) 555-0118", ext: "1156", outcome: "Answered" as const, mood: "Neutral", talk: "3:12" },
  { time: "11:29 AM", number: "(718) 555-0172", ext: "1152", outcome: "Voicemail" as const, mood: "—", talk: "0:48" },
  { time: "11:14 AM", number: "(212) 555-0199", ext: "1156", outcome: "Answered" as const, mood: "Happy", talk: "5:03" },
  { time: "10:58 AM", number: "(646) 555-0143", ext: "500", outcome: "No answer" as const, mood: "—", talk: "—" },
  { time: "10:41 AM", number: "(917) 555-0187", ext: "1156", outcome: "Answered" as const, mood: "Neutral", talk: "1:55" },
];

const FOLLOW_UPS = [
  { who: "(646) 555-0143", reason: "Asked for a callback about billing", due: "Today" },
  { who: "(347) 555-0211", reason: "Wants a demo of the live dashboard", due: "Tomorrow" },
];

const ASK_AI_EXCHANGE = {
  question: "Which calls today needed a follow-up?",
  answer:
    "2 calls today need a follow-up: (646) 555-0143 asked about a billing question, and (347) 555-0211 wants a demo of the live dashboard. Both are in your Follow-ups list.",
};

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
  Answered: "bg-[#dcf3e3] text-[#14532d]",
  "No answer": "bg-[#fde2e2] text-[#8b1414]",
  Voicemail: "bg-[#ffe9c7] text-[#7a3e00]",
};

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
        active ? "bg-white text-ink" : "text-on-dark-2 hover:text-on-dark"
      }`}
    >
      {children}
    </button>
  );
}

export function DashboardMock() {
  const [calls, setCalls] = useState(INITIAL_CALLS);
  const [activeTab, setActiveTab] = useState<ViewTab>("Today");
  const [activeList, setActiveList] = useState<ListTab>("Recent calls");
  const [askAiOpen, setAskAiOpen] = useState(false);
  const [dialValue, setDialValue] = useState("");
  const [dialMessage, setDialMessage] = useState("");

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
    <div className="glass-card glow-orange relative overflow-hidden rounded-3xl p-4 text-on-dark sm:p-6">
      <div className="tech-grid pointer-events-none absolute inset-0" />

      <div className="relative">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <Image src="/lion-switch-logo.png" alt="" width={28} height={28} className="h-7 w-7 rounded-lg" />
            <span className="font-[family-name:var(--font-heading)] text-base font-bold text-on-dark">
              Lion Switch
            </span>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-on-dark-2">
            <span className="h-2 w-2 rounded-full bg-[#86efac]" />
            Live
          </span>
        </div>

        {/* Clickable view tabs — try them */}
        <div
          role="tablist"
          aria-label="Try the dashboard views"
          className="mt-4 flex flex-wrap items-center gap-1 rounded-full bg-white/5 p-1"
        >
          {VIEW_TABS.map((tab) => (
            <TabButton key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>
              {tab}
            </TabButton>
          ))}
        </div>

        <p className="mt-4 text-center text-[11px] font-bold uppercase tracking-[0.15em] text-orange-3">
          Illustrative sample data — click around, nothing here is a real customer&apos;s calls
        </p>

        {activeTab === "Today" ? (
          <>
            {/* KPI strip */}
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {KPIS.map((kpi) => (
                <div
                  key={kpi.label}
                  className={`rounded-2xl p-3 text-center ${kpi.highlight ? "bg-orange text-ink" : "bg-white/5"}`}
                >
                  <p className="font-[family-name:var(--font-heading)] text-2xl font-bold tabular-nums">
                    {kpi.value}
                  </p>
                  <p
                    className={`mt-1 text-[9px] font-bold uppercase tracking-wider ${
                      kpi.highlight ? "text-ink/70" : "text-on-dark-2"
                    }`}
                  >
                    {kpi.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Live / Queues / Users panels */}
            <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
              <div className="rounded-2xl bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-on-dark-2">Live now</h3>
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
                        <span className="font-semibold">
                          {q.name} <span className="text-on-dark-2">{q.ext}</span>
                        </span>
                        <span className="tabular-nums text-on-dark-2">{q.users} users</span>
                      </div>
                      <div className="mt-1 text-on-dark-2">{q.waiting} waiting</div>
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

            {/* Chart + recent calls with dial box */}
            <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-5">
              <div className="rounded-2xl bg-white/5 p-4 lg:col-span-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-on-dark-2">Calls by hour</h3>
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
                    <div key={i} className="flex-1 rounded-t-sm bg-orange/70" style={{ height: `${(v / maxChart) * 100}%` }} />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 p-4 lg:col-span-3">
                <div
                  role="tablist"
                  aria-label="Try the call lists"
                  className="flex flex-wrap items-center gap-1 rounded-full bg-white/5 p-1"
                >
                  {LIST_TABS.map((tab) => (
                    <TabButton key={tab} active={activeList === tab} onClick={() => setActiveList(tab)}>
                      {tab}
                      {tab === "Follow-ups" ? ` ${FOLLOW_UPS.length}` : null}
                    </TabButton>
                  ))}
                </div>

                <form
                  className="mt-3 flex items-center gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setDialMessage(dialValue ? "Try this on a real demo call →" : "");
                  }}
                >
                  <input
                    value={dialValue}
                    onChange={(e) => setDialValue(e.target.value)}
                    placeholder="Number or extension"
                    className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-on-dark placeholder:text-on-dark-2/70 focus:border-orange focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-full bg-orange px-3 py-1.5 text-xs font-bold text-ink hover:bg-orange-3"
                  >
                    Call
                  </button>
                </form>
                {dialMessage ? <p className="mt-1.5 text-[11px] text-orange-3">{dialMessage}</p> : null}

                {activeList === "Recent calls" ? (
                  <ul className="mt-3 space-y-1.5">
                    {RECENT_CALLS.map((c, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between gap-2 rounded-xl px-1 py-1.5 text-xs hover:bg-white/5"
                      >
                        <span className="w-16 shrink-0 text-on-dark-2">{c.time}</span>
                        <span className="min-w-0 flex-1 truncate tabular-nums">{c.number}</span>
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${OUTCOME_STYLES[c.outcome]}`}
                        >
                          {c.outcome}
                        </span>
                        <span className="w-10 shrink-0 text-right tabular-nums text-on-dark-2">{c.talk}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {activeList === "Follow-ups" ? (
                  <ul className="mt-3 space-y-1.5">
                    {FOLLOW_UPS.map((f, i) => (
                      <li key={i} className="rounded-xl px-1 py-1.5 text-xs hover:bg-white/5">
                        <div className="flex items-center justify-between">
                          <span className="tabular-nums">{f.who}</span>
                          <span className="text-on-dark-2">{f.due}</span>
                        </div>
                        <p className="mt-0.5 text-on-dark-2">{f.reason}</p>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {activeList === "Repeat" ? (
                  <p className="mt-6 text-center text-xs text-on-dark-2">
                    Callers who&apos;ve called more than once this week show up here.
                  </p>
                ) : null}
              </div>
            </div>
          </>
        ) : activeTab === "Users" ? (
          <UsersView />
        ) : activeTab === "Queues" ? (
          <QueuesView />
        ) : activeTab === "Trends" ? (
          <TrendsView />
        ) : activeTab === "Call tree" ? (
          <CallTreeView />
        ) : (
          <TranscriptsView />
        )}
      </div>

      {/* Ask AI — matches the real dashboard's floating assistant */}
      <div className="absolute bottom-4 right-4">
        {askAiOpen ? (
          <div className="surface mb-2 w-72 rounded-2xl border bg-white p-4 text-ink shadow-2xl">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-muted">Ask AI</p>
              <button
                type="button"
                onClick={() => setAskAiOpen(false)}
                aria-label="Close"
                className="text-muted hover:text-ink"
              >
                &times;
              </button>
            </div>
            <p className="mt-2 rounded-xl bg-soft px-3 py-2 text-xs">{ASK_AI_EXCHANGE.question}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted">{ASK_AI_EXCHANGE.answer}</p>
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => setAskAiOpen((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-full bg-orange px-4 py-2.5 text-xs font-bold text-ink shadow-[0_8px_24px_-6px_rgba(245,138,11,0.7)] transition-transform hover:scale-105"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
            <path d="M12 2l2.1 5.6L20 9.7l-5.9 2.1L12 17.5l-2.1-5.7L4 9.7l5.9-2.1zM19 15l1 2.6 2.6 1-2.6 1L19 22l-1-2.4-2.6-1 2.6-1z" />
          </svg>
          Ask AI
        </button>
      </div>
    </div>
  );
}
