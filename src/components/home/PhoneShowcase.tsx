import Image from "next/image";
import { Button } from "@/components/ui/Button";

// The Yealink T85W product photo (supplied by Lion Switch) shown as-is on its
// own white background, at a size that keeps the 500px source sharp.

export function PhoneShowcase() {
  return (
    <div className="mx-auto grid max-w-5xl items-center gap-8 overflow-hidden rounded-3xl bg-white p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] ring-1 ring-white/10 sm:p-10 md:grid-cols-[1fr_auto] md:gap-12">
      <div className="text-center md:text-left">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-label">Desk phones</p>
        <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold text-ink sm:text-3xl">
          Yealink T85W, set up for you
        </h2>
        <p className="mt-3 max-w-md text-muted md:max-w-sm">
          Color-screen business desk phones, zero-touch provisioned by the Lion Switch team. Plug it in and it&apos;s
          ready with your lines and extensions.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
          <Button href="/contact#demo" variant="primary">
            Ask about desk phones
          </Button>
          <Button href="/features#devices" variant="ghost">
            See all devices
          </Button>
        </div>
      </div>
      <Image
        src="/yealink-t85w.jpg"
        alt="Yealink T85W color-screen business desk phone"
        width={500}
        height={276}
        sizes="(min-width: 768px) 420px, 90vw"
        className="mx-auto h-auto w-full max-w-[420px]"
      />
    </div>
  );
}
