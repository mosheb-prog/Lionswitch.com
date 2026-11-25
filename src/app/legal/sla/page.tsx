import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { COMPANY } from "@/lib/constants";

// DRAFT for the owner's review. Uptime percentage, service-credit amounts and
// response times are deliberately not stated here until the owner confirms them.
export const metadata: Metadata = pageMetadata({
  title: "Service Level Agreement",
  description: `How ${COMPANY.name} measures service availability and handles outages.`,
  path: "/legal/sla",
  noindex: true,
});

export default function SlaPage() {
  return (
    <LegalPage
      title="Service Level Agreement"
      path="/legal/sla"
      intro={
        <>
          This Service Level Agreement explains how {COMPANY.name} measures the availability of its hosted phone service
          and what happens if we fall short. The uptime commitment and any service credits for your account are listed in
          your service order.
        </>
      }
    >
      <LegalSection title="What's covered">
        <p>
          This agreement covers the availability of {COMPANY.name}&apos;s hosted phone platform: the ability to make and
          receive calls on your lines through our network.
        </p>
      </LegalSection>

      <LegalSection title="How availability is measured">
        <p>
          Availability is measured each calendar month as the percentage of time the platform was available to place and
          receive calls, not counting the exclusions below.
        </p>
      </LegalSection>

      <LegalSection title="What's not counted">
        <ul>
          <li>Scheduled maintenance that we announce in advance.</li>
          <li>Problems with your internet connection, local network, power, or equipment.</li>
          <li>Problems caused by other carriers or third parties outside our control.</li>
          <li>Events beyond our reasonable control, such as natural disasters or widespread internet outages.</li>
          <li>Use of the service that breaks our <Link href="/terms">Terms of Service</Link> or{" "}
            <Link href="/legal/acceptable-use">Acceptable Use Policy</Link>.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Reporting a problem">
        <p>
          Report outages or call-quality problems by calling <a href={COMPANY.phoneHref}>{COMPANY.phoneDisplay}</a> or
          emailing <a href={COMPANY.emailHref}>{COMPANY.email}</a>. Please include the affected numbers or extensions and
          when the problem started.
        </p>
      </LegalSection>

      <LegalSection title="Service credits">
        <p>
          If availability in a month falls below the commitment in your service order, you may request a service credit
          as described there. Requests should be made in writing within the time your service order allows. Service
          credits are your sole remedy for missed availability commitments.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
