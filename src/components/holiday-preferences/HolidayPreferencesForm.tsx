"use client";

import { FormEvent, ReactNode, useState, useSyncExternalStore } from "react";
import { CalendarGrid } from "./CalendarGrid";
import { QuickAddButtons } from "./QuickAddButtons";
import { DateRangeAdder } from "./DateRangeAdder";
import { OfficeSettings, OfficeSettingsValue } from "./OfficeSettings";
import { EmergencyHandling, EmergencyHandlingValue } from "./EmergencyHandling";
import { YourInformation, YourInformationValue } from "./YourInformation";
import { CalendarEntries, CalendarEntry } from "./types";
import { Reveal } from "@/components/ui/Reveal";
import { getJewishHolidayDatesForYears } from "@/lib/jewish-holidays";

type Status = "idle" | "submitting" | "success" | "error";

type CalendarMeta = {
  years: [number, number];
  initialMonth: Date;
  holidayMap: Map<string, string>;
};

function computeCalendarMeta(now: Date): CalendarMeta {
  const year = now.getFullYear();
  return {
    years: [year, year + 1],
    initialMonth: new Date(year, now.getMonth(), 1),
    holidayMap: getJewishHolidayDatesForYears([year, year + 1, year + 2]),
  };
}

// The "current date" never changes for the lifetime of this component, so
// there's nothing to subscribe to — but reading it through
// useSyncExternalStore (rather than useState+useEffect) lets us give a fixed,
// deterministic value during prerendering (getServerSnapshot) and the real
// one on the client (getSnapshot), without a setState-in-effect.
//
// getSnapshot's result MUST be a stable reference across calls (React
// compares with Object.is to decide whether to re-render). Computing a new
// object/Map every call — as this used to do — makes every call "look"
// changed, which drives an infinite render loop (React error #185).
// Caching it the first time it's read on the client fixes that.
function subscribeNoop() {
  return () => {};
}
const PRERENDER_PLACEHOLDER_META = computeCalendarMeta(new Date(2000, 0, 1));
let cachedClientMeta: CalendarMeta | null = null;
function getClientCalendarMeta(): CalendarMeta {
  if (!cachedClientMeta) {
    cachedClientMeta = computeCalendarMeta(new Date());
  }
  return cachedClientMeta;
}

function sortedEntries(entries: CalendarEntries): CalendarEntry[] {
  return Object.values(entries).sort((a, b) => a.date.localeCompare(b.date));
}

