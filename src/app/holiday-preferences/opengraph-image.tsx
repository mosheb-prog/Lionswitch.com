import { createOgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Lion Switch Holiday Preferences";

export default function Image() {
  return createOgImage(
    "Holiday Preferences",
    "Tell us how your phone lines should behave on holidays.",
  );
}
