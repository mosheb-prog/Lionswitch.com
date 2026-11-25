import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BillReviewForm } from "@/components/bill-review/BillReviewForm";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Free Phone Bill Review",
  description: "Send Lion Switch your current phone bill and we'll review what you're paying for and how Lion Switch could serve your business.",
  path: "/bill-review",
});

const STEPS = [
  ["Upload your bill", "Send a recent bill from your current phone provider."],
  ["We review it", "The Lion Switch team goes through your lines, numbers, features and charges."],
  ["We walk you through it", "We'll get back to you within one business day to go over what we found."],
];

export default function BillReviewPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: SITE_URL }, { name: "Free Bill Review", url: `${SITE_URL}/bill-review` }])} />
      <Section className="pb-0">
        <SectionHeading
          as="h1"
          eyebrow="Free Bill Review"
          title="See what you're really paying for"
          description="Send us your current phone bill. We'll review your lines, numbers, features and charges, and show you how Lion Switch could serve your business."
        />
        <ol className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          {STEPS.map(([t, b], i) => (
            <li key={t} className="surface rounded-2xl border bg-white p-5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-orange font-[family-name:var(--font-heading)] text-sm font-bold text-ink">{i + 1}</span>
              <p className="mt-3 font-[family-name:var(--font-heading)] font-bold text-ink">{t}</p>
              <p className="mt-1 text-sm text-muted">{b}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section>
        <div className="mx-auto max-w-4xl">
          <BillReviewForm />
        </div>
      </Section>
    </>
  );
}
