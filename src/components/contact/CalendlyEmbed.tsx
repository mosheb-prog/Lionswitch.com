import { COMPANY } from "@/lib/constants";

export function CalendlyEmbed() {
  return (
    <div id="demo" className="surface scroll-mt-24 overflow-hidden rounded-2xl border">
      <iframe
        title="Schedule a demo with Lion Switch"
        src={`${COMPANY.calendlyUrl}?hide_gdpr_banner=1`}
        width="100%"
        height="700"
        style={{ border: 0 }}
        loading="lazy"
      />
    </div>
  );
}
