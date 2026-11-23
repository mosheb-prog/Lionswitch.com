import { HebrewCalendar } from "@hebcal/core";

export type HolidayDate = {
  date: string; // YYYY-MM-DD
  status: "closed" | "custom-hours";
  label: string;
};

function toDateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

function eventsForYear(year: number) {
  return HebrewCalendar.calendar({
    year,
    isHebrewYear: false,
    noMinorFast: true,
    noRoshChodesh: true,
    noSpecialShabbat: true,
    noModern: true,
    candlelighting: false,
  });
}

// The 5 Jewish holidays called out by name in the rebuild brief. Each maps
// to the hebcal event description(s) for its main (closed) days and its
// erev / eve day (selectable as custom hours), computed from the library —
// never hand-maintained date lists.
const JEWISH_HOLIDAY_DEFS: {
  id: string;
  label: string;
  mainMatch: (desc: string) => boolean;
  erevDesc: string;
}[] = [
  {
    id: "rosh-hashanah",
    label: "Rosh Hashanah",
    mainMatch: (desc) => /^Rosh Hashana( \d+)?$/.test(desc) || desc === "Rosh Hashana II",
    erevDesc: "Erev Rosh Hashana",
  },
  {
    id: "yom-kippur",
    label: "Yom Kippur",
    mainMatch: (desc) => desc === "Yom Kippur",
    erevDesc: "Erev Yom Kippur",
  },
  {
    id: "sukkot",
    label: "Sukkot",
    mainMatch: (desc) => desc === "Sukkot I" || desc === "Sukkot II",
    erevDesc: "Erev Sukkot",
  },
  {
    id: "pesach",
    label: "Pesach (Passover)",
    mainMatch: (desc) =>
      desc === "Pesach I" || desc === "Pesach II" || desc === "Pesach VII" || desc === "Pesach VIII",
    erevDesc: "Erev Pesach",
  },
  {
    id: "shavuot",
    label: "Shavuot",
    mainMatch: (desc) => desc === "Shavuot I" || desc === "Shavuot II",
    erevDesc: "Erev Shavuot",
  },
];

export function getJewishHolidayQuickAdd(
  id: string,
  years: number[],
): HolidayDate[] {
  const def = JEWISH_HOLIDAY_DEFS.find((d) => d.id === id);
  if (!def) return [];

  const results: HolidayDate[] = [];
  for (const year of years) {
    for (const ev of eventsForYear(year)) {
      const desc = ev.getDesc();
      const greg = ev.getDate().greg();
      if (def.mainMatch(desc)) {
        results.push({ date: toDateKey(greg), status: "closed", label: def.label });
      } else if (desc === def.erevDesc) {
        results.push({
          date: toDateKey(greg),
          status: "custom-hours",
          label: `Erev ${def.label}`,
        });
      }
    }
  }
  return results;
}

export const JEWISH_HOLIDAYS = JEWISH_HOLIDAY_DEFS.map((d) => ({ id: d.id, label: d.label }));

// Used to highlight Jewish holiday dates on the calendar (amber), regardless
// of whether the visitor has added them yet. Returns a map of date -> label.
export function getJewishHolidayDatesForYears(years: number[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const year of years) {
    for (const ev of eventsForYear(year)) {
      const desc = ev.getDesc();
      const def = JEWISH_HOLIDAY_DEFS.find((d) => d.mainMatch(desc) || d.erevDesc === desc);
      if (def) {
        map.set(toDateKey(ev.getDate().greg()), desc);
      }
    }
  }
  return map;
}
