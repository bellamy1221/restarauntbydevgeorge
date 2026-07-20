import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "VINCENZO";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1c1612",
          color: "#f2ebe2",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            opacity: 0.65,
          }}
        >
          Contemporary Italian
        </div>
        <div>
          <div
            style={{
              fontSize: 96,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            Vincenzo
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 32,
              opacity: 0.8,
              maxWidth: 700,
            }}
          >
            Современная Италия. Без лишних слов.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
