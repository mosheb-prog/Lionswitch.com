import { createOgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Lion Switch MCP Integration";

export default function Image() {
  return createOgImage(
    "Your calls, now connected to AI.",
    "Calls are transcribed after they end. Ask any MCP-compatible AI about any call.",
  );
}
