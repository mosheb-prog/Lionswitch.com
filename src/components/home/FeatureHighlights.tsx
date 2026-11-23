import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { COMPANY } from "@/lib/constants";

const ITEMS = [
  {
    title: "Voice",
    body: "Cloud PBX, auto-attendant, call routing and number porting — no on-site hardware.",
    href: "/features#cloud-pbx",
  },
  {
    title: "Messaging",
    body: "Business SMS, MMS, virtual fax, shared inboxes and compliant archiving.",
    href: "/features#messaging-fax",
  },
  {
    title: "Video & Meetings",
    body: "HD video conferencing, screen sharing, recording and webinar hosting.",
    href: "/features#video",
  },
  {
    title: "Contact Center",
    body: "Queues and ring groups up to full omnichannel routing and real-time dashboards.",
    href: "/features#call-center",
  },
  {
    title: "AI & Analytics",
    body: "Post-call summaries, sentiment analysis and predictive routing — after every call ends.",
    href: "/features#ai-features",
  },
  {
    title: "Integrations",
    body: "Salesforce, HubSpot, Microsoft Teams, Zapier and an open REST API.",
    href: "/features#integrations",
  },
  {
    title: "Devices",
    body: "Zero-touch provisioned desk phones, conference systems, and mobile and desktop softphones.",
    href: "/features",
  },
  {
    title: "ConnectUC App",
    body: "Voice, SMS, presence, team messaging, video and visual voicemail — on iOS, Android, Windows, Mac and web.",
    href: COMPANY.connectUcUrl,
  },
];

export function FeatureHighlights() {
  return (
    <Section>
      <Reveal>
        <SectionHeading
          eyebrow="Everything in one platform"
          title="Feature highlights"
        />
      </Reveal>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item, i) => (
          <Reveal key={item.title} delayMs={(i % 4) * 70}>
            <div className="hover-lift h-full rounded-2xl border border-line bg-white p-5">
              <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
