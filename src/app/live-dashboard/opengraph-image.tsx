import { createOgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Lion Switch Live Call Dashboard";

export default function Image() {
  return createOgImage(
    "See every call, live.",
    "A live call dashboard with advanced reporting for Lion Switch customers.",
  );
}
