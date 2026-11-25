import type { DetailContent } from "@/components/detail/DetailPage";
import { SERVICES } from "@/lib/constants";

// Expanded content for the six service pages. Features listed here are the
// ones already on /features; nothing new is claimed.

type Extra = Omit<DetailContent, "eyebrow" | "title" | "description">;

const R = {
  voice: { label: "Business Phone & Cloud PBX", href: "/services/voice", body: "Hosted phone service, auto attendant and number porting." },
  ucaas: { label: "Unified Communications", href: "/services/ucaas", body: "The ConnectUC app for calls, texts, chat and video." },
  contactCenter: { label: "Contact Center", href: "/services/contact-center", body: "Queues and ring groups up to omnichannel routing." },
  ai: { label: "AI & Analytics", href: "/services/ai-analytics", body: "Summaries and sentiment after every call ends." },
  messaging: { label: "Business Messaging", href: "/services/messaging", body: "SMS, MMS, shared inboxes and virtual fax." },
  integrations: { label: "Integrations", href: "/services/integrations", body: "Salesforce, HubSpot, Teams, Zapier and an open API." },
  dashboard: { label: "Live Dashboard", href: "/live-dashboard", body: "See every call live, with missed-call follow-ups." },
  mcp: { label: "Connect your AI (MCP)", href: "/mcp", body: "Ask any MCP-compatible AI about your calls, read-only." },
  switching: { label: "How Switching Works", href: "/switching", body: "Number porting and go-live, step by step." },
  industries: { label: "Industries", href: "/industries", body: "Medical, dental, skilled nursing, law and real estate." },
};

