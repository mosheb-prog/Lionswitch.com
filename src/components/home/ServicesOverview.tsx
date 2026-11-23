import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICES } from "@/lib/constants";

export function ServicesOverview() {
  return (
    <Section>
      <Reveal>
        <SectionHeading
          eyebrow="Services"
          title="One platform, six ways to run your business better"
          description="Consolidate voice, messaging, video and analytics vendors into one bill, one dashboard, and one team that actually picks up the phone."
        />
      </Reveal>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, i) => (
          <Reveal key={service.slug} delayMs={(i % 3) * 80}>
            <Link
              href={`/services/${service.slug}`}
              className="hover-lift group block h-full rounded-3xl border border-line bg-white p-6"
            >
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-ink group-hover:text-label">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{service.shortDescription}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-label">
                Learn more
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
