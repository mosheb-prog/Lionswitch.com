import { JsonLd, faqSchema } from "@/lib/schema";

export type FaqItem = { question: string; answer: string };

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-line">
      <JsonLd data={faqSchema(items)} />
      {items.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-[family-name:var(--font-heading)] text-base font-semibold text-ink marker:content-none">
            {item.question}
            <span
              aria-hidden="true"
              className="shrink-0 text-xl text-muted transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-base leading-relaxed text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
