import { HDate, HebrewCalendar, flags } from "@hebcal/core";

// Holiday date logic for the holiday preferences form. Every date is computed
// (Jewish holidays from the Hebrew calendar via Hebcal, diaspora schedule; US
// holidays from federal date rules), so the Quick-Add buttons and calendar
// labels roll forward on their own every year. Nothing is a hand-typed list.

export type DateKey = string; // YYYY-MM-DD

export function toKey(d: Date): DateKey {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function fromKey(key: DateKey): Date {
  return new Date(`${key}T00:00:00`);
}

/** "Tuesday, November 24, 2026" */
export function formatLong(d: Date) {
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}
/** "Nov 24, 2026" */
export function formatMedium(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
/** "Nov 24" */
export function formatShort(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function dayBefore(key: DateKey): DateKey {
  const d = fromKey(key);
  d.setDate(d.getDate() - 1);
  return toKey(d);
}

function rangeKeys(start: Date, end: Date): DateKey[] {
  const out: DateKey[] = [];
  const d = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  while (d <= end) {
    out.push(toKey(d));
    d.setDate(d.getDate() + 1);
  }
  return out;
}

/** Half-hour steps, "12:00 AM" … "11:30 PM". */
export const TIME_OPTIONS: string[] = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2);
  const m = i % 2 ? "30" : "00";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m} ${h < 12 ? "AM" : "PM"}`;
});

// ---------------------------------------------------------------------------
// US holidays (federal rules, including observed days)
// ---------------------------------------------------------------------------

function nthWeekday(year: number, month: number, weekday: number, n: number) {
  const first = new Date(year, month, 1);
  return new Date(year, month, 1 + ((weekday - first.getDay() + 7) % 7) + (n - 1) * 7);
}
function lastWeekday(year: number, month: number, weekday: number) {
  const last = new Date(year, month + 1, 0);
  return new Date(year, month, last.getDate() - ((last.getDay() - weekday + 7) % 7));
}

type UsDef = { label: string; calendarLabel?: string; date: (y: number) => Date; fixed?: boolean };

const US_DEFS: UsDef[] = [
  { label: "New Year's Day", date: (y) => new Date(y, 0, 1), fixed: true },
  { label: "MLK Day", date: (y) => nthWeekday(y, 0, 1, 3) },
  { label: "Presidents' Day", date: (y) => nthWeekday(y, 1, 1, 3) },
  { label: "Memorial Day", date: (y) => lastWeekday(y, 4, 1) },
  { label: "Juneteenth", date: (y) => new Date(y, 5, 19), fixed: true },
  { label: "July 4th", calendarLabel: "Independence Day", date: (y) => new Date(y, 6, 4), fixed: true },
  { label: "Labor Day", date: (y) => nthWeekday(y, 8, 1, 1) },
  { label: "Columbus Day", date: (y) => nthWeekday(y, 9, 1, 2) },
  { label: "Veterans Day", date: (y) => new Date(y, 10, 11), fixed: true },
  { label: "Thanksgiving", date: (y) => nthWeekday(y, 10, 4, 4) },
  { label: "Christmas", date: (y) => new Date(y, 11, 25), fixed: true },
];

const usLabelCache = new Map<number, Map<DateKey, string>>();

function usLabelsForYear(year: number): Map<DateKey, string> {
  const cached = usLabelCache.get(year);
  if (cached) return cached;
  const map = new Map<DateKey, string>();
  for (const def of US_DEFS) {
    const d = def.date(year);
    const name = def.calendarLabel ?? def.label;
    map.set(toKey(d), name);
    if (def.fixed && (d.getDay() === 6 || d.getDay() === 0)) {
      const obs = new Date(d);
      obs.setDate(d.getDate() + (d.getDay() === 6 ? -1 : 1));
      map.set(toKey(obs), `${name} (obs.)`);
    }
  }
  usLabelCache.set(year, map);
  return map;
}

/** US holiday name for a date (e.g. "Thanksgiving", "Independence Day (obs.)"), or null. */
export function usHolidayLabel(key: DateKey): string | null {
  const year = Number(key.slice(0, 4));
  // New Year's Day observed can fall on Dec 31 of the previous year.
  return usLabelsForYear(year).get(key) ?? usLabelsForYear(year + 1).get(key) ?? null;
}

// ---------------------------------------------------------------------------
// Jewish calendar
// ---------------------------------------------------------------------------

/** Hebrew date and first holiday name (if any) for a calendar cell. */
export function hebrewInfo(d: Date): { hebrewDay: number; hebrewMonth: string; holiday: string | null } {
  try {
    const hd = new HDate(d);
    const events = (HebrewCalendar.getHolidaysOnDate(hd, false) ?? []).filter(
      (e) => !(e.getFlags() & flags.YOM_KIPPUR_KATAN),
    );
    return { hebrewDay: hd.getDate(), hebrewMonth: hd.getMonthName(), holiday: events[0]?.render("en") ?? null };
  } catch {
    return { hebrewDay: 0, hebrewMonth: "", holiday: null };
  }
}

type JewishDef = { name: string; first: (desc: string) => boolean; last: (desc: string) => boolean };

// The five Yom Tov presets offered on the live form. Ranges follow the
// diaspora calendar (e.g. Sukkot = Sukkot I through Simchat Torah, 9 days).
const JEWISH_DEFS: JewishDef[] = [
  { name: "Rosh Hashanah", first: (s) => /^Rosh Hashana \d+$/.test(s), last: (s) => s === "Rosh Hashana II" },
  { name: "Yom Kippur", first: (s) => s === "Yom Kippur", last: (s) => s === "Yom Kippur" },
  { name: "Sukkot", first: (s) => s === "Sukkot I", last: (s) => s === "Simchat Torah" },
  { name: "Pesach", first: (s) => s === "Pesach I", last: (s) => s === "Pesach VIII" },
  { name: "Shavuot", first: (s) => s === "Shavuot I", last: (s) => s === "Shavuot II" },
];

export type HolidayPreset = {
  /** e.g. "Rosh Hashanah 2027" or "Thanksgiving" */
  label: string;
  dates: DateKey[];
  isJewish: boolean;
};

const jewishCache = new Map<number, HolidayPreset[]>();

function jewishOccurrences(year: number): HolidayPreset[] {
  const cached = jewishCache.get(year);
  if (cached) return cached;
  const events = HebrewCalendar.calendar({ year, isHebrewYear: false, il: false, noMinorFast: true, noModern: true });
  const out: HolidayPreset[] = [];
  for (const def of JEWISH_DEFS) {
    const start = events.find((e) => def.first(e.getDesc()));
    if (!start) continue;
    const startDate = start.getDate().greg();
    const end = events.find((e) => def.last(e.getDesc()) && e.getDate().greg() >= startDate);
    if (!end) continue;
    out.push({
      label: `${def.name} ${startDate.getFullYear()}`,
      dates: rangeKeys(startDate, end.getDate().greg()),
      isJewish: true,
    });
  }
  jewishCache.set(year, out);
  return out;
}

function usOccurrences(year: number): HolidayPreset[] {
  return US_DEFS.map((def) => ({ label: def.label, dates: [toKey(def.date(year))], isJewish: false }));
}

/** Every preset holiday occurrence in the given Gregorian years. */
export function holidayOccurrences(years: number[]): HolidayPreset[] {
  return years.flatMap((y) => [...jewishOccurrences(y), ...usOccurrences(y)]);
}

/**
 * The Quick-Add buttons: the next upcoming occurrence of each Jewish and US
 * holiday (anything not fully over yet), Jewish first, each group in date order.
 */
export function upcomingPresets(todayKey: DateKey): HolidayPreset[] {
  const year = Number(todayKey.slice(0, 4));
  const all = holidayOccurrences([year, year + 1, year + 2]);
  const pick = (isJewish: boolean) => {
    const seen = new Set<string>();
    return all
      .filter((p) => p.isJewish === isJewish && p.dates[p.dates.length - 1] >= todayKey)
      .sort((a, b) => a.dates[0].localeCompare(b.dates[0]))
      .filter((p) => {
        const base = p.label.replace(/\s+\d{4}$/, "");
        if (seen.has(base)) return false;
        seen.add(base);
        return true;
      });
  };
  return [...pick(true), ...pick(false)];
}
