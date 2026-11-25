import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const ITEMS = [
  { value: "99.999%", label: "Uptime SLA" },
  { value: "24/6", label: "Live Support" },
  { value: "100k+", label: "Seats Worldwide" },
];

export function StatsBar() {
  return (
    <div className="border-y border-line bg-soft">
      <Container>
        <dl className="grid grid-cols-3 gap-6 py-10 sm:gap-8">
          {ITEMS.map((item, i) => (
            <Reveal key={item.label} delayMs={i * 90} className="text-center">
              <dt className="sr-only">{item.label}</dt>
              <dd className="font-[family-name:var(--font-heading)] text-3xl font-bold tabular-nums text-ink [text-shadow:0_0_24px_rgba(245,138,11,0.25)] sm:text-4xl">
                {item.value}
              </dd>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-muted">
                {item.label}
              </p>
            </Reveal>
          ))}
        </dl>
      </Container>
    </div>
  );
}
