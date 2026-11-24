import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ChartIcon, SparkleIcon, SendIcon } from "@/components/live-dashboard/icons";

// Slogan band: "Team up with the future." Lion Switch phones working alongside AI.
// Claims stay within what the platform does: transcription and summaries after
// the call ends, and read-only call data for any AI that supports MCP.

const POINTS = [
  {
    icon: SparkleIcon,
    title: "Every call, understood",
    body: "Calls are transcribed and summarized after they end, so nothing gets lost.",
  },
  {
    icon: ChartIcon,
    title: "Know who needs you",
    body: "Your dashboard flags missed calls and follow-ups before a customer has to call twice.",
  },
  {
    icon: SendIcon,
    title: "Bring your own AI",
    body: "Connect any AI assistant that supports MCP and ask it about your calls. Read-only.",
  },
];

export function FutureBand() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-on-dark sm:py-28">
      <div aria-hidden="true" className="ambient-glow tech-grid pointer-events-none absolute inset-0" />
      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-3">The future is calling</p>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Team up with the{" "}
            <span className="bg-gradient-to-r from-orange to-orange-3 bg-clip-text text-transparent">future.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-on-dark-2">
            Lion Switch puts AI in your corner. Your phone system and AI, working side by side, so every call turns
            into something you can find, follow up on and act on.
          </p>
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3">
          {POINTS.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delayMs={i * 90}>
                <div className="glass-card h-full rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-orange text-ink shadow-[0_10px_30px_-8px_rgba(245,138,11,0.7)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-[family-name:var(--font-heading)] text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-on-dark-2">{p.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mt-12 flex flex-wrap justify-center gap-3" delayMs={120}>
          <Button href="/contact#demo" variant="primary">
            Answer the call: book a demo
          </Button>
          <Button href="/mcp" variant="ghostOnDark">
            See how AI connects
          </Button>
        </Reveal>
        <p className="mt-6 text-center text-xs text-on-dark-2/70">
          Transcription and the AI connection are optional add-ons.
        </p>
      </Container>
    </section>
  );
}
