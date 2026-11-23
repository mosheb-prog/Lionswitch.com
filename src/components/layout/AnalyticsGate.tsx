"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { getConsentServerSnapshot, getStoredConsent, subscribeConsent } from "@/lib/consent";

// Loads analytics only after the visitor accepts the cookie banner, and only
// if a measurement ID is configured. Defaults to GA4 (gtag.js) since no
// specific analytics provider was specified — swap this component's body for
// another provider if needed; the consent gating logic can stay as-is.
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function AnalyticsGate() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getStoredConsent,
    getConsentServerSnapshot,
  );

  if (!GA_ID || consent !== "accepted") return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
