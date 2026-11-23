"use client";

import { FormEvent, useState, useSyncExternalStore } from "react";
import { CalendarGrid } from "./CalendarGrid";
import { QuickAddButtons } from "./QuickAddButtons";
import { DateRangeAdder } from "./DateRangeAdder";
import { OfficeSettings, OfficeSettingsValue } from "./OfficeSettings";
import { EmergencyHandling, EmergencyHandlingValue } from "./EmergencyHandling";
import { YourInformation, YourInformationValue } from "./YourInformation";
import { CalendarEntries, CalendarEntry } from "./types";
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
function subscribeNoop() {
  return () => {};
}
const PRERENDER_PLACEHOLDER_META = computeCalendarMeta(new Date(2000, 0, 1));

function sortedEntries(entries: CalendarEntries): CalendarEntry[] {
  return Object.values(entries).sort((a, b) => a.date.localeCompare(b.date));
}

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
    () => computeCalendarMeta(new Date()),
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
      <div role="status" className="rounded-3xl border border-soft-border bg-soft p-8 text-center">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-ink">
          Holiday preferences received
        </h2>
        <p className="mt-2 text-muted">
          Thanks, {info.firstName}. We&apos;ve sent a confirmation to {info.email} and
          notified our team.
        </p>
        {dates.length > 0 ? (
          <div className="mx-auto mt-6 max-w-md rounded-2xl bg-white p-4 text-left">
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
    <form onSubmit={onSubmit} className="space-y-10" noValidate>
      <section>
        <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-ink">
          Quick Add
        </h2>
        <p className="mt-1 text-sm text-muted">
          Add common holidays for this year and next with one click, then fine-tune on the
          calendar below.
        </p>
        <div className="mt-4">
          <QuickAddButtons years={calendarMeta.years} onAddMany={addMany} />
        </div>
      </section>

      <section>
        <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-ink">
          Calendar
        </h2>
        <p className="mt-1 text-sm text-muted">
          Click a date to mark it Fully Closed or set Custom Hours. Jewish holidays are
          highlighted in amber.
        </p>
        <div className="mt-4 rounded-3xl border border-soft-border bg-white p-5">
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
      </section>

      <section>
        <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-ink">
          Office Settings
        </h2>
        <div className="mt-4">
          <OfficeSettings value={office} onChange={setOffice} />
        </div>
      </section>

      <section>
        <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-ink">
          Emergency Handling
        </h2>
        <div className="mt-4">
          <EmergencyHandling value={emergency} onChange={setEmergency} />
        </div>
      </section>

      <section>
        <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-ink">
          Your Information
        </h2>
        <div className="mt-4">
          <YourInformation value={info} onChange={setInfo} />
        </div>
      </section>

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

      {status === "error" ? (
        <p role="alert" className="text-sm text-red-700">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-orange px-6 py-3.5 text-base font-semibold font-[family-name:var(--font-heading)] text-ink hover:bg-orange-3 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Submitting…" : "Submit Holiday Preferences"}
      </button>
    </form>
  );
}
