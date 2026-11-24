import Image from "next/image";

// A "desk shot": the real Yealink T85W product photo (supplied by Lion Switch,
// background removed) standing on an illustrated office desk. Sizes use
// container-query units (cqw) so the whole scene scales as one picture.

function DeskPhone() {
  return (
    <div className="absolute bottom-[5%] left-1/2 w-[58%] -translate-x-1/2 @2xl:w-[48%]">
      {/* soft light behind the phone so its dark body reads against the wall */}
      <div className="absolute -inset-x-[10%] -top-[30%] bottom-[20%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.10),transparent)]" />
      {/* contact shadow on the desk */}
      <div className="absolute -bottom-[2%] left-[6%] right-[4%] h-[16%] rounded-[50%] bg-black/70 blur-[1.4cqw]" />
      <Image
        src="/yealink-t85w.png"
        alt=""
        width={486}
        height={248}
        priority
        sizes="(min-width: 1024px) 500px, 60vw"
        className="relative h-auto w-full [filter:drop-shadow(0_0_1px_rgba(255,255,255,0.25))_drop-shadow(0_1.5cqw_2cqw_rgba(0,0,0,0.55))_brightness(1.12)]"
      />
    </div>
  );
}

export function DeskScene() {
  return (
    <figure className="mx-auto w-full max-w-5xl">
      <div
        role="img"
        aria-label="A Yealink T85W color-screen business desk phone on an office desk, next to a plant, a notebook and a coffee mug"
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
        Yealink T85W desk phones, zero-touch provisioned and set up for you by the Lion Switch team.
      </figcaption>
    </figure>
  );
}
