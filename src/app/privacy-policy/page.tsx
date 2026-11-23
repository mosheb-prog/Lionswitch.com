import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { COMPANY, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `${COMPANY.name}'s privacy policy: what information this website collects, how it's used, and your choices.`,
  path: "/privacy-policy",
});

// Baked in at build time, per the rebuild brief ("Last updated" = build date).
const LAST_UPDATED = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-line py-8 first:pt-0 last:border-none">
      <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-ink">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-muted leading-relaxed">{children}</div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Privacy Policy", url: `${SITE_URL}/privacy-policy` },
        ])}
      />

      <Section className="pb-0">
        <SectionHeading
          eyebrow="Legal"
          title="Privacy Policy"
          description={`Last updated: ${LAST_UPDATED}`}
        />
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          {/*
            TODO(owner): this entire policy is a structural rebuild based on
            the old site's sections and the rebuild brief. It has NOT been
            reviewed by counsel. Have legal review before publishing.
          */}
          <p className="mb-8 rounded-2xl border border-soft-border bg-soft p-4 text-sm text-text">
            <strong>Note:</strong> this policy covers information collected by
            this website only. It does not cover information collected
            through the Lion Switch phone service, the ConnectUC app, or any
            customer portal, which are governed by separate agreements.
          </p>

          <PolicySection title="SMS / Text Messaging Notice">
            <p>
              If you provide your phone number and opt in to receive text
              messages from {COMPANY.name}, your phone number and text
              opt-in data and consent are never shared with third parties or
              affiliates for marketing purposes.
            </p>
          </PolicySection>

          <PolicySection title="Information Collection, Use, and Sharing">
            <p>
              We collect personal information from you only when you
              voluntarily provide it to us, for example by filling out a
              contact form, requesting a demo, or submitting holiday
              preferences. We do not sell or rent this information to
              anyone.
            </p>
          </PolicySection>

          <PolicySection title="Cookies">
            <p>
              This site uses cookies to improve your experience, analyze
              site traffic, and serve relevant content. You can accept or
              decline non-essential cookies via the cookie banner shown on
              your first visit. Declining stops non-essential cookies and
              analytics from running.
            </p>
          </PolicySection>

          <PolicySection title="Analytics">
            <p>
              If you accept cookies, we may use analytics tools to
              understand how visitors use this website (e.g. which pages
              are viewed). Analytics only loads after you accept the cookie
              banner.
            </p>
          </PolicySection>

          <PolicySection title="Voice Demo Recording">
            <p>
              The &ldquo;Talk to Lion Switch&rdquo; voice demo on our homepage and
              MCP page records audio only when you choose to use it, and
              only for the duration of that demo. The recording is used
              solely to generate a transcript and an AI-assisted summary
              for your own demo session. Calls are transcribed only after
              you finish speaking — never live.
            </p>
          </PolicySection>

          <PolicySection title="Your Access to and Control Over Information">
            <p>You may at any time:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>See what data we have about you, if any</li>
              <li>Have us correct any inaccurate data</li>
              <li>Have us delete any data we have about you</li>
              <li>Opt out of future communications from us</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at{" "}
              <a href={COMPANY.emailHref} className="text-label underline">
                {COMPANY.email}
              </a>
              .
            </p>
          </PolicySection>

          <PolicySection title="Security">
            <p>
              We take reasonable precautions to protect your information.
              However, no method of transmission over the Internet, or
              method of electronic storage, is 100% secure.
            </p>
          </PolicySection>

          <PolicySection title="Updates">
            <p>
              We may update this policy from time to time. The &ldquo;Last
              updated&rdquo; date at the top of this page reflects the most
              recent changes.
            </p>
          </PolicySection>

          <PolicySection title="Questions">
            <p>
              If you have any questions about this privacy policy, please
              contact us at{" "}
              <a href={COMPANY.emailHref} className="text-label underline">
                {COMPANY.email}
              </a>{" "}
              or{" "}
              <a href={COMPANY.phoneHref} className="text-label underline">
                {COMPANY.phoneDisplay}
              </a>
              .
            </p>
          </PolicySection>
        </div>
      </Section>
    </>
  );
}
