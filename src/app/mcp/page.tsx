import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/ui/Faq";
import { Reveal } from "@/components/ui/Reveal";
import { McpFlow } from "@/components/mcp/McpFlow";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "MCP — Connect Your Calls to Any AI",
  description:
    "Lion Switch connects your call data to any AI assistant that supports MCP (Model Context Protocol). Calls are transcribed after they end — then ask your AI anything about any call.",
  path: "/mcp",
});

const STEPS = [
  { title: "Call", body: "A call happens, just like any other call on your Lion Switch line." },
  {
    title: "Transcript is ready after the call",
    body: "Once the call ends, Lion Switch transcribes it. Nothing is transcribed live.",
  },
  {
    title: "Ask your AI",
    body: "Ask any AI assistant that supports MCP about that call — summaries, action items, mood, and more.",
  },
];

const USE_CASES = [
  "Summaries and action items",
  "Caller mood and sentiment",
  "“What did the customer ask for?”",
  "Missed-call follow-up",
  "Daily call reports",
  "Sending call data wherever you want — CRM, Slack, email, Google Sheets, webhooks",
];

const FAQ_ITEMS = [
  {
    question: "What is MCP?",
    answer:
      "MCP (Model Context Protocol) is an open standard for connecting AI assistants to real data sources. Lion Switch uses it to connect your finished call data to the AI assistant of your choice, as long as it supports MCP, so you can ask questions about your calls in plain English.",
  },
  {
    question: "Is any of this live?",
    answer:
      "No. Calls are transcribed only after they end. Your AI only ever sees a finished transcript — never a call in progress.",
  },
  {
    question: "Where can call data be sent?",
    answer:
      "Call data and AI-generated summaries can be routed to your CRM, Slack, email, Google Sheets, webhooks, or other tools you already use.",
  },
  {
    question: "Can the AI change my phone system?",
    answer:
      "No. The MCP connection is read-only. Your AI can answer questions about your call data, but it can't change phone settings.",
  },
];

export default function McpPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "MCP", url: `${SITE_URL}/mcp` },
        ])}
      />

      <Section dark glow>
        <div className="hero-in">
          <SectionHeading
            as="h1"
            dark
            eyebrow="MCP Integration"
            title="Your phone calls, now connected to AI."
            description="Lion Switch connects to any AI assistant that supports MCP (Model Context Protocol). Calls are transcribed after they end, and you can ask your AI anything about any call."
          />
        </div>
        <div className="hero-in mt-12" style={{ animationDelay: "120ms" }}>
          <McpFlow />
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeading eyebrow="How it works" title="Three steps" />
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delayMs={i * 100} className="text-center">
              <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-orange font-[family-name:var(--font-heading)] font-bold text-ink shadow-[0_0_24px_-4px_rgba(245,138,11,0.6)]">
                {i + 1}
              </div>
              <h2 className="mt-4 font-[family-name:var(--font-heading)] text-lg font-bold text-ink">
                {step.title}
              </h2>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-soft">
        <Reveal>
          <SectionHeading eyebrow="Use Cases" title="What you can ask your AI" />
        </Reveal>
        <Reveal delayMs={80}>
          <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {USE_CASES.map((item) => (
              <li key={item} className="flex items-start gap-3 text-text">
                <span aria-hidden="true" className="mt-1 text-orange">
                  &#9679;
                </span>
                {item}
              </li>
            ))}
          </ul>
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
            See it on a real demo call
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
