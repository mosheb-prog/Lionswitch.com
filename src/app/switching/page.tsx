import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Faq } from "@/components/ui/Faq";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "How Switching Works",
  description: "What moving your business phones to Lion Switch looks like, step by step, including how we port your existing phone numbers.",
  path: "/switching",
});

const STEPS = [
  { title: "Talk to us", body: "On a free demo call we learn how your business uses the phone: your numbers, locations, users, call flows and must-haves." },
  { title: "Review your current setup", body: "Send us a recent phone bill and we'll review your lines, numbers and features so nothing gets missed." },
  { title: "Plan your setup", body: "We map out your auto attendant, call routing, queues, voicemail and devices, and agree on a go-live plan with you." },
  { title: "Set up phones and apps", body: "Desk phones arrive configured for your account (zero-touch provisioning), and your team gets the ConnectUC app for computers and cell phones." },
  { title: "Port your numbers", body: "We move your existing numbers from your current provider to Lion Switch, so callers keep using the numbers they know." },
  { title: "Go live and get trained", body: "Your implementation specialist walks your team through the new system and stays with you through go-live." },
];

const PORT_NEEDS = [
  "A recent bill from your current phone provider",
  "Your account number with that provider",
  "Your account PIN or passcode, if your provider uses one",
  "The service address on file with your current provider",
  "The name of the person authorized on the account",
  "A list of every number you want to keep",
];

const FAQ = [
  { question: "Will I keep my phone numbers?", answer: "Yes. Lion Switch handles number porting for you, including local and toll-free numbers." },
  { question: "Should I cancel my old service first?", answer: "No. Keep your current service active until we confirm your numbers have moved to Lion Switch. Canceling early can cause you to lose your numbers." },
  { question: "How long does porting take?", answer: "It depends on your current provider and how many numbers you're moving. We'll give you a timeline for your numbers on a demo call." },
  { question: "Will our phones be down during the switch?", answer: "We plan go-live with you so your team knows what to expect and your callers keep reaching you." },
  { question: "Do we need new phones?", answer: "Not always. We'll go over your current equipment on a demo call. New desk phones arrive set up for your account." },
];

export default function SwitchingPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: SITE_URL }, { name: "How Switching Works", url: `${SITE_URL}/switching` }])} />
      <Section className="pb-0">
        <SectionHeading as="h1" eyebrow="How switching works" title="Switching to Lion Switch, step by step" description="White-glove service means we handle the heavy lifting: setup, phones, number porting and training." />
      </Section>

      <Section>
        <ol className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delayMs={(i % 3) * 70}>
              <li className="hover-lift h-full rounded-2xl border border-line bg-white p-6">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-orange font-[family-name:var(--font-heading)] font-bold text-ink">{i + 1}</span>
                <h2 className="mt-4 font-[family-name:var(--font-heading)] text-lg font-bold text-ink">{s.title}</h2>
                <p className="mt-2 text-sm text-muted">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section id="porting" className="bg-soft">
        <div className="mx-auto grid max-w-5xl items-start gap-10 md:grid-cols-2">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-label">Number porting</p>
            <h2 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold text-ink">Keep the numbers your customers know</h2>
            <p className="mt-4 text-muted">
              Porting moves your existing phone numbers from your current provider to Lion Switch. We submit the request,
              work with your old provider, and confirm the date your numbers move. Keep your old service active until we
              tell you the port is complete.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/bill-review" variant="primary">Start with a Free Bill Review</Button>
              <Button href="/contact#demo" variant="ghost">Schedule a Demo</Button>
            </div>
          </Reveal>
          <Reveal delayMs={80}>
            <div className="surface rounded-2xl border bg-white p-6">
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-ink">What we&apos;ll need from you</h3>
              <ul className="mt-4 space-y-3">
                {PORT_NEEDS.map((n) => (
                  <li key={n} className="flex items-start gap-3 text-sm text-text">
                    <span aria-hidden="true" className="mt-0.5 text-orange">&#10003;</span>
                    {n}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted">
                Not sure where to find these? Send us your bill and we&apos;ll help. See our <Link href="/legal/911" className="text-label underline">911 Notice</Link> for
                how emergency calling works on internet phone service.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeading eyebrow="FAQ" title="Switching questions" />
        </Reveal>
        <Reveal delayMs={60} className="mt-10">
          <Faq items={FAQ} />
        </Reveal>
      </Section>
    </>
  );
}
