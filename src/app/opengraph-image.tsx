import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site.config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`;

// Generated at request time — this is the image link previews (Facebook,
// LinkedIn, Slack, X/Twitter, etc) show when someone shares a ilearn4u link.
// Editing site.config.ts brand colours/tagline updates this image too.
export default function OpengraphImage() {
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
          backgroundColor: "#0F3D2E",
          backgroundImage: "linear-gradient(135deg, #0F3D2E 0%, #0A2B20 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 14,
              backgroundColor: "#E8792C",
              color: "white",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            {siteConfig.brand.logoInitial}
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, color: "#F1E6D8" }}>
            {siteConfig.brand.name}
          </div>
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 58,
            fontWeight: 700,
            color: "white",
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          {siteConfig.brand.tagline}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            color: "#F1E6D8",
            maxWidth: 780,
          }}
        >
          {siteConfig.brand.description}
        </div>
      </div>
    ),
    { ...size }
  );
}
