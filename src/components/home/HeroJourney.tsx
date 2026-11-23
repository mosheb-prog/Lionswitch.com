"use client";

import { ReactNode, useEffect, useState, useSyncExternalStore } from "react";

// A purely visual, looping illustration of how a call flows through Lion
// Switch: call ends -> AI transcript + summary -> dashboard updates -> ask
// an AI assistant (via MCP). Fictional sample data only; nothing here talks to a backend.

type Step = 0 | 1 | 2 | 3;
type Phase = { step: Step; reveal: number; travel?: boolean; fade?: boolean; ms: number };

const DONE = 99;

const TIMELINE: Phase[] = [
  { step: 0, reveal: 0, ms: 1400 },
  { step: 0, reveal: 1, ms: 1700 },
  { step: 0, reveal: DONE, travel: true, ms: 950 },
  { step: 1, reveal: 0, ms: 900 },
  { step: 1, reveal: 1, ms: 800 },
  { step: 1, reveal: 2, ms: 800 },
  { step: 1, reveal: 3, ms: 2000 },
  { step: 1, reveal: DONE, travel: true, ms: 950 },
  { step: 2, reveal: 0, ms: 900 },
  { step: 2, reveal: 1, ms: 2400 },
  { step: 2, reveal: DONE, travel: true, ms: 950 },
  { step: 3, reveal: 0, ms: 1100 },
  { step: 3, reveal: 1, ms: 1100 },
  { step: 3, reveal: 2, ms: 2900 },
  { step: 3, reveal: DONE, fade: true, ms: 800 },
];

