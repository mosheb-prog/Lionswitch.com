import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section, SectionHeading } from "@/components/ui/Section";
import { HolidayPreferencesForm } from "@/components/holiday-preferences/HolidayPreferencesForm";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Holiday Preferences",
  description:
    "Tell us how your Lion Switch phone lines should behave on holidays — fully closed, custom hours, or a custom auto-attendant greeting.",
  path: "/holiday-preferences",
});

export default function HolidayPreferencesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Holiday Preferences", url: `${SITE_URL}/holiday-preferences` },
        ])}
      />

      <Section className="pb-0">
        <SectionHeading
          eyebrow="Holiday Preferences"
          title="Tell us how to handle your lines on holidays"
          description="Mark dates as fully closed or set custom hours, quick-add common holidays, and optionally set up emergency call routing."
        />
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <HolidayPreferencesForm />
        </div>
      </Section>
    </>
  );
}
