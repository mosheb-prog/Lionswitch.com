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
    question: "What is the MCP integration?",
    answer:
      "Lion Switch connects your call data to any AI assistant that supports MCP (Model Context Protocol). Calls are transcribed after they end, and you can ask your AI questions about any call — summaries, action items, caller mood, and more. Learn more on our MCP page.",
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
