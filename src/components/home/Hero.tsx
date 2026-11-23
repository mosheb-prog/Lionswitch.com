import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { COMPANY } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-on-dark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 80% 10%, rgba(245,138,11,0.25), transparent 55%), radial-gradient(circle at 10% 90%, rgba(245,138,11,0.12), transparent 45%)",
        }}
      />
      <Container className="relative py-20 text-center sm:py-28">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-3">
          Brooklyn, NY &middot; Family-Run Since Day One
        </p>
        <h1 className="mx-auto mt-4 max-w-4xl font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight text-on-dark sm:text-5xl lg:text-6xl">
          {COMPANY.name}: {COMPANY.tagline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-on-dark-2 sm:text-xl">
          Carrier-class business VoIP, UCaaS, contact center and messaging —
          delivered with white-glove service from a family-run Brooklyn team.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/contact#demo" variant="primary">
            Schedule a Free Demo
          </Button>
          <Button href="/features" variant="ghostOnDark">
            Explore Features
          </Button>
          <Button href={COMPANY.phoneHref} variant="dark" className="ring-1 ring-inset ring-white/15">
            {COMPANY.phoneDisplay}
          </Button>
        </div>
      </Container>
    </section>
  );
}
