import Image from "next/image";
import { Button } from "@/components/ui/Button";

// The Yealink T85W product photo (supplied by Lion Switch, background removed)
// on a dark card that matches the hero, with a soft spotlight behind the phone
// so its black body still stands out against the dark page.

export function PhoneShowcase() {
  return (
    <div className="glass-card relative mx-auto grid max-w-5xl items-center gap-8 overflow-hidden rounded-3xl p-6 sm:p-10 md:grid-cols-[1fr_auto] md:gap-10">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange/20 blur-3xl" />
      <div className="relative text-center md:text-left">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-orange-3">Desk phones</p>
        <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold sm:text-3xl">
          Yealink T85W, set up for you
        </h2>
        <p className="mt-3 max-w-md text-on-dark-2 md:max-w-sm">
          Color-screen business desk phones, zero-touch provisioned by the Lion Switch team. Plug it in and it&apos;s
          ready with your lines and extensions.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
          <Button href="/contact#demo" variant="primary">
            Ask about desk phones
          </Button>
          <Button href="/features#devices" variant="ghostOnDark">
            See all devices
          </Button>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[460px]">
        {/* spotlight */}
        <div
          aria-hidden="true"
          className="absolute -inset-x-[12%] -inset-y-[30%] rounded-full bg-[radial-gradient(closest-side,rgba(148,163,184,0.38),rgba(148,163,184,0.12)_55%,transparent)]"
        />
        {/* soft floor shadow */}
        <div aria-hidden="true" className="absolute -bottom-[4%] left-[8%] right-[6%] h-[14%] rounded-[50%] bg-black/60 blur-xl" />
        <Image
          src="/yealink-t85w.png"
          alt="Yealink T85W color-screen business desk phone"
          width={486}
          height={248}
          sizes="(min-width: 768px) 460px, 90vw"
          className="relative h-auto w-full [filter:brightness(1.1)_contrast(1.05)_drop-shadow(0_0_1px_rgba(255,255,255,0.35))]"
        />
      </div>
    </div>
  );
}
