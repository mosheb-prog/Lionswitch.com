"use client";

import { useMemo, useRef, useState } from "react";
import { CalendarEntries, CalendarEntry } from "./types";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

function formatMonthLabel(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function formatDateLabel(key: string): string {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function CalendarGrid({
  entries,
  holidayMap,
  initialMonth,
  onChangeEntry,
}: {
  entries: CalendarEntries;
  holidayMap: Map<string, string>;
  initialMonth: Date;
  onChangeEntry: (date: string, entry: CalendarEntry | null) => void;
}) {
  const [viewDate, setViewDate] = useState(initialMonth);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const cells = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startOffset = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const result: { key: string; day: number | null }[] = [];
    for (let i = 0; i < startOffset; i++) result.push({ key: `empty-${i}`, day: null });
    for (let day = 1; day <= daysInMonth; day++) {
      result.push({ key: dateKey(new Date(year, month, day)), day });
    }
    return result;
  }, [viewDate]);

  function focusDay(index: number) {
    const el = gridRef.current?.querySelector<HTMLButtonElement>(`[data-cell-index="${index}"]`);
    el?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    const moves: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    };
    if (e.key in moves) {
      e.preventDefault();
      const target = index + moves[e.key];
      if (target >= 0 && target < cells.length && cells[target].day !== null) {
        focusDay(target);
      }
    }
  }

  const selectedEntry = selectedDate ? entries[selectedDate] : undefined;

  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
          aria-label="Previous month"
          className="rounded-full p-2 hover:bg-soft"
        >
          &larr;
        </button>
        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-ink">
          {formatMonthLabel(viewDate)}
        </h3>
        <button
          type="button"
          onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
          aria-label="Next month"
          className="rounded-full p-2 hover:bg-soft"
        >
          &rarr;
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-bold uppercase tracking-wider text-muted">
        {WEEKDAYS.map((w) => (
          <div key={w}>{w}</div>
        ))}
      </div>

      <div ref={gridRef} role="grid" aria-label="Holiday calendar" className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((cell, index) => {
          if (cell.day === null) return <div key={cell.key} aria-hidden="true" />;

          const entry = entries[cell.key];
          const isHoliday = holidayMap.has(cell.key);
          const holidayLabel = holidayMap.get(cell.key);

          let classes = "relative h-11 w-full rounded-lg text-sm font-semibold focus-visible:z-10";
          if (entry?.status === "closed") {
            classes += " bg-ink text-on-dark";
          } else if (entry?.status === "custom-hours") {
            classes += " bg-white text-ink ring-2 ring-orange";
          } else if (isHoliday) {
            classes += " bg-orange/20 text-ink hover:bg-orange/30";
          } else {
            classes += " bg-soft text-ink hover:bg-soft-border/60";
          }

          return (
            <button
              key={cell.key}
              type="button"
              data-cell-index={index}
              tabIndex={selectedDate === cell.key || (!selectedDate && index === cells.findIndex((c) => c.day !== null)) ? 0 : -1}
              onKeyDown={(e) => onKeyDown(e, index)}
              onClick={() => setSelectedDate(cell.key)}
              aria-pressed={selectedDate === cell.key}
              aria-label={`${formatDateLabel(cell.key)}${holidayLabel ? `, ${holidayLabel}` : ""}${
                entry ? `, currently ${entry.status === "closed" ? "fully closed" : "custom hours"}` : ""
              }`}
              className={classes}
            >
              {cell.day}
            </button>
          );
        })}
      </div>

      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-orange/20" /> Jewish holiday
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-ink" /> Fully closed
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-white ring-2 ring-orange" /> Custom hours
        </span>
      </p>

      {selectedDate ? (
        <div className="mt-4 rounded-2xl border border-soft-border bg-soft p-4">
          <div className="flex items-center justify-between gap-4">
            <h4 className="font-[family-name:var(--font-heading)] text-sm font-bold text-ink">
              {formatDateLabel(selectedDate)}
            </h4>
            <button
              type="button"
              onClick={() => setSelectedDate(null)}
              aria-label="Close date editor"
              className="text-muted hover:text-ink"
            >
              &times;
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onChangeEntry(selectedDate, { date: selectedDate, status: "closed" })}
              className={`rounded-full px-4 py-2 text-xs font-semibold ${
                selectedEntry?.status === "closed"
                  ? "bg-ink text-on-dark"
                  : "bg-white text-ink ring-1 ring-inset ring-soft-border"
              }`}
            >
              Fully Closed
            </button>
            <button
              type="button"
              onClick={() =>
                onChangeEntry(selectedDate, {
                  date: selectedDate,
                  status: "custom-hours",
                  openTime: selectedEntry?.openTime ?? "",
                  closeTime: selectedEntry?.closeTime ?? "",
                })
              }
              className={`rounded-full px-4 py-2 text-xs font-semibold ${
                selectedEntry?.status === "custom-hours"
                  ? "bg-orange text-ink"
                  : "bg-white text-ink ring-1 ring-inset ring-soft-border"
              }`}
            >
              Custom Hours
            </button>
            {entryExists(entries, selectedDate) ? (
              <button
                type="button"
                onClick={() => onChangeEntry(selectedDate, null)}
                className="rounded-full px-4 py-2 text-xs font-semibold text-red-700 ring-1 ring-inset ring-red-200"
              >
                Clear
              </button>
            ) : null}
          </div>

          {selectedEntry?.status === "custom-hours" ? (
            <div className="mt-3 flex flex-wrap items-end gap-3">
              <label className="text-xs font-semibold text-ink">
                Open
                <input
                  type="time"
                  value={selectedEntry.openTime ?? ""}
                  onChange={(e) =>
                    onChangeEntry(selectedDate, { ...selectedEntry, openTime: e.target.value })
                  }
                  className="mt-1 block rounded-lg border border-soft-border px-3 py-1.5 text-sm"
                />
              </label>
              <label className="text-xs font-semibold text-ink">
                Close
                <input
                  type="time"
                  value={selectedEntry.closeTime ?? ""}
                  onChange={(e) =>
                    onChangeEntry(selectedDate, { ...selectedEntry, closeTime: e.target.value })
                  }
                  className="mt-1 block rounded-lg border border-soft-border px-3 py-1.5 text-sm"
                />
              </label>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function entryExists(entries: CalendarEntries, date: string) {
  return Boolean(entries[date]);
}
