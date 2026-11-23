import { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

export function FeatureCard({
  icon,
  title,
  children,
  delayMs = 0,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  delayMs?: number;
}) {
  return (
    <Reveal delayMs={delayMs} className="h-full">
      <div className="hover-lift h-full rounded-2xl border border-line bg-white p-5">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-soft text-orange transition-transform group-hover:scale-110">
          {icon}
        </div>
        <h3 className="mt-3 font-[family-name:var(--font-heading)] text-base font-bold text-ink">
          {title}
        </h3>
        <p className="mt-1.5 text-sm text-muted">{children}</p>
      </div>
    </Reveal>
  );
}
