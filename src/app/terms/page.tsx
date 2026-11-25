import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { COMPANY } from "@/lib/constants";

// DRAFT for the owner's review (not reviewed by counsel). Kept out of search
// results until approved.
export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: `The terms that apply to ${COMPANY.name}'s website and communications services.`,
  path: "/terms",
  noindex: true,
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      path="/terms"
      intro={
        <>
          These Terms of Service cover your use of this website and {COMPANY.name}&apos;s communications services.
          If you have a signed service agreement or service order with {COMPANY.name}, that agreement controls where it
          differs from these terms.
        </>
      }
    >
      <LegalSection title="1. Who we are">
        <p>
          {COMPANY.name} (&ldquo;{COMPANY.name},&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) provides cloud business
          communications, including hosted phone service, unified communications, contact center, messaging and related
          tools, from {COMPANY.fullAddress}.
        </p>
      </LegalSection>

      <LegalSection title="2. Accepting these terms">
        <p>
          By using this website or our services, you agree to these terms on behalf of yourself and the business you
          represent. If you do not agree, do not use the website or services.
        </p>
      </LegalSection>

      <LegalSection title="3. Your service order">
        <p>
          The specific services, quantities, prices, service term, renewal and cancellation terms for your account are set
          out in your service order or agreement with {COMPANY.name}. Please contact us if you need a copy.
        </p>
      </LegalSection>

      <LegalSection title="4. Your account and users">
        <ul>
          <li>You are responsible for the people you give access to, and for keeping logins and passwords secure.</li>
          <li>Tell us promptly if you believe an account or device has been used without permission.</li>
          <li>Keep your account contact details and the registered 911 location for each phone line accurate.</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Acceptable use">
        <p>
          You agree to use the services lawfully and in line with our <Link href="/legal/acceptable-use">Acceptable Use
          Policy</Link>. We may suspend service that is being used in a way that breaks the law, harms others, or
          threatens our network.
        </p>
      </LegalSection>

      <LegalSection title="6. 911 and emergency calling">
        <p>
          Internet-based phone service has important differences from traditional phone service when calling 911.
          Please read our <Link href="/legal/911">911 Notice</Link>.
        </p>
      </LegalSection>

      <LegalSection title="7. Text messages">
        <p>
          If you agree to receive text messages from us, our <Link href="/legal/text-messages">Text Message Terms</Link>{" "}
          apply. Business messaging you send to your own customers through our services must follow applicable law and
          carrier rules.
        </p>
      </LegalSection>

      <LegalSection title="8. Fees and payment">
        <p>
          You agree to pay the charges in your service order, plus applicable taxes, fees and surcharges. Invoices and
          payments are available in the{" "}
          <a href="https://lionswitch.billcenter.net/" target="_blank" rel="noopener noreferrer">
            Billing Portal
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="9. Equipment">
        <p>
          Phones and other equipment are provided as described in your service order. Ownership, warranty and return
          terms for equipment are set out there.
        </p>
      </LegalSection>

      <LegalSection title="10. Service levels and availability">
        <p>
          We work to keep the services available and to fix problems quickly. Any service-level commitments for your
          account are described in our <Link href="/legal/sla">Service Level Agreement</Link> and your service order.
          The services depend on your internet connection, power and equipment, which are outside our control.
        </p>
      </LegalSection>

      <LegalSection title="11. Privacy">
        <p>
          Our <Link href="/privacy-policy">Privacy Policy</Link> explains what information this website collects and how
          it is used.
        </p>
      </LegalSection>

      <LegalSection title="12. Website content">
        <p>
          The content on this website is provided for general information. Product names and features may change. Any
          screenshots or demos marked as sample data are illustrations and do not show real customer information.
        </p>
      </LegalSection>

      <LegalSection title="13. Disclaimers">
        <p>
          Except as stated in your service order, the website and services are provided &ldquo;as is&rdquo; and
          &ldquo;as available,&rdquo; and we disclaim implied warranties to the extent the law allows.
        </p>
      </LegalSection>

      <LegalSection title="14. Limitation of liability">
        <p>
          To the extent the law allows, {COMPANY.name} is not liable for indirect, incidental, special or consequential
          damages, or for lost profits or data, arising from the website or services. Any other limits on liability are
          set out in your service order.
        </p>
      </LegalSection>

      <LegalSection title="15. Changes to these terms">
        <p>
          We may update these terms from time to time. The updated version will be posted on this page. Continuing to use
          the website or services after an update means you accept the updated terms.
        </p>
      </LegalSection>

      <LegalSection title="16. Governing law">
        <p>These terms are governed by the laws of the State of New York, without regard to conflict-of-law rules.</p>
      </LegalSection>

      <LegalSection title="17. Contact us">
        <p>
          {COMPANY.name}, {COMPANY.fullAddress}. Phone <a href={COMPANY.phoneHref}>{COMPANY.phoneDisplay}</a>, email{" "}
          <a href={COMPANY.emailHref}>{COMPANY.email}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
