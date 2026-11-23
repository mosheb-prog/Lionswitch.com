"use client";

import Link from "next/link";
import { KeyboardEvent, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { FEATURE_CATEGORIES, FeatureCategory } from "@/components/features/featureData";

// The selected category lives in the URL hash (#cloud-pbx, #devices, …) so
// existing deep links from the homepage, footer and other pages keep working,
// and the back button / shared links land on the right tab.

const HASH_EVENT = "ls-features-hash";
const IDS = new Set(FEATURE_CATEGORIES.map((c) => c.id));

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  window.addEventListener(HASH_EVENT, onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(HASH_EVENT, onChange);
  };
}
const getHash = () => window.location.hash.slice(1);
const getServerHash = () => "";

function useSelectedId() {
  const hash = useSyncExternalStore(subscribe, getHash, getServerHash);
  return IDS.has(hash) ? hash : FEATURE_CATEGORIES[0].id;
}

function selectId(id: string) {
  window.history.replaceState(window.history.state, "", `#${id}`);
  window.dispatchEvent(new Event(HASH_EVENT));
}

/** Clickable category tiles for the dark page hero. */
export function FeatureCategoryTiles() {
  const selected = useSelectedId();
  return (
    <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
      {FEATURE_CATEGORIES.map((c, i) => {
        const Icon = c.icon;
        const active = c.id === selected;
        return (
          <li key={c.id} className="hero-in" style={{ animationDelay: `${120 + i * 45}ms` }}>
            <a
              href={`#${c.id}`}
              aria-current={active ? "true" : undefined}
              className={`group flex h-full flex-col items-center gap-2 rounded-2xl px-2 py-4 text-center ring-1 ring-inset transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:bg-white/10 hover:ring-orange/60 ${
                active ? "bg-white/10 ring-orange/70" : "bg-white/[0.04] ring-white/10"
              }`}
            >
              <span
                className={`grid h-10 w-10 place-items-center rounded-xl transition-colors ${
                  active
                    ? "bg-orange text-ink"
                    : "bg-orange/15 text-orange-3 group-hover:bg-orange group-hover:text-ink"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold text-on-dark">{c.short}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="m5 10.5 3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon({ className = "h-4 w-4", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={`${className} ${flip ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Filter = "all" | "included" | "addon";

function CategoryPanel({
  category,
  index,
  active,
}: {
  category: FeatureCategory;
  index: number;
  active: boolean;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const Icon = category.icon;
  const hasAddOns = category.features.some((f) => f.addOn);
  const prev = FEATURE_CATEGORIES[index - 1];
  const next = FEATURE_CATEGORIES[index + 1];
  const visible = category.features.filter((f) =>
    filter === "all" ? true : filter === "addon" ? f.addOn : !f.addOn,
  );

  return (
    <div
      role="tabpanel"
      id={`panel-${category.id}`}
      aria-labelledby={`tab-${category.id}`}
      hidden={!active}
      tabIndex={0}
      className="min-w-0 focus-visible:outline-offset-4"
    >
      {/* Re-keyed on activation so the entrance animation replays on every switch. */}
      <div key={active ? "on" : "off"}>
        <div className="journey-card-in surface relative overflow-hidden rounded-3xl border bg-ink p-6 text-on-dark sm:p-8">
          <div aria-hidden="true" className="ambient-glow tech-grid absolute inset-0 opacity-80" />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-orange text-ink shadow-[0_10px_30px_-8px_rgba(245,138,11,0.7)]">
              <Icon className="h-7 w-7" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-orange-3">
                {String(index + 1).padStart(2, "0")} / {String(FEATURE_CATEGORIES.length).padStart(2, "0")}
              </p>
              <h2 className="mt-1 font-[family-name:var(--font-heading)] text-2xl font-bold sm:text-3xl">
                {category.title}
              </h2>
              <p className="mt-2 max-w-2xl text-on-dark-2">{category.tagline}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {category.highlights.map((h) => (
                  <li
                    key={h}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-on-dark ring-1 ring-inset ring-white/15"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {hasAddOns ? (
          <div
            role="group"
            aria-label="Filter features"
            className="journey-card-in mt-6 inline-flex rounded-full bg-white p-1 ring-1 ring-line"
            style={{ animationDelay: "60ms" }}
          >
            {(
              [
                ["all", "All"],
                ["included", "Included"],
                ["addon", "Add-ons"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={filter === value}
                onClick={() => setFilter(value)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  filter === value ? "bg-ink text-on-dark" : "text-muted hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        ) : null}

        <ul key={filter} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((f, i) => (
            <li
              key={f.name}
              className="journey-card-in hover-lift group relative flex flex-col rounded-2xl border bg-white p-5"
              style={{ animationDelay: `${80 + i * 55}ms` }}
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-orange/15 text-label transition-colors group-hover:bg-orange group-hover:text-ink">
                  <CheckIcon />
                </span>
                <h3 className="min-w-0 flex-1 font-[family-name:var(--font-heading)] text-base font-bold text-ink">
                  {f.name}
                </h3>
                {f.addOn ? (
                  <span className="shrink-0 rounded-full bg-soft px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-label ring-1 ring-inset ring-soft-border">
                    Add-on
                  </span>
                ) : null}
              </div>
              <p className="mt-2 pl-10 text-sm text-muted">{f.detail}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          {category.link ? (
            <a
              href={category.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-label hover:text-ink"
            >
              {category.link.label} <ArrowIcon />
            </a>
          ) : (
            <Link href="/contact#demo" className="inline-flex items-center gap-2 text-sm font-semibold text-label hover:text-ink">
              See it in a free demo <ArrowIcon />
            </Link>
          )}
          <div className="flex gap-2">
            {prev ? (
              <button
                type="button"
                onClick={() => selectId(prev.id)}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink ring-1 ring-inset ring-soft-border transition hover:ring-orange"
              >
                <ArrowIcon flip /> {prev.short}
              </button>
            ) : null}
            {next ? (
              <button
                type="button"
                onClick={() => selectId(next.id)}
                className="inline-flex items-center gap-2 rounded-full bg-orange px-4 py-2 text-sm font-semibold text-ink transition hover:bg-orange-3"
              >
                {next.short} <ArrowIcon />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeatureExplorer() {
  const selected = useSelectedId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tablistRef = useRef<HTMLDivElement>(null);
  const selectedIndex = FEATURE_CATEGORIES.findIndex((c) => c.id === selected);

  // On phones the tabs are a horizontal scroll row: keep the selected tab in
  // view (e.g. after arriving via /features#ai-features). Scrolls only the row,
  // never the page.
  useEffect(() => {
    const list = tablistRef.current;
    const tab = tabRefs.current[selectedIndex];
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    const left = tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2;
    list.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [selectedIndex]);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const last = FEATURE_CATEGORIES.length - 1;
    let to: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") to = selectedIndex === last ? 0 : selectedIndex + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") to = selectedIndex === 0 ? last : selectedIndex - 1;
    else if (e.key === "Home") to = 0;
    else if (e.key === "End") to = last;
    if (to === null) return;
    e.preventDefault();
    selectId(FEATURE_CATEGORIES[to].id);
    tabRefs.current[to]?.focus();
  }

  return (
    <div className="relative">
      {/* Zero-size anchors: old deep links (/features#devices etc.) scroll here,
          and the hash then picks the matching tab. */}
      {FEATURE_CATEGORIES.map((c) => (
        <span key={c.id} id={c.id} aria-hidden="true" className="absolute top-0 block h-0 w-0 scroll-mt-28" />
      ))}

      <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-10">
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <p className="hidden text-xs font-bold uppercase tracking-[0.15em] text-label lg:block">
            Browse by category
          </p>
          <div
            ref={tablistRef}
            role="tablist"
            aria-label="Feature categories"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="relative -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:mt-4 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {FEATURE_CATEGORIES.map((c, i) => {
              const Icon = c.icon;
              const active = c.id === selected;
              return (
                <button
                  key={c.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  id={`tab-${c.id}`}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  aria-controls={`panel-${c.id}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => selectId(c.id)}
                  className={`group relative flex shrink-0 items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-semibold transition-[background-color,box-shadow,color] duration-200 lg:w-full ${
                    active
                      ? "bg-ink text-on-dark shadow-[0_14px_32px_-14px_rgba(19,24,32,0.7)]"
                      : "bg-white text-ink ring-1 ring-inset ring-line hover:ring-orange/60 lg:bg-transparent lg:ring-0 lg:hover:bg-white lg:hover:ring-1"
                  }`}
                >
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors ${
                      active ? "bg-orange text-ink" : "bg-orange/15 text-label group-hover:bg-orange/25"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="whitespace-nowrap lg:whitespace-normal">
                    <span className="lg:hidden">{c.short}</span>
                    <span className="hidden lg:inline">{c.title}</span>
                  </span>
                  <span
                    className={`ml-auto hidden text-xs tabular-nums lg:inline ${active ? "text-on-dark-2" : "text-muted"}`}
                  >
                    {c.features.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {FEATURE_CATEGORIES.map((c, i) => (
          <CategoryPanel key={c.id} category={c} index={i} active={c.id === selected} />
        ))}
      </div>
    </div>
  );
}
