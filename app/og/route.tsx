import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const runtime = "edge";
export const alt = SITE.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "linear-gradient(135deg, #6B4EFF 0%, #06B6D4 100%)",
          color: "white",
          fontSize: 56,
          fontWeight: 800,
        }}>
        <div>{SITE.name}</div>
        <div style={{ fontSize: 28, fontWeight: 500, marginTop: 12 }}>
          {SITE.taglines[0]}
        </div>
      </div>
    ),
    { ...size }
  );
}
