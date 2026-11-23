import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { COMPANY } from "./constants";

export const OG_SIZE = { width: 1200, height: 630 };

const LOGO_DATA_URL = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public", "lion-switch-logo.png"),
).toString("base64")}`;

// Shared Open Graph / Twitter card image template, built from the same
// orange/ink/cream tokens as the rest of the site (no new colors).
export function createOgImage(title: string, subtitle?: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#131820",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(245,138,11,0.35), transparent 55%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_DATA_URL}
            width={56}
            height={56}
            alt=""
            style={{ borderRadius: 14 }}
          />
          <div style={{ display: "flex", fontSize: 32, color: "#ffffff", fontWeight: 600 }}>
            {COMPANY.name}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 64,
            lineHeight: 1.15,
            color: "#ffffff",
            fontWeight: 700,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 30,
              color: "#e5e7eb",
              maxWidth: 900,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
    ),
    OG_SIZE,
  );
}
