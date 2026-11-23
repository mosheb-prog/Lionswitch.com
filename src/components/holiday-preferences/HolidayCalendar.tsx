"use client";

import { useMemo, useState } from "react";
import {
  DateKey,
  HolidayPreset,
  TIME_OPTIONS,
  dayBefore,
  formatLong,
  formatMedium,
  formatShort,
  fromKey,
  hebrewInfo,
  toKey,
  upcomingPresets,
  usHolidayLabel,
} from "@/lib/holiday-calendar";
import type { DayChoice } from "@/lib/holiday-submission";
import { Modal } from "./Modal";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const EREV_OPEN_OPTIONS = TIME_OPTIONS.filter((t) => TIME_OPTIONS.indexOf(t) <= TIME_OPTIONS.indexOf("12:00 PM"));
const EREV_CLOSE_OPTIONS = TIME_OPTIONS.filter(
  (t) => TIME_OPTIONS.indexOf(t) >= TIME_OPTIONS.indexOf("12:00 PM") && TIME_OPTIONS.indexOf(t) <= TIME_OPTIONS.indexOf("6:00 PM"),
);

type Selected = Map<DateKey, DayChoice>;

function groupConsecutive(keys: DateKey[]) {
  const sorted = [...keys].sort();
  const groups: { start: DateKey; end: DateKey; dates: DateKey[] }[] = [];
  for (const k of sorted) {
    const last = groups[groups.length - 1];
    if (last && (fromKey(k).getTime() - fromKey(last.end).getTime()) / 864e5 === 1) {
      last.end = k;
      last.dates.push(k);
    } else groups.push({ start: k, end: k, dates: [k] });
  }
  return groups;
}

function rangeLabel(dates: DateKey[], presets: HolidayPreset[]) {
  const sorted = [...dates].sort();
  // A preset holiday, optionally with its Erev day in front of it.
  const preset = presets.find((p) => {
    const allowed = new Set(p.isJewish ? [dayBefore(p.dates[0]), ...p.dates] : p.dates);
    return p.dates.every((d) => sorted.includes(d)) && sorted.every((d) => allowed.has(d));
  });
  if (preset) return preset.label;
  const us = [...new Set(sorted.map(usHolidayLabel).filter(Boolean))];
  if (us.length) return us.join(", ");
  for (const d of sorted) {
    const h = hebrewInfo(fromKey(d)).holiday;
    if (h) return h;
  }
  return null;
}

