import { createOgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Lion Switch Services";

export default function Image() {
  return createOgImage(
    "Enterprise Cloud Communications Services",
    "Voice, UCaaS, contact center, AI & analytics, messaging and integrations.",
  );
}
