import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Faq } from "@/components/ui/Faq";

// Shared layout for service and industry pages: who it's for, benefits,
// features, FAQ and related pages.

export type DetailContent = {
  eyebrow: string;
  title: string;
  description: string;
  whoFor: string[];
  benefits: { title: string; body: string }[];
  features: string[];
  faq: { question: string; answer: string }[];
  related: { label: string; href: string; body: string }[];
};

function Check() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 h-5 w-5 shrink-0 text-orange" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.15" />
      <path d="m6 10.5 2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DetailPage({ content }: { content: DetailContent }) {
  const c = content;
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-on-dark">
        <div aria-hidden="true" className="ambient-glow tech-grid pointer-events-none absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="hero-in text-xs font-bold uppercase tracking-[0.2em] text-orange-3">{c.eyebrow}</p>
            <h1 className="hero-in mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight sm:text-5xl" style={{ animationDelay: "60ms" }}>
              {c.title}
            </h1>
            <p className="hero-in mt-5 text-lg text-on-dark-2" style={{ animationDelay: "120ms" }}>
              {c.description}
            </p>
            <div className="hero-in mt-8 flex flex-wrap justify-center gap-3" style={{ animationDelay: "180ms" }}>
              <Button href="/contact#demo" variant="primary">
                Schedule a Free Demo
              </Button>
              <Button href="/bill-review" variant="ghostOnDark">
                Get a Free Bill Review
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <Reveal>
          <SectionHeading eyebrow="Who it's for" title="Built for teams like yours" />
        </Reveal>
        <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
          {c.whoFor.map((w) => (
            <li key={w} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm">
              {w}
            </li>
          ))}
        </ul>
      </Section>

      <Section className="bg-soft">
        <Reveal>
          <SectionHeading eyebrow="Benefits" title="What changes for you" />
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
          {c.benefits.map((b, i) => (
            <Reveal key={b.title} delayMs={i * 80}>
              <div className="hover-lift h-full rounded-2xl border border-line bg-white p-6">
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-ink">{b.title}</h3>
                <p className="mt-2 text-sm text-muted">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeading eyebrow="Features" title="What's included" />
        </Reveal>
        <Reveal delayMs={60}>
          <ul className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {c.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-text">
                <Check />
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section className="bg-soft">
        <Reveal>
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
        </Reveal>
        <Reveal delayMs={60} className="mt-10">
          <Faq items={c.faq} />
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <SectionHeading eyebrow="Related" title="Keep exploring" />
        </Reveal>
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.related.map((r, i) => (
            <Reveal key={r.href} delayMs={i * 60}>
              <Link href={r.href} className="hover-lift group flex h-full flex-col rounded-2xl border border-line bg-white p-5">
                <span className="font-[family-name:var(--font-heading)] text-base font-bold text-ink">{r.label}</span>
                <span className="mt-1 flex-1 text-sm text-muted">{r.body}</span>
                <span className="mt-3 text-sm font-semibold text-label">
                  Learn more <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
