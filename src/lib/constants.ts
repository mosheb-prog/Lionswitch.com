// Central source of truth for Lion Switch company facts, navigation and
// external links. Keep copy here (not scattered in JSX) so every page quotes
// the same wording.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lionswitch.com";

export const COMPANY = {
  name: "Lion Switch",
  legalName: "Lion Switch",
  description:
    "Lion Switch is a family-run cloud communications provider based in Brooklyn, New York, offering carrier-class business VoIP, UCaaS, contact center and messaging to businesses in all 50 states and internationally.",
  addressLine1: "1318 52nd Street",
  addressLocality: "Brooklyn",
  addressRegion: "NY",
  postalCode: "11219",
  addressCountry: "US",
  get fullAddress() {
    return `${this.addressLine1}, ${this.addressLocality}, ${this.addressRegion} ${this.postalCode}`;
  },
  phoneDisplay: "1 (347) 566-5466",
  phoneHref: "tel:+13475665466",
  email: "info@lionswitch.com",
  emailHref: "mailto:info@lionswitch.com",
  hours: [
    { days: "Monday – Thursday", time: "9:00 AM – 5:00 PM" },
    { days: "Friday", time: "9:00 AM – 1:00 PM" },
    { days: "Saturday – Sunday", time: "Closed" },
  ],
  // Support wording used everywhere on the site (stats bar, About, Support
  // page). Owner to confirm; the conflicting "24/7 emergency" line from the
  // old site is not shown until confirmed.
  supportLineGeneral: "24/6 live support",
  tagline: "Enterprise Cloud Communications",
  taglineLong:
    "White-glove service from a family-run Brooklyn team — because your business deserves better than a call center.",
  copyright: `© ${new Date().getFullYear() === 2026 ? 2026 : new Date().getFullYear()} Lion Switch. All rights reserved.`,
  calendlyUrl: "https://calendly.com/mosheb-lionswitch/lion-switch-demo",
  connectUcUrl: "https://www.connectuc.io",
} as const;

export const STATS = {
  uptime: "99.999% uptime SLA",
  seats: "100k+ seats worldwide",
  // No integration count is shown: the old site's "50+" and "250+" figures
  // conflict. Add one here only once the owner confirms the right number.
  support: COMPANY.supportLineGeneral,
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const MAIN_NAV: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Features", href: "/features" },
  { label: "Live Dashboard", href: "/live-dashboard" },
  { label: "Why Lion Switch", href: "/why-lion-switch" },
  { label: "MCP", href: "/mcp" },
  { label: "Contact", href: "/contact" },
];

