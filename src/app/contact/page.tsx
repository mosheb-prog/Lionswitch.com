import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { CalendlyEmbed } from "@/components/contact/CalendlyEmbed";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { COMPANY, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Schedule a free demo, ask a pricing question, or get a review of your current setup. We respond within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Contact", url: `${SITE_URL}/contact` },
        ])}
      />

      <Section className="pb-0">
        <SectionHeading
          eyebrow="Contact"
          title="We'd love to hear from you"
          description="Demos, pricing questions, or a review of your current setup — we respond within one business day. Emergency support is available for active customers."
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-ink">
              Send us a message
            </h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-ink">
                Get in touch
              </h2>
              <dl className="mt-4 space-y-3 text-muted">
                <div>
                  <dt className="font-semibold text-ink">Phone</dt>
                  <dd>
                    <a href={COMPANY.phoneHref} className="hover:text-label">
                      {COMPANY.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Email</dt>
                  <dd>
                    <a href={COMPANY.emailHref} className="hover:text-label">
                      {COMPANY.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Address</dt>
                  <dd>{COMPANY.fullAddress}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Hours</dt>
                  <dd>
                    <ul>
                      {COMPANY.hours.map((h) => (
                        <li key={h.days}>
                          {h.days}: {h.time}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>

            <MapEmbed />
          </div>
        </div>
      </Section>

      <Section className="bg-soft">
        <SectionHeading
          eyebrow="Schedule a Demo"
          title="Pick a time that works for you"
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <CalendlyEmbed />
        </div>
      </Section>
    </>
  );
}
