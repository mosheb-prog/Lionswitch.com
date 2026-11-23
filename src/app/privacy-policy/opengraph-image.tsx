import { createOgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Lion Switch Privacy Policy";

export default function Image() {
  return createOgImage("Privacy Policy");
}
