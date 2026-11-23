import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FeatureCategoryTiles, FeatureExplorer } from "@/components/features/FeatureExplorer";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Features — Cloud PBX, UCaaS, Contact Center & AI",
  description:
    "Every Lion Switch feature: Cloud PBX, the ConnectUC app, unified communications, messaging & fax, video, call/contact center, AI-powered features, integrations and devices.",
  path: "/features",
});

export default function FeaturesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Features", url: `${SITE_URL}/features` },
        ])}
      />

      <section className="relative overflow-hidden bg-ink text-on-dark">
        <div aria-hidden="true" className="ambient-glow tech-grid pointer-events-none absolute inset-0" />
        <Container className="relative py-16 text-center sm:py-20">
          <p className="hero-in text-xs font-bold uppercase tracking-[0.2em] text-orange-3">Features</p>
          <h1
            className="hero-in mx-auto mt-3 max-w-3xl font-[family-name:var(--font-heading)] text-4xl font-bold sm:text-5xl"
            style={{ animationDelay: "60ms" }}
          >
            Everything your business needs to communicate
          </h1>
          <p
            className="hero-in mx-auto mt-5 max-w-2xl text-lg text-on-dark-2"
            style={{ animationDelay: "100ms" }}
          >
            From Cloud PBX to AI-powered call analytics. Pick a category to explore what&apos;s included.
          </p>
          <FeatureCategoryTiles />
        </Container>
      </section>

      <Section className="!overflow-visible !pt-12 sm:!pt-16">
        <FeatureExplorer />
      </Section>

      <Section className="!pt-0">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink p-10 text-center text-on-dark">
            <div aria-hidden="true" className="ambient-glow tech-grid absolute inset-0" />
            <div className="relative">
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold">
                Live Dashboard
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-on-dark-2">
                A live, easy-to-use dashboard for every call — queues, agents,
                reporting and more.
              </p>
              <Link
                href="/live-dashboard"
                className="mt-6 inline-flex rounded-full bg-orange px-6 py-3 text-sm font-semibold font-[family-name:var(--font-heading)] text-ink transition-[background-color,box-shadow,transform] hover:-translate-y-0.5 hover:bg-orange-3 hover:shadow-[0_8px_28px_-6px_rgba(245,138,11,0.65)]"
              >
                See the Live Dashboard
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
