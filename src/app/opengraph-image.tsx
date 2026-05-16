import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "parabreak — the meta engine for Godot";

const BG = "#0A0B0F";
const INK = "#E6E8EF";
const INK_2 = "#B4B8C5";
const MUTE = "#6B7080";
const GREEN = "#46E49E";

function Mark({ size: s = 68, stroke = 6 }: { size?: number; stroke?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
      <path d="M 12 12 L 12 88 L 88 88 L 88 56" stroke={INK} strokeWidth={stroke} strokeLinecap="square" strokeLinejoin="miter" />
      <g transform="translate(8 -4) rotate(-3 50 30)">
        <path d="M 12 12 L 88 12 L 88 56" stroke={GREEN} strokeWidth={stroke} strokeLinecap="square" strokeLinejoin="miter" />
      </g>
      <rect x="84" y="48" width="3" height="3" fill={GREEN} />
      <rect x="78" y="52" width="2" height="2" fill={GREEN} fillOpacity="0.6" />
      <rect x="72" y="46" width="2" height="2" fill={GREEN} fillOpacity="0.4" />
    </svg>
  );
}

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: BG,
          color: INK,
          padding: "72px 80px",
          display: "flex",
          flexDirection: "column",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Mark size={64} stroke={6} />
          <span style={{ fontSize: 44, fontWeight: 600, letterSpacing: "-0.04em", display: "flex", alignItems: "baseline" }}>
            <span>para</span>
            <span style={{ color: GREEN, transform: "translateY(-3px) rotate(-3deg)", marginLeft: 2 }}>break</span>
          </span>
        </div>

        <div style={{ marginTop: 56, display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 14, letterSpacing: "0.22em", color: MUTE, textTransform: "uppercase" }}>
            // the engine notices.
          </span>
          <h1
            style={{
              fontSize: 108,
              fontWeight: 700,
              letterSpacing: "-0.045em",
              lineHeight: 0.95,
              margin: "20px 0 0",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>The meta engine</span>
            <span>
              for <span style={{ color: GREEN, transform: "translateY(-6px) rotate(-3deg)" }}>Godot</span>.
            </span>
          </h1>
          <p style={{ fontSize: 22, color: INK_2, marginTop: 36, maxWidth: 880, lineHeight: 1.4 }}>
            A runtime layer that gives your characters access to the save file, the menu, the player&apos;s last session.{" "}
            <span style={{ color: INK }}>Build games that notice you back.</span>
          </p>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            fontSize: 16,
            color: MUTE,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          <span>
            <span style={{ color: GREEN }}>//</span> parabreak.com
          </span>
          <span>
            v0.1 · <span style={{ color: GREEN }}>35 typed hooks</span> · Godot 4.x · MIT core
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
