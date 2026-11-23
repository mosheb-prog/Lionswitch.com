import { createOgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Why Lion Switch";

export default function Image() {
  return createOgImage(
    "Why Lion Switch",
    "Family-run in Brooklyn. White-glove service, carrier-class infrastructure.",
  );
}
