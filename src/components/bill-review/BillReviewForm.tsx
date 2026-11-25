"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ScheduleUpload } from "@/components/holiday-preferences/FormSections";
import { MAX_SCHEDULE_BYTES, MAX_SCHEDULE_FILES, SCHEDULE_ACCEPT } from "@/lib/schedule-files";

const PHONE_COUNTS = ["1–5", "6–10", "11–25", "26–50", "51–100", "More than 100", "Not sure yet"];
const input = "w-full rounded-xl border border-soft-border bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted";
const label = "mb-1.5 block text-sm font-semibold text-ink";

function readFile(f: File) {
  return new Promise<{ name: string; data: string }>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve({ name: f.name, data: String(r.result) });
    r.onerror = () => reject(r.error);
    r.readAsDataURL(f);
  });
}

export function BillReviewForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const missing = ["firstName", "lastName", "email", "company"].filter((k) => !String(data[k] || "").trim());
    if (missing.length) {
      setStatus("error");
      setError("Please fill in your name, business email and company.");
      return;
    }
    setStatus("loading");
    try {
      const encoded = await Promise.all(files.map(readFile));
      const res = await fetch("/api/bill-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, files: encoded, company_website: honeypot }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) throw new Error(body?.error ?? "Something went wrong. Please try again.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="surface rounded-2xl border bg-white p-8 text-center">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-ink">Thanks, we&apos;ve got it.</h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          A member of the Lion Switch team will review what you sent and get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <ScheduleUpload
        files={files}
        onChange={setFiles}
        accept={SCHEDULE_ACCEPT}
        maxFiles={MAX_SCHEDULE_FILES}
        maxBytes={MAX_SCHEDULE_BYTES}
        title="Upload your current phone bill"
        description="A recent bill from your current provider (PDF or a photo of the pages) is all we need. You can also send it later by email."
        dropLabel="Drop your bill here or"
        inputId="bill-upload"
      />

      <div className="surface space-y-5 rounded-2xl border bg-white p-6 md:p-7">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="br-first" className={label}>First Name*</label>
            <input id="br-first" name="firstName" required autoComplete="given-name" className={input} />
          </div>
          <div>
            <label htmlFor="br-last" className={label}>Last Name*</label>
            <input id="br-last" name="lastName" required autoComplete="family-name" className={input} />
          </div>
          <div>
            <label htmlFor="br-email" className={label}>Business Email*</label>
            <input id="br-email" name="email" type="email" required autoComplete="email" className={input} />
          </div>
          <div>
            <label htmlFor="br-phone" className={label}>Phone <span className="font-normal text-muted">(optional)</span></label>
            <input id="br-phone" name="phone" type="tel" autoComplete="tel" className={input} />
          </div>
          <div>
            <label htmlFor="br-company" className={label}>Company Name*</label>
            <input id="br-company" name="company" required autoComplete="organization" className={input} />
          </div>
          <div>
            <label htmlFor="br-provider" className={label}>Current Provider <span className="font-normal text-muted">(optional)</span></label>
            <input id="br-provider" name="currentProvider" maxLength={120} className={input} />
          </div>
          <div>
            <label htmlFor="br-count" className={label}>Number of Phones <span className="font-normal text-muted">(optional)</span></label>
            <select id="br-count" name="phoneCount" defaultValue="" className={input}>
              <option value="">Select…</option>
              {PHONE_COUNTS.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="br-notes" className={label}>Anything we should know? <span className="font-normal text-muted">(optional)</span></label>
          <textarea id="br-notes" name="notes" rows={3} maxLength={1000} className={input} />
        </div>
        <input type="text" name="company_website_hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" />
        {status === "error" ? <p role="alert" className="text-sm text-red-700">{error}</p> : null}
        <p className="text-xs text-muted">
          We use what you send only to prepare your review. See our <Link href="/privacy-policy" className="text-label underline">Privacy Policy</Link>.
        </p>
        <button type="submit" disabled={status === "loading"} className="w-full rounded-full bg-orange px-6 py-3 font-[family-name:var(--font-heading)] text-sm font-semibold text-ink transition hover:bg-orange-3 disabled:opacity-60 sm:w-auto">
          {status === "loading" ? "Sending…" : "Request My Free Bill Review"}
        </button>
      </div>
    </form>
  );
}
