import {
  DateKey,
  dayBefore,
  formatLong,
  formatShort,
  fromKey,
  holidayOccurrences,
  usHolidayLabel,
} from "@/lib/holiday-calendar";

// Builds the holiday-preferences submission in the same shape (field names
// and summary wording) as the original lionswitch.com form, so the existing
// Google Sheet / Apps Script and the team's workflow keep working unchanged.

export type DayChoice = { type: "closed" | "custom"; openTime?: string; closeTime?: string };

export type HolidayFormInput = {
  dates: Record<DateKey, DayChoice>;
  officeClosed: boolean;
  useStandardGreeting: boolean;
  customGreeting: string;
  setUpEmergencyRouting: boolean;
  forwardingType: "" | "external" | "internal" | "both";
  forwardingValue: string;
  genPhoneNumber: string;
  voicemailDestination: string;
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  additionalNotes: string;
};

type Group = {
  holidayName: string;
  holidayType: "Jewish Holiday" | "US Holiday";
  dates: DateKey[];
  isErev: Map<DateKey, boolean>;
};

function groupDates(keys: DateKey[]) {
  const years = [...new Set(keys.map((k) => Number(k.slice(0, 4))))];
  const lookupYears = [...new Set(years.flatMap((y) => [y - 1, y, y + 1]))];
  const selected = new Set(keys);
  const owner = new Map<DateKey, { parent: string; isErev: boolean; jewish: boolean }>();

  for (const p of holidayOccurrences(lookupYears)) {
    if (p.isJewish) {
      const erev = dayBefore(p.dates[0]);
      if (selected.has(erev)) owner.set(erev, { parent: p.label, isErev: true, jewish: true });
    }
    for (const d of p.dates) {
      if (selected.has(d)) owner.set(d, { parent: p.label, isErev: false, jewish: p.isJewish });
    }
  }
  for (const k of keys) {
    const us = !owner.has(k) && usHolidayLabel(k);
    if (us) owner.set(k, { parent: us, isErev: false, jewish: false });
  }

  const groups = new Map<string, Group>();
  const unmatched: DateKey[] = [];
  for (const k of keys) {
    const o = owner.get(k);
    if (!o) {
      unmatched.push(k);
      continue;
    }
    const g: Group = groups.get(o.parent) ?? {
      holidayName: o.parent,
      holidayType: o.jewish ? "Jewish Holiday" : "US Holiday",
      dates: [],
      isErev: new Map(),
    };
    g.dates.push(k);
    g.isErev.set(k, o.isErev);
    groups.set(o.parent, g);
  }
  return { groups: [...groups.values()], unmatched };
}

const FORWARDING_LABELS = { external: "External Phone Number", internal: "Internal Extension", both: "Both" };

