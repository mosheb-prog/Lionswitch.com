import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { COMPANY } from "@/lib/constants";

export function ReadyToSwitchCta() {
  return (
    <Section dark glow className="text-center">
      <Reveal>
        <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold sm:text-4xl">
          Ready to Switch?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-on-dark-2">
          Stop settling for a carrier that treats you like a ticket number. An
          honest conversation about your phones — no pressure, no sales
          scripts.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/contact#demo" variant="primary">
            Schedule a Free Demo
          </Button>
          <Button href={COMPANY.phoneHref} variant="ghostOnDark">
            {COMPANY.phoneDisplay}
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
