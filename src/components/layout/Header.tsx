"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { COMPANY, LOGIN_SUPPORT_LINKS, MAIN_NAV } from "@/lib/constants";

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 4.5L6 8l3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LoginSupportMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-semibold font-[family-name:var(--font-heading)] text-ink hover:text-label"
      >
        Login &amp; Support
        <ChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div
          role="menu"
          className="surface absolute right-0 top-full mt-2 w-60 rounded-2xl border bg-white p-2 z-50"
        >
          {LOGIN_SUPPORT_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              className="block rounded-xl px-3 py-2 text-sm text-ink hover:bg-soft"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur-md">
      <Container className="flex h-18 items-center justify-between gap-3 py-3">
        <Logo />

        <nav
          aria-label="Main navigation"
          className="hidden min-[1400px]:flex items-center gap-0.5"
        >
          {MAIN_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-semibold font-[family-name:var(--font-heading)] text-ink hover:text-label"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden min-[1400px]:flex items-center gap-2.5">
          <LoginSupportMenu />
          <a
            href={COMPANY.phoneHref}
            className="whitespace-nowrap text-sm font-semibold font-[family-name:var(--font-heading)] text-ink hover:text-label"
          >
            {COMPANY.phoneDisplay}
          </a>
          <Button href="/contact#demo" variant="primary" className="whitespace-nowrap px-5 py-2.5 text-sm">
            Schedule a Free Demo
          </Button>
        </div>

        <button
          type="button"
          className="min-[1400px]:hidden rounded-lg p-2 text-ink"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </Container>

      {mobileOpen ? (
        <div id="mobile-menu" className="min-[1400px]:hidden border-t border-line bg-cream">
          <Container className="flex flex-col gap-1 py-4">
            {MAIN_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-semibold font-[family-name:var(--font-heading)] text-ink hover:bg-soft"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-line pt-3">
              <p className="px-3 pb-1 text-xs font-bold uppercase tracking-wider text-muted">
                Login &amp; Support
              </p>
              {LOGIN_SUPPORT_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg px-3 py-2.5 text-base text-ink hover:bg-soft"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href={COMPANY.phoneHref}
              className="mt-2 rounded-lg px-3 py-2.5 text-base font-semibold font-[family-name:var(--font-heading)] text-ink hover:bg-soft"
            >
              {COMPANY.phoneDisplay}
            </a>
            <Button href="/contact#demo" variant="primary" className="mt-2 w-full">
              Schedule a Free Demo
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
