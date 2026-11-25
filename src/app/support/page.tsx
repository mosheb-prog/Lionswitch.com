import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { COMPANY, LOGIN_SUPPORT_LINKS, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Support",
  description: `Get help from ${COMPANY.name}: contact details, office hours, and logins for the phone portal, softphone and billing.`,
  path: "/support",
});

const PORTAL_NOTES: Record<string, string> = {
  "Portal Login": "Manage your phone system settings.",
  "Softphone Login": "Sign in to the ConnectUC app on the web.",
  "Billing Portal": "View invoices and pay your bill.",
};

const HELP_LINKS = [
  { label: "Holiday preferences", href: "/holiday-preferences", body: "Tell us your holiday closing dates and greetings." },
  { label: "911 Notice", href: "/legal/911", body: "How emergency calling works, and how to update a phone's address." },
  { label: "How switching works", href: "/switching", body: "Moving numbers and phones to Lion Switch." },
];

export default function SupportPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: SITE_URL }, { name: "Support", url: `${SITE_URL}/support` }])} />
      <Section className="pb-0">
        <SectionHeading as="h1" eyebrow="Support" title="We're here to help" description={`${COMPANY.supportLineGeneral} from a family-run Brooklyn team.`} />
      </Section>

      <Section>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
          <Reveal>
            <div className="surface h-full rounded-2xl border bg-white p-6">
              <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-ink">Call us</h2>
              <a href={COMPANY.phoneHref} className="mt-3 block font-[family-name:var(--font-heading)] text-2xl font-bold text-label hover:text-ink">
                {COMPANY.phoneDisplay}
              </a>
              <p className="mt-2 text-sm text-muted">{COMPANY.supportLineGeneral}.</p>
            </div>
          </Reveal>
          <Reveal delayMs={70}>
            <div className="surface h-full rounded-2xl border bg-white p-6">
              <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-ink">Email us</h2>
              <a href={COMPANY.emailHref} className="mt-3 block break-all font-[family-name:var(--font-heading)] text-lg font-bold text-label hover:text-ink">
                {COMPANY.email}
              </a>
              <p className="mt-2 text-sm text-muted">Include your company name and the numbers or extensions involved.</p>
            </div>
          </Reveal>
          <Reveal delayMs={140}>
            <div className="surface h-full rounded-2xl border bg-white p-6">
              <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-ink">Office hours</h2>
              <dl className="mt-3 space-y-1.5 text-sm">
                {COMPANY.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-3">
                    <dt className="text-muted">{h.days}</dt>
                    <dd className="font-semibold text-ink">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs text-muted">{COMPANY.fullAddress}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-soft">
        <Reveal>
          <SectionHeading eyebrow="Logins" title="Portal logins" />
        </Reveal>
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
          {LOGIN_SUPPORT_LINKS.map((l, i) => (
            <Reveal key={l.href} delayMs={i * 70}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="hover-lift group flex h-full flex-col rounded-2xl border border-line bg-white p-6">
                <span className="font-[family-name:var(--font-heading)] text-lg font-bold text-ink">{l.label}</span>
                <span className="mt-2 flex-1 text-sm text-muted">{PORTAL_NOTES[l.label] ?? ""}</span>
                <span className="mt-4 text-sm font-semibold text-label">Open <span aria-hidden="true">&#8599;</span></span>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeading eyebrow="Helpful links" title="Common requests" />
        </Reveal>
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
          {HELP_LINKS.map((h, i) => (
            <Reveal key={h.href} delayMs={i * 70}>
              <Link href={h.href} className="hover-lift flex h-full flex-col rounded-2xl border border-line bg-white p-6">
                <span className="font-[family-name:var(--font-heading)] text-lg font-bold text-ink">{h.label}</span>
                <span className="mt-2 text-sm text-muted">{h.body}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
