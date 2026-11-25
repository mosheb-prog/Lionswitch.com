import { ReactNode } from "react";
import {
  MailIcon,
  PhoneIcon,
  SparkleIcon,
} from "@/components/live-dashboard/icons";
import { COMPANY } from "@/lib/constants";

const base = "h-5 w-5";

function SmartphoneIcon({ className = base }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 18.5h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function VideoIcon({ className = base }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2.5" y="6" width="13" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15.5 10.5 21 7.5v9l-5.5-3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function HeadsetIcon({ className = base }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M19 19c0 1.5-1.5 2.5-4 2.5h-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PlugIcon({ className = base }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M9 3v4M15 3v4M7 7h10v4a5 5 0 0 1-10 0V7ZM12 16v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DeskPhoneIcon({ className = base }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="6" width="5" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="9.5" y="8" width="11.5" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="12" y="10.5" width="6.5" height="3.5" rx="0.8" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12.5 17h1M15 17h1M17.5 17h1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** Old category anchors that now live inside another category. */
export const CATEGORY_ALIASES: Record<string, string> = {
  "unified-communications": "connectuc-app",
};

export type Feature = { name: string; detail: string; addOn?: boolean };

export type FeatureCategory = {
  id: string;
  title: string;
  short: string;
  tagline: string;
  icon: (props: { className?: string }) => ReactNode;
  highlights: string[];
  features: Feature[];
  link?: { label: string; href: string };
};

export const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    id: "cloud-pbx",
    title: "Cloud PBX & Voice",
    short: "Voice",
    tagline: "Business phone service hosted in the cloud — no on-site hardware to maintain.",
    icon: PhoneIcon,
    highlights: ["No on-site hardware", "Keep your numbers", "E911 management"],
    features: [
      { name: "Cloud PBX / Hosted VoIP", detail: "Your phone system runs in the cloud, so there's no PBX box to buy, house or maintain." },
      { name: "SIP Trunking", detail: "Already have an on-premise PBX? SIP trunking connects it to the phone network." },
      { name: "Number Porting", detail: "Keep the numbers your customers already know — the Lion Switch team handles the port." },
      { name: "E911 Management", detail: "Emergency calls are routed accurately for each device and location." },
      { name: "Auto-attendant", detail: "Greet every caller and send them to the right person or department." },
      { name: "Toll-free numbers", detail: "Give customers a free way to reach you." },
      { name: "Call recording", detail: "Record calls for training, quality and record-keeping." },
    ],
  },
  {
    id: "connectuc-app",
    title: "ConnectUC App & Unified Communications",
    short: "ConnectUC",
    tagline: "ConnectUC is the Lion Switch UC app: calls, texts, chat and meetings on every device your team uses.",
    icon: SmartphoneIcon,
    highlights: ["iOS", "Android", "Windows", "Mac", "Web", "Microsoft Teams"],
    features: [
      { name: "Voice calling", detail: "Make and take business calls from your cell or computer." },
      { name: "Business SMS", detail: "Text customers from your business number, not your personal one." },
      { name: "Presence & status", detail: "See who's available before you call or transfer." },
      { name: "Team messaging", detail: "Chat and collaborate with co-workers in one place." },
      { name: "Video meetings & screen sharing", detail: "Jump from a call to a face-to-face meeting." },
      { name: "Visual voicemail with transcription", detail: "Read voicemails instead of listening to them." },
      { name: "Mobile & desktop softphone", detail: "Your office extension on your laptop or cell phone." },
      { name: "Microsoft Teams connector", detail: "Make and receive external calls right inside Microsoft Teams." },
    ],
    link: { label: "Visit ConnectUC", href: COMPANY.connectUcUrl },
  },
  {
    id: "messaging-fax",
    title: "Messaging & Fax",
    short: "Messaging",
    tagline: "Text your customers the way they already communicate.",
    icon: MailIcon,
    highlights: ["SMS & MMS", "Virtual fax", "Shared inboxes"],
    features: [
      { name: "Business SMS & MMS", detail: "Send texts and pictures from your business number." },
      { name: "Virtual fax", detail: "Send and receive faxes without a fax machine." },
      { name: "Shared inboxes", detail: "Let your team handle customer texts together." },
      { name: "Compliant message archiving", detail: "Keep a record of business messages." },
    ],
  },
  {
    id: "video",
    title: "Video & Collaboration",
    short: "Video",
    tagline: "Meetings, screen sharing and webinars, built into the same platform.",
    icon: VideoIcon,
    highlights: ["HD video", "Webinars", "Meeting transcripts"],
    features: [
      { name: "HD video conferencing", detail: "Clear video meetings with your team and customers." },
      { name: "Screen sharing", detail: "Walk through documents and screens together." },
      { name: "Recording", detail: "Record meetings to revisit or share later." },
      { name: "Webinar hosting", detail: "Present to larger audiences." },
      { name: "AI meeting transcriptions", detail: "Get a written transcript after the meeting ends." },
    ],
  },
  {
    id: "call-center",
    title: "Call Center & Contact Center",
    short: "Contact Center",
    tagline: "Basic call center included — advanced contact center available as an add-on.",
    icon: HeadsetIcon,
    highlights: ["Queues & ring groups", "Omnichannel add-on"],
    features: [
      { name: "Queues", detail: "Line callers up and spread them across your team." },
      { name: "Ring groups", detail: "Ring several people or phones at once." },
      { name: "Basic reporting", detail: "See how your queues are performing." },
      { name: "Omnichannel routing", detail: "Route calls, texts and chats through one system.", addOn: true },
      { name: "Scripting", detail: "Guide agents through every conversation.", addOn: true },
      { name: "Analytics", detail: "Deeper reporting on agents, queues and outcomes.", addOn: true },
      { name: "Visual IVR builder", detail: "Design your phone menu by dragging and dropping.", addOn: true },
      { name: "Real-time dashboards", detail: "Watch queues and agents live.", addOn: true },
      { name: "CRM screen pop", detail: "The caller's CRM record opens as the call rings.", addOn: true },
    ],
  },
  {
    id: "ai-features",
    title: "AI-Powered Features",
    short: "AI",
    tagline: "Calls are transcribed and analyzed after they end — never live.",
    icon: SparkleIcon,
    highlights: ["After the call", "Summaries", "Sentiment"],
    features: [
      { name: "Call transcription", detail: "A written transcript of each call, ready after it ends." },
      { name: "Call summarization", detail: "The key points of a call in a few lines." },
      { name: "Sentiment analysis", detail: "Spot upset callers so you can follow up." },
      { name: "Voicemail transcription", detail: "Voicemails turned into text." },
      { name: "Predictive routing", detail: "Send callers to the best-fit person or team." },
      { name: "200+ custom reports", detail: "Report on the numbers that matter to your business." },
    ],
  },
  {
    id: "integrations",
    title: "Integrations & API",
    short: "Integrations",
    tagline: "Connect your phones to the tools you already run your business on.",
    icon: PlugIcon,
    highlights: ["Salesforce", "HubSpot", "Microsoft Teams", "Zapier", "REST API"],
    features: [
      { name: "CRM integrations", detail: "Connect calls to the CRM your team already uses." },
      { name: "Voice API", detail: "Build voice into your own apps and workflows." },
      { name: "QoS Monitor", detail: "Keep an eye on call quality." },
      { name: "Salesforce", detail: "Calls and contacts connected to Salesforce." },
      { name: "HubSpot", detail: "Calls and contacts connected to HubSpot." },
      { name: "Microsoft Teams", detail: "External calling inside Teams." },
      { name: "Zapier", detail: "Send call events to thousands of apps." },
      { name: "Open REST API", detail: "Build your own integrations." },
    ],
  },
  {
    id: "devices",
    title: "Devices",
    short: "Devices",
    tagline: "Desk phones, conference systems and softphones — set up for you.",
    icon: DeskPhoneIcon,
    highlights: ["Zero-touch provisioning"],
    features: [
      { name: "Zero-touch provisioned desk phones", detail: "Phones arrive configured for your account." },
      { name: "Conference room systems", detail: "Audio for meeting rooms of any size." },
      { name: "Mobile & desktop softphones", detail: "Your extension on any computer or cell." },
    ],
  },
];
