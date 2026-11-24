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

      <div className="relative mx-auto w-full max-w-[480px] pb-[6%]">
        {/* spotlight */}
        <div
          aria-hidden="true"
          className="absolute -inset-x-[10%] -top-[25%] bottom-0 rounded-full bg-[radial-gradient(closest-side,rgba(148,163,184,0.34),rgba(148,163,184,0.10)_55%,transparent)]"
        />
        {/* the surface it sits on: a faint lit floor */}
        <div
          aria-hidden="true"
          className="absolute inset-x-[-6%] bottom-[2%] h-[22%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,255,255,0.07),transparent)]"
        />
        {/* wide soft shadow + tight contact shadow under the base */}
        <div aria-hidden="true" className="absolute bottom-[3%] left-[4%] right-[2%] h-[12%] rounded-[50%] bg-black/45 blur-2xl" />
        <div aria-hidden="true" className="absolute bottom-[6%] left-[18%] right-[6%] h-[4%] rounded-[50%] bg-black/70 blur-md" />
        <Image
          src="/yealink-t85w.png"
          alt="Yealink T85W color-screen business desk phone"
          width={720}
          height={421}
          sizes="(min-width: 768px) 480px, 90vw"
          className="relative h-auto w-full [filter:brightness(1.08)]"
        />
      </div>
    </div>
  );
}
