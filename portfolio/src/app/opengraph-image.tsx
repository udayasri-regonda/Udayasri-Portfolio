import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} | AI/ML & Data Engineering Graduate`;
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
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #090a10 0%, #14172a 60%, #0f2a2a 100%)",
          color: "#e9ebf2",
        }}
      >
        <div style={{ fontSize: 28, color: "#2dd4bf", letterSpacing: 4, textTransform: "uppercase", display: "flex" }}>
          Portfolio
        </div>
        <div style={{ fontSize: 88, fontWeight: 700, marginTop: 24, display: "flex" }}>{profile.name}</div>
        <div style={{ fontSize: 38, marginTop: 20, color: "#a5b4fc", display: "flex" }}>{profile.role}</div>
        <div style={{ fontSize: 28, marginTop: 40, color: "#949aae", display: "flex" }}>
          Python · SQL · Machine Learning · Data Quality
        </div>
      </div>
    ),
    size,
  );
}
