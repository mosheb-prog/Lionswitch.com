import { Section, SectionHeading } from "@/components/ui/Section";
import { Faq } from "@/components/ui/Faq";
import { Reveal } from "@/components/ui/Reveal";

const ITEMS = [
  {
    question: "What is cloud VoIP / UCaaS?",
    answer:
      "Cloud VoIP (Voice over IP) routes your business phone calls over the internet instead of traditional copper phone lines. UCaaS (Unified Communications as a Service) goes further, combining voice, video, messaging and file sharing into one hosted platform — no on-site phone hardware to maintain.",
  },
  {
    question: "Can I keep my phone numbers?",
    answer:
      "Yes. Lion Switch handles number porting for you, so you keep your existing business phone numbers when you switch.",
  },
  {
    question: "How fast is onboarding?",
    answer:
      "Every customer gets white-glove onboarding with a dedicated implementation specialist who handles migration, training and go-live. Exact timelines depend on your current setup and number of lines — ask about your specific timeline on a demo call.",
  },
  {
    question: "What devices work with Lion Switch?",
    answer:
      "Lion Switch supports zero-touch provisioned desk phones, conference room systems, and mobile and desktop softphones through the ConnectUC app.",
  },
  {
    question: "Is Lion Switch HIPAA-compliant?",
    // TODO(owner): confirm exact HIPAA-compliance wording/claims with legal
    // before publishing. Do not claim HIPAA compliance without sign-off.
    answer:
      "Lion Switch works with medical and dental practices. TODO: the business owner needs to confirm the exact HIPAA-compliance wording before this claim is published.",
  },
  {
    question: "How does support work?",
    answer:
      "Lion Switch offers 24/6 live support. TODO: the business owner is confirming the exact support-hours wording (the old site also referenced 24/7 emergency support for active customers) — this answer will be finalized once that's confirmed.",
  },
  {
    question: "How do contracts and terms work?",
    // TODO(owner): confirm new contract terms wording per rebuild brief —
    // never use "no contract" / "no contracts" / "no long-term contracts".
    answer:
      "Lion Switch offers white-glove service with flexible terms and transparent pricing. TODO: the business owner is finalizing the exact new contract terms — this answer will be updated once confirmed.",
  },
  {
    question: "What is the MCP / Claude integration?",
    answer:
      "Lion Switch connects your call data to Claude through MCP (Model Context Protocol). Calls are transcribed after they end, and you can ask Claude questions about any call — summaries, action items, caller mood, and more. Learn more on our MCP page.",
  },
];

export function HomeFaq() {
  return (
    <Section id="faq">
      <Reveal>
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
      </Reveal>
      <Reveal delayMs={80} className="mt-12">
        <Faq items={ITEMS} />
      </Reveal>
    </Section>
  );
}
