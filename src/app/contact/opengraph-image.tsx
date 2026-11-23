import { createOgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Contact Lion Switch";

export default function Image() {
  return createOgImage("Contact Us", "Schedule a free demo or ask a question.");
}
