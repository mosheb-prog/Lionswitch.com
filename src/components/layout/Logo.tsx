import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/lib/constants";

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 shrink-0"
      aria-label={`${COMPANY.name} — home`}
    >
      <Image
        src="/lion-switch-logo.png"
        alt=""
        width={36}
        height={36}
        className="h-9 w-9 rounded-[10px]"
        priority
      />
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
