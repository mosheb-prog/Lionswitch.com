import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { VoiceDemo } from "@/components/voice-demo/VoiceDemo";
import { COMPANY } from "@/lib/constants";

const featurePills = [\n  "Call recording",\n  "Auto attendant and music on hold",\n  "Business texting and text blasts",\n  "Live reports and alerts",\n];\n\nconst benefits = [
  { title: "Keep your numbers", detail: "We handle the transfer from your current provider." },
  { title: "Setup done for you", detail: "Phones programmed and ready for your team." },
  { title: "Your office line, anywhere", detail: "Answer on your desk phone, cell or computer." },
  { title: "A local person who answers", detail: "Real support from a Brooklyn-based team." },
];

export function Hero() {
  return (
    <>
      <section className="hero-next relative overflow-hidden text-ink">
        <div aria-hidden="true" className="hero-next-orbit pointer-events-none absolute" />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:gap-14">
            <div className="max-w-2xl">
              <p className="hero-in inline-flex items-center gap-2 rounded-full border border-soft-border bg-cream px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-label">
                <span className="h-2 w-2 rounded-full bg-orange" />
                Brooklyn, NY · Business communications
              </p>

              <h1
                className="hero-in mt-7 text-5xl font-bold leading-[1.04] tracking-[-0.045em] text-ink sm:text-6xl lg:text-[4.45rem]"
                style={{ animationDelay: "80ms" }}
              >
                What you get
                <span className="hero-orange-type block">when you switch.</span>
              </h1>

              <p
                className="hero-in mt-6 max-w-xl text-lg leading-8 text-muted sm:text-xl"
                style={{ animationDelay: "150ms" }}
              >
                Everything a modern office phone system should do, set up for you
                and supported by a local person you can actually reach.
              </p>

              <div
                className="hero-in mt-8 flex flex-wrap items-center gap-3"
                style={{ animationDelay: "220ms" }}
              >
                <Button href="/contact" variant="primary">
                  Get a Free Phone Bill Review <span aria-hidden="true">↗</span>
                </Button>
                <Button href={COMPANY.phoneHref} variant="ghost">
                  Call or Text {COMPANY.phoneDisplay}
                </Button>
              </div>

              <div
                className="hero-in mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-muted"
                style={{ animationDelay: "290ms" }}
              >
                <span className="inline-flex items-center gap-2"><span className="hero-check">✓</span>No long-term contracts</span>
                <span className="inline-flex items-center gap-2"><span className="hero-check">✓</span>Personal setup</span>
                <span className="inline-flex items-center gap-2"><span className="hero-check">✓</span>Local support</span>
              </div>
            </div>

            <div className="hero-in relative mx-auto w-full max-w-2xl lg:ml-auto" style={{ animationDelay: "160ms" }}>
              <div className="hero-dashboard-card relative overflow-hidden rounded-[1.65rem] p-5 shadow-2xl sm:p-6">
                <div aria-hidden="true" className="hero-dashboard-shine pointer-events-none absolute inset-0" />
                <div className="relative">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
                    <Logo onDark />
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white/65">
                      <span className="h-2 w-2 rounded-full bg-[#43c77d]" />
                      Sample dashboard
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.17em] text-orange-3">Live call dashboard</p>
                      <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">See every call, live.</h2>
                    </div>
                    <span className="hidden rounded-full bg-white/[0.07] px-3 py-2 text-xs font-semibold text-white/65 sm:inline-flex">All times Eastern</span>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2.5">
                    <div className="hero-metric-card">
                      <p>On calls now</p>
                      <strong className="text-orange-3">7</strong>
                    </div>
                    <div className="hero-metric-card">
                      <p>Answered today</p>
                      <strong>128</strong>
                    </div>
                    <div className="hero-metric-card">
                      <p>Missed</p>
                      <strong className="text-[#ffb45b]">3</strong>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/15 px-4">
                    <div className="flex items-center justify-between border-b border-white/10 py-4">
                      <div className="flex items-center gap-3">
                        <span className="hero-live-wave"><i /><i /><i /></span>
                        <div>
                          <p className="text-sm font-semibold text-white">Front Desk</p>
                          <p className="mt-0.5 text-xs text-white/45">Extension 100</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-orange-3">On a call · 02:14</span>
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <div>
                        <p className="text-sm font-semibold text-white">Billing</p>
                        <p className="mt-0.5 text-xs text-white/45">Extension 104</p>
                      </div>
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#43c77d]/10 px-3 py-1.5 text-xs font-semibold text-[#7ee0a5]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#43c77d]" />
                        Available
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-orange/20 bg-orange/10 px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-white">Know what got answered and what got missed.</p>
                      <p className="mt-1 text-xs text-white/55">Reports, activity and alerts in one place.</p>
                    </div>
                    <Link href="/live-dashboard" className="shrink-0 text-sm font-bold text-orange-3 hover:underline">
                      Explore <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="hero-dashboard-caption mt-3 flex items-center justify-between gap-3 px-1 text-xs text-muted">
                <span>One clear view of your whole team.</span>
                <span className="font-semibold">Lion Switch Live Dashboard</span>
              </div>
            </div>
          </div>

          <div className="hero-benefits mt-14 grid overflow-hidden rounded-2xl border border-soft-border bg-cream sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item, index) => (
              <div key={item.title} className="hero-benefit-card flex gap-3 px-5 py-5">
                <span className="hero-benefit-check mt-0.5">✓</span>
                <div>
                  <h3 className="text-sm font-bold text-ink">{item.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-muted">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="hero-business-offer border-y border-soft-border bg-white py-7 sm:py-8">
        <Container>
          <div className="grid items-center gap-5 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-label">Opening a business?</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Business phone systems from <span className="text-label">$28.99/seat.</span></h2>
              <p className="mt-2 text-sm leading-6 text-muted">Real 718 number · Rings on desk, cell and app · Shabbos mode · No contracts</p>
              <p className="mt-1 text-xs text-muted">Less as you grow.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button href={COMPANY.phoneHref} variant="primary">Call {COMPANY.phoneDisplay}</Button>
              <Link href="/contact" className="text-sm font-semibold text-ink underline decoration-soft-border underline-offset-4 hover:text-label">Talk with our team</Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="hero-voice-section bg-soft py-14 sm:py-18">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-label">Experience Lion Switch</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">Have a conversation with us.</h2>
              <p className="mt-4 max-w-md text-base leading-7 text-muted">
                Try the voice demo and see how call transcripts can help your team get more from every conversation.
              </p>
              <Link href="/mcp" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-label hover:underline">
                Explore our AI integration <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <VoiceDemo />
          </div>
        </Container>
      </section>
    </>
  );
}
