import { createOgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Lion Switch — Enterprise Cloud Communications";

export default function Image() {
  return createOgImage(
    "Enterprise Cloud Communications",
    "Carrier-class VoIP, UCaaS, contact center and messaging from Brooklyn, NY.",
  );
}
