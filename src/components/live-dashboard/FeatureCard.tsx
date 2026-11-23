import { ReactNode } from "react";

export function FeatureCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-soft text-orange">
        {icon}
      </div>
      <h3 className="mt-3 font-[family-name:var(--font-heading)] text-base font-bold text-ink">
        {title}
      </h3>
      <p className="mt-1.5 text-sm text-muted">{children}</p>
    </div>
  );
}
