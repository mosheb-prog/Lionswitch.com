import Image from "next/image";

// An original, illustrated "desk shot": a color-screen desk phone on an office
// desk. Sizes use container-query units (cqw) so the whole scene scales as one
// picture from phone to desktop widths.

const LINE_KEYS = [
  { label: "Sales", led: "bg-[#86efac]" },
  { label: "Support", led: "bg-orange" },
  { label: "Billing", led: "bg-[#86efac]" },
  { label: "Front desk", led: "bg-white/30" },
];

function DeskPhone() {
  return (
    <div className="absolute bottom-[8%] left-1/2 w-[60%] -translate-x-1/2 @2xl:w-[50%]">
      {/* contact shadow on the desk */}
      <div className="absolute -bottom-[3%] left-[4%] right-[4%] h-[14%] rounded-[50%] bg-black/60 blur-[1.4cqw]" />

      <div
        className="relative flex gap-[2.5%] rounded-[2cqw] bg-gradient-to-b from-[#262c35] via-[#161a20] to-[#0b0d11] p-[2.5%] shadow-[0_2cqw_4cqw_-1cqw_rgba(0,0,0,0.7)] ring-1 ring-white/10"
        style={{ transform: "perspective(140cqw) rotateX(16deg)", transformOrigin: "bottom center" }}
      >
        {/* handset */}
        <div className="relative w-[17%] shrink-0 rounded-[1.6cqw] bg-gradient-to-b from-[#1f242c] to-[#101318] ring-1 ring-white/10">
          <div className="absolute inset-x-[30%] top-[7%] space-y-[0.5cqw]">
            <span className="block h-[0.35cqw] rounded-full bg-white/15" />
            <span className="block h-[0.35cqw] rounded-full bg-white/15" />
          </div>
          <div className="absolute inset-x-[30%] bottom-[7%] space-y-[0.5cqw]">
            <span className="block h-[0.35cqw] rounded-full bg-white/15" />
            <span className="block h-[0.35cqw] rounded-full bg-white/15" />
          </div>
        </div>

        {/* screen + keys */}
        <div className="min-w-0 flex-1">
          <div className="flex gap-[3%]">
            <div className="relative aspect-[16/10] flex-1 overflow-hidden rounded-[1cqw] bg-gradient-to-br from-[#1d2430] to-[#0f141b] ring-1 ring-white/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(245,138,11,0.28),transparent_60%)]" />
              <div className="relative flex h-full flex-col p-[5%]">
                <div className="flex items-center justify-between text-[1.15cqw] text-on-dark-2">
                  <span className="tabular-nums">9:41 AM</span>
                  <span>Ext 101</span>
                </div>
                <div className="flex flex-1 items-center gap-[4%]">
                  <Image
                    src="/lion-switch-logo.png"
                    alt=""
                    width={64}
                    height={64}
                    className="h-[5.5cqw] w-[5.5cqw] rounded-[1cqw]"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-[family-name:var(--font-heading)] text-[1.9cqw] font-bold leading-tight text-on-dark">
                      Lion Switch
                    </p>
                    <p className="truncate text-[1.15cqw] text-on-dark-2">Front desk · Ready</p>
                  </div>
                </div>
                <div className="flex gap-[3%]">
                  {["Calls", "Voicemail", "Directory"].map((t) => (
                    <span
                      key={t}
                      className="flex-1 truncate rounded-[0.6cqw] bg-white/10 py-[2%] text-center text-[1cqw] text-on-dark"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* line / BLF keys with status LEDs */}
            <div className="flex w-[22%] flex-col justify-between py-[1%]">
              {LINE_KEYS.map((k) => (
                <span
                  key={k.label}
                  className="flex items-center gap-[8%] rounded-[0.5cqw] bg-white/[0.06] px-[8%] py-[6%] text-[0.95cqw] text-on-dark-2"
                >
                  <span className={`h-[0.7cqw] w-[0.7cqw] shrink-0 rounded-full ${k.led}`} />
                  <span className="truncate">{k.label}</span>
                </span>
              ))}
            </div>
          </div>

          {/* keypad */}
          <div className="mt-[3%] grid grid-cols-6 gap-[1.6%]">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="h-[1.5cqw] rounded-[0.5cqw] bg-white/[0.07]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DeskScene() {
  return (
    <figure className="mx-auto w-full max-w-5xl">
      <div
        role="img"
        aria-label="Illustration of a color-screen business desk phone on an office desk, next to a plant, a notebook and a coffee mug"
        className="@container relative aspect-[16/11] overflow-hidden rounded-3xl ring-1 ring-white/10 sm:aspect-[2/1]"
        style={{ background: "linear-gradient(180deg, #1c222b 0%, #161b23 60%)" }}
      >
        {/* window light on the wall */}
        <div className="absolute -right-[8%] -top-[35%] h-[95%] w-[55%] rounded-full bg-orange/20 blur-[6cqw]" />
        <div className="absolute left-[6%] top-[10%] h-[34%] w-[22%] rounded-[1cqw] bg-white/[0.03] ring-1 ring-white/[0.06]" />

        {/* desk surface */}
        <div
          className="absolute inset-x-0 bottom-0 h-[44%]"
          style={{ background: "linear-gradient(180deg, #4b3626 0%, #35261b 55%, #271b13 100%)" }}
        >
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.035) 0 2px, transparent 2px 11px), repeating-linear-gradient(90deg, rgba(0,0,0,0.12) 0 1px, transparent 1px 60px)",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-[2px] bg-white/20" />
        </div>

        {/* plant */}
        <div className="absolute bottom-[17%] left-[8%] w-[10%]">
          <div className="absolute bottom-[78%] left-1/2 h-[230%] w-[150%] -translate-x-1/2">
            <span className="absolute bottom-0 left-[44%] h-[70%] w-[22%] origin-bottom -rotate-[24deg] rounded-[50%] bg-[#3e6a4d]" />
            <span className="absolute bottom-0 left-[38%] h-[85%] w-[24%] origin-bottom rotate-[6deg] rounded-[50%] bg-[#4a7b5a]" />
            <span className="absolute bottom-0 left-[36%] h-[64%] w-[22%] origin-bottom rotate-[32deg] rounded-[50%] bg-[#335a41]" />
            <span className="absolute bottom-0 left-[42%] h-[55%] w-[20%] origin-bottom -rotate-[48deg] rounded-[50%] bg-[#2e513b]" />
          </div>
          <div className="relative aspect-[1/0.9] rounded-b-[1.6cqw] rounded-t-[0.4cqw] bg-gradient-to-b from-[#ece6dc] to-[#c9c1b4]" />
          <div className="absolute -bottom-[8%] left-[6%] right-[6%] h-[14%] rounded-[50%] bg-black/45 blur-[0.8cqw]" />
        </div>

        {/* notebook */}
        <div className="absolute bottom-[4%] left-[17%] h-[11%] w-[19%] -rotate-[7deg] rounded-[0.5cqw] bg-[#f3eee4] shadow-[0_0.8cqw_1.5cqw_rgba(0,0,0,0.45)]">
          <div className="absolute inset-y-0 left-[8%] w-[6%] bg-orange/80" />
          <div className="absolute inset-x-[22%] top-[28%] space-y-[0.9cqw]">
            <span className="block h-[1px] bg-black/10" />
            <span className="block h-[1px] bg-black/10" />
            <span className="block h-[1px] bg-black/10" />
          </div>
        </div>

        <DeskPhone />

        {/* mug */}
        <div className="absolute bottom-[15%] right-[11%] w-[7.5%]">
          <div className="absolute -right-[42%] top-[18%] h-[46%] w-[55%] rounded-full border-[0.9cqw] border-orange" />
          <div className="relative grid aspect-[4/5] place-items-center rounded-b-[1.2cqw] rounded-t-[0.4cqw] bg-gradient-to-r from-[#d97706] via-orange to-[#d97706]">
            <Image
              src="/lion-switch-logo.png"
              alt=""
              width={32}
              height={32}
              className="h-[2.6cqw] w-[2.6cqw] rounded-[0.5cqw] opacity-90 mix-blend-multiply"
            />
          </div>
          <div className="absolute -bottom-[8%] left-[4%] right-[4%] h-[14%] rounded-[50%] bg-black/45 blur-[0.8cqw]" />
        </div>
      </div>
      <figcaption className="mt-4 text-center text-sm text-on-dark-2">
        Zero-touch provisioned desk phones, set up for you by the Lion Switch team.
      </figcaption>
    </figure>
  );
}
