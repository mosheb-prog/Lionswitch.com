"use client";

import { ReactNode, useState } from "react";

// Office Settings, Emergency Handling and Your Information sections of the
// holiday form. Wording mirrors the original lionswitch.com form.

export const inputCls =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60";
const labelCls = "mb-1.5 block text-sm font-medium text-text";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`surface rounded-2xl border bg-white p-4 md:p-6 lg:p-7 ${className}`}>{children}</div>;
}

function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-orange" : "bg-[#d1d5db]"}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );
}

function Req() {
  return (
    <span aria-label="required" className="text-orange">
      *
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Office Settings                                                     */
/* ------------------------------------------------------------------ */

const GREETING_HOLIDAYS = [
  "Rosh Hashanah",
  "Yom Kippur",
  "Sukkot",
  "Shemini Atzeret",
  "Simchat Torah",
  "Chanukah",
  "Purim",
  "Pesach",
  "Shavuot",
  "Tisha B'Av",
  "Other Jewish Holiday",
  "Federal Holiday",
  "Other",
];
const REOPEN_TIMES = ["7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "12:00 PM"];

export type OfficeValue = {
  officeClosed: boolean;
  useStandardGreeting: boolean;
  customGreeting: string;
  genPhoneNumber: string;
};

export function OfficeSettings({
  value,
  onChange,
  companyName,
}: {
  value: OfficeValue;
  onChange: (patch: Partial<OfficeValue>) => void;
  companyName: string;
}) {
  const [builderOpen, setBuilderOpen] = useState(false);
  const [holidayName, setHolidayName] = useState("");
  const [vmEmail, setVmEmail] = useState("");
  const [reopenDate, setReopenDate] = useState("");
  const [reopenTime, setReopenTime] = useState("9:00 AM");
  const [emergencyOption, setEmergencyOption] = useState(false);
  const [preview, setPreview] = useState("");

  function generate() {
    const holiday = holidayName || "the holiday";
    const reopen = reopenDate
      ? new Date(`${reopenDate}T00:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
      : "the following business day";
    const company = companyName.trim() || "[Company Name]";
    let text = value.officeClosed
      ? `Thank you for calling ${company}. Our office is closed for ${holiday}. We will reopen on ${reopen} at ${reopenTime}.`
      : `Thank you for calling ${company}. Please note we are observing ${holiday} with adjusted hours today. Our office is open from ${reopenTime} today.`;
    text += " Press 0 to leave a voicemail and we will return your call as soon as possible.";
    if (emergencyOption) text += " If you need immediate assistance, please press 1 for emergency support.";
    if (vmEmail.trim()) text += ` You can also reach us by email at ${vmEmail.trim()}.`;
    if (!value.officeClosed) text += " Thank you and Chag Sameach!";
    setPreview(text);
  }
  function insert() {
    const text = preview.replace("[Company Name]", companyName.trim() || "our office").slice(0, 500);
    onChange({ customGreeting: text });
    setBuilderOpen(false);
  }

  return (
    <Card className="space-y-6">
      <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-ink">Office Settings</h2>

      <div className="flex items-center justify-between gap-4 rounded-xl bg-cream p-4 ring-1 ring-inset ring-line">
        <div>
          <p className="text-sm font-semibold text-ink">Office fully closed</p>
          <p className="mt-0.5 text-xs text-muted">Callers will hear a closed-for-holiday message on the selected dates</p>
        </div>
        <Switch checked={value.officeClosed} onChange={(v) => onChange({ officeClosed: v })} label="Office fully closed" />
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-text">Auto Attendant Greeting</span>
          {!value.useStandardGreeting ? (
            <button
              type="button"
              onClick={() => setBuilderOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-soft px-3 py-1.5 text-xs font-semibold text-label ring-1 ring-inset ring-soft-border transition hover:bg-orange hover:text-ink"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M12 3l1.8 4.9L19 9.5l-5.2 1.6L12 16l-1.8-4.9L5 9.5l5.2-1.6L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
              Greeting Builder
            </button>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {[
            [true, "Use standard holiday greeting"],
            [false, "Write custom greeting"],
          ].map(([v, label]) => (
            <label key={String(label)} className="flex cursor-pointer items-center gap-2 text-sm text-text">
              <input
                type="radio"
                name="greeting-type"
                checked={value.useStandardGreeting === v}
                onChange={() => onChange({ useStandardGreeting: v as boolean })}
                className="h-4 w-4 accent-[var(--color-orange)]"
              />
              {label as string}
            </label>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">
          {value.useStandardGreeting
            ? "We'll use our default holiday greeting. Callers will hear a professional message with your office closure info."
            : "Use the text area below or the greeting builder to draft a custom greeting."}
        </p>

        {!value.useStandardGreeting && builderOpen ? (
          <div className="journey-card-in mt-4 rounded-xl border border-soft-border bg-soft/60 p-4 md:p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-bold text-ink">Smart Greeting Builder</span>
              <button type="button" onClick={() => setBuilderOpen(false)} aria-label="Close greeting builder" className="rounded-lg p-1 text-muted hover:text-ink">
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                  <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className={labelCls}>
                  Holiday Name <Req />
                </span>
                <select value={holidayName} onChange={(e) => setHolidayName(e.target.value)} className={inputCls}>
                  <option value="">Select a holiday...</option>
                  {GREETING_HOLIDAYS.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className={labelCls}>
                  Email Address (for voicemail/messages) <Req />
                </span>
                <input type="email" value={vmEmail} onChange={(e) => setVmEmail(e.target.value)} placeholder="e.g. support@company.com" className={inputCls} />
              </label>
              <label className="block">
                <span className={labelCls}>Reopen Date</span>
                <input type="date" value={reopenDate} onChange={(e) => setReopenDate(e.target.value)} className={inputCls} />
              </label>
              <label className="block">
                <span className={labelCls}>Reopen Time</span>
                <select value={reopenTime} onChange={(e) => setReopenTime(e.target.value)} className={inputCls}>
                  {REOPEN_TIMES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4 rounded-xl bg-white p-3.5 ring-1 ring-inset ring-line">
              <div>
                <p className="text-sm font-semibold text-ink">Add an emergency option to your greeting?</p>
                <p className="text-xs text-muted">Gives callers the option to press 1 for urgent assistance</p>
              </div>
              <Switch
                checked={emergencyOption}
                onChange={(v) => {
                  setEmergencyOption(v);
                  if (!v) onChange({ genPhoneNumber: "" });
                }}
                label="Add an emergency option to your greeting"
              />
            </div>
            {emergencyOption ? (
              <label className="mt-4 block">
                <span className={labelCls}>
                  Emergency Contact Number <Req />
                </span>
                <input
                  type="tel"
                  value={value.genPhoneNumber}
                  onChange={(e) => onChange({ genPhoneNumber: e.target.value })}
                  placeholder="(347) 000-0000"
                  className={inputCls}
                />
              </label>
            ) : null}
            <button
              type="button"
              onClick={generate}
              disabled={!holidayName || !vmEmail.trim()}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange px-4 py-3 text-sm font-semibold text-ink transition hover:bg-orange-3 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Generate Greeting
            </button>
            {preview ? (
              <div className="mt-4 rounded-xl bg-white p-4 ring-1 ring-inset ring-line">
                <p className="text-sm leading-relaxed text-text">{preview}</p>
                <div className="mt-3 flex gap-2">
                  <button type="button" onClick={insert} className="rounded-lg bg-ink px-3.5 py-2 text-xs font-semibold text-on-dark transition hover:bg-ink/90">
                    Insert Greeting
                  </button>
                  <button type="button" onClick={generate} className="rounded-lg px-3.5 py-2 text-xs font-semibold text-muted ring-1 ring-inset ring-line transition hover:text-ink">
                    Regenerate
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {!value.useStandardGreeting ? (
          <div className="mt-4">
            <textarea
              id="custom-greeting"
              aria-label="Custom greeting"
              rows={4}
              maxLength={500}
              value={value.customGreeting}
              onChange={(e) => onChange({ customGreeting: e.target.value })}
              placeholder="e.g. Our office will be closed for Sukkot on October 1-2. We will reopen on October 3 at 9 AM. For urgent matters, please press 1 to reach our on-call team."
              className={`${inputCls} resize-y`}
            />
            <p className="mt-1 text-right text-xs text-muted">{value.customGreeting.length}/500</p>
          </div>
        ) : null}

        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">Callers can always leave a voicemail.</p>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Emergency Handling                                                  */
/* ------------------------------------------------------------------ */

export type EmergencyValue = {
  setUpEmergencyRouting: boolean;
  forwardingType: "" | "external" | "internal" | "both";
  phone: string;
  extension: string;
  voicemailDestination: string;
};

const FORWARDING = [
  { value: "external", label: "External Phone Number" },
  { value: "internal", label: "Internal Extension" },
  { value: "both", label: "Both" },
] as const;

export function EmergencyHandling({ value, onChange }: { value: EmergencyValue; onChange: (patch: Partial<EmergencyValue>) => void }) {
  const t = value.forwardingType;
  return (
    <Card>
      <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-ink">Emergency Handling</h2>
      <p className="mt-1 text-sm text-muted">Configure where urgent calls should be routed while the office is closed</p>

      <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl bg-cream p-4 ring-1 ring-inset ring-line">
        <input
          type="checkbox"
          checked={value.setUpEmergencyRouting}
          onChange={(e) => onChange({ setUpEmergencyRouting: e.target.checked })}
          className="mt-0.5 h-4 w-4 accent-[var(--color-orange)]"
        />
        <span>
          <span className="block text-sm font-semibold text-ink">I want to set up emergency call routing</span>
          <span className="mt-0.5 block text-xs text-muted">Already set up? No need to touch this — you&apos;re all set.</span>
        </span>
      </label>

      {value.setUpEmergencyRouting ? (
        <div className="journey-card-in mt-5 space-y-5">
          <div>
            <p className="text-sm font-semibold text-ink">Emergency Call Forwarding</p>
            <p className="mt-0.5 text-xs text-muted">Where should urgent calls be routed while the office is closed?</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {FORWARDING.map((o) => (
                <label
                  key={o.value}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl px-3.5 py-3 text-sm ring-1 ring-inset transition ${
                    t === o.value ? "bg-soft font-semibold text-ink ring-orange" : "bg-white text-text ring-line hover:ring-soft-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="forwarding-type"
                    checked={t === o.value}
                    onChange={() => onChange({ forwardingType: o.value })}
                    className="h-4 w-4 accent-[var(--color-orange)]"
                  />
                  {o.label}
                </label>
              ))}
            </div>
          </div>

          {t ? (
            <div className={`grid gap-4 ${t === "both" ? "sm:grid-cols-2" : ""}`}>
              {t === "external" || t === "both" ? (
                <label className="block">
                  <span className={labelCls}>Phone Number</span>
                  <input type="tel" autoComplete="tel" value={value.phone} onChange={(e) => onChange({ phone: e.target.value })} placeholder="e.g. (347) 555-1234" className={inputCls} />
                </label>
              ) : null}
              {t === "internal" || t === "both" ? (
                <label className="block">
                  <span className={labelCls}>Extension Number</span>
                  <input type="text" autoComplete="off" value={value.extension} onChange={(e) => onChange({ extension: e.target.value })} placeholder="e.g. 205" className={inputCls} />
                </label>
              ) : null}
            </div>
          ) : null}

          <label className="block">
            <span className="block text-sm font-semibold text-ink">Voicemail Destination</span>
            <span className="mb-2 mt-0.5 block text-xs text-muted">Which extension or group voicemail should holiday messages be delivered to?</span>
            <input
              id="voicemail-destination"
              type="text"
              value={value.voicemailDestination}
              onChange={(e) => onChange({ voicemailDestination: e.target.value })}
              placeholder="e.g. Extension 205 or Sales Group Voicemail"
              className={inputCls}
            />
          </label>
        </div>
      ) : null}
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Your Information                                                    */
/* ------------------------------------------------------------------ */

export type ContactValue = { firstName: string; lastName: string; companyName: string; email: string; additionalNotes: string };

export function YourInformation({ value, onChange }: { value: ContactValue; onChange: (patch: Partial<ContactValue>) => void }) {
  const field = (id: keyof ContactValue, label: string, placeholder: string, type: string, autoComplete: string) => (
    <label className="block" htmlFor={`holiday-${id}`}>
      <span className={labelCls}>
        {label} <Req />
      </span>
      <input
        id={`holiday-${id}`}
        type={type}
        autoComplete={autoComplete}
        value={value[id]}
        onChange={(e) => onChange({ [id]: e.target.value })}
        placeholder={placeholder}
        className={inputCls}
        required
      />
    </label>
  );
  return (
    <Card>
      <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-ink">Your Information</h2>
      <p className="mb-5 mt-1 text-sm text-muted">We&apos;ll match your submission to your account using your name, company, and email.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {field("firstName", "First name", "Jane", "text", "given-name")}
        {field("lastName", "Last name", "Smith", "text", "family-name")}
        {field("companyName", "Company name", "Acme Corporation", "text", "organization")}
        {field("email", "Email address", "jane@company.com", "email", "email")}
      </div>
      <label className="mt-4 block" htmlFor="holiday-additional-notes">
        <span className={labelCls}>
          Additional Notes <span className="font-normal text-muted">(optional)</span>
        </span>
        <textarea
          id="holiday-additional-notes"
          rows={3}
          maxLength={500}
          value={value.additionalNotes}
          onChange={(e) => onChange({ additionalNotes: e.target.value })}
          placeholder="Anything else we should know about your holiday setup..."
          className={`${inputCls} resize-y`}
        />
        <span className="mt-1 block text-right text-xs text-muted">{value.additionalNotes.length}/500</span>
      </label>
    </Card>
  );
}