const NODES: { label: string; icon: ReactNode }[] = [
  {
    label: "Call",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
        <path
          d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "AI transcript",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M12 2l2.1 5.6L20 9.7l-5.9 2.1L12 17.5l-2.1-5.7L4 9.7l5.9-2.1zM19 15l1 2.6 2.6 1-2.6 1L19 22l-1-2.4-2.6-1 2.6-1z" />
      </svg>
    ),
  },
  {
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
        <rect x="3" y="3" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="14" y="12" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="3" y="16" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    label: "Ask your AI",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
        <path
          d="M4 5h16v11H9l-5 4V5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const nodeX = (i: number) => 12.5 + 25 * i;

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Shown({ when, children, className = "" }: { when: boolean; children: ReactNode; className?: string }) {
  return (
    <div
      className={`transition-all duration-500 ease-out ${
        when ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Chip({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "orange" | "green" }) {
  const tones = {
    muted: "bg-white/10 text-on-dark-2",
    orange: "bg-orange/20 text-orange-3",
    green: "bg-[#dcf3e3] text-[#14532d]",
  };
  return (
    <span
      className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function CardHeader({ title, chip }: { title: string; chip?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-on-dark-2">{title}</p>
      {chip}
    </div>
  );
}

function CallCard({ reveal }: { reveal: number }) {
  const ended = reveal >= 1;
  return (
    <div>
      <CardHeader
        title="Front desk line"
        chip={ended ? <Chip>Call ended</Chip> : <Chip tone="green">On call</Chip>}
      />
      <p className="mt-3 font-[family-name:var(--font-heading)] text-lg font-bold tabular-nums">
        (718) 555-0172
      </p>
      <div className="mt-3 flex h-10 items-center gap-1">
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className={`w-1 rounded-full bg-orange/80 transition-[height] duration-700 ${
              ended ? "h-1" : "journey-wave h-8"
            }`}
            style={ended ? undefined : { animationDelay: `${(i % 7) * 110}ms` }}
          />
        ))}
      </div>
      <Shown when={ended} className="mt-3 flex items-center justify-between text-xs text-on-dark-2">
        <span className="tabular-nums">Duration 4:12</span>
        <Chip tone="orange">Recording saved</Chip>
      </Shown>
    </div>
  );
}

const TRANSCRIPT = [
  { who: "Caller", text: "Hi, I need a quote for 12 new desk phones." },
  { who: "Agent", text: "Happy to help — what's your timeline?" },
  { who: "Caller", text: "Ideally by Friday. Please call me back." },
];

function TranscriptCard({ reveal }: { reveal: number }) {
  return (
    <div>
      <CardHeader title="Transcript · after the call" chip={<Chip>Optional</Chip>} />
      <div className="mt-3 space-y-1.5">
        {TRANSCRIPT.map((line, i) => (
          <Shown key={i} when={reveal >= i} className="text-xs leading-snug">
            <span className="font-semibold text-on-dark">{line.who}: </span>
            <span className="text-on-dark-2">{line.text}</span>
          </Shown>
        ))}
      </div>
      <Shown when={reveal >= 3} className="mt-3 rounded-xl bg-orange/15 p-3 ring-1 ring-inset ring-orange/30">
        <p className="text-[10px] font-bold uppercase tracking-wider text-orange-3">AI summary</p>
        <p className="mt-1 text-xs text-on-dark">
          Wants a quote for 12 desk phones by Friday. <span className="font-semibold">Follow-up needed.</span>
        </p>
      </Shown>
    </div>
  );
}

const BARS = [30, 45, 38, 60, 72, 55, 48];

function DashboardCard({ reveal }: { reveal: number }) {
  const updated = reveal >= 1;
  return (
    <div className="@container">
      <CardHeader title="Dashboard · Today" />
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-white/5 px-3 py-2">
          <p
            className={`font-[family-name:var(--font-heading)] text-lg font-bold tabular-nums transition-colors duration-500 ${
              updated ? "text-orange-3" : "text-on-dark"
            }`}
          >
            {updated ? 128 : 127}
          </p>
          <p className="text-[9px] font-bold uppercase tracking-wider text-on-dark-2">Calls today</p>
        </div>
        <div className="rounded-xl bg-white/5 px-3 py-2">
          <p
            className={`font-[family-name:var(--font-heading)] text-lg font-bold tabular-nums transition-colors duration-500 ${
              updated ? "text-orange-3" : "text-on-dark"
            }`}
          >
            {updated ? 2 : 1}
          </p>
          <p className="text-[9px] font-bold uppercase tracking-wider text-on-dark-2">Follow-ups</p>
        </div>
      </div>
      <div className="mt-3 flex items-end gap-3">
        <ul className="min-w-0 flex-1 space-y-1 text-[11px]">
          <li
            className={`flex items-center justify-between gap-2 overflow-hidden rounded-lg bg-orange/10 px-2 transition-all duration-500 ${
              updated ? "max-h-8 py-1 opacity-100" : "max-h-0 py-0 opacity-0"
            }`}
          >
            <span className="truncate tabular-nums">(718) 555-0172</span>
            <Chip tone="orange">Follow-up</Chip>
          </li>
          <li className="flex items-center justify-between gap-2 px-2 py-1 text-on-dark-2">
            <span className="truncate tabular-nums">(212) 555-0199</span>
            <Chip tone="green">Answered</Chip>
          </li>
          <li className="flex items-center justify-between gap-2 px-2 py-1 text-on-dark-2">
            <span className="truncate tabular-nums">(646) 555-0143</span>
            <Chip tone="orange">Follow-up</Chip>
          </li>
        </ul>
        <div className="hidden h-16 w-20 shrink-0 items-end gap-1 @2xs:flex">
          {BARS.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t-sm bg-orange/70 transition-[height] duration-700 ease-out"
              style={{ height: `${i === BARS.length - 1 && updated ? 95 : h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AiCard({ reveal }: { reveal: number }) {
  return (
    <div>
      <CardHeader title="Ask your AI" chip={<Chip>Optional · read-only</Chip>} />
      <div className="mt-3 space-y-2">
        <Shown when={reveal >= 0} className="flex justify-end">
          <p className="max-w-[85%] rounded-2xl rounded-br-md bg-orange px-3 py-2 text-xs font-semibold text-ink">
            Which calls need a follow-up?
          </p>
        </Shown>
        {reveal === 1 ? (
          <div className="flex gap-1 px-1 py-2" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="journey-typing h-1.5 w-1.5 rounded-full bg-on-dark-2"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
        ) : null}
        <Shown when={reveal >= 2}>
          <p className="max-w-[92%] rounded-2xl rounded-bl-md bg-white/10 px-3 py-2 text-xs leading-relaxed text-on-dark">
            Two calls today: <span className="tabular-nums">(718) 555-0172</span> wants a quote for 12
            desk phones by Friday, and <span className="tabular-nums">(646) 555-0143</span> asked a
            billing question.
          </p>
        </Shown>
      </div>
      <p className="mt-3 text-[10px] text-on-dark-2/80">
        Your AI reads call data only — it can&apos;t change phone settings.
      </p>
    </div>
  );
}

function StepContent({ step, reveal }: { step: Step; reveal: number }) {
  if (step === 0) return <CallCard reveal={reveal} />;
  if (step === 1) return <TranscriptCard reveal={reveal} />;
  if (step === 2) return <DashboardCard reveal={reveal} />;
  return <AiCard reveal={reveal} />;
}

function Rail({ activeStep, fillTo, travelling, instant }: {
  activeStep: number;
  fillTo: number;
  travelling: boolean;
  instant: boolean;
}) {
  const move = instant ? "transition-none" : "transition-[left,width] duration-[900ms] ease-in-out";
  return (
    <div className="relative">
      <div className="absolute top-5 h-px bg-white/10" style={{ left: "12.5%", width: "75%" }} />
      <div
        className={`absolute top-5 h-px bg-orange/70 ${move}`}
        style={{ left: "12.5%", width: `${(fillTo / 3) * 75}%` }}
      />
      {/* The travelling "packet" and its trail */}
      {[
        { size: 10, opacity: 1, delay: 0 },
        { size: 6, opacity: 0.55, delay: 90 },
        { size: 4, opacity: 0.3, delay: 180 },
      ].map((d, i) => (
        <span
          key={i}
          className={`absolute top-5 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange ${move}`}
          style={{
            left: `${nodeX(fillTo)}%`,
            width: d.size,
            height: d.size,
            opacity: travelling ? d.opacity : 0,
            transitionDelay: instant ? "0ms" : `${d.delay}ms`,
            boxShadow: i === 0 ? "0 0 12px 2px rgba(245,138,11,0.7)" : undefined,
          }}
        />
      ))}
      <div className="relative z-20 grid grid-cols-4">
        {NODES.map((node, i) => {
          const state = i === activeStep ? "active" : i < activeStep ? "done" : "next";
          return (
            <div key={node.label} className="flex flex-col items-center">
              <span
                className={`grid h-10 w-10 place-items-center rounded-full transition-all duration-500 ${
                  state === "active"
                    ? "bg-orange text-ink shadow-[0_0_22px_-2px_rgba(245,138,11,0.8)]"
                    : state === "done"
                      ? "bg-[#3a2a12] text-orange-3 ring-1 ring-orange/40"
                      : "bg-[#1a1f27] text-on-dark-2 ring-1 ring-white/10"
                }`}
              >
                {node.icon}
              </span>
              <span
                className={`mt-2 text-center text-[10px] font-semibold sm:text-xs ${
                  state === "next" ? "text-on-dark-2/70" : "text-on-dark"
                }`}
              >
                {node.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StillVersion() {
  return (
    <div>
      <Rail activeStep={3} fillTo={3} travelling={false} instant />
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {([0, 1, 2, 3] as Step[]).map((s) => (
          <div key={s} className="rounded-2xl bg-[#171c24] p-4 ring-1 ring-inset ring-white/10">
            <StepContent step={s} reveal={DONE} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroJourney() {
  const reduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const timer = setTimeout(() => {
      // Hold the current frame while the tab is hidden instead of racing ahead.
      setIndex((i) => (document.hidden ? i : (i + 1) % TIMELINE.length));
    }, TIMELINE[index].ms);
    return () => clearTimeout(timer);
  }, [index, reduced]);

  const phase = TIMELINE[index];
  const travelling = Boolean(phase.travel);
  const fillTo = travelling ? phase.step + 1 : phase.step;
  const restarting = index === 0;

  return (
    <div className="glass-card glow-orange relative overflow-hidden rounded-3xl p-5 text-left text-on-dark sm:p-6">
      <div aria-hidden="true" className="tech-grid pointer-events-none absolute inset-0" />
      <p className="sr-only">
        Illustration: after a call ends, the recording is transcribed and summarized, the Lion
        Switch dashboard updates, and you can ask your AI which calls need a follow-up.
      </p>

      <div aria-hidden="true" className="relative">
        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange-3">
            How a call flows<span className="hidden sm:inline"> through Lion Switch</span>
          </p>
          {reduced ? null : (
            <p className="whitespace-nowrap text-[11px] tabular-nums text-on-dark-2">
              Step {phase.step + 1} of 4
            </p>
          )}
        </div>

        {reduced ? (
          <StillVersion />
        ) : (
          <div
            className={`transition-opacity duration-700 ${phase.fade ? "opacity-0" : "opacity-100"}`}
          >
            <Rail activeStep={phase.step} fillTo={fillTo} travelling={travelling} instant={restarting} />

            <div className="relative mt-5">
              {/* Pointer from the active node down to its card */}
              <span
                className={`absolute -top-[7px] z-10 h-3.5 w-3.5 -translate-x-1/2 rotate-45 border-l border-t border-orange/50 bg-[#171c24] ${
                  restarting ? "" : "transition-[left] duration-500 ease-out"
                }`}
                style={{ left: `${nodeX(phase.step)}%` }}
              />
              <div className="h-[230px] overflow-hidden rounded-2xl bg-[#171c24] p-4 ring-1 ring-inset ring-white/10 sm:h-[220px] sm:p-5">
                <div key={phase.step} className="journey-card-in">
                  <StepContent step={phase.step} reveal={phase.reveal} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
