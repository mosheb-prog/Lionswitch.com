import { createOgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Lion Switch Features";

export default function Image() {
  return createOgImage(
    "Cloud PBX, UCaaS, Contact Center & AI",
    "Every Lion Switch feature in one place.",
  );
}
