import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function DashboardMcpTeaser() {
  return (
    <Section className="bg-soft">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="glass-card glow-orange relative h-full overflow-hidden rounded-3xl bg-ink p-8 text-on-dark">
            <div aria-hidden="true" className="ambient-glow tech-grid absolute inset-0" />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-orange-3">
                Live Dashboard
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold">
                See every call, live.
              </h3>
              <p className="mt-3 text-on-dark-2">
                A live call dashboard with advanced reporting, built for Lion
                Switch customers — replacing the confusing carrier portal.
              </p>
              <Button href="/live-dashboard" variant="primary" className="mt-6">
                See the Live Dashboard
              </Button>
            </div>
          </div>
        </Reveal>
        <Reveal delayMs={100}>
          <div className="hover-lift h-full rounded-3xl border border-line bg-white p-8">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-label">
              MCP Integration
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold text-ink">
              Your phone calls, now connected to Claude.
            </h3>
            <p className="mt-3 text-muted">
              Every call is transcribed after it ends. Ask Claude anything about
              it — summaries, action items, caller mood, and more.
            </p>
            <Button href="/mcp" variant="ghost" className="mt-6">
              Explore the MCP integration
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
