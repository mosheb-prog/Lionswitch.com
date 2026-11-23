import { ChartIcon, PhoneIcon, SparkleIcon } from "@/components/live-dashboard/icons";

// Static diagram for the /mcp hero: how a finished call reaches the
// customer's own AI assistant. Purely illustrative; no backend calls.

function PlugIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M9 3v4M15 3v4M7 7h10v4a5 5 0 0 1-10 0V7ZM12 16v5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const STEPS = [
  { icon: PhoneIcon, title: "Phone call", body: "A normal call on your Lion Switch line." },
  { icon: ChartIcon, title: "Transcript", body: "Ready after the call ends. Never live." },
  { icon: PlugIcon, title: "Lion Switch MCP", body: "Shares your call data, read-only." },
  { icon: SparkleIcon, title: "Your AI assistant", body: "Any AI that supports MCP." },
];

export function McpFlow() {
  return (
    <div className="glass-card glow-orange mx-auto max-w-5xl rounded-3xl p-6 sm:p-8">
      <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const last = i === STEPS.length - 1;
          return (
            <li key={step.title} className="relative flex items-start gap-4 lg:flex-col lg:items-center lg:px-4 lg:text-center">
              {/* connector line between steps (desktop) */}
              {!last ? (
                <span
                  aria-hidden="true"
                  className="absolute left-[calc(50%+2.25rem)] right-[calc(-50%+2.25rem)] top-7 hidden h-px bg-gradient-to-r from-orange/70 to-orange/20 lg:block"
                />
              ) : null}
              <span
                className={`relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl ring-1 ring-inset ${
                  last
                    ? "bg-orange text-ink ring-orange shadow-[0_10px_30px_-8px_rgba(245,138,11,0.7)]"
                    : "bg-white/[0.06] text-orange-3 ring-white/15"
                }`}
              >
                <Icon className="h-6 w-6" />
              </span>
              <div className="min-w-0 lg:mt-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-orange-3">
                  Step {i + 1}
                </p>
                <p className="mt-1 font-[family-name:var(--font-heading)] text-base font-bold text-on-dark">
                  {step.title}
                </p>
                <p className="mt-1 text-sm text-on-dark-2">{step.body}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-inset ring-white/10 sm:p-5">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-on-dark-2">
          Example question to your AI
        </p>
        <p className="mt-2 font-[family-name:var(--font-heading)] text-lg font-semibold text-on-dark">
          &ldquo;Which calls from yesterday need a follow-up?&rdquo;
        </p>
        <p className="mt-2 text-sm text-on-dark-2">
          Your AI reads finished call data only. It can&apos;t change your phone settings.
        </p>
      </div>
    </div>
  );
}
