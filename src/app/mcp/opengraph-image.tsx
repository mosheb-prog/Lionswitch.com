import { createOgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Lion Switch MCP Integration";

export default function Image() {
  return createOgImage(
    "Your calls, now connected to Claude.",
    "Calls are transcribed after they end. Ask Claude anything about any call.",
  );
}
