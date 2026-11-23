"use client";

import { JEWISH_HOLIDAYS, getJewishHolidayQuickAdd } from "@/lib/jewish-holidays";
import { US_HOLIDAY_DEFS, getUsHolidayQuickAdd } from "@/lib/us-holidays";
import { CalendarEntry } from "./types";

export function QuickAddButtons({
  years,
  onAddMany,
}: {
  years: [number, number];
  onAddMany: (entries: CalendarEntry[]) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted">
          Jewish Holidays
        </h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {JEWISH_HOLIDAYS.map((h) => (
            <button
              key={h.id}
              type="button"
              onClick={() => onAddMany(getJewishHolidayQuickAdd(h.id, years))}
              className="rounded-full border border-soft-border px-3 py-1.5 text-xs font-semibold text-ink hover:border-orange"
            >
              + {h.label} ({years[0]} &amp; {years[1]})
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted">U.S. Holidays</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {US_HOLIDAY_DEFS.map((h) => (
            <button
              key={h.id}
              type="button"
              onClick={() => onAddMany(getUsHolidayQuickAdd(h.id, years))}
              className="rounded-full border border-soft-border px-3 py-1.5 text-xs font-semibold text-ink hover:border-orange"
            >
              + {h.label} ({years[0]} &amp; {years[1]})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
