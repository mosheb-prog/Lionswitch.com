import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/constants";
import { INDUSTRIES } from "@/lib/industries";

export const metadata: Metadata = pageMetadata({
  title: "Industries",
  description: "Lion Switch business phone systems for medical and dental practices, skilled nursing and long-term care, law firms and real estate.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: SITE_URL }, { name: "Industries", url: `${SITE_URL}/industries` }])} />
      <Section className="pb-0">
        <SectionHeading as="h1" eyebrow="Industries" title="Phone systems built around how you work" description="The same carrier-class platform, set up for the way your industry uses the phone." />
      </Section>
      <Section>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((i, n) => (
            <Reveal key={i.slug} delayMs={(n % 3) * 70}>
              <Link href={`/industries/${i.slug}`} className="hover-lift group flex h-full flex-col rounded-2xl border border-line bg-white p-6">
                <span className="font-[family-name:var(--font-heading)] text-lg font-bold text-ink">{i.name}</span>
                <span className="mt-2 flex-1 text-sm text-muted">{i.card}</span>
                <span className="mt-4 text-sm font-semibold text-label">
                  See how it works <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
