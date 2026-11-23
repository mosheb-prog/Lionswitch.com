import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/ui/Faq";
import { Reveal } from "@/components/ui/Reveal";
import { DashboardMock } from "@/components/live-dashboard/DashboardMock";
import { FeatureCard } from "@/components/live-dashboard/FeatureCard";
import {
  BellIcon,
  ChartIcon,
  HistoryIcon,
  MailIcon,
  PhoneIcon,
  SendIcon,
  ShieldIcon,
  SparkleIcon,
  TvIcon,
  UsersIcon,
  VoicemailIcon,
} from "@/components/live-dashboard/icons";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Live Call Dashboard — Business Phone Call Reporting",
  description:
    "A live call dashboard with advanced reporting for Lion Switch customers: live call board, call-center wallboard, scheduled reports, smart alerts, and AI after-call tools.",
  path: "/live-dashboard",
});

const FAQ_ITEMS = [
  {
    question: "What is the live dashboard?",
    answer:
      "It's a live, easy-to-use dashboard for your Lion Switch phone lines — active calls, queues, agent status, and advanced reporting, built for business owners rather than engineers.",
  },
  {
    question: "Do I need to install anything?",
    answer: "No. The live dashboard runs in your browser — no software to install.",
  },
  {
    question: "Who can see my data?",
    answer:
      "Access is scoped per customer with separate logins and roles (owner, admin, viewer), so only your team sees your data.",
  },
  {
    question: "Can I get reports by email?",
    answer: "Yes — scheduled daily, weekly and monthly reports can be emailed to whoever you choose.",
  },
  {
    question: "Does it work with AI / MCP?",
    answer:
      "Yes. Call data and AI-generated summaries can be sent to any AI assistant that supports MCP, your CRM, Slack, Google Sheets, email or webhooks through our MCP integration.",
  },
  {
    question: "Is it included with my phone service?",
    // TODO(owner): confirm pricing/packaging for the live dashboard before publishing.
    answer:
      "TODO: the business owner needs to confirm pricing and packaging for the live dashboard before this is published.",
  },
];

