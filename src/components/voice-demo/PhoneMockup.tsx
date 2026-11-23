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

// A realistic device frame around the "incoming call" style screen that
// triggers the voice demo — a tangible product shot rather than a bare
// mic icon, per the brief's "futuristic" look and feel.
export function PhoneMockup({
  onTap,
  label,
}: {
  onTap: () => void;
  label: string;
}) {
  return (
    <div className="relative mx-auto w-60 select-none">
      {/* Ambient glow behind the device */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-[3rem] bg-orange/25 blur-3xl"
      />

      {/* Phone frame */}
      <div className="relative rounded-[2.75rem] border-4 border-[#0a0d12] bg-[#0a0d12] p-2 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]">
        {/* Side buttons (purely decorative, for realism) */}
        <div aria-hidden="true" className="absolute -left-[5px] top-24 h-10 w-[5px] rounded-l-full bg-[#0a0d12]" />
        <div aria-hidden="true" className="absolute -right-[5px] top-32 h-16 w-[5px] rounded-r-full bg-[#0a0d12]" />

        {/* Screen */}
        <div className="relative aspect-[9/18.5] overflow-hidden rounded-[2.1rem] bg-gradient-to-b from-[#1a2029] to-ink">
          {/* Notch */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-[#0a0d12]"
          />
          <div aria-hidden="true" className="tech-grid absolute inset-0 opacity-60" />

          <div className="relative flex h-full flex-col items-center justify-between px-5 pb-7 pt-14">
            <div className="flex flex-col items-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-on-dark-2">
                Incoming demo call
              </p>
              <div className="mic-pulse mt-5 grid h-20 w-20 place-items-center rounded-full bg-white p-2">
                <Image
                  src="/lion-switch-logo.png"
                  alt=""
                  width={64}
                  height={64}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <p className="mt-4 font-[family-name:var(--font-heading)] text-lg font-bold text-on-dark">
                Lion Switch
              </p>
              <p className="mt-1 text-xs text-on-dark-2">{label}</p>
            </div>

            <button
              type="button"
              onClick={onTap}
              aria-label="Start talking to Lion Switch"
              className="grid h-16 w-16 place-items-center rounded-full bg-orange text-ink shadow-[0_0_24px_-2px_rgba(245,138,11,0.75)] transition-transform hover:scale-105 focus-visible:scale-105 active:scale-95"
            >
              <PhoneIcon className="h-7 w-7" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
