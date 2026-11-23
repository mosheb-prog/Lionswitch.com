// Fixed and floating U.S. federal-style holiday dates, computed from plain
// date math (these follow deterministic calendar rules, unlike the Jewish
// holidays which require the Hebrew calendar).

function toDateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

// 0 = Sunday ... 6 = Saturday
function nthWeekdayOfMonth(year: number, month: number, weekday: number, n: number): Date {
  const first = new Date(year, month, 1);
  const firstWeekday = first.getDay();
  const offset = (weekday - firstWeekday + 7) % 7;
  const day = 1 + offset + (n - 1) * 7;
  return new Date(year, month, day);
}

function lastWeekdayOfMonth(year: number, month: number, weekday: number): Date {
  const last = new Date(year, month + 1, 0);
  const lastWeekday = last.getDay();
  const offset = (lastWeekday - weekday + 7) % 7;
  return new Date(year, month, last.getDate() - offset);
}

export type UsHolidayDef = {
  id: string;
  label: string;
  getDate: (year: number) => Date;
};

export const US_HOLIDAY_DEFS: UsHolidayDef[] = [
  { id: "new-years-day", label: "New Year's Day", getDate: (y) => new Date(y, 0, 1) },
  { id: "mlk-day", label: "MLK Day", getDate: (y) => nthWeekdayOfMonth(y, 0, 1, 3) },
  { id: "presidents-day", label: "Presidents' Day", getDate: (y) => nthWeekdayOfMonth(y, 1, 1, 3) },
  { id: "memorial-day", label: "Memorial Day", getDate: (y) => lastWeekdayOfMonth(y, 4, 1) },
  { id: "juneteenth", label: "Juneteenth", getDate: (y) => new Date(y, 5, 19) },
  { id: "july-4th", label: "July 4th", getDate: (y) => new Date(y, 6, 4) },
  { id: "labor-day", label: "Labor Day", getDate: (y) => nthWeekdayOfMonth(y, 8, 1, 1) },
  { id: "columbus-day", label: "Columbus Day", getDate: (y) => nthWeekdayOfMonth(y, 9, 1, 2) },
  { id: "veterans-day", label: "Veterans Day", getDate: (y) => new Date(y, 10, 11) },
  { id: "thanksgiving", label: "Thanksgiving", getDate: (y) => nthWeekdayOfMonth(y, 10, 4, 4) },
  { id: "christmas", label: "Christmas", getDate: (y) => new Date(y, 11, 25) },
];

export function getUsHolidayQuickAdd(
  id: string,
  years: number[],
): { date: string; status: "closed"; label: string }[] {
  const def = US_HOLIDAY_DEFS.find((d) => d.id === id);
  if (!def) return [];
  return years.map((year) => ({
    date: toDateKey(def.getDate(year)),
    status: "closed" as const,
    label: def.label,
  }));
}