export function buildHolidaySubmission(input: HolidayFormInput) {
  const keys = Object.keys(input.dates).sort();
  const { groups, unmatched } = groupDates(keys);
  const pick = (k: DateKey) => input.dates[k];

  // One-line per-holiday details ("Rosh Hashanah 2027: Oct 1 EREV half-day 9:00 AM-1:00 PM, Oct 2 closed")
  const details: string[] = [];
  for (const g of groups) {
    const parts = g.dates.map((k) => {
      const c = pick(k);
      const day = formatShort(fromKey(k));
      const erev = g.isErev.get(k);
      if (erev && c.type === "custom") return `${day} EREV half-day ${c.openTime}-${c.closeTime}`;
      if (erev) return `${day} EREV closed`;
      if (c.type === "custom") return `${day} custom ${c.openTime}-${c.closeTime}`;
      return `${day} closed`;
    });
    details.push(`${g.holidayName}: ${parts.join(", ")}`);
  }
  for (const k of unmatched) {
    const c = pick(k);
    const day = formatShort(fromKey(k));
    details.push(c.type === "custom" ? `Other: ${day} custom ${c.openTime}-${c.closeTime}` : `Other: ${day} closed`);
  }

  const erevHalfDays = groups.flatMap((g) =>
    g.dates
      .filter((k) => g.isErev.get(k) && pick(k).type === "custom")
      .map((k) => `${formatLong(fromKey(k))} — ${pick(k).openTime} to ${pick(k).closeTime} (${g.holidayName})`),
  );

  const lines: string[] = [
    "HOLIDAY SCHEDULE",
    `Client: ${input.firstName} ${input.lastName} | ${input.companyName} | ${input.email}`,
    "",
    "SELECTED DATES:",
  ];
  for (const g of groups) {
    lines.push(`\n${g.holidayName} (${g.holidayType})`);
    for (const k of g.dates) {
      const c = pick(k);
      const day = formatLong(fromKey(k));
      const erev = g.isErev.get(k);
      if (erev && c.type === "custom") lines.push(`  ★ ${day} — EREV YOM TOV HALF DAY (${c.openTime}–${c.closeTime})`);
      else if (erev) lines.push(`  • ${day} — EREV YOM TOV (closed)`);
      else if (c.type === "custom") lines.push(`  • ${day} — custom hours ${c.openTime}–${c.closeTime}`);
      else lines.push(`  • ${day} — fully closed`);
    }
  }
  if (unmatched.length) {
    lines.push("\nOther dates:");
    for (const k of unmatched) {
      const c = pick(k);
      const day = formatLong(fromKey(k));
      lines.push(c.type === "custom" ? `  • ${day} — custom hours ${c.openTime}–${c.closeTime}` : `  • ${day} — fully closed`);
    }
  }
  const fwdLabel = input.forwardingType ? FORWARDING_LABELS[input.forwardingType] : "";
  lines.push("");
  lines.push(`Office fully closed: ${input.officeClosed ? "Yes" : "No"}`);
  lines.push(`Greeting: ${input.useStandardGreeting ? "Standard" : "Custom"}`);
  if (!input.useStandardGreeting && input.customGreeting) lines.push(`Custom greeting: "${input.customGreeting}"`);
  lines.push(`Emergency routing: ${input.setUpEmergencyRouting ? "Yes" : "No"}`);
  if (input.setUpEmergencyRouting) {
    lines.push(`Forwarding: ${fwdLabel || "n/a"} — ${input.forwardingValue || "n/a"}`);
    lines.push(`Voicemail destination: ${input.voicemailDestination || "n/a"}`);
  }
  if (input.additionalNotes) lines.push(`Notes: ${input.additionalNotes}`);
  lines.push(`\nTotal dates: ${keys.length}`);

  const holidaySummary = lines.join("\n");

  // Same field names the original form posted to its Google Apps Script.
  const fields: Record<string, string> = {
    firstName: input.firstName,
    lastName: input.lastName,
    companyName: input.companyName,
    email: input.email,
    holidaysSelected: groups.map((g) => g.holidayName).join(", ") || "Custom dates",
    dateCount: String(keys.length),
    dateDetails: details.join(" | "),
    erevYomTov: erevHalfDays.length ? erevHalfDays.join(" | ") : "None",
    holidaySummary,
    rawDateData: keys
      .map((k) => `${k}|${pick(k).type}|${pick(k).openTime ?? ""}|${pick(k).closeTime ?? ""}`)
      .join("; "),
    officeClosed: input.officeClosed ? "Yes" : "No",
    useStandardGreeting: input.useStandardGreeting ? "Yes" : "No",
    customGreeting: input.customGreeting,
    setUpEmergencyRouting: input.setUpEmergencyRouting ? "Yes" : "No",
    emergencyForwardingType: input.setUpEmergencyRouting ? input.forwardingType : "",
    emergencyForwardingValue: input.setUpEmergencyRouting ? input.forwardingValue : "",
    genPhoneNumber: input.genPhoneNumber,
    voicemailDestination: input.voicemailDestination,
    additionalNotes: input.additionalNotes,
  };

  return { fields, holidaySummary, dateCount: keys.length };
}
