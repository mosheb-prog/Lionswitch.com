import Link from "next/link";
import { COMPANY } from "@/lib/constants";

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 shrink-0"
      aria-label={`${COMPANY.name} — home`}
    >
      <span
        className="grid h-9 w-9 place-items-center rounded-[10px] bg-orange-3 text-ink font-[family-name:var(--font-heading)] font-bold"
        aria-hidden="true"
      >
        LS
      </span>
      <span
        className={`font-[family-name:var(--font-heading)] text-xl font-bold whitespace-nowrap ${
          onDark ? "text-on-dark" : "text-ink"
        }`}
      >
        {COMPANY.name}
      </span>
    </Link>
  );
}
