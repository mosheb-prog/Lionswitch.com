import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroJourney } from "@/components/home/HeroJourney";
import { PhoneShowcase } from "@/components/home/PhoneShowcase";
import { COMPANY } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-on-dark">
      <div aria-hidden="true" className="ambient-glow tech-grid pointer-events-none absolute inset-0" />
      <Container className="relative py-16 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
          <div className="text-center lg:text-left">
            <p className="hero-in text-xs font-bold uppercase tracking-[0.2em] text-orange-3">
              Brooklyn, NY &middot; Family-Run Since Day One
            </p>
            <h1
              className="hero-in mx-auto mt-4 max-w-2xl font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight text-on-dark sm:text-5xl lg:mx-0 xl:text-6xl"
              style={{ animationDelay: "80ms" }}
            >
              {COMPANY.name}: {COMPANY.tagline}
            </h1>
            <p
              className="hero-in mx-auto mt-6 max-w-xl text-lg text-on-dark-2 sm:text-xl lg:mx-0"
              style={{ animationDelay: "160ms" }}
            >
              Carrier-class business VoIP, UCaaS, contact center and messaging —
              delivered with white-glove service from a family-run Brooklyn team.
            </p>
            <div
              className="hero-in mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start lg:gap-3"
              style={{ animationDelay: "240ms" }}
            >
              <Button href="/contact#demo" variant="primary" className="lg:px-5">
                Schedule a Free Demo
              </Button>
              <Button href="/features" variant="ghostOnDark" className="lg:px-5">
                Explore Features
              </Button>
              <Button href={COMPANY.phoneHref} variant="dark" className="ring-1 ring-inset ring-white/15 lg:px-5">
                {COMPANY.phoneDisplay}
              </Button>
            </div>
          </div>

          <div className="hero-in" style={{ animationDelay: "200ms" }}>
            <HeroJourney />
            <p className="mt-3 text-center text-[11px] text-on-dark-2/80 lg:text-left">
              Illustration with fictional sample data. Transcription and the AI connection are
              optional add-ons.
            </p>
          </div>
        </div>

        <div className="hero-in mt-20" style={{ animationDelay: "320ms" }}>
          <PhoneShowcase />
        </div>
      </Container>
    </section>
  );
}