// Login & Support dropdown — every link here must be preserved exactly as
// provided by the business owner. Do not rename, drop or invent entries.
export const LOGIN_SUPPORT_LINKS: NavLink[] = [
  { label: "Portal Login", href: "https://portal.lionswitch.com/portal/" },
  {
    label: "Softphone Login",
    href: "https://auth.uc-technologies.com/oauth2/authorize?scope=offline_access&client_id=6179f817-5045-4832-aac8-679cc38cb970&response_type=code&redirect_uri=https://auth.uc-technologies.com/auth-callback?redirect=https://app.connectuc.io/auth/login&privacy_policy_url=https%3A%2F%2Fwww.connectuc.io%2Facceptable-use-policy.php&terms_of_service_url=https%3A%2F%2Fwww.connectuc.io%2Ftos&forgot_password_url=https%3A%2F%2Fapp.connectuc.io%2Fauth%2Fforgot-password%3Flogo%3Dhttps%3A%2F%2Fapp.connectuc.io%2Fassets%2FConnectUC-logo-icon-01.png&logo=https://app.connectuc.io/assets/ConnectUC-logo-icon-01.png",
  },
  { label: "Billing Portal", href: "https://lionswitch.billcenter.net/" },
];

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  bullets: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "voice",
    title: "Business Phone Systems & Cloud PBX",
    shortDescription: "VoIP phone service, auto-attendant, call routing, number porting.",
    description:
      "Carrier-class hosted VoIP and Cloud PBX with no on-site hardware to maintain. Lion Switch handles setup, number porting and call routing so your team just picks up the phone.",
    bullets: [
      "Hosted VoIP / Cloud PBX",
      "Auto-attendant and call routing",
      "Number porting — keep your numbers",
      "Toll-free numbers",
      "Call recording",
      "E911 management",
    ],
  },
  {
    slug: "ucaas",
    title: "Unified Communications (UCaaS)",
    shortDescription: "Voice, video, chat and file sharing in one platform.",
    description:
      "One platform for voice, video, chat and file sharing — accessible from the ConnectUC app on desktop, mobile and web, so your team stays connected from anywhere.",
    bullets: [
      "ConnectUC unified communications app",
      "Mobile and desktop softphone",
      "Team messaging and presence",
      "Microsoft Teams connector for external calling",
    ],
  },
  {
    slug: "contact-center",
    title: "Contact Center",
    shortDescription: "Omnichannel support, smart routing, real-time dashboards.",
    description:
      "From basic call queues to a full omnichannel contact center with scripting, analytics and real-time dashboards — sized to how your team actually works.",
    bullets: [
      "Omnichannel routing",
      "Smart / skills-based routing",
      "Real-time dashboards",
      "Visual IVR builder",
      "CRM screen pop",
    ],
  },
  {
    slug: "ai-analytics",
    title: "AI & Analytics",
    shortDescription: "Call summaries, sentiment analysis, predictive routing.",
    description:
      "After every call ends, Lion Switch transcribes it and surfaces summaries, sentiment and trends — so you spend less time listening to recordings and more time acting on them.",
    bullets: [
      "Post-call summaries and transcription",
      "Sentiment analysis",
      "Predictive routing",
      "200+ custom reports",
    ],
  },
  {
    slug: "messaging",
    title: "Business Messaging",
    shortDescription: "SMS, MMS, shared inboxes, message archiving.",
    description:
      "Text your customers the way they already communicate, with shared team inboxes and compliant archiving built in.",
    bullets: [
      "Business SMS and MMS",
      "Shared team inboxes",
      "Virtual fax",
      "Compliant message archiving",
    ],
  },
  {
    slug: "integrations",
    title: "Integrations",
    shortDescription: "Salesforce, HubSpot, Microsoft Teams, Zapier and more.",
    description:
      "Connect Lion Switch to the tools you already run your business on, or build your own connection with our open REST API.",
    bullets: [
      "Salesforce, HubSpot integrations",
      "Microsoft Teams, Zapier",
      "Open REST API",
      "CRM integrations",
    ],
  },
];

export const FOOTER_SOLUTIONS_LINKS: NavLink[] = [
  { label: "Voice", href: "/services/voice" },
  { label: "UCaaS", href: "/services/ucaas" },
  { label: "Messaging", href: "/services/messaging" },
  { label: "Video & Meetings", href: "/features#video" },
  { label: "Contact Center", href: "/services/contact-center" },
  { label: "AI & Analytics", href: "/services/ai-analytics" },
  { label: "Integrations", href: "/services/integrations" },
  { label: "Devices", href: "/features#devices" },
  { label: "Live Dashboard", href: "/live-dashboard" },
];

export const FOOTER_COMPANY_LINKS: NavLink[] = [
  { label: "Why Lion Switch", href: "/why-lion-switch" },
  { label: "How Switching Works", href: "/switching" },
  { label: "Free Bill Review", href: "/bill-review" },
  { label: "Contact Us", href: "/contact" },
  { label: "Schedule a Demo", href: "/contact#demo" },
  { label: "Support", href: "/support" },
  { label: "Holiday Preferences", href: "/holiday-preferences" },
  { label: "Call Preferences", href: "/call-preferences" },
];

export const FOOTER_INDUSTRY_LINKS: NavLink[] = [
  { label: "Medical", href: "/industries/medical" },
  { label: "Dental", href: "/industries/dental" },
  { label: "Skilled Nursing & LTC", href: "/industries/skilled-nursing" },
  { label: "Law Firms", href: "/industries/law" },
  { label: "Real Estate", href: "/industries/real-estate" },
];
