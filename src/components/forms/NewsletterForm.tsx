"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company_website: honeypot }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="text-sm text-on-dark-2">
        You&apos;re on the list — thanks for signing up.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row" noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-on-dark placeholder:text-on-dark-2/70 focus:border-orange focus:outline-none"
      />
      {/* Honeypot — hidden from real users, visible to bots */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-orange px-5 py-2.5 text-sm font-semibold font-[family-name:var(--font-heading)] text-ink hover:bg-orange-3 disabled:opacity-60"
      >
        {status === "loading" ? "Signing up…" : "Sign Up"}
      </button>
      {status === "error" ? (
        <p role="alert" className="text-sm text-orange-3 sm:ml-2">
          Something went wrong. Please try again.
        </p>
      ) : null}
    </form>
  );
}
