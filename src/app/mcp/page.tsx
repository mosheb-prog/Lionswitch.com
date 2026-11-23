import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/ui/Faq";
import { VoiceDemo } from "@/components/voice-demo/VoiceDemo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "MCP — Connect Your Calls to Claude",
  description:
    "Lion Switch connects your call data to Claude through MCP (Model Context Protocol). Calls are transcribed after they end — ask Claude anything about any call.",
  path: "/mcp",
});

const STEPS = [
  { title: "Call", body: "A call happens, just like any other call on your Lion Switch line." },
  {
    title: "Transcript is ready after the call",
    body: "Once the call ends, Lion Switch transcribes it. Nothing is transcribed live.",
  },
  {
    title: "Ask Claude",
    body: "Ask Claude anything about that call — summaries, action items, mood, and more.",
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
      "MCP (Model Context Protocol) is a standard way to connect an AI assistant like Claude to real data sources. Lion Switch uses it to connect your finished call transcripts to Claude, so you can ask questions about your calls in plain English.",
  },
  {
    question: "Is any of this live?",
    answer:
      "No. Calls are transcribed only after they end. Claude only ever sees a finished transcript — never a call in progress.",
  },
  {
    question: "Where can call data be sent?",
    answer:
      "Call data and AI-generated summaries can be routed to your CRM, Slack, email, Google Sheets, webhooks, or other tools you already use.",
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

      <Section className="bg-ink text-on-dark">
        <SectionHeading
          as="h1"
          dark
          eyebrow="MCP Integration"
          title="Your phone calls, now connected to Claude."
          description="Lion Switch connects to Claude through MCP (Model Context Protocol). Calls are transcribed after they end, and you can ask Claude anything about any call."
        />
        <div className="mt-12">
          <VoiceDemo />
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="How it works" title="Three steps" />
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="text-center">
              <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-orange font-[family-name:var(--font-heading)] font-bold text-ink">
                {i + 1}
              </div>
              <h2 className="mt-4 font-[family-name:var(--font-heading)] text-lg font-bold text-ink">
                {step.title}
              </h2>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-soft">
        <SectionHeading eyebrow="Use Cases" title="What you can ask Claude" />
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
      </Section>

      <Section>
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
        <div className="mt-12">
          <Faq items={FAQ_ITEMS} />
        </div>
      </Section>

      <Section dark className="text-center">
        <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold">
          See it on a real demo call
        </h2>
        <div className="mt-8 flex justify-center">
          <Button href="/contact#demo" variant="primary">
            Schedule a Free Demo
          </Button>
        </div>
      </Section>
    </>
  );
}
