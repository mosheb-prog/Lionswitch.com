import type { Metadata } from "next";
import Image from "next/image";
import { pageMetadata } from "@/lib/metadata";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/constants";

// Only models the owner has confirmed are listed (Yealink T85W so far).
export const metadata: Metadata = pageMetadata({
  title: "Devices",
  description: "Desk phones, conference room systems and softphones for Lion Switch, zero-touch provisioned and set up for you.",
  path: "/devices",
});

const CATEGORIES = [
  { title: "Desk phones", body: "Business desk phones that arrive configured for your account. Plug them in and they're ready with your lines and extensions." },
  { title: "Conference room systems", body: "Audio for meeting rooms, so the whole room can join calls clearly." },
  { title: "Softphones", body: "Your office extension on a computer or cell phone with the ConnectUC app, on iOS, Android, Windows, Mac and web." },
];

export default function DevicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: SITE_URL }, { name: "Devices", url: `${SITE_URL}/devices` }])} />
      <Section className="pb-0">
        <SectionHeading as="h1" eyebrow="Devices" title="Phones and apps, set up for you" description="Zero-touch provisioning means your devices arrive ready to go, configured by the Lion Switch team." />
      </Section>

      <Section>
        <Reveal>
          <div className="surface mx-auto grid max-w-5xl items-center gap-8 overflow-hidden rounded-3xl border bg-white p-6 sm:p-10 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-label">Featured desk phone</p>
              <h2 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold text-ink">Yealink T85W</h2>
              <p className="mt-3 max-w-md text-muted">
                A color-screen business desk phone, zero-touch provisioned by the Lion Switch team so it&apos;s ready with your
                lines and extensions when you plug it in.
              </p>
              <div className="mt-6">
                <Button href="/contact#demo" variant="primary">Ask about desk phones</Button>
              </div>
            </div>
            <Image src="/yealink-t85w.png" alt="Yealink T85W color-screen business desk phone" width={720} height={421} sizes="(min-width: 768px) 440px, 90vw" className="mx-auto h-auto w-full max-w-[440px]" />
          </div>
        </Reveal>
      </Section>

      <Section className="bg-soft">
        <Reveal>
          <SectionHeading eyebrow="What we support" title="Every way your team takes calls" />
        </Reveal>
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.title} delayMs={i * 70}>
              <div className="hover-lift h-full rounded-2xl border border-line bg-white p-6">
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-ink">{c.title}</h3>
                <p className="mt-2 text-sm text-muted">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted">
          Looking for a specific model or want to keep your current phones? Ask us on a demo call.
        </p>
      </Section>
    </>
  );
}