const EXTRA: Record<string, Extra> = {
  voice: {
    whoFor: ["Small and mid-size offices", "Multi-location businesses", "Medical and dental practices", "Teams replacing an on-site PBX", "Businesses keeping an existing PBX"],
    benefits: [
      { title: "No phone hardware to maintain", body: "Your phone system runs in the cloud, so there's no PBX box to buy, house or repair." },
      { title: "Keep your numbers", body: "The Lion Switch team handles number porting, so callers keep using the numbers they know." },
      { title: "Calls go where they should", body: "An auto attendant, call routing and ring groups send every caller to the right person." },
    ],
    features: [
      "Hosted VoIP / Cloud PBX",
      "SIP trunking for an on-premise PBX",
      "Auto attendant and call routing",
      "Number porting",
      "Toll-free numbers",
      "Call queues and ring groups",
      "Call recording",
      "E911 management for each device and location",
      "Zero-touch provisioned desk phones",
    ],
    faq: [
      { question: "Can I keep my phone numbers?", answer: "Yes. Lion Switch handles number porting for you." },
      { question: "We already have a phone system in the office. Do we have to replace it?", answer: "Not necessarily. SIP trunking connects an on-premise PBX to the phone network through Lion Switch." },
      { question: "How does 911 work?", answer: "E911 management routes emergency calls accurately for each device and location. Our 911 Notice explains how to keep each phone's address up to date." },
    ],
    related: [R.ucaas, R.messaging, R.switching, R.contactCenter, R.dashboard, R.industries],
  },
  ucaas: {
    whoFor: ["Hybrid and remote teams", "Teams on the road", "Offices using Microsoft Teams", "Growing businesses", "Anyone tired of juggling apps"],
    benefits: [
      { title: "One app for everything", body: "Calls, business texts, team chat and video meetings in the ConnectUC app." },
      { title: "Work from anywhere", body: "Your office extension on a laptop or cell phone, on iOS, Android, Windows, Mac and web." },
      { title: "Know who's available", body: "Presence shows who's free before you call or transfer." },
    ],
    features: [
      "ConnectUC app on iOS, Android, Windows, Mac and web",
      "Voice calling from your business number",
      "Business SMS",
      "Presence and status",
      "Team messaging",
      "Video meetings and screen sharing",
      "Visual voicemail with transcription",
      "Mobile and desktop softphone",
      "Microsoft Teams connector for external calls",
    ],
    faq: [
      { question: "What devices does ConnectUC run on?", answer: "iOS, Android, Windows, Mac and the web." },
      { question: "Does it work with Microsoft Teams?", answer: "Yes. The Microsoft Teams connector lets you make and receive external calls right inside Teams." },
      { question: "Do customers see my cell number when I call from the app?", answer: "No. Calls from the ConnectUC app use your business number." },
    ],
    related: [R.voice, R.messaging, R.mcp, R.integrations, R.switching, R.industries],
  },
  "contact-center": {
    whoFor: ["Customer service teams", "Sales and intake teams", "Front desks with heavy call volume", "Help desks", "Growing call centers"],
    benefits: [
      { title: "Start simple, grow when ready", body: "Basic call center features are included; the advanced contact center is available as an add-on." },
      { title: "Every caller routed well", body: "Queues, ring groups and smart routing spread calls across your team." },
      { title: "See it as it happens", body: "Real-time dashboards show queues, waiting callers and agents." },
    ],
    features: [
      "Call queues",
      "Ring groups",
      "Basic reporting",
      "Omnichannel routing (add-on)",
      "Smart / skills-based routing",
      "Scripting (add-on)",
      "Analytics (add-on)",
      "Visual IVR builder (add-on)",
      "Real-time dashboards (add-on)",
      "CRM screen pop (add-on)",
    ],
    faq: [
      { question: "What's included and what's an add-on?", answer: "Queues, ring groups and basic reporting are included. Omnichannel routing, scripting, analytics, the visual IVR builder, real-time dashboards and CRM screen pop are part of the advanced contact center add-on." },
      { question: "Can agents see the caller's record when a call comes in?", answer: "Yes, with CRM screen pop in the advanced contact center, the caller's CRM record opens as the call rings." },
      { question: "Can managers watch queues live?", answer: "Yes. Real-time dashboards show queues and agents, and the Lion Switch live dashboard shows calls waiting and missed calls." },
    ],
    related: [R.dashboard, R.ai, R.integrations, R.voice, R.ucaas, R.industries],
  },
  "ai-analytics": {
    whoFor: ["Owners who can't listen to every call", "Sales and service managers", "Teams that follow up on calls", "Businesses using AI assistants", "Practices and offices with busy lines"],
    benefits: [
      { title: "Read calls instead of replaying them", body: "Transcripts and summaries are ready after each call ends." },
      { title: "Spot who needs attention", body: "Sentiment analysis helps you find upset callers so you can follow up." },
      { title: "Ask your own AI", body: "Connect any AI assistant that supports MCP and ask it about your calls, read-only." },
    ],
    features: [
      "Call transcription after each call ends",
      "Call summaries",
      "Sentiment analysis",
      "Voicemail transcription",
      "Predictive routing",
      "200+ custom reports",
      "MCP connection to the AI assistant you choose (read-only)",
      "Ask AI in the live dashboard",
    ],
    faq: [
      { question: "Are calls transcribed live?", answer: "No. Calls are transcribed and analyzed after they end, never live." },
      { question: "Is AI included?", answer: "Transcription and the AI connection are optional add-ons." },
      { question: "Can the AI change our phone settings?", answer: "No. The AI connection is read-only. It can answer questions about your call data but can't change phone settings." },
    ],
    related: [R.mcp, R.dashboard, R.contactCenter, R.integrations, R.voice, R.industries],
  },
  messaging: {
    whoFor: ["Teams that text customers", "Front desks and schedulers", "Sales teams", "Offices that still fax", "Businesses that need message records"],
    benefits: [
      { title: "Text from your business number", body: "Customers text the number they already know, not an employee's cell phone." },
      { title: "Handle texts as a team", body: "Shared inboxes let several people work the same conversations." },
      { title: "Fax without a fax machine", body: "Send and receive faxes digitally." },
    ],
    features: ["Business SMS and MMS", "Shared team inboxes", "Virtual fax", "Compliant message archiving", "Texting in the ConnectUC app"],
    faq: [
      { question: "Can we text from our main business number?", answer: "Yes. Business SMS and MMS let your team text from your business number." },
      { question: "Do we still need a fax machine?", answer: "No. Virtual fax lets you send and receive faxes without one." },
      { question: "What do we need to know before texting customers?", answer: "Texting customers requires their consent and honoring opt-out replies. Our Acceptable Use Policy explains your responsibilities, and we'll walk you through setup." },
    ],
    related: [R.ucaas, R.voice, R.integrations, R.industries, R.switching, R.dashboard],
  },
  integrations: {
    whoFor: ["Salesforce and HubSpot users", "Microsoft Teams offices", "Teams using Zapier", "Developers", "Businesses with custom tools"],
    benefits: [
      { title: "Calls where you already work", body: "Connect calls and contacts to Salesforce, HubSpot and Microsoft Teams." },
      { title: "Automate the busywork", body: "Send call events to other apps with Zapier." },
      { title: "Build your own", body: "An open REST API and a Voice API for custom workflows." },
    ],
    features: ["Salesforce integration", "HubSpot integration", "Microsoft Teams", "Zapier", "CRM integrations", "Open REST API", "Voice API", "QoS Monitor"],
    faq: [
      { question: "Which CRMs do you integrate with?", answer: "Lion Switch integrates with Salesforce and HubSpot, and connects to many other apps through Zapier." },
      { question: "Can we build our own integration?", answer: "Yes. Lion Switch offers an open REST API and a Voice API." },
      { question: "Can we connect an AI assistant?", answer: "Yes. Any AI assistant that supports MCP can connect to your call data, read-only." },
    ],
    related: [R.mcp, R.ucaas, R.contactCenter, R.ai, R.dashboard, R.industries],
  },
};

export function getServiceDetail(slug: string): DetailContent | null {
  const s = SERVICES.find((x) => x.slug === slug);
  const extra = EXTRA[slug];
  if (!s || !extra) return null;
  return { eyebrow: "Services", title: s.title, description: s.description, ...extra };
}
