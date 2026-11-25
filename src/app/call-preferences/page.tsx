import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { CallPreferencesForm } from "@/components/call-preferences/CallPreferencesForm";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Call Preferences",
  description:
    "Tell Lion Switch how you want your calls to work. Set extension preferences, where calls ring, and voicemail routing in under a minute.",
  path: "/call-preferences",
});

export default function CallPreferencesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: SITE_URL }, { name: "Call Preferences", url: `${SITE_URL}/call-preferences` }])} />
      <section className="border-b border-line bg-white">
        <Container className="py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-xs text-muted">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span aria-hidden="true">›</span>
            <span className="font-medium text-ink">Call Preferences</span>
          </nav>
          <p className="hero-in inline-flex items-center gap-1.5 rounded-full border border-soft-border bg-soft px-3 py-1 text-xs font-semibold text-label">
            <span aria-hidden="true">●</span>
            Brooklyn, NY · Enterprise Cloud Communications
          </p>
          <h1 className="hero-in mt-4 max-w-2xl font-[family-name:var(--font-heading)] text-4xl font-bold sm:text-5xl" style={{ animationDelay: "60ms" }}>
            Tell us how you want your calls to work
          </h1>
          <p className="hero-in mt-4 max-w-2xl text-muted" style={{ animationDelay: "120ms" }}>
            Takes under a minute. This sets up your extension exactly how you want it — where your calls ring, what
            happens to voicemail, and anything else we should know.
          </p>
        </Container>
      </section>
      <section className="bg-cream py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-2xl">
            <CallPreferencesForm />
          </div>
        </Container>
      </section>
    </>
  );
}
