import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { COMPANY, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Why Lion Switch",
  description:
    "Family-run in Brooklyn, built on carrier-class infrastructure, with white-glove onboarding and flexible terms — the story behind Lion Switch.",
  path: "/why-lion-switch",
});

const POINTS = [
  {
    title: "Family-run, not a call center",
    body: "Lion Switch is family-run out of Brooklyn. You get a dedicated account team, not a ticket queue — because your business deserves better than a call center.",
  },
  {
    title: "99.999% uptime SLA",
    body: "Backed by dedicated account teams and onboarding included.",
  },
  {
    title: "Carrier-class infrastructure",
    body: "The same enterprise-grade network used by Fortune 500 companies.",
  },
  {
    title: "White-glove onboarding",
    body: "A dedicated implementation specialist handles migration, training and go-live.",
  },
  {
    title: "Local presence, global reach",
    body: "Rooted in Brooklyn, serving businesses in all 50 states and internationally.",
  },
];

export default function WhyLionSwitchPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Why Lion Switch", url: `${SITE_URL}/why-lion-switch` },
        ])}
      />

      <Section dark glow>
        <SectionHeading
          as="h1"
          dark
          eyebrow="Our Story"
          title="Why Lion Switch"
          description="White-glove service from a family-run Brooklyn team — because your business deserves better than a call center."
        />
      </Section>

      <Section className="max-w-3xl">
        <Reveal className="mx-auto max-w-3xl space-y-5 text-lg leading-relaxed text-text">
          <p>
            {COMPANY.name} started the way a lot of good businesses start: with
            frustration. A family-run Brooklyn company, tired of the
            impersonal, ticket-number treatment that comes with the big
            national carriers, decided to build the kind of phone company
            they wished they could call.
          </p>
          <p>
            Today, {COMPANY.name} serves businesses in all 50 states and
            internationally, but the approach hasn&apos;t changed: real people,
            a dedicated account team, and white-glove service with flexible
            terms and transparent pricing — not sales scripts and long hold
            times.
          </p>
        </Reveal>
      </Section>

      <Section className="bg-soft">
        <Reveal>
          <SectionHeading eyebrow="Why Choose Lion Switch" title="What makes us different" />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {POINTS.map((point, i) => (
            <Reveal key={point.title} delayMs={(i % 3) * 80}>
              <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-ink">
                {point.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{point.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section dark glow className="text-center">
        <Reveal>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold">
            See the difference for yourself
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact#demo" variant="primary">
              Schedule a Free Demo
            </Button>
            <Button href={COMPANY.phoneHref} variant="ghostOnDark">
              {COMPANY.phoneDisplay}
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
