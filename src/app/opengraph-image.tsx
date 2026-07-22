import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Lume Labs — Custom Software Consultancy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle radial glow — top right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "420px",
            height: "420px",
            background:
              "radial-gradient(circle at top right, rgba(196,196,196,0.08) 0%, transparent 65%)",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "52px",
          }}
        >
          <div
            style={{
              width: "9px",
              height: "9px",
              borderRadius: "50%",
              background: "#c4c4c4",
            }}
          />
          <span
            style={{
              color: "#c4c4c4",
              fontSize: "18px",
              fontWeight: 500,
              letterSpacing: "0.1em",
            }}
          >
            LUME LABS
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            color: "#fafafa",
            fontSize: "62px",
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: "820px",
            marginBottom: "28px",
          }}
        >
          Custom Software, Built to Last.
        </div>

        {/* URL */}
        <div
          style={{
            color: "#525252",
            fontSize: "22px",
            fontWeight: 400,
          }}
        >
          lumelabs.dev
        </div>
      </div>
    ),
    { ...size }
  );
}