export default function LiveDashboardPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Live Dashboard", url: `${SITE_URL}/live-dashboard` },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          name: "Live Call Dashboard",
          description:
            "A live call dashboard with advanced reporting for Lion Switch customers.",
          url: `${SITE_URL}/live-dashboard`,
        })}
      />

      <section className="relative overflow-hidden bg-ink text-on-dark">
        <div aria-hidden="true" className="ambient-glow tech-grid pointer-events-none absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="hero-in text-xs font-bold uppercase tracking-[0.2em] text-orange-3">
              Live Dashboard
            </p>
            <h1
              className="hero-in mt-4 font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight sm:text-5xl"
              style={{ animationDelay: "80ms" }}
            >
              See every call, live.
            </h1>
            <p className="hero-in mt-6 text-lg text-on-dark-2" style={{ animationDelay: "160ms" }}>
              A live call dashboard with advanced reporting, built for Lion Switch
              customers.
            </p>
            <div
              className="hero-in mt-8 flex flex-wrap items-center justify-center gap-4"
              style={{ animationDelay: "240ms" }}
            >
              <Button href="/contact#demo" variant="primary">
                Schedule a Free Demo
              </Button>
              <Link
                href="#features"
                className="text-sm font-semibold text-on-dark underline-offset-4 hover:underline"
              >
                See what it can do &darr;
              </Link>
            </div>
          </div>

          <div className="hero-in mt-14" style={{ animationDelay: "320ms" }}>
            <DashboardMock />
          </div>
        </div>
      </section>

      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Why it beats the carrier portal"
            title="Simple, fast, and built for business owners — not engineers"
            description="Most carrier portals are built for telecom technicians. The Lion Switch live dashboard is built for the person running the business."
          />
        </Reveal>
      </Section>

      <Section id="features" className="bg-soft">
        <Reveal>
          <SectionHeading eyebrow="Features" title="Everything you need to run your phones" />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard icon={<PhoneIcon />} title="Live call board" delayMs={0}>
            See active calls in real time — caller, who&apos;s handling it, direction,
            and duration.
          </FeatureCard>
          <FeatureCard icon={<TvIcon />} title="Call-center wallboard / TV mode" delayMs={60}>
            Queues, callers waiting, longest wait, agent status, answered and
            abandoned calls, and service level — full-screen for a wall TV.
          </FeatureCard>
          <FeatureCard icon={<ChartIcon />} title="Advanced reporting" delayMs={120}>
            Filter by date, user, queue, department, number and direction. Export
            to CSV and PDF, with per-agent leaderboards and period comparisons.
          </FeatureCard>
          <FeatureCard icon={<HistoryIcon />} title="Call history" delayMs={0}>
            Searchable and filterable call history with recordings and after-call
            transcripts.
          </FeatureCard>
          <FeatureCard icon={<SparkleIcon />} title="AI after-call tools" delayMs={60}>
            Summaries, action items and sentiment — plus &ldquo;Ask AI about this
            call.&rdquo; Calls are transcribed after they end, never live.
          </FeatureCard>
          <FeatureCard icon={<MailIcon />} title="Scheduled reports" delayMs={120}>
            Daily, weekly and monthly reports emailed in a readable format to
            whoever you choose.
          </FeatureCard>
          <FeatureCard icon={<BellIcon />} title="Smart alerts" delayMs={0}>
            Set thresholds — callers waiting too long, a missed-call spike, no
            agents in a queue, after-hours calls — and get notified by email, text
            or Slack.
          </FeatureCard>
          <FeatureCard icon={<VoicemailIcon />} title="Missed calls & voicemail center" delayMs={60}>
            A call-back list with status, so nothing falls through the cracks.
          </FeatureCard>
          <FeatureCard icon={<UsersIcon />} title="Users, numbers & queues" delayMs={120}>
            An overview of users, numbers, queues and call flows, plus{" "}
            <Link href="/holiday-preferences" className="text-label underline">
              holiday schedule status
            </Link>
            .
          </FeatureCard>
          <FeatureCard icon={<SendIcon />} title="Send your data anywhere (MCP)" delayMs={0}>
            Connect call data to any MCP-compatible AI, Slack, your CRM, Google Sheets, email,
            Zapier, or your own tools.
          </FeatureCard>
          <FeatureCard icon={<ShieldIcon />} title="Security and access" delayMs={60}>
            Separate logins per customer, roles (owner, admin, viewer), MFA, and
            audit logs.
            {/* TODO(owner): do not claim HIPAA compliance for the dashboard
                until the owner confirms the exact wording. */}
          </FeatureCard>
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeading eyebrow="Who it's for" title="Built for any business that lives on the phone" />
        </Reveal>
        <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 text-center sm:grid-cols-4">
          {["Offices", "Medical & dental practices", "Skilled nursing facilities", "Call centers"].map(
            (item, i) => (
              <Reveal key={item} delayMs={i * 70}>
                <li className="hover-lift rounded-2xl border border-line bg-white px-4 py-5 text-sm font-semibold text-ink">
                  {item}
                </li>
              </Reveal>
            ),
          )}
        </ul>
      </Section>

      <Section className="bg-soft">
        <Reveal>
          <SectionHeading
            eyebrow="See It In Action"
            title="A quick walkthrough"
            description="TODO(owner): drop in a short walkthrough video and we'll embed it here, lazy-loaded."
          />
          <div className="mx-auto mt-10 aspect-video max-w-3xl rounded-3xl border border-dashed border-soft-border bg-white grid place-items-center text-sm text-muted">
            Walkthrough video placeholder
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
        </Reveal>
        <Reveal delayMs={80} className="mt-12">
          <Faq items={FAQ_ITEMS} />
        </Reveal>
      </Section>

      <Section dark glow className="text-center">
        <Reveal>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold">
            See the live dashboard on a real demo
          </h2>
          <div className="mt-8 flex justify-center">
            <Button href="/contact#demo" variant="primary">
              Schedule a Free Demo
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
