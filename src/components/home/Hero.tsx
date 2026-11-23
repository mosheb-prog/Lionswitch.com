import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { VoiceDemo } from "@/components/voice-demo/VoiceDemo";
import { COMPANY } from "@/lib/constants";

const platformPillars = [
  { number: "01", title: "Voice", detail: "Crystal-clear business calling" },
  { number: "02", title: "Collaboration", detail: "Video, chat and team presence" },
  { number: "03", title: "Intelligence", detail: "Smarter conversations with AI" },
];

export function Hero() {
  return (
    <section className="hero-next relative isolate overflow-hidden bg-ink text-on-dark">
      <div aria-hidden="true" className="hero-next-grid pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="hero-next-glow hero-next-glow-one pointer-events-none absolute" />
      <div aria-hidden="true" className="hero-next-glow hero-next-glow-two pointer-events-none absolute" />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
          <div className="max-w-2xl">
            <p className="hero-in inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-orange-3">
              <span className="hero-status-dot h-2 w-2 rounded-full bg-orange" />
              Brooklyn born. Business ready.
            </p>

            <h1
              className="hero-in mt-7 max-w-3xl text-5xl font-bold leading-[1.06] tracking-[-0.045em] text-on-dark sm:text-6xl lg:text-[4.35rem]"
              style={{ animationDelay: "90ms" }}
            >
              Business communication.
              <span className="hero-orange-type block">Reimagined.</span>
            </h1>

            <p
              className="hero-in mt-7 max-w-xl text-lg leading-8 text-white/65 sm:text-xl"
              style={{ animationDelay: "170ms" }}
            >
              Bring every conversation together with powerful cloud communications
              and a real team in your corner. Less complexity. More connection.
            </p>

            <div
              className="hero-in mt-9 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "250ms" }}
            >
              <Button href="/contact#demo" variant="primary">
                Get a Free Demo <span aria-hidden="true" className="ml-2">↗</span>
              </Button>
              <Button href="/features" variant="ghostOnDark">
                Explore the Platform
              </Button>
            </div>

            <div
              className="hero-in mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/55"
              style={{ animationDelay: "320ms" }}
            >
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                Personal, white-glove support
              </span>
              <a className="transition-colors hover:text-orange-3" href={COMPANY.phoneHref}>
                {COMPANY.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="hero-in relative mx-auto w-full max-w-xl lg:ml-auto" style={{ animationDelay: "180ms" }}>
            <div aria-hidden="true" className="hero-ring hero-ring-one" />
            <div aria-hidden="true" className="hero-ring hero-ring-two" />

            <div className="hero-console relative overflow-hidden rounded-[1.75rem] border border-white/10 p-5 shadow-2xl shadow-black/40 sm:p-7">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange text-lg font-black text-ink">
                    L
                  </div>
                  <div>
                    <p className="text-sm font-bold tracking-wide text-white">LION SWITCH</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-white/40">Unified communications</p>
                  </div>
                </div>
                <span className="rounded-full border border-orange/25 bg-orange/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-orange-3">
                  The connected workspace
                </span>
              </div>

              <div className="py-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-3">One platform. Every conversation.</p>
                <h2 className="mt-3 max-w-sm text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                  Make every connection count.
                </h2>
                <div className="hero-signal mt-6 flex h-14 items-center gap-1.5" aria-hidden="true">
                  {Array.from({ length: 34 }, (_, index) => (
                    <span key={index} style={{ animationDelay: `${index * 45}ms` }} />
                  ))}
                </div>
              </div>

              <div className="grid gap-2">
                {platformPillars.map((item) => (
                  <div key={item.number} className="hero-platform-row flex items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.035] px-4 py-3.5">
                    <span className="text-xs font-semibold tabular-nums text-orange-3">{item.number}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-0.5 text-xs text-white/45">{item.detail}</p>
                    </div>
                    <span className="text-lg text-orange-3" aria-hidden="true">↗</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-orange/20 bg-black/20 p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">Experience Lion Switch</p>
                  <span className="text-[10px] text-orange-3">AI voice demo</span>
                </div>
                <VoiceDemo />
                <p className="mt-3 text-xs leading-5 text-white/40">
                  Have a question? Try the voice experience or{" "}
                  <Link href="/mcp" className="font-semibold text-orange-3 underline-offset-4 hover:underline">
                    explore our AI integration
                  </Link>.
                </p>
              </div>
            </div>

            <div className="hero-float-note absolute -bottom-5 -left-5 hidden rounded-2xl border border-white/10 bg-[#202833]/95 px-4 py-3 shadow-xl backdrop-blur-xl sm:block">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">Built around your business</p>
              <p className="mt-1 text-sm font-semibold text-white">Technology with a human touch.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