function StepCard({
  step,
  icon,
  title,
  description,
  children,
}: {
  step: number;
  icon: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <Reveal>
      <section className="surface rounded-3xl border bg-white p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex shrink-0 items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ink font-[family-name:var(--font-heading)] text-sm font-bold text-on-dark">
              {step}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-orange">{icon}</span>
              <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-ink">
                {title}
              </h2>
            </div>
            {description ? <p className="mt-1 text-sm text-muted">{description}</p> : null}
            <div className="mt-5">{children}</div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

const ICONS = {
  calendarPlus: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 10h18M8 3v4M16 3v4M12 13v6M9 16h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1h-.2a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.5v-.2a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.5 1h.2a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.5 20c1-4 4-6 7.5-6s6.5 2 7.5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

export function HolidayPreferencesForm() {
  const [entries, setEntries] = useState<CalendarEntries>({});
  const [office, setOffice] = useState<OfficeSettingsValue>({
    fullyClosed: false,
    greetingChoice: "standard",
    customGreeting: "",
  });
  const [emergency, setEmergency] = useState<EmergencyHandlingValue>({
    enabled: false,
    contactName: "",
    phoneNumbers: "",
    routingOrder: "",
    notes: "",
  });
  const [info, setInfo] = useState<YourInformationValue>({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    notes: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const calendarMeta = useSyncExternalStore(
    subscribeNoop,
    getClientCalendarMeta,
    () => PRERENDER_PLACEHOLDER_META,
  );

  function upsertEntry(date: string, entry: CalendarEntry | null) {
    setEntries((prev) => {
      const next = { ...prev };
      if (entry === null) {
        delete next[date];
      } else {
        next[date] = entry;
      }
      return next;
    });
  }

  function addMany(newEntries: CalendarEntry[]) {
    setEntries((prev) => {
      const next = { ...prev };
      for (const e of newEntries) next[e.date] = e;
      return next;
    });
  }

  function validate(): string | null {
    if (!info.firstName.trim() || !info.lastName.trim() || !info.companyName.trim() || !info.email.trim()) {
      return "Please fill in your first name, last name, company name and email.";
    }
    const incomplete = Object.values(entries).find(
      (e) => e.status === "custom-hours" && (!e.openTime || !e.closeTime),
    );
    if (incomplete) {
      return `Please set open and close times for ${incomplete.date}, or mark it Fully Closed instead.`;
    }
    return null;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setStatus("error");
      setErrorMessage(validationError);
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/holiday-preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dates: sortedEntries(entries),
          office,
          emergency,
          contact: info,
          company_website: honeypot,
        }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) throw new Error(body?.error ?? "Something went wrong. Please try again.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    const dates = sortedEntries(entries);
    return (
      <div role="status" className="surface rounded-3xl border bg-soft p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-orange text-ink">
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="mt-4 font-[family-name:var(--font-heading)] text-2xl font-bold text-ink">
          Holiday preferences received
        </h2>
        <p className="mt-2 text-muted">
          Thanks, {info.firstName}. We&apos;ve sent a confirmation to {info.email} and
          notified our team.
        </p>
        {dates.length > 0 ? (
          <div className="surface mx-auto mt-6 max-w-md rounded-2xl border bg-white p-4 text-left">
            <h3 className="text-sm font-bold text-ink">Summary of dates submitted</h3>
            <ul className="mt-2 max-h-56 space-y-1 overflow-y-auto text-sm text-muted">
              {dates.map((d) => (
                <li key={d.date}>
                  {d.date} —{" "}
                  {d.status === "closed"
                    ? "Fully Closed"
                    : `Custom Hours (${d.openTime || "?"}–${d.closeTime || "?"})`}
                  {d.label ? ` — ${d.label}` : ""}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <StepCard
        step={1}
        icon={ICONS.calendarPlus}
        title="Quick Add"
        description="Add common holidays for this year and next with one click, then fine-tune on the calendar below."
      >
        <QuickAddButtons years={calendarMeta.years} onAddMany={addMany} />
      </StepCard>

      <StepCard
        step={2}
        icon={ICONS.calendar}
        title="Calendar"
        description="Click a date to mark it Fully Closed or set Custom Hours. Jewish holidays are highlighted in amber."
      >
        <div className="surface rounded-2xl border bg-white p-5">
          <CalendarGrid
            entries={entries}
            holidayMap={calendarMeta.holidayMap}
            initialMonth={calendarMeta.initialMonth}
            onChangeEntry={upsertEntry}
          />
        </div>
        <div className="mt-4">
          <DateRangeAdder onAddMany={addMany} />
        </div>
      </StepCard>

      <StepCard step={3} icon={ICONS.settings} title="Office Settings">
        <OfficeSettings
          value={office}
          onChange={setOffice}
          companyName={info.companyName}
          dates={sortedEntries(entries)}
        />
      </StepCard>

      <StepCard
        step={4}
        icon={ICONS.shield}
        title="Emergency Handling"
        description="Optional — set up call routing for true emergencies."
      >
        <EmergencyHandling value={emergency} onChange={setEmergency} />
      </StepCard>

      <StepCard step={5} icon={ICONS.user} title="Your Information">
        <YourInformation value={info} onChange={setInfo} />
      </StepCard>

      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
      />

      <Reveal className="flex flex-col items-center gap-4 pt-2 text-center">
        {status === "error" ? (
          <p role="alert" className="text-sm text-red-700">
            {errorMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-full bg-orange px-8 py-4 text-base font-semibold font-[family-name:var(--font-heading)] text-ink shadow-[0_8px_28px_-6px_rgba(245,138,11,0.55)] transition-transform hover:-translate-y-0.5 hover:bg-orange-3 disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
        >
          {status === "submitting" ? "Submitting…" : "Submit Holiday Preferences"}
        </button>
      </Reveal>
    </form>
  );
}
