export type DayStatus = "closed" | "custom-hours";

export type CalendarEntry = {
  date: string; // YYYY-MM-DD
  status: DayStatus;
  openTime?: string; // HH:MM, required when status is "custom-hours"
  closeTime?: string;
  label?: string;
};

export type CalendarEntries = Record<string, CalendarEntry>;
