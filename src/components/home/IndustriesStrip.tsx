import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { INDUSTRIES } from "@/lib/industries";

export function IndustriesStrip() {
  return (
    <Section>
      <Reveal>
        <SectionHeading eyebrow="Industries" title="Built for your industry" description="The same carrier-class platform, set up for how your business uses the phone." />
      </Reveal>
      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-5">
        {INDUSTRIES.map((i, n) => (
          <Reveal key={i.slug} delayMs={n * 60}>
            <Link href={`/industries/${i.slug}`} className="hover-lift group flex h-full flex-col rounded-2xl border border-line bg-white p-5">
              <span className="font-[family-name:var(--font-heading)] text-base font-bold text-ink">{i.name}</span>
              <span className="mt-3 text-sm font-semibold text-label">
                Explore <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
