import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { COMPANY } from "@/lib/constants";

// DRAFT for the owner's review.
export const metadata: Metadata = pageMetadata({
  title: "Acceptable Use Policy",
  description: `The rules for using ${COMPANY.name}'s phone, messaging and communications services.`,
  path: "/legal/acceptable-use",
  noindex: true,
});

export default function AcceptableUsePage() {
  return (
    <LegalPage
      title="Acceptable Use Policy"
      path="/legal/acceptable-use"
      intro={
        <>
          This policy protects our customers, our network, and the people you call and text. It is part of our{" "}
          <Link href="/terms">Terms of Service</Link>.
        </>
      }
    >
      <LegalSection title="You may not use the services to">
        <ul>
          <li>break any law, including telemarketing, robocall, text messaging and privacy laws;</li>
          <li>make calls or send texts without the consent the law requires, or ignore opt-out requests;</li>
          <li>send spam, phishing, or misleading messages;</li>
          <li>display a caller ID number you are not authorized to use, or hide your identity to deceive anyone;</li>
          <li>harass, threaten, or abuse anyone;</li>
          <li>commit fraud, including toll fraud or artificially inflating call traffic;</li>
          <li>interfere with, overload, or try to gain unauthorized access to our network or other customers&apos; accounts;</li>
          <li>resell the services without our written permission.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Business text messaging">
        <p>
          If you text your own customers through our services, you are responsible for getting their consent, honoring
          STOP and HELP replies, and following carrier registration rules for your messaging.
        </p>
      </LegalSection>

      <LegalSection title="Keeping accounts secure">
        <p>
          Protect your passwords and voicemail PINs, and tell us right away if you suspect unauthorized use. You are
          responsible for charges from activity on your account.
        </p>
      </LegalSection>

      <LegalSection title="What we may do">
        <p>
          If we believe the services are being used in violation of this policy, we may investigate, block calls or
          messages, suspend affected lines, or end service. Where we can, we will contact you first. We may also
          cooperate with law enforcement and carriers.
        </p>
      </LegalSection>

      <LegalSection title="Reporting abuse">
        <p>
          Report abuse to <a href={COMPANY.emailHref}>{COMPANY.email}</a> or call{" "}
          <a href={COMPANY.phoneHref}>{COMPANY.phoneDisplay}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
