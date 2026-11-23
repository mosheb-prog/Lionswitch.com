import Image from "next/image";

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// An original illustration of a modern color-screen desk phone (evoking the
// Yealink T85W's silhouette: handset on top, wide touchscreen, physical
// speed-dial keys) — not Yealink's actual product photography, which is
// their copyrighted material and not something we can license or reuse here.
export function DeskPhoneMockup({
  onTap,
  label,
}: {
  onTap: () => void;
  label: string;
}) {
  return (
    <div className="relative mx-auto w-full max-w-sm select-none">
      <div aria-hidden="true" className="absolute inset-x-8 bottom-4 top-10 -z-10 rounded-[3rem] bg-orange/25 blur-3xl" />

      {/* Handset, resting in its cradle above the body */}
      <div aria-hidden="true" className="relative mx-auto h-7 w-40">
        <div className="absolute inset-x-0 top-0 h-5 rounded-full bg-[#11151b]" />
        <div className="absolute left-1 top-3 h-4 w-8 rounded-full bg-[#11151b]" />
        <div className="absolute right-1 top-3 h-4 w-8 rounded-full bg-[#11151b]" />
      </div>

      {/* Phone body */}
      <div className="relative rounded-2xl border border-black/40 bg-gradient-to-b from-[#1b212a] to-[#0d1116] p-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.55)] sm:p-5">
        <div className="flex items-stretch gap-4">
          {/* Touchscreen */}
          <div className="relative flex-1 overflow-hidden rounded-xl bg-gradient-to-br from-[#1a2029] to-ink p-4">
            <div aria-hidden="true" className="tech-grid absolute inset-0 opacity-60" />
            <div className="relative flex h-full flex-col items-center justify-center gap-2 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-on-dark-2">
                Incoming demo call
              </p>
              <div className="mic-pulse grid h-14 w-14 place-items-center rounded-full bg-white p-1.5">
                <Image
                  src="/lion-switch-logo.png"
                  alt=""
                  width={48}
                  height={48}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <p className="font-[family-name:var(--font-heading)] text-sm font-bold text-on-dark">
                Lion Switch
              </p>
              <p className="text-[11px] text-on-dark-2">{label}</p>
            </div>
          </div>

          {/* Physical speed-dial keys, for realism */}
          <div aria-hidden="true" className="hidden flex-col justify-center gap-2 sm:flex">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-2 w-8 rounded-full bg-white/10" />
            ))}
          </div>
        </div>

        {/* Answer button + base controls */}
        <div className="mt-4 flex items-center justify-between gap-4">
          <div aria-hidden="true" className="flex gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
          </div>
          <button
            type="button"
            onClick={onTap}
            aria-label="Start talking to Lion Switch"
            className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-orange text-ink shadow-[0_0_24px_-2px_rgba(245,138,11,0.75)] transition-transform hover:scale-105 focus-visible:scale-105 active:scale-95"
          >
            <PhoneIcon className="h-6 w-6" />
          </button>
          <div aria-hidden="true" className="flex gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
          </div>
        </div>
      </div>

      {/* Stand */}
      <div aria-hidden="true" className="mx-auto h-3 w-24 rounded-b-xl bg-[#0a0d12]" />
    </div>
  );
}
