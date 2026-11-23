import { COMPANY } from "@/lib/constants";

export function MapEmbed() {
  const query = encodeURIComponent(COMPANY.fullAddress);
  return (
    <div className="surface overflow-hidden rounded-2xl border">
      <iframe
        title={`Map to ${COMPANY.name}`}
        src={`https://maps.google.com/maps?q=${query}&output=embed`}
        width="100%"
        height="320"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
