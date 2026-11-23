"use client";

import { FormEvent, useState, useSyncExternalStore } from "react";
import { DateKey, toKey } from "@/lib/holiday-calendar";
import type { DayChoice, HolidayFormInput } from "@/lib/holiday-submission";
import { HolidayCalendar } from "./HolidayCalendar";
import { Card, ContactValue, EmergencyHandling, EmergencyValue, OfficeSettings, OfficeValue, YourInformation } from "./FormSections";

// "Today" is read on the client only: the page is prerendered, and the
// calendar/Quick-Add presets must reflect the visitor's actual date.
const noopSubscribe = () => () => {};
const getToday = () => toKey(new Date());
const getServerToday = () => "";

type Status = "idle" | "submitting" | "success" | "error";

export function HolidayPreferencesForm() {
  const todayKey = useSyncExternalStore(noopSubscribe, getToday, getServerToday);

  const [selected, setSelected] = useState<Map<DateKey, DayChoice>>(new Map());
  const [office, setOffice] = useState<OfficeValue>({ officeClosed: true, useStandardGreeting: true, customGreeting: "", genPhoneNumber: "" });
  const [emergency, setEmergency] = useState<EmergencyValue>({ setUpEmergencyRouting: false, forwardingType: "", phone: "", extension: "", voicemailDestination: "" });
  const [contact, setContact] = useState<ContactValue>({ firstName: "", lastName: "", companyName: "", email: "", additionalNotes: "" });
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [validationError, setValidationError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const setDate = (k: DateKey, c: DayChoice) => setSelected((m) => new Map(m).set(k, c));
  const addDates = (keys: DateKey[]) =>
    setSelected((m) => {
      const next = new Map(m);
      keys.forEach((k) => next.has(k) || next.set(k, { type: "closed" }));
      return next;
    });
  const removeDate = (k: DateKey) =>
    setSelected((m) => {
      const next = new Map(m);
      next.delete(k);
      return next;
    });

  function forwardingValue() {
    const { forwardingType: t, phone, extension } = emergency;
    if (t === "external") return phone.trim();
    if (t === "internal") return extension.trim();
    if (t === "both") return [phone.trim() && `Phone: ${phone.trim()}`, extension.trim() && `Ext: ${extension.trim()}`].filter(Boolean).join(" / ");
    return "";
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setValidationError("");
    setSubmitError("");

    const missing: string[] = [];
    if (!contact.firstName.trim()) missing.push("First name");
    if (!contact.lastName.trim()) missing.push("Last name");
    if (!contact.companyName.trim()) missing.push("Company name");
    if (!contact.email.trim()) missing.push("Email address");
    if (selected.size === 0) missing.push("At least one date");
    if (emergency.setUpEmergencyRouting && emergency.forwardingType && !forwardingValue()) missing.push("Forwarding phone number or extension");
    if (missing.length) {
      setValidationError(`Please fill in: ${missing.join(", ")}.`);
      return;
    }

    setStatus("submitting");
    const payload: HolidayFormInput & { phone_alt: string } = {
      dates: Object.fromEntries(selected),
      officeClosed: office.officeClosed,
      useStandardGreeting: office.useStandardGreeting,
      customGreeting: office.useStandardGreeting ? "" : office.customGreeting.trim(),
      setUpEmergencyRouting: emergency.setUpEmergencyRouting,
      forwardingType: emergency.setUpEmergencyRouting ? emergency.forwardingType : "",
      forwardingValue: emergency.setUpEmergencyRouting ? forwardingValue() : "",
      genPhoneNumber: office.genPhoneNumber.trim(),
      voicemailDestination: emergency.setUpEmergencyRouting ? emergency.voicemailDestination.trim() : "",
      firstName: contact.firstName.trim(),
      lastName: contact.lastName.trim(),
      companyName: contact.companyName.trim(),
      email: contact.email.trim(),
      additionalNotes: contact.additionalNotes.trim(),
      phone_alt: honeypot,
    };
    try {
      const res = await fetch("/api/holiday-preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setStatus("success");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setStatus("error");
        setSubmitError(typeof data?.error === "string" ? data.error : "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setSubmitError("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="journey-card-in">
        <Card className="text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-orange text-ink shadow-[0_10px_30px_-8px_rgba(245,138,11,0.7)]">
            <svg viewBox="0 0 20 20" fill="none" className="h-8 w-8" aria-hidden="true">
              <path d="m5 10.5 3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="mt-5 font-[family-name:var(--font-heading)] text-2xl font-bold text-ink">Holiday Preferences Received!</h3>
          <p className="mx-auto mt-3 max-w-md text-muted">
            We&apos;ve got your auto attendant preferences for {selected.size} date{selected.size === 1 ? "" : "s"}. Our team will set
            everything up before the holiday. If we have any questions, we&apos;ll reach out.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Holiday Auto Attendant Preferences" className="space-y-6">
      {/* Honeypot: hidden from people, bots tend to fill it in */}
      <input
        type="text"
        name="phone_alt"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <Card>
        <div className="mb-5">
          <h2 className="mb-1 font-[family-name:var(--font-heading)] text-lg font-bold text-ink">Select Your Holiday Dates</h2>
          <p className="text-sm text-muted">
            Click a date to choose whether you&apos;re <strong className="text-label">fully closed</strong> or have{" "}
            <strong className="text-orange">custom hours</strong>. Jewish holidays are highlighted in amber.
          </p>
        </div>
        {todayKey ? (
          <HolidayCalendar
            todayKey={todayKey}
            selected={selected}
            onSetDate={setDate}
            onAddDates={addDates}
            onRemoveDate={removeDate}
            onClearAll={() => setSelected(new Map())}
          />
        ) : (
          <div className="grid min-h-[640px] place-items-center rounded-xl bg-cream text-sm text-muted">Loading calendar…</div>
        )}
      </Card>

      <OfficeSettings value={office} onChange={(p) => setOffice((o) => ({ ...o, ...p }))} companyName={contact.companyName} />
      <EmergencyHandling value={emergency} onChange={(p) => setEmergency((o) => ({ ...o, ...p }))} />
      <YourInformation value={contact} onChange={(p) => setContact((o) => ({ ...o, ...p }))} />

      {validationError || submitError ? (
        <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true">
            <path d="M10 6v5m0 3h.01M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          {validationError || submitError}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        aria-live="polite"
        className="w-full rounded-xl bg-orange px-6 py-4 font-[family-name:var(--font-heading)] text-base font-semibold text-ink shadow-[0_10px_30px_-12px_rgba(245,138,11,0.8)] transition hover:-translate-y-0.5 hover:bg-orange-3 disabled:cursor-wait disabled:opacity-70"
      >
        {status === "submitting"
          ? "Submitting..."
          : `Submit Holiday Preferences${selected.size > 0 ? ` (${selected.size} date${selected.size === 1 ? "" : "s"})` : ""}`}
      </button>
    </form>
  );
}
