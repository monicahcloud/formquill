import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const runtime = "edge";

export async function GET() {
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
        }}>
        <div style={{ fontSize: 56, fontWeight: 800 }}>{SITE.name}</div>
        <div style={{ fontSize: 28, fontWeight: 500, marginTop: 12 }}>
          {SITE.taglines[0]}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
