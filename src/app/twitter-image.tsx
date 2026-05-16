import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 628 };
export const contentType = "image/png";
export const alt = "parabreak — the meta engine for Godot";

const BG = "#0A0B0F";
const INK = "#E6E8EF";
const INK_2 = "#B4B8C5";
const MUTE = "#6B7080";
const GREEN = "#46E49E";
const RED = "#E44C4C";

function Mark({ size: s = 36, stroke = 8 }: { size?: number; stroke?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
      <path d="M 12 12 L 12 88 L 88 88 L 88 56" stroke={INK} strokeWidth={stroke} strokeLinecap="square" strokeLinejoin="miter" />
      <g transform="translate(8 -4) rotate(-3 50 30)">
        <path d="M 12 12 L 88 12 L 88 56" stroke={GREEN} strokeWidth={stroke} strokeLinecap="square" strokeLinejoin="miter" />
      </g>
    </svg>
  );
}

export default async function Twitter() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: BG,
          color: INK,
          padding: "56px 72px",
          display: "flex",
          flexDirection: "column",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Mark size={32} stroke={8} />
          <span style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.04em", display: "flex", alignItems: "baseline" }}>
            <span>para</span>
            <span style={{ color: GREEN, transform: "translateY(-2px) rotate(-3deg)", marginLeft: 2 }}>break</span>
          </span>
          <span style={{ marginLeft: "auto", fontSize: 14, color: MUTE, letterSpacing: "0.22em", textTransform: "uppercase" }}>
            // THE META ENGINE · <span style={{ color: GREEN }}>v0.1</span>
          </span>
        </div>

        <div style={{ marginTop: 64, display: "flex", flexDirection: "column" }}>
          <h1 style={{ fontSize: 88, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.0, margin: 0, display: "flex", flexDirection: "column" }}>
            <span>
              Your player <span style={{ color: MUTE, textDecorationLine: "line-through", textDecorationColor: RED, textDecorationThickness: 3 }}>finished</span>
            </span>
            <span>
              <span style={{ color: GREEN }}>skipped</span> the tutorial.
            </span>
            <span>
              Your game <span style={{ color: GREEN }}>noticed</span>.
            </span>
          </h1>
          <p style={{ fontSize: 20, color: INK_2, marginTop: 32, maxWidth: 880, lineHeight: 1.5 }}>
            <span style={{ color: INK }}>parabreak</span> exposes the seams as <span style={{ color: INK }}>typed JSON blocks</span> your story can react to.{" "}
            <span style={{ color: GREEN }}>35 hooks</span> across 3 tiers, native to Godot 4.x.
          </p>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            color: MUTE,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          <span>
            <span style={{ color: GREEN }}>//</span> break the fourth wall · commercially
          </span>
          <span>
            parabreak.com · <span style={{ color: GREEN }}>35 typed blocks</span>
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
