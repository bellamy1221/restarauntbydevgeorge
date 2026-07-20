import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1c1612",
          color: "#f2ebe2",
          fontSize: 18,
          fontFamily: "Georgia, serif",
          letterSpacing: "0.05em",
        }}
      >
        V
      </div>
    ),
    { ...size },
  );
}
