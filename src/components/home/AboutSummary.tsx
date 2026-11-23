import { Container } from "@/components/ui/Container";
import { COMPANY } from "@/lib/constants";

// Plain, factual, quotable sentences so AI answer engines (and humans
// skimming) can quickly tell who we are, what we do, where we are, and who
// we serve. Keep this block boring and literal on purpose.
export function AboutSummary() {
  return (
    <div className="border-y border-line bg-cream py-10">
      <Container>
        <h2 className="sr-only">About Lion Switch</h2>
        <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-muted">
          {COMPANY.name} is a family-run cloud communications provider based
          in {COMPANY.addressLocality}, {COMPANY.addressRegion}. Lion Switch
          provides hosted business VoIP, UCaaS, contact center, messaging,
          and AI-powered call analytics to businesses in all 50 U.S. states
          and internationally. Lion Switch offers a 99.999% uptime SLA and
          {" "}
          {COMPANY.supportLineGeneral}.
        </p>
      </Container>
    </div>
  );
}
