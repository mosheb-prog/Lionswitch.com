import { ReactNode } from "react";

export function FeatureSection({
  id,
  title,
  description,
  children,
  alt = false,
}: {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
  alt?: boolean;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-14 ${alt ? "bg-soft" : ""}`}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-ink sm:text-3xl">
          {title}
        </h2>
        {description ? <p className="mt-2 max-w-2xl text-muted">{description}</p> : null}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

export function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-text">
          <span aria-hidden="true" className="mt-1 text-orange">
            &#9679;
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
