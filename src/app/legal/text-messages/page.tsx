import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { COMPANY } from "@/lib/constants";

// DRAFT for the owner's review. Message frequency is intentionally not stated
// until the owner confirms it (carriers expect it before launch).
export const metadata: Metadata = pageMetadata({
  title: "Text Message Terms",
  description: `How ${COMPANY.name} text messages work, and how to get help or stop them.`,
  path: "/legal/text-messages",
  noindex: true,
});

export default function TextMessageTermsPage() {
  return (
    <LegalPage title="Text Message Terms" path="/legal/text-messages">
      <LegalSection title="What you're signing up for">
        <p>
          When you check the text message box on our contact form, you agree to receive text messages from {COMPANY.name}{" "}
          about your inquiry, such as scheduling a demo or following up on your request.
        </p>
      </LegalSection>

      <LegalSection title="Consent is optional">
        <p>Agreeing to receive text messages is not a condition of buying any product or service.</p>
      </LegalSection>

      <LegalSection title="Costs">
        <p>Message and data rates may apply, depending on your mobile plan.</p>
      </LegalSection>

      <LegalSection title="Help and opting out">
        <ul>
          <li>
            Reply <strong>HELP</strong> to any message for help, or call us at{" "}
            <a href={COMPANY.phoneHref}>{COMPANY.phoneDisplay}</a>.
          </li>
          <li>
            Reply <strong>STOP</strong> at any time to stop receiving messages. We will send one message confirming you
            have been unsubscribed.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Carriers">
        <p>Mobile carriers are not responsible for delayed or undelivered messages.</p>
      </LegalSection>

      <LegalSection title="Your information">
        <p>
          We use your phone number only to contact you about your inquiry. We do not sell or share your mobile number or
          text message consent with third parties for their marketing. See our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link> and <Link href="/terms">Terms of Service</Link>.
        </p>
      </LegalSection>

      <LegalSection title="Contact us">
        <p>
          {COMPANY.name}, {COMPANY.fullAddress}. Phone <a href={COMPANY.phoneHref}>{COMPANY.phoneDisplay}</a>, email{" "}
          <a href={COMPANY.emailHref}>{COMPANY.email}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
