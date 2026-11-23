"use client";

import { useState } from "react";
import { CalendarEntry, DayStatus } from "./types";

export function DateRangeAdder({
  onAddMany,
}: {
  onAddMany: (entries: CalendarEntry[]) => void;
}) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [status, setStatus] = useState<DayStatus>("closed");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");

  function addRange() {
    if (!start || !end) return;
    const startDate = new Date(`${start}T00:00:00`);
    const endDate = new Date(`${end}T00:00:00`);
    if (endDate < startDate) return;

    const entries: CalendarEntry[] = [];
    const cursor = new Date(startDate);
    while (cursor <= endDate) {
      const key = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(
        cursor.getDate(),
      ).padStart(2, "0")}`;
      entries.push(
        status === "closed"
          ? { date: key, status: "closed" }
          : { date: key, status: "custom-hours", openTime, closeTime },
      );
      cursor.setDate(cursor.getDate() + 1);
    }
    onAddMany(entries);
    setStart("");
    setEnd("");
  }

  return (
    <div className="surface rounded-2xl border bg-white p-4">
      <h4 className="text-xs font-bold uppercase tracking-wider text-muted">Add a date range</h4>
      <div className="mt-3 flex flex-wrap items-end gap-3">
        <label className="text-xs font-semibold text-ink">
          Start date
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="mt-1 block rounded-lg border border-soft-border px-3 py-1.5 text-sm"
          />
        </label>
        <label className="text-xs font-semibold text-ink">
          End date
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="mt-1 block rounded-lg border border-soft-border px-3 py-1.5 text-sm"
          />
        </label>
        <label className="text-xs font-semibold text-ink">
          Status
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as DayStatus)}
            className="mt-1 block rounded-lg border border-soft-border px-3 py-1.5 text-sm"
          >
            <option value="closed">Fully Closed</option>
            <option value="custom-hours">Custom Hours</option>
          </select>
        </label>
        {status === "custom-hours" ? (
          <>
            <label className="text-xs font-semibold text-ink">
              Open
              <input
                type="time"
                value={openTime}
                onChange={(e) => setOpenTime(e.target.value)}
                className="mt-1 block rounded-lg border border-soft-border px-3 py-1.5 text-sm"
              />
            </label>
            <label className="text-xs font-semibold text-ink">
              Close
              <input
                type="time"
                value={closeTime}
                onChange={(e) => setCloseTime(e.target.value)}
                className="mt-1 block rounded-lg border border-soft-border px-3 py-1.5 text-sm"
              />
            </label>
          </>
        ) : null}
        <button
          type="button"
          onClick={addRange}
          disabled={!start || !end || (status === "custom-hours" && (!openTime || !closeTime))}
          className="rounded-full bg-orange px-4 py-2 text-xs font-semibold text-ink hover:bg-orange-3 disabled:opacity-50"
        >
          Add Range
        </button>
      </div>
    </div>
  );
}
