import { ReactNode } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/constants";

// Shared layout for the legal pages (Terms, Text Message Terms, 911 Notice,
// SLA, Acceptable Use). These are drafts for the owner's review and are kept
// out of search results (noindex) until approved.

export function LegalPage({
  title,
  path,
  intro,
  children,
}: {
  title: string;
  path: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: title, url: `${SITE_URL}${path}` },
        ])}
      />
      <Section className="pb-0">
        <SectionHeading as="h1" eyebrow="Legal" title={title} />
      </Section>
      <Section>
        <div className="mx-auto max-w-3xl">
          {intro ? <div className="mb-8 rounded-2xl border border-soft-border bg-soft p-4 text-sm text-text">{intro}</div> : null}
          {children}
        </div>
      </Section>
    </>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-b border-line py-8 first:pt-0 last:border-none">
      <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-ink">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-muted [&_a]:text-label [&_a]:underline [&_li]:ml-5 [&_li]:list-disc">
        {children}
      </div>
    </div>
  );
}
