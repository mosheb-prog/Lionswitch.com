import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SignalNetwork } from "@/components/ui/SignalNetwork";
import { StatsBar } from "@/components/home/StatsBar";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { COMPANY, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Why Lion Switch",
  description:
    "The best service you'll ever get from a phone company: a family-run Brooklyn team, carrier-class infrastructure, white-glove setup and flexible terms.",
  path: "/why-lion-switch",
});

const SERVICE = [
  {
    title: "A real team that knows you",
    body: "You work with a family-run Brooklyn team and a dedicated account team, not a call center reading a script or a ticket number in a queue.",
  },
  {
    title: "We set everything up for you",
    body: "A dedicated implementation specialist handles migration, training and go-live. Desk phones arrive configured for your account.",
  },
  {
    title: "Your numbers, moved for you",
    body: "We handle number porting with your old provider, so your customers keep calling the numbers they already know.",
  },
  {
    title: "We handle the details",
    body: "Send us your holiday dates, or just upload the schedule you already send out, and we set up your greetings. No portal to wrestle with.",
  },
  {
    title: "See every call, live",
    body: "The Lion Switch Live Dashboard is built for business owners, not telecom technicians, with missed-call follow-ups so nobody slips through.",
  },
  {
    title: "Ready for what's next",
    body: "Optional AI summaries after every call, and a read-only connection to the AI assistant you already use. The future is calling.",
  },
];

const COMPARE: [string, string, string][] = [
  ["Who you talk to", "A family-run Brooklyn team and a dedicated account team", "A call center or a ticket queue"],
  ["Getting set up", "Done for you by a dedicated implementation specialist", "Mostly do-it-yourself"],
  ["Keeping your numbers", "We handle the port with your old provider", "Often left to you to chase"],
  ["Holiday greetings", "Send your dates or upload your schedule; we set it up", "Log in and configure it yourself"],
  ["Seeing your calls", "A live dashboard built for business owners", "A portal built for technicians"],
  ["AI", "Optional AI after every call, plus connect your own AI", "Another vendor to add on"],
];

const POINTS = [
  {
    title: "Family-run, not a call center",
    body: "Lion Switch is family-run out of Brooklyn. You get a dedicated account team, not a ticket queue — because your business deserves better than a call center.",
  },
  {
    title: "99.999% uptime SLA",
    body: "Backed by dedicated account teams and onboarding included.",
  },
  {
    title: "Carrier-class infrastructure",
    body: "The same enterprise-grade network used by Fortune 500 companies.",
  },
  {
    title: "White-glove onboarding",
    body: "A dedicated implementation specialist handles migration, training and go-live.",
  },
  {
    title: "Local presence, global reach",
    body: "Rooted in Brooklyn, serving businesses in all 50 states and internationally.",
  },
];

export default function WhyLionSwitchPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Why Lion Switch", url: `${SITE_URL}/why-lion-switch` },
        ])}
      />

      <section className="signal-bg relative overflow-hidden bg-ink text-on-dark">
        <SignalNetwork />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <p className="hero-in text-xs font-bold uppercase tracking-[0.2em] text-orange-3">Why Lion Switch</p>
          <h1
            className="hero-in mx-auto mt-4 max-w-4xl font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            The best service you&apos;ll ever get from a <span className="sig-sheen">phone company.</span>
          </h1>
          <p className="hero-in mx-auto mt-6 max-w-2xl text-lg text-on-dark-2" style={{ animationDelay: "160ms" }}>
            White-glove service from a family-run Brooklyn team, on carrier-class infrastructure. Because your business
            deserves better than a call center.
          </p>
          <div className="hero-in mt-8 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "240ms" }}>
            <Button href="/contact#demo" variant="primary">
              Schedule a Free Demo
            </Button>
            <Button href={COMPANY.phoneHref} variant="ghostOnDark">
              {COMPANY.phoneDisplay}
            </Button>
          </div>
        </div>
      </section>

      <StatsBar />

      <Section>
        <Reveal className="mx-auto max-w-3xl space-y-5 text-lg leading-relaxed text-text">
          <p>
            {COMPANY.name} started the way a lot of good businesses start: with
            frustration. A family-run Brooklyn company, tired of the
            impersonal, ticket-number treatment that comes with the big
            national carriers, decided to build the kind of phone company
            they wished they could call.
          </p>
          <p>
            Today, {COMPANY.name} serves businesses in all 50 states and
            internationally, but the approach hasn&apos;t changed: real people,
            a dedicated account team, and white-glove service with flexible
            terms and transparent pricing — not sales scripts and long hold
            times.
          </p>
        </Reveal>
      </Section>

      <Section className="bg-soft">
        <Reveal>
          <SectionHeading
            eyebrow="Service that sets us apart"
            title="How good service should feel"
            description="We don't just sell you phone lines. We take care of them, and of you."
          />
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE.map((item, i) => (
            <Reveal key={item.title} delayMs={(i % 3) * 80}>
              <div className="hover-lift h-full rounded-2xl border border-line bg-white p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange font-[family-name:var(--font-heading)] text-sm font-bold text-ink shadow-[0_8px_24px_-8px_rgba(245,138,11,0.7)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-heading)] text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeading eyebrow="The difference" title="Lion Switch vs. a typical big carrier" />
        </Reveal>
        <Reveal delayMs={60}>
          <div className="surface mx-auto mt-10 max-w-5xl overflow-hidden rounded-3xl border bg-white">
            <div className="grid grid-cols-2 bg-ink text-xs font-bold uppercase tracking-wider text-on-dark sm:grid-cols-[1fr_1.3fr_1.1fr] sm:text-sm">
              <div className="hidden p-4 sm:block" />
              <div className="flex items-center gap-2 bg-orange p-4 text-ink">Lion Switch</div>
              <div className="p-4 text-on-dark-2">Typical big carrier</div>
            </div>
            {COMPARE.map(([row, us, them], i) => (
              <div key={row} className={`grid grid-cols-2 text-sm sm:grid-cols-[1fr_1.3fr_1.1fr] ${i % 2 ? "bg-cream" : "bg-white"}`}>
                <div className="col-span-2 px-4 pb-1 pt-4 font-[family-name:var(--font-heading)] font-semibold text-ink sm:col-span-1 sm:p-4">{row}</div>
                <div className="flex items-start gap-2 bg-soft/70 p-4 font-semibold text-ink">
                  <span aria-hidden="true" className="mt-0.5 text-orange">&#10003;</span>
                  {us}
                </div>
                <div className="p-4 text-muted">{them}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section className="bg-soft">
        <Reveal>
          <SectionHeading eyebrow="Why Choose Lion Switch" title="What makes us different" />
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {POINTS.map((point, i) => (
            <Reveal key={point.title} delayMs={(i % 3) * 80}>
              <div className="hover-lift h-full rounded-2xl border border-line bg-white p-6">
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-ink">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{point.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section dark glow className="text-center">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-3">Our promise</p>
          <h2 className="mx-auto mt-3 max-w-3xl font-[family-name:var(--font-heading)] text-3xl font-bold sm:text-4xl">
            The best service you&apos;ve ever had from a phone company. If it isn&apos;t, tell us and we&apos;ll make it right.
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact#demo" variant="primary">
              Schedule a Free Demo
            </Button>
            <Button href={COMPANY.phoneHref} variant="ghostOnDark">
              {COMPANY.phoneDisplay}
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