/* ---------- small inline icons ---------- */
const I = {
  star: "M10 2.5l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L2.8 7.8l5-.7L10 2.5Z",
  flag: "M4.5 17.5v-14m0 0h9l-1.8 3.5 1.8 3.5h-9",
  bolt: "M11 2 4 11h5l-1 7 7-9h-5l1-7Z",
  info: "M10 9v5m0-8h.01M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z",
  check: "m5 10.5 3 3 7-7",
  clock: "M10 6v4l2.5 2.5M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z",
  plus: "M10 4v12M4 10h12",
  x: "M6 6l8 8M14 6l-8 8",
  cal: "M3.5 7.5h13M6.5 2.5v3m7-3v3M4.5 4.5h11a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1Z",
  left: "m12 5-5 5 5 5",
  right: "m8 5 5 5-5 5",
  pencil: "m12.5 4.5 3 3L7 16H4v-3l8.5-8.5Z",
  sun: "M10 3v1.5M10 15.5V17M3 10h1.5M15.5 10H17M5 5l1 1M14 14l1 1M5 15l1-1M14 6l1-1M13 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  moon: "M16 12.5A6.5 6.5 0 0 1 7.5 4a6.5 6.5 0 1 0 8.5 8.5Z",
  trash: "M4.5 6h11M8 6V4.5h4V6m-6 0 .7 9.5h6.6L14 6",
};
function Icon({ d, className = "h-4 w-4" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const selectCls =
  "w-full cursor-pointer rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink";

function TimeSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="block min-w-0 flex-1">
      <span className="mb-1 block text-xs font-medium text-muted">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={selectCls}>
        {options.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </label>
  );
}

function ChoiceCard({
  active,
  onClick,
  title,
  body,
  icon,
  tone,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  body: string;
  icon: string;
  tone: "closed" | "custom";
}) {
  const on = tone === "closed" ? "border-orange bg-soft text-label" : "border-orange-3 bg-[#fff3e6] text-[#c2410c]";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex flex-col items-center rounded-xl border-2 p-4 text-center transition ${
        active ? on : "border-line bg-white text-ink hover:border-soft-border"
      }`}
    >
      <span className={`mb-2 grid h-10 w-10 place-items-center rounded-full ${active ? "bg-orange text-white" : "bg-soft text-muted"}`}>
        <Icon d={icon} className="h-5 w-5" />
      </span>
      <span className="text-sm font-bold">{title}</span>
      <span className="mt-1 text-[11px] leading-snug text-muted">{body}</span>
    </button>
  );
}

export function HolidayCalendar({
  todayKey,
  selected,
  onSetDate,
  onAddDates,
  onRemoveDate,
  onClearAll,
}: {
  todayKey: DateKey;
  selected: Selected;
  onSetDate: (key: DateKey, choice: DayChoice) => void;
  onAddDates: (keys: DateKey[]) => void;
  onRemoveDate: (key: DateKey) => void;
  onClearAll: () => void;
}) {
  const today = fromKey(todayKey);
  const presets = useMemo(() => upcomingPresets(todayKey), [todayKey]);

  const [monthOffset, setMonthOffset] = useState(0);
  const viewYear = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1).getFullYear();
  const viewMonth = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1).getMonth();

  // date range picker
  const [rangeOpen, setRangeOpen] = useState(false);
  const [rangeFrom, setRangeFrom] = useState("");
  const [rangeTo, setRangeTo] = useState("");

  // single-date dialog
  const [editing, setEditing] = useState<DateKey | null>(null);
  const [choice, setChoice] = useState<"closed" | "custom">("closed");
  const [openTime, setOpenTime] = useState("9:00 AM");
  const [closeTime, setCloseTime] = useState("5:00 PM");

  // Erev Yom Tov dialog
  const [erevFor, setErevFor] = useState<HolidayPreset | null>(null);
  const [erevStep, setErevStep] = useState<"ask" | "time">("ask");
  const [erevOpen, setErevOpen] = useState("9:00 AM");
  const [erevClose, setErevClose] = useState("3:00 PM");
  const erevDate = erevFor ? dayBefore(erevFor.dates[0]) : "";

  // remove-preset dialog
  const [removing, setRemoving] = useState<HolidayPreset | null>(null);

  const cells = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1);
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const out: Date[] = [];
    for (let i = first.getDay() - 1; i >= 0; i--) out.push(new Date(viewYear, viewMonth, -i));
    for (let d = 1; d <= daysInMonth; d++) out.push(new Date(viewYear, viewMonth, d));
    while (out.length % 7) out.push(new Date(viewYear, viewMonth + 1, out.length - daysInMonth - first.getDay() + 1));
    return out;
  }, [viewYear, viewMonth]);

  function openDate(key: DateKey) {
    const cur = selected.get(key);
    setEditing(key);
    setChoice(cur?.type ?? "closed");
    setOpenTime(cur?.openTime ?? "9:00 AM");
    setCloseTime(cur?.closeTime ?? "5:00 PM");
  }
  function saveDate() {
    if (!editing) return;
    onSetDate(editing, choice === "custom" ? { type: "custom", openTime, closeTime } : { type: "closed" });
    setEditing(null);
  }

  function clickPreset(p: HolidayPreset) {
    if (p.dates.every((d) => selected.has(d))) {
      setRemoving(p);
      return;
    }
    if (p.isJewish) {
      setErevFor(p);
      setErevStep("ask");
      setErevOpen("9:00 AM");
      setErevClose("3:00 PM");
    } else onAddDates(p.dates);
  }
  function erevClosed() {
    if (!erevFor) return;
    onAddDates(erevFor.dates);
    if (!selected.has(erevDate)) onSetDate(erevDate, { type: "closed" });
    setErevFor(null);
  }
  function erevSave() {
    if (!erevFor) return;
    onAddDates(erevFor.dates);
    onSetDate(erevDate, { type: "custom", openTime: erevOpen, closeTime: erevClose });
    setErevFor(null);
  }
  function confirmRemove() {
    if (!removing) return;
    removing.dates.forEach(onRemoveDate);
    if (removing.isJewish) {
      const erev = dayBefore(removing.dates[0]);
      if (selected.has(erev)) onRemoveDate(erev);
    }
    setRemoving(null);
  }
  function addRange() {
    if (!rangeFrom || !rangeTo) return;
    const start = fromKey(rangeFrom);
    const end = fromKey(rangeTo);
    if (end < start) return;
    const keys: DateKey[] = [];
    for (const d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) keys.push(toKey(d));
    onAddDates(keys);
    setRangeFrom("");
    setRangeTo("");
  }

  const groups = groupConsecutive([...selected.keys()]);
  const customEntries = [...selected.entries()].filter(([, c]) => c.type === "custom").sort(([a], [b]) => a.localeCompare(b));
  const closedEntries = [...selected.entries()].filter(([, c]) => c.type === "closed").sort(([a], [b]) => a.localeCompare(b));
  const editingDate = editing ? fromKey(editing) : null;

  return (
    <div className="w-full">
      {/* Info callout */}
      <div className="mb-4 flex items-start gap-3 rounded-xl border border-soft-border bg-soft p-4">
        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-orange/15 text-label">
          <Icon d={I.info} className="h-5 w-5" />
        </span>
        <div>
          <p className="mb-0.5 text-sm font-bold text-[#8a4a00]">Don&apos;t see your dates? Add them individually.</p>
          <p className="text-xs leading-relaxed text-[#8a4a00]/80">
            The buttons above only add the preset holiday dates. To add <strong>any</strong> date separately, scroll down
            to the calendar and simply click the date, then choose <strong>Fully Closed</strong> or{" "}
            <strong>Custom Hours</strong>. You can add as many individual dates as you need.
          </p>
        </div>
      </div>

      {/* Quick-add */}
      <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-text">
        <Icon d={I.bolt} className="h-5 w-5 text-orange" />
        Quick-Add Holidays
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {presets.map((p) => {
          const all = p.dates.every((d) => selected.has(d));
          const some = !all && p.dates.some((d) => selected.has(d));
          const tone = p.isJewish
            ? { ring: "border-orange", bgOn: "bg-soft", icon: "bg-orange/15 text-label" }
            : { ring: "border-emerald-500", bgOn: "bg-emerald-50", icon: "bg-emerald-100 text-emerald-700" };
          return (
            <button
              key={p.label}
              type="button"
              onClick={() => clickPreset(p)}
              aria-pressed={all}
              title={`${p.label}: ${formatMedium(fromKey(p.dates[0]))}${p.dates.length > 1 ? ` – ${formatMedium(fromKey(p.dates[p.dates.length - 1]))}` : ""}`}
              className={`flex items-center gap-3 rounded-xl border-2 px-3 py-3 text-left transition hover:-translate-y-0.5 ${
                all ? `${tone.ring} ${tone.bgOn} shadow-sm` : some ? `border-soft-border ${tone.bgOn}/60` : "border-line bg-white hover:border-soft-border"
              }`}
            >
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${tone.icon}`}>
                <Icon d={all ? I.check : p.isJewish ? I.star : I.flag} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold leading-tight text-ink">{p.label}</span>
                <span className="block text-[11px] text-muted">
                  {p.dates.length} day{p.dates.length === 1 ? "" : "s"} <span>· {p.isJewish ? "Jewish" : "US"}</span>
                  {all ? <span className="ml-1 font-semibold text-label">Added</span> : null}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-muted">
        Click any holiday to instantly add its dates. Then tap individual dates on the calendar to set custom hours if needed.
      </p>

      {/* Date range */}
      <div className="mt-5">
        <button
          type="button"
          onClick={() => setRangeOpen((o) => !o)}
          aria-expanded={rangeOpen}
          className="inline-flex items-center gap-2 rounded-lg px-1 py-1 text-sm font-semibold text-label hover:text-ink"
        >
          <Icon d={I.cal} />
          {rangeOpen ? "Hide date range picker" : "Select a date range"}
        </button>
        {rangeOpen ? (
          <div className="mt-3 flex flex-col gap-3 rounded-xl border border-line bg-cream p-4 sm:flex-row sm:items-end">
            <label className="block flex-1">
              <span className="mb-1 block text-xs font-medium text-muted">From</span>
              <input type="date" value={rangeFrom} onChange={(e) => setRangeFrom(e.target.value)} className={selectCls} />
            </label>
            <label className="block flex-1">
              <span className="mb-1 block text-xs font-medium text-muted">To</span>
              <input type="date" value={rangeTo} min={rangeFrom || undefined} onChange={(e) => setRangeTo(e.target.value)} className={selectCls} />
            </label>
            <button
              type="button"
              onClick={addRange}
              disabled={!rangeFrom || !rangeTo || rangeTo < rangeFrom}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-orange px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-orange-3 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Icon d={I.plus} />
              Select Range
            </button>
          </div>
        ) : null}
      </div>

      {/* Month header */}
      <div className="mb-4 mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMonthOffset((m) => m - 1)}
          aria-label="Previous month"
          className="grid h-10 w-10 place-items-center rounded-lg border border-line text-muted transition hover:bg-soft"
        >
          <Icon d={I.left} className="h-5 w-5" />
        </button>
        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-ink" aria-live="polite">
          {MONTHS[viewMonth]} {viewYear}
        </h3>
        <button
          type="button"
          onClick={() => setMonthOffset((m) => m + 1)}
          aria-label="Next month"
          className="grid h-10 w-10 place-items-center rounded-lg border border-line text-muted transition hover:bg-soft"
        >
          <Icon d={I.right} className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-2 text-center text-xs font-semibold uppercase tracking-wider text-muted/80">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 overflow-hidden rounded-xl border border-line text-[11px] md:text-xs">
        {cells.map((d, i) => {
          const key = toKey(d);
          const inMonth = d.getMonth() === viewMonth;
          const edge = i % 7 === 6 ? "border-r-0" : "";
          if (!inMonth) {
            return (
              <div key={i} className={`flex min-h-[60px] items-start justify-center border-b border-r border-line/70 bg-cream/60 p-1.5 md:min-h-[80px] ${edge}`}>
                <span className="text-xs text-muted/40">{d.getDate()}</span>
              </div>
            );
          }
          const { hebrewDay, hebrewMonth, holiday } = hebrewInfo(d);
          const us = usHolidayLabel(key);
          const isUs = !!us && !holiday;
          const isShabbat = d.getDay() === 6;
          const isToday = key === todayKey;
          const sel = selected.get(key);
          const label = holiday || us || "";
          const bg = sel
            ? "bg-soft ring-2 ring-inset ring-orange/60 hover:bg-[#ffeedd]"
            : holiday
              ? "bg-soft/70 hover:bg-soft"
              : isUs
                ? "bg-emerald-50/70 hover:bg-emerald-100/70"
                : isShabbat
                  ? "bg-[#f7f7f8] hover:bg-[#efeff1]"
                  : "bg-white hover:bg-cream";
          return (
            <button
              key={i}
              type="button"
              onClick={() => openDate(key)}
              aria-pressed={!!sel}
              aria-label={`${formatMedium(d)}${label ? ` - ${label}` : ""}${sel ? ` (${sel.type === "custom" ? "custom hours" : "closed"})` : ""}`}
              className={`group relative flex min-h-[60px] flex-col items-center border-b border-r border-line/70 p-1 text-center transition md:min-h-[80px] md:p-1.5 ${edge} ${bg}`}
            >
              {!sel ? (
                <span className="absolute right-1 top-1 hidden h-4 w-4 place-items-center rounded-full bg-cream text-muted opacity-0 transition group-hover:opacity-100 md:grid">
                  <Icon d={I.plus} className="h-2.5 w-2.5" />
                </span>
              ) : null}
              <span
                className={`mb-0.5 text-xs font-semibold leading-none md:text-sm ${
                  isToday ? "grid h-6 w-6 place-items-center rounded-full bg-orange text-white" : sel ? "text-label" : "text-ink"
                }`}
              >
                {d.getDate()}
              </span>
              {hebrewDay > 0 ? (
                <span className="hidden leading-tight text-muted/80 sm:block">
                  {hebrewMonth} {hebrewDay}
                </span>
              ) : null}
              {label ? (
                <span className={`mt-0.5 line-clamp-2 text-[9px] font-semibold leading-tight md:text-[10px] ${isUs ? "text-emerald-700" : "text-label"}`}>
                  {label}
                </span>
              ) : null}
              {sel ? (
                <span className={`mt-auto grid h-4 w-4 place-items-center rounded-full text-white ${sel.type === "custom" ? "bg-orange-3" : "bg-orange"}`}>
                  <Icon d={sel.type === "custom" ? I.clock : I.check} className="h-2.5 w-2.5" />
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Selection summary */}
      {selected.size > 0 ? (
        <div className="mt-6 rounded-2xl border border-soft-border bg-cream p-4 md:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-orange text-white">
                <Icon d={I.check} />
              </span>
              <div>
                <span className="block text-sm font-bold text-ink">
                  {selected.size} date{selected.size === 1 ? "" : "s"} selected
                </span>
                <span className="block text-xs text-muted">These dates will be configured in your auto attendant</span>
              </div>
            </div>
            <button
              type="button"
              onClick={onClearAll}
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-muted transition hover:bg-white hover:text-red-600"
            >
              <Icon d={I.trash} className="h-3.5 w-3.5" />
              Clear all
            </button>
          </div>

          <ul className="space-y-2">
            {groups.map((g) => {
              const start = fromKey(g.start);
              const end = fromKey(g.end);
              const types = new Set(g.dates.map((k) => selected.get(k)?.type));
              const hasCustom = types.has("custom");
              const hasClosed = types.has("closed");
              const name = rangeLabel(g.dates, presets);
              return (
                <li key={g.start} className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-soft text-label">
                    <Icon d={I.cal} />
                  </span>
                  <div className="min-w-0 flex-1">
                    {name ? <span className="block truncate text-[11px] font-semibold uppercase tracking-wide text-label">{name}</span> : null}
                    <span className="block text-sm font-semibold text-ink">
                      {g.start === g.end ? formatLong(start) : `${formatShort(start)} – ${formatShort(end)}`}
                    </span>
                    <span className="flex flex-wrap items-center text-xs text-muted">
                      {g.dates.length > 1 ? `${g.dates.length} consecutive days` : "1 day"}
                      {hasCustom && hasClosed ? (
                        <span className="ml-2 rounded-full bg-[#fff3e6] px-2 py-0.5 text-[10px] font-semibold text-[#c2410c]">Mixed hours</span>
                      ) : hasCustom ? (
                        <span className="ml-2 rounded-full bg-[#fff3e6] px-2 py-0.5 text-[10px] font-semibold text-[#c2410c]">Custom hours</span>
                      ) : (
                        <span className="ml-2 rounded-full bg-soft px-2 py-0.5 text-[10px] font-semibold text-label">Fully closed</span>
                      )}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => g.dates.forEach(onRemoveDate)}
                    aria-label={`Remove ${g.start === g.end ? formatShort(start) : `${formatShort(start)} to ${formatShort(end)}`}`}
                    className="shrink-0 rounded-lg p-1 text-muted transition hover:text-red-600"
                  >
                    <Icon d={I.x} className="h-5 w-5" />
                  </button>
                </li>
              );
            })}
          </ul>

          {customEntries.length > 0 ? (
            <div className="mt-4 border-t-2 border-dashed border-soft-border pt-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-orange-3/15 text-orange">
                  <Icon d={I.clock} />
                </span>
                <p className="font-[family-name:var(--font-heading)] text-sm font-bold text-ink">
                  Custom Hours — Open from Erev Yom Tov through when:
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {customEntries.map(([k, c]) => {
                  const d = fromKey(k);
                  return (
                    <div key={k} className="flex items-center justify-between rounded-xl border border-soft-border bg-[#fff3e6] px-4 py-3 text-sm">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-orange-3/20 text-xs font-bold text-[#c2410c]">
                          {d.getDate()}
                        </span>
                        <div>
                          <span className="block text-xs font-semibold leading-tight text-[#9a3412]">
                            {d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                          </span>
                          <span className="text-sm font-bold text-[#c2410c]">
                            {c.openTime} – {c.closeTime}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => openDate(k)}
                        aria-label={`Edit hours for ${formatShort(d)}`}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-orange transition hover:bg-orange/15"
                      >
                        <Icon d={I.pencil} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          {closedEntries.length > 0 ? (
            <div className="mt-3 border-t border-line pt-3">
              <p className="mb-2 text-xs font-semibold text-muted">Fully closed dates ({closedEntries.length}):</p>
              <div className="flex flex-wrap gap-1.5">
                {closedEntries.map(([k]) => (
                  <span key={k} className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-text ring-1 ring-inset ring-line">
                    <Icon d={I.check} className="h-2.5 w-2.5 text-orange" />
                    {formatShort(fromKey(k))}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Legend */}
      <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-muted">
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded border border-soft-border bg-soft" />Jewish Holiday</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded border border-emerald-200 bg-emerald-50" />US Holiday</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded border border-line bg-[#f7f7f8]" />Shabbat</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-soft ring-2 ring-orange/60" />Selected</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-orange-3" />Custom Hours</span>
      </div>

      {/* Single date dialog */}
      {editing && editingDate ? (
        <Modal label={`Set closure type for ${formatLong(editingDate)}`} onClose={() => setEditing(null)}>
          <div className="mb-5 flex items-center gap-3 pr-8">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-soft text-label">
              <Icon d={I.cal} className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-ink">{formatLong(editingDate)}</h3>
              {selected.has(editing) ? <p className="text-xs text-muted">Currently selected — editing</p> : null}
            </div>
          </div>
          <p className="mb-3 text-sm text-text">What are your office hours on this date?</p>
          <div className="grid grid-cols-2 gap-3">
            <ChoiceCard active={choice === "closed"} onClick={() => setChoice("closed")} title="Fully Closed" body="Office is completely closed, no one is working" icon={I.moon} tone="closed" />
            <ChoiceCard active={choice === "custom"} onClick={() => setChoice("custom")} title="Custom Hours" body="Office is open but with different hours" icon={I.clock} tone="custom" />
          </div>
          {choice === "custom" ? (
            <div className="mt-4 rounded-xl border border-line bg-cream p-4">
              <p className="mb-3 text-xs font-semibold text-text">Set your adjusted hours:</p>
              <div className="flex items-end gap-2">
                <TimeSelect label="Opens at" value={openTime} onChange={setOpenTime} options={TIME_OPTIONS} />
                <span className="pb-3 text-xs text-muted">to</span>
                <TimeSelect label="Closes at" value={closeTime} onChange={setCloseTime} options={TIME_OPTIONS} />
              </div>
            </div>
          ) : null}
          <div className="mt-5 flex gap-2">
            <button type="button" onClick={saveDate} data-autofocus className="flex-1 rounded-xl bg-orange px-4 py-3 text-sm font-semibold text-ink transition hover:bg-orange-3">
              {selected.has(editing) ? "Update Date" : "Add Date"}
            </button>
            <button type="button" onClick={() => setEditing(null)} className="rounded-xl border border-line px-4 py-3 text-sm font-medium text-muted transition hover:bg-cream">
              Cancel
            </button>
          </div>
          {selected.has(editing) ? (
            <button
              type="button"
              onClick={() => {
                onRemoveDate(editing);
                setEditing(null);
              }}
              className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <Icon d={I.trash} className="h-3.5 w-3.5" />
              Remove
            </button>
          ) : null}
        </Modal>
      ) : null}

      {/* Erev Yom Tov dialog */}
      {erevFor ? (
        <Modal label={`Erev Yom Tov settings for ${erevFor.label}`} onClose={() => setErevFor(null)}>
          <div className="mb-5 flex items-center gap-3 pr-8">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-soft text-label">
              <Icon d={I.sun} className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-ink">
                Erev {erevFor.label.replace(/\s+\d{4}$/, "")}
              </h3>
              <p className="text-xs text-muted">{formatLong(fromKey(erevDate))}</p>
            </div>
          </div>
          {erevStep === "ask" ? (
            <>
              <p className="mb-3 text-sm text-text">Are you open on Erev Yom Tov?</p>
              <div className="grid grid-cols-2 gap-3">
                <ChoiceCard active={false} onClick={() => setErevStep("time")} title="Yes, we're open" body="Office is open with early closing" icon={I.clock} tone="custom" />
                <ChoiceCard active={false} onClick={erevClosed} title="No, fully closed" body="Office is completely closed on Erev too" icon={I.moon} tone="closed" />
              </div>
            </>
          ) : (
            <>
              <p className="mb-3 text-sm text-text">You&apos;re open — until when?</p>
              <div className="rounded-xl border border-line bg-cream p-4">
                <div className="flex items-end gap-2">
                  <TimeSelect label="Opens at" value={erevOpen} onChange={setErevOpen} options={EREV_OPEN_OPTIONS} />
                  <span className="pb-3 text-xs text-muted">to</span>
                  <TimeSelect label="Closes at" value={erevClose} onChange={setErevClose} options={EREV_CLOSE_OPTIONS} />
                </div>
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
                <Icon d={I.info} className="h-3.5 w-3.5 shrink-0" />
                Erev dates will show as custom hours with your chosen times
              </p>
              <div className="mt-5 flex gap-2">
                <button type="button" onClick={erevSave} data-autofocus className="flex-1 rounded-xl bg-orange px-4 py-3 text-sm font-semibold text-ink transition hover:bg-orange-3">
                  Save &amp; Add Holiday
                </button>
                <button type="button" onClick={() => setErevStep("ask")} className="rounded-xl border border-line px-4 py-3 text-sm font-medium text-muted transition hover:bg-cream">
                  Back
                </button>
              </div>
            </>
          )}
        </Modal>
      ) : null}

      {/* Remove preset dialog */}
      {removing ? (
        <Modal label={`Remove ${removing.label}`} onClose={() => setRemoving(null)}>
          <div className="mb-4 flex items-center gap-3 pr-8">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-red-50 text-red-600">
              <Icon d={I.trash} className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-ink">{removing.label}</h3>
              <p className="text-xs text-muted">
                {removing.dates.length} day{removing.dates.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>
          <p className="mb-5 text-sm text-text">Remove these dates from your selection?</p>
          <div className="flex gap-2">
            <button type="button" onClick={confirmRemove} className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700">
              Yes, Remove
            </button>
            <button type="button" onClick={() => setRemoving(null)} data-autofocus className="rounded-xl border border-line px-4 py-3 text-sm font-medium text-muted transition hover:bg-cream">
              Cancel
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
