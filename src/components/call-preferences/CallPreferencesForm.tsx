"use client";

import { FormEvent, useState } from "react";

// Mirrors the original lionswitch.com/call-preferences form: same fields,
// options, rules and wording.

const RING = [
  { value: "not_needed", label: "Not needed" },
  { value: "phone_app", label: "Phone app (mobile)" },
  { value: "desktop_app", label: "Desktop app" },
  { value: "cell_number", label: "Cell phone number" },
] as const;
const VOICEMAIL = [
  { value: "email_only", label: "Email only" },
  { value: "app_only", label: "App only" },
  { value: "both", label: "Both" },
] as const;
const MISSED = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
] as const;

type Ring = (typeof RING)[number]["value"];

const input = "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60";
const label = "mb-1.5 block text-sm font-medium text-text";
const Req = () => (
  <span aria-label="required" className="text-orange">
    *
  </span>
);

export function CallPreferencesForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [extension, setExtension] = useState("");
  const [email, setEmail] = useState("");
  const [ring, setRing] = useState<Ring[]>([]);
  const [delays, setDelays] = useState<Partial<Record<Ring, string>>>({});
  const [cell, setCell] = useState("");
  const [voicemail, setVoicemail] = useState("");
  const [missed, setMissed] = useState("");
  const [notes, setNotes] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const notNeeded = ring.includes("not_needed");
  const picked = RING.filter((r) => r.value !== "not_needed" && ring.includes(r.value));

  function toggle(v: Ring) {
    setRing((cur) => {
      if (v === "not_needed") {
        if (cur.includes("not_needed")) return cur.filter((x) => x !== "not_needed");
        setDelays({});
        setCell("");
        return ["not_needed"];
      }
      if (cur.includes(v)) {
        if (v === "cell_number") setCell("");
        setDelays((d) => {
          const n = { ...d };
          delete n[v];
          return n;
        });
        return cur.filter((x) => x !== v);
      }
      return [...cur.filter((x) => x !== "not_needed"), v];
    });
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    const missing: string[] = [];
    if (!firstName.trim()) missing.push("First name");
    if (!lastName.trim()) missing.push("Last name");
    if (!companyName.trim()) missing.push("Company name");
    if (!extension.trim()) missing.push("Current extension");
    if (!email.trim()) missing.push("Email address");
    if (ring.length === 0) missing.push("Where calls should ring");
    if (!notNeeded) for (const r of picked) if (!delays[r.value]?.trim()) missing.push(`Ring delay for "${r.label}"`);
    if (ring.includes("cell_number") && !cell.trim()) missing.push("Cell phone number (required when selected)");
    if (!voicemail) missing.push("Voicemail destination");
    if (!missed) missing.push("Missed call email preference");
    if (missing.length) {
      setError(`Please complete the following: ${missing.join(", ")}.`);
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/call-preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName, lastName, companyName, currentExtension: extension, emailAddress: email,
          ring, delays, cellPhoneNumber: cell, voicemail, missedCallEmail: missed, additionalNotes: notes, phone_alt: honeypot,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="surface journey-card-in rounded-2xl border bg-white p-8 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-orange text-ink">
          <svg viewBox="0 0 20 20" fill="none" className="h-8 w-8" aria-hidden="true">
            <path d="m5 10.5 3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-5 font-[family-name:var(--font-heading)] text-2xl font-bold text-ink">Preferences Received!</h3>
        <p className="mx-auto mt-3 max-w-md text-muted">
          We&apos;ve got your call preferences and will set up your extension exactly how you want it. If we have any
          questions, we&apos;ll reach out. Welcome aboard!
        </p>
      </div>
    );
  }

  const choice = (on: boolean) =>
    `flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm ring-1 ring-inset transition ${
      on ? "bg-soft font-semibold text-ink ring-orange" : "bg-white text-text ring-line hover:ring-soft-border"
    }`;

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Call Preferences" className="surface space-y-6 rounded-2xl border bg-white p-5 md:p-8">
      {error ? (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block" htmlFor="first-name">
          <span className={label}>First name <Req /></span>
          <input id="first-name" required autoComplete="given-name" placeholder="Jane" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={input} />
        </label>
        <label className="block" htmlFor="last-name">
          <span className={label}>Last name <Req /></span>
          <input id="last-name" required autoComplete="family-name" placeholder="Smith" value={lastName} onChange={(e) => setLastName(e.target.value)} className={input} />
        </label>
        <label className="block" htmlFor="company-name">
          <span className={label}>Company name <Req /></span>
          <input id="company-name" required autoComplete="organization" placeholder="Acme Corporation" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className={input} />
        </label>
        <label className="block" htmlFor="current-extension">
          <span className={label}>Current extension <Req /></span>
          <input id="current-extension" required placeholder="e.g. 201" value={extension} onChange={(e) => setExtension(e.target.value)} className={input} />
        </label>
      </div>
      <label className="block" htmlFor="email-address">
        <span className={label}>Email address <Req /></span>
        <input id="email-address" type="email" required autoComplete="email" placeholder="jane@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
      </label>

      <fieldset>
        <legend className="text-sm font-semibold text-ink">
          Besides your desk phone, where else should your calls ring? <Req />
        </legend>
        <p className="mb-3 mt-1 text-xs text-muted">
          Select where calls ring and how many seconds before each device starts ringing (~5 sec per ring).
        </p>
        <div className="space-y-2">
          {RING.map((r) => (
            <label key={r.value} className={choice(ring.includes(r.value))}>
              <input type="checkbox" checked={ring.includes(r.value)} onChange={() => toggle(r.value)} className="h-4 w-4 accent-[var(--color-orange)]" />
              <span className={r.value === "not_needed" ? "italic" : ""}>{r.label}</span>
            </label>
          ))}
        </div>
        {!notNeeded && picked.length ? (
          <div className="mt-3 space-y-3 pl-2 sm:pl-6">
            {picked.map((r) => (
              <label key={r.value} className="block" htmlFor={`delay-${r.value}`}>
                <span className={label}>
                  {r.label} — ring after <Req />
                </span>
                <span className="flex items-center gap-2">
                  <input
                    id={`delay-${r.value}`}
                    inputMode="numeric"
                    placeholder="e.g. 15"
                    value={delays[r.value] ?? ""}
                    onChange={(e) => (e.target.value === "" || /^\d+$/.test(e.target.value)) && setDelays((d) => ({ ...d, [r.value]: e.target.value }))}
                    className={`${input.replace("w-full ", "")} w-28`}
                  />
                  <span className="text-sm text-muted">seconds</span>
                  <span className="text-xs text-muted/70">(~3 rings = 15s)</span>
                </span>
              </label>
            ))}
          </div>
        ) : null}
        {ring.includes("cell_number") ? (
          <label className="mt-3 block pl-2 sm:pl-6" htmlFor="cell-phone">
            <span className={label}>Cell phone number <Req /></span>
            <input id="cell-phone" type="tel" autoComplete="tel" placeholder="(347) 000-0000" value={cell} onChange={(e) => setCell(e.target.value)} className={input} />
          </label>
        ) : null}
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-ink">
          Where should voicemail messages go? <Req />
        </legend>
        <div className="space-y-2">
          {VOICEMAIL.map((o) => (
            <label key={o.value} className={choice(voicemail === o.value)}>
              <input type="radio" name="voicemail" checked={voicemail === o.value} onChange={() => setVoicemail(o.value)} className="h-4 w-4 accent-[var(--color-orange)]" />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-ink">
          Want an email after every missed call? <Req />
        </legend>
        <div className="flex gap-2">
          {MISSED.map((o) => (
            <label key={o.value} className={choice(missed === o.value)}>
              <input type="radio" name="missed" checked={missed === o.value} onChange={() => setMissed(o.value)} className="h-4 w-4 accent-[var(--color-orange)]" />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block" htmlFor="call-notes">
        <span className={label}>
          Anything else we should know? <span className="font-normal text-muted">(optional)</span>
        </span>
        <textarea
          id="call-notes"
          rows={3}
          maxLength={500}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Special routing instructions, preferred hours, or anything else..."
          className={`${input} resize-y`}
        />
        <span className="mt-1 block text-right text-xs text-muted">{notes.length}/500</span>
      </label>

      <input type="text" name="phone_alt" tabIndex={-1} autoComplete="off" aria-hidden="true" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      {status === "error" ? (
        <p role="alert" className="text-sm text-red-700">
          Something went wrong. Please try again or contact your onboarding specialist.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-xl bg-orange px-6 py-3.5 font-[family-name:var(--font-heading)] text-base font-semibold text-ink transition hover:bg-orange-3 disabled:opacity-70"
      >
        {status === "submitting" ? "Submitting..." : "Submit my preferences"}
      </button>
    </form>
  );
}
