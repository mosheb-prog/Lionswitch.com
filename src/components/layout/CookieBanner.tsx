"use client";

import { useSyncExternalStore } from "react";
import {
  getConsentServerSnapshot,
  getStoredConsent,
  setStoredConsent,
  subscribeConsent,
} from "@/lib/consent";

export function CookieBanner() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getStoredConsent,
    getConsentServerSnapshot,
  );

  if (consent !== null) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-line bg-white/95 backdrop-blur-md shadow-[0_-8px_30px_rgba(19,24,32,0.08)]"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm text-text">
          We use cookies to improve your experience, analyze site traffic, and
          serve relevant content.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => setStoredConsent("declined")}
            className="rounded-full px-4 py-2 text-sm font-semibold font-[family-name:var(--font-heading)] text-ink ring-1 ring-inset ring-soft-border hover:ring-orange"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => setStoredConsent("accepted")}
            className="rounded-full bg-orange px-4 py-2 text-sm font-semibold font-[family-name:var(--font-heading)] text-ink hover:bg-orange-3"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
