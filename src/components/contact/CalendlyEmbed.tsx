import { COMPANY } from "@/lib/constants";

export function CalendlyEmbed() {
  return (
    <div id="demo" className="scroll-mt-24 overflow-hidden rounded-2xl border border-line">
      <iframe
        title="Schedule a demo with Lion Switch"
        src={COMPANY.calendlyUrl}
        width="100%"
        height="700"
        style={{ border: 0 }}
        loading="lazy"
      />
    </div>
  );
}
