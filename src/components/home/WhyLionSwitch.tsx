import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const POINTS = [
  {
    title: "Family-run, not a call center",
    body: "Lion Switch is family-run out of Brooklyn. You get a dedicated account team, not a ticket queue.",
  },
  {
    title: "99.999% uptime SLA",
    body: "Backed by dedicated account teams and onboarding included — carrier-class reliability without the carrier-class runaround.",
  },
  {
    title: "Carrier-class infrastructure",
    body: "The same enterprise-grade network used by Fortune 500 companies, sized and priced for businesses of any size.",
  },
  {
    title: "White-glove onboarding",
    body: "A dedicated implementation specialist handles migration, training and go-live — so your team is never figuring it out alone.",
  },
  {
    title: "Local presence, global reach",
    body: "Rooted in Brooklyn, serving businesses in all 50 states and internationally.",
  },
];

export function WhyLionSwitch() {
  return (
    <Section className="bg-soft">
      <Reveal>
        <SectionHeading
          eyebrow="Why Lion Switch"
          title="Because your business deserves better than a call center"
          description="White-glove service from a family-run Brooklyn team."
        />
      </Reveal>
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {POINTS.map((point, i) => (
          <Reveal key={point.title} delayMs={(i % 3) * 80}>
            <div className="relative rounded-2xl border border-transparent p-1 transition-colors hover:border-orange/20">
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-ink">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{point.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-12 text-center">
        <Button href="/why-lion-switch" variant="ghost">
          Read our story
        </Button>
      </Reveal>
    </Section>
  );
}
