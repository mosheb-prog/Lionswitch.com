import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";

// Placeholder home page — full hero, voice demo, stats, services, FAQ, etc.
// are built out in the next phase. Kept minimal here so Phase 1 (layout,
// header, footer, cookie banner, theme tokens) is independently verifiable.
export default function Home() {
  return (
    <Container className="py-24 text-center">
      <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-ink sm:text-5xl">
        {COMPANY.name}: {COMPANY.tagline}
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">{COMPANY.description}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Button href="/contact#demo">Schedule a Free Demo</Button>
        <Button href="/features" variant="ghost">
          Explore Features
        </Button>
        <Button href={COMPANY.phoneHref} variant="dark">
          {COMPANY.phoneDisplay}
        </Button>
      </div>
    </Container>
  );
}
