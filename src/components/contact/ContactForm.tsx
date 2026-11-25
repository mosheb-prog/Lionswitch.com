"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const INTERESTS = [
  "Voice / Business Phone",
  "Messaging (SMS/MMS)",
  "Video & Meetings",
  "Contact Center",
  "AI & Analytics",
  "Integrations",
  "Devices",
  "Full Platform Demo",
  "Other / Not Sure Yet",
];

const PHONE_COUNTS = ["1–5", "6–10", "11–25", "26–50", "51–100", "More than 100", "Not sure yet"];

const MESSAGE_LIMIT = 500;

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [message, setMessage] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, smsConsent, company_website: honeypot }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
      setMessage("");
      setSmsConsent(false);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-soft-border bg-soft p-6 text-center"
      >
        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-ink">
          Thanks — we got it.
        </h3>
        <p className="mt-2 text-muted">
          We respond within one business day. If it&apos;s urgent, please call
          us.
        </p>
      </div>
    );
  }

  const inputClasses =
    "w-full rounded-xl border border-soft-border bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-orange focus:outline-none";
  const labelClasses = "mb-1.5 block text-sm font-semibold text-ink";

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClasses}>
            First Name*
          </label>
          <input id="firstName" name="firstName" required className={inputClasses} />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClasses}>
            Last Name*
          </label>
          <input id="lastName" name="lastName" required className={inputClasses} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClasses}>
            Business Email*
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" className={inputClasses} />
        </div>
      </div>

      <div>
        <label htmlFor="company" className={labelClasses}>
          Company Name*
        </label>
        <input id="company" name="company" required className={inputClasses} />
      </div>

      <div>
        <label htmlFor="interest" className={labelClasses}>
          I&apos;m Interested In
        </label>
        <select id="interest" name="interest" className={inputClasses} defaultValue={INTERESTS[0]}>
          {INTERESTS.map((interest) => (
            <option key={interest} value={interest}>
              {interest}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phoneCount" className={labelClasses}>
            Number of Phones <span className="font-normal text-muted">(optional)</span>
          </label>
          <select id="phoneCount" name="phoneCount" className={inputClasses} defaultValue="">
            <option value="">Select…</option>
            {PHONE_COUNTS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="currentProvider" className={labelClasses}>
            Current Provider <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="currentProvider"
            name="currentProvider"
            maxLength={120}
            placeholder="e.g. Verizon, Spectrum, RingCentral"
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="message" className={labelClasses}>
            How Can We Help?*
          </label>
          <span className="text-xs text-muted">
            {message.length}/{MESSAGE_LIMIT}
          </span>
        </div>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          maxLength={MESSAGE_LIMIT}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputClasses}
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-muted">
        <input
          type="checkbox"
          name="smsConsent"
          checked={smsConsent}
          onChange={(e) => setSmsConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-soft-border text-orange focus:ring-orange"
        />
        <span>
          I agree to receive text messages from Lion Switch about my inquiry.
          Message and data rates may apply. Reply HELP for help. Reply STOP to
          opt out at any time. Consent is not a condition of purchase. See our{" "}
          <Link href="/privacy-policy" className="text-label underline">
            Privacy Policy
          </Link>
          ,{" "}
          <Link href="/terms" className="text-label underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/legal/text-messages" className="text-label underline">
            Text Message Terms
          </Link>
          .
        </span>
      </label>

      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        name="company_website"
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
        disabled={status === "loading"}
        className="w-full rounded-full bg-orange px-6 py-3 text-sm font-semibold font-[family-name:var(--font-heading)] text-ink hover:bg-orange-3 disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
