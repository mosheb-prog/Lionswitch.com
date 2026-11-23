import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { HolidayPreferencesForm } from "@/components/holiday-preferences/HolidayPreferencesForm";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Holiday Auto Attendant Setup",
  description:
    "Submit your Lion Switch holiday auto attendant preferences. Pick your holiday dates, closures, and custom greetings before each holiday.",
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

      <section className="border-b border-line bg-white">
        <Container className="py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-xs text-muted">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span aria-hidden="true">›</span>
            <span className="font-medium text-ink">Holiday Preferences</span>
          </nav>
          <p className="hero-in inline-flex items-center gap-1.5 rounded-full border border-soft-border bg-soft px-3 py-1 text-xs font-semibold text-label">
            <span aria-hidden="true">●</span>
            Auto Attendant · Holiday Setup
          </p>
          <h1
            className="hero-in mt-4 max-w-2xl font-[family-name:var(--font-heading)] text-4xl font-bold sm:text-5xl"
            style={{ animationDelay: "60ms" }}
          >
            Holiday Auto Attendant Setup
          </h1>
          <p className="hero-in mt-4 max-w-2xl text-muted" style={{ animationDelay: "120ms" }}>
            Before every holiday, we need to know how you want your auto attendant configured. Select your holiday dates
            on the calendar below, tell us if you&apos;re closed or have special hours, and we&apos;ll handle the rest. Both
            Jewish and Gregorian calendars are shown so you can easily find the right dates.
          </p>
        </Container>
      </section>

      <section className="bg-cream py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            <HolidayPreferencesForm />
          </div>
        </Container>
      </section>
    </>
  );
}
