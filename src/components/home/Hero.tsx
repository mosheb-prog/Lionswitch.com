import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { VoiceDemo } from "@/components/voice-demo/VoiceDemo";
import { COMPANY } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-on-dark">
      <div aria-hidden="true" className="ambient-glow tech-grid pointer-events-none absolute inset-0" />
      <Container className="relative py-20 text-center sm:py-28">
        <p className="hero-in text-xs font-bold uppercase tracking-[0.2em] text-orange-3">
          Brooklyn, NY &middot; Family-Run Since Day One
        </p>
        <h1
          className="hero-in mx-auto mt-4 max-w-4xl font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight text-on-dark sm:text-5xl lg:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          {COMPANY.name}: {COMPANY.tagline}
        </h1>
        <p
          className="hero-in mx-auto mt-6 max-w-2xl text-lg text-on-dark-2 sm:text-xl"
          style={{ animationDelay: "160ms" }}
        >
          Carrier-class business VoIP, UCaaS, contact center and messaging —
          delivered with white-glove service from a family-run Brooklyn team.
        </p>
        <div
          className="hero-in mt-8 flex flex-wrap items-center justify-center gap-4"
          style={{ animationDelay: "240ms" }}
        >
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

        <div className="hero-in mt-14" style={{ animationDelay: "320ms" }}>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.15em] text-orange-3">
            Talk to Lion Switch
          </p>
          <VoiceDemo />
          <p className="mt-4 text-sm text-on-dark-2">
            Powered by our{" "}
            <Link href="/mcp" className="font-semibold text-orange-3 underline-offset-4 hover:underline">
              Claude / MCP integration
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
