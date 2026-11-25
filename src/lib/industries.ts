import type { DetailContent } from "@/components/detail/DetailPage";

// Industry pages. Every feature named here is one Lion Switch already lists on
// /features or the service pages. No compliance claims (HIPAA wording is pending
// the owner's confirmation), no statistics, no testimonials.

export type Industry = DetailContent & { slug: string; name: string; card: string };

const commonFaq = {
  numbers: {
    question: "Can we keep our current phone numbers?",
    answer: "Yes. Lion Switch handles number porting for you, so your patients, clients and customers keep calling the numbers they already know.",
  },
  holidays: {
    question: "How do we set up holiday and after-hours greetings?",
    answer:
      "Tell us your dates on our holiday preferences form, or upload the schedule you already send out, and the Lion Switch team sets up your auto attendant for those days.",
  },
};

const related = {
  voice: { label: "Business Phone & Cloud PBX", href: "/services/voice", body: "Auto attendant, call routing, queues and number porting." },
  ucaas: { label: "Unified Communications", href: "/services/ucaas", body: "The ConnectUC app for calls, texts, chat and video on any device." },
  messaging: { label: "Business Messaging", href: "/services/messaging", body: "Business SMS and MMS, shared inboxes and virtual fax." },
  contactCenter: { label: "Contact Center", href: "/services/contact-center", body: "Queues, ring groups and real-time dashboards." },
  ai: { label: "AI & Analytics", href: "/services/ai-analytics", body: "Call summaries and sentiment, after every call ends." },
  integrations: { label: "Integrations", href: "/services/integrations", body: "Salesforce, HubSpot, Microsoft Teams, Zapier and an open API." },
  dashboard: { label: "Live Dashboard", href: "/live-dashboard", body: "See every call live, plus missed-call follow-ups." },
  switching: { label: "How Switching Works", href: "/switching", body: "What moving to Lion Switch looks like, step by step." },
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "medical",
    name: "Medical Practices",
    card: "Keep the front desk answering, route calls to the right team, and never lose track of a patient's callback.",
    eyebrow: "Industries · Medical",
    title: "Phone systems for medical practices",
    description:
      "Help patients reach the right person the first time, keep your front desk from getting buried, and follow up on every missed call.",
    whoFor: ["Primary care", "Specialty practices", "Multi-location groups", "Urgent care", "Front desk teams", "Practice managers"],
    benefits: [
      { title: "Calls reach the right desk", body: "An auto attendant and call queues send patients to scheduling, billing or a nurse line instead of one ringing phone." },
      { title: "No missed callbacks", body: "The live dashboard shows missed calls and a follow-up list, so returning a patient's call doesn't depend on a sticky note." },
      { title: "Holiday and after-hours handled", body: "Send us your closing dates and the Lion Switch team sets your greetings, so patients always hear the right message." },
    ],
    features: [
      "Auto attendant and call routing",
      "Call queues and ring groups for the front desk",
      "After-hours and holiday greetings",
      "Virtual fax",
      "Business SMS and MMS from your practice number",
      "Visual voicemail with transcription",
      "ConnectUC app for staff on the go",
      "Live dashboard with missed-call follow-ups",
      "Call recording",
    ],
    faq: [
      commonFaq.numbers,
      { question: "Can we still send and receive faxes?", answer: "Yes. Virtual fax lets you send and receive faxes without a fax machine." },
      commonFaq.holidays,
      { question: "Can staff answer calls from another location?", answer: "Yes. With the ConnectUC app, staff can make and take calls on your practice lines from a computer or cell phone." },
    ],
    related: [related.voice, related.messaging, related.dashboard, related.switching, related.ai, related.contactCenter],
  },
  {
    slug: "dental",
    name: "Dental Practices",
    card: "Answer every new-patient call, text patients from your office number, and see missed calls before they become missed appointments.",
    eyebrow: "Industries · Dental",
    title: "Phone systems for dental practices",
    description:
      "Every unanswered call can be a lost appointment. Route calls cleanly, text patients from your office number, and see who still needs a call back.",
    whoFor: ["General dentistry", "Orthodontics", "Pediatric dentistry", "Oral surgery", "Multi-location groups", "Front desk teams"],
    benefits: [
      { title: "Never lose a new patient", body: "Queues and ring groups make sure calls ring the right people, and missed calls land on a follow-up list." },
      { title: "Text from your office number", body: "Send and receive texts from your practice number instead of staff cell phones." },
      { title: "A clear view of the day", body: "The live dashboard shows calls in progress, answered and missed calls, and who needs a callback." },
    ],
    features: [
      "Auto attendant and call routing",
      "Call queues and ring groups",
      "Business SMS and MMS",
      "Shared inboxes for patient texts",
      "Virtual fax",
      "After-hours and holiday greetings",
      "Visual voicemail with transcription",
      "Live dashboard with missed-call follow-ups",
      "Zero-touch provisioned desk phones",
    ],
    faq: [
      commonFaq.numbers,
      { question: "Can our front desk text patients?", answer: "Yes. Business SMS and MMS let your team text from your practice number, and shared inboxes let several people handle the same conversations." },
      commonFaq.holidays,
      { question: "Do we need new phones?", answer: "Lion Switch supports zero-touch provisioned desk phones, conference room systems, and softphones on computers and cell phones. We'll go over what fits your office on a demo call." },
    ],
    related: [related.voice, related.messaging, related.dashboard, related.switching, related.integrations, related.ai],
  },
  {
    slug: "skilled-nursing",
    name: "Skilled Nursing & Long-Term Care",
    card: "Reach the right unit, route families and admissions cleanly, and keep emergency calls tied to the right location.",
    eyebrow: "Industries · Skilled Nursing & Long-Term Care",
    title: "Phone systems for skilled nursing and long-term care",
    description:
      "Connect families, staff and admissions to the right unit or nurse station, with emergency calls routed accurately for each phone and location.",
    whoFor: ["Skilled nursing facilities", "Long-term care", "Assisted living", "Rehabilitation centers", "Nurse stations", "Administrators"],
    benefits: [
      { title: "Calls reach the right unit", body: "An auto attendant, queues and ring groups route families and staff to the right floor, unit or department." },
      { title: "Emergency calls go to the right place", body: "E911 management routes emergency calls accurately for each device and location in your building." },
      { title: "See what's happening", body: "The live dashboard shows calls waiting, queues and missed calls across the facility." },
    ],
    features: [
      "Auto attendant and call routing",
      "Call queues and ring groups for units and nurse stations",
      "E911 management for each device and location",
      "After-hours and holiday routing",
      "Conference room systems",
      "ConnectUC app for staff on the go",
      "Live dashboard with queues and missed calls",
      "Call recording",
    ],
    faq: [
      commonFaq.numbers,
      { question: "How are 911 calls handled in a large building?", answer: "E911 management routes emergency calls accurately for each device and location. Keep us updated when phones move so each phone's registered location stays correct." },
      commonFaq.holidays,
      { question: "Can we set up separate lines for admissions and families?", answer: "Yes. The auto attendant, queues and ring groups can send each type of caller to the right team." },
    ],
    related: [related.voice, related.contactCenter, related.dashboard, related.switching, related.messaging, related.ucaas],
  },
  {
    slug: "law",
    name: "Law Firms",
    card: "Answer every client call, reach attorneys wherever they are, and connect calls to the tools your firm runs on.",
    eyebrow: "Industries · Law Firms",
    title: "Phone systems for law firms",
    description:
      "Make sure every client and prospective client reaches the right person, whether your attorneys are in the office, in court or working from home.",
    whoFor: ["Solo practitioners", "Small and mid-size firms", "Intake teams", "Receptionists", "Attorneys on the go", "Office managers"],
    benefits: [
      { title: "Reach attorneys anywhere", body: "The ConnectUC app puts your office extension on a laptop or cell phone, with presence so staff know who's available." },
      { title: "Never miss an intake call", body: "Queues route new-client calls to your intake team, and missed calls land on a follow-up list in the live dashboard." },
      { title: "Calls connected to your tools", body: "Integrations with Salesforce, HubSpot, Microsoft Teams and Zapier, plus an open REST API." },
    ],
    features: [
      "Auto attendant and call routing",
      "Call queues for intake",
      "ConnectUC app with presence and team messaging",
      "Microsoft Teams connector for external calls",
      "Video meetings and screen sharing",
      "Visual voicemail with transcription",
      "Call recording",
      "Virtual fax",
      "Optional AI call summaries after each call ends",
    ],
    faq: [
      commonFaq.numbers,
      { question: "Can attorneys take calls from their cell phones?", answer: "Yes. The ConnectUC app lets attorneys make and take calls on the firm's lines from a cell phone or computer, so clients see the firm's number." },
      { question: "Does it work with Microsoft Teams?", answer: "Yes. The Microsoft Teams connector lets you make and receive external calls right inside Teams." },
      { question: "Are calls transcribed live?", answer: "No. If you add AI transcription, calls are transcribed and summarized after they end, never live." },
    ],
    related: [related.ucaas, related.integrations, related.ai, related.voice, related.switching, related.dashboard],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    card: "Agents on the go, texts from your business number, and calls connected to your CRM.",
    eyebrow: "Industries · Real Estate",
    title: "Phone systems for real estate",
    description:
      "Your agents live on their phones. Give them your business number on any device, text clients from it, and connect calls to your CRM.",
    whoFor: ["Brokerages", "Agent teams", "Property management", "Leasing offices", "Commercial real estate", "Mortgage and title"],
    benefits: [
      { title: "One business number, any device", body: "Agents make and take calls and texts from your business number on their cell phones with the ConnectUC app." },
      { title: "Every lead followed up", body: "Missed calls land on a follow-up list in the live dashboard, so no lead slips through." },
      { title: "Connected to your CRM", body: "Integrations with Salesforce, HubSpot and Zapier keep calls and contacts in the tools you already use." },
    ],
    features: [
      "ConnectUC app on iOS, Android, Windows, Mac and web",
      "Business SMS and MMS from your business number",
      "Shared inboxes for team texting",
      "Auto attendant and call routing",
      "Ring groups for agent teams",
      "Salesforce, HubSpot and Zapier integrations",
      "Visual voicemail with transcription",
      "Live dashboard with missed-call follow-ups",
    ],
    faq: [
      commonFaq.numbers,
      { question: "Can agents text clients from the business number?", answer: "Yes. Business SMS and MMS let agents text from your business number instead of their personal cell numbers." },
      { question: "Does it connect to our CRM?", answer: "Lion Switch integrates with Salesforce, HubSpot and Zapier, and offers an open REST API for other tools." },
      { question: "What happens when an agent leaves?", answer: "Because calls and texts use your business numbers, not personal cell numbers, the numbers stay with your company." },
    ],
    related: [related.ucaas, related.messaging, related.integrations, related.dashboard, related.switching, related.voice],
  },
];

export function getIndustry(slug: string) {
  return INDUSTRIES.find((i) => i.slug === slug);
}
