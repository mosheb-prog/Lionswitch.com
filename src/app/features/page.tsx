import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FeatureSection, FeatureList } from "@/components/features/FeatureSection";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { COMPANY, STATS, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Features — Cloud PBX, UCaaS, Contact Center & AI",
  description:
    "Every Lion Switch feature: Cloud PBX, the ConnectUC app, unified communications, messaging & fax, video, call/contact center, AI-powered features, integrations and devices.",
  path: "/features",
});

export default function FeaturesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Features", url: `${SITE_URL}/features` },
        ])}
      />

      <Section className="pb-0">
        <SectionHeading
          as="h1"
          eyebrow="Features"
          title="Everything your business needs to communicate"
          description="From Cloud PBX to AI-powered call analytics — every feature, in one place."
        />
      </Section>

      <FeatureSection
        id="cloud-pbx"
        title="Cloud PBX & Voice"
        description="Hosted business phone service with no on-site hardware to maintain."
      >
        <FeatureList
          items={[
            "Cloud PBX / Hosted VoIP — hosted in the cloud, no on-site hardware",
            "SIP Trunking — connects an on-premise PBX to the phone network",
            "Number Porting — keep your numbers, the team handles it",
            "E911 Management — routes emergency calls accurately for each device and location",
            "Auto-attendant",
            "Toll-free numbers",
            "Call recording",
          ]}
        />
      </FeatureSection>

      <FeatureSection
        id="connectuc-app"
        title="ConnectUC App"
        description="iOS, Android, Windows, Mac and web — one app for everything."
        alt
      >
        <FeatureList
          items={[
            "Voice calling",
            "Business SMS",
            "Co-worker presence and status",
            "Team messaging and collaboration",
            "Video meetings and screen sharing",
            "Visual voicemail with transcription",
          ]}
        />
        <Button href={COMPANY.connectUcUrl} variant="ghost" className="mt-6">
          Visit ConnectUC
        </Button>
      </FeatureSection>

      <FeatureSection
        id="unified-communications"
        title="Unified Communications"
      >
        <FeatureList
          items={[
            "UC client (ConnectUC)",
            "Mobile and desktop softphone",
            "Microsoft Teams connector for external calls inside Teams",
          ]}
        />
      </FeatureSection>

      <FeatureSection id="messaging-fax" title="Messaging & Fax" alt>
        <FeatureList
          items={[
            "Business SMS and MMS",
            "Virtual fax",
            "Shared inboxes",
            "Compliant message archiving",
          ]}
        />
      </FeatureSection>

      <FeatureSection id="video" title="Video & Collaboration">
        <FeatureList
          items={[
            "HD video conferencing",
            "Screen sharing",
            "Recording",
            "Webinar hosting",
            "AI meeting transcriptions",
          ]}
        />
      </FeatureSection>

      <FeatureSection
        id="call-center"
        title="Call Center & Contact Center"
        description="Basic call center included; advanced contact center available as an add-on."
        alt
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-sm font-bold uppercase tracking-wider text-muted">
              Call Center (basic)
            </h3>
            <div className="mt-4">
              <FeatureList items={["Queues", "Ring groups", "Basic reporting"]} />
            </div>
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-sm font-bold uppercase tracking-wider text-muted">
              Contact Center (advanced add-on)
            </h3>
            <div className="mt-4">
              <FeatureList
                items={[
                  "Omnichannel routing",
                  "Scripting",
                  "Analytics",
                  "Visual IVR builder",
                  "Real-time dashboards",
                  "CRM screen pop",
                ]}
              />
            </div>
          </div>
        </div>
      </FeatureSection>

      <FeatureSection
        id="ai-features"
        title="AI-Powered Features"
        description="Calls are transcribed and analyzed after they end — never live."
      >
        <FeatureList
          items={[
            "Call transcription (after the call)",
            "Call summarization",
            "Sentiment analysis",
            "Voicemail transcription",
            "Predictive routing",
            "200+ custom reports",
          ]}
        />
      </FeatureSection>

      <FeatureSection id="integrations" title="Integrations & API" alt>
        <FeatureList
          items={[
            STATS.integrationsFeatures,
            "Voice API",
            "QoS Monitor",
            "Salesforce",
            "HubSpot",
            "Microsoft Teams",
            "Zapier",
            "Open REST API",
          ]}
        />
      </FeatureSection>

      <FeatureSection id="devices" title="Devices">
        <FeatureList
          items={[
            "Zero-touch provisioned desk phones",
            "Conference room systems",
            "Mobile and desktop softphones",
          ]}
        />
      </FeatureSection>

      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink p-10 text-center text-on-dark">
            <div aria-hidden="true" className="ambient-glow tech-grid absolute inset-0" />
            <div className="relative">
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold">
                Live Dashboard
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-on-dark-2">
                A live, easy-to-use dashboard for every call — queues, agents,
                reporting and more.
              </p>
              <Link
                href="/live-dashboard"
                className="mt-6 inline-flex rounded-full bg-orange px-6 py-3 text-sm font-semibold font-[family-name:var(--font-heading)] text-ink shadow-[0_0_0_0_rgba(245,138,11,0)] transition-[background-color,box-shadow,transform] hover:-translate-y-0.5 hover:bg-orange-3 hover:shadow-[0_8px_28px_-6px_rgba(245,138,11,0.65)]"
              >
                See the Live Dashboard
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
