import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 628 };
export const contentType = "image/png";
export const alt = "parabreak — Godotのためのメタエンジン";

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
          <span style={{ marginLeft: "auto", fontSize: 14, color: MUTE, letterSpacing: "0.18em" }}>
            // メタエンジン · <span style={{ color: GREEN }}>v0.1</span>
          </span>
        </div>

        <div style={{ marginTop: 64, display: "flex", flexDirection: "column" }}>
          <h1 style={{ fontSize: 76, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.2, margin: 0, display: "flex", flexDirection: "column" }}>
            <span>
              プレイヤーが<span style={{ color: MUTE, textDecorationLine: "line-through", textDecorationColor: RED, textDecorationThickness: 3 }}>チュートリアルを</span>
            </span>
            <span>
              <span style={{ color: GREEN }}>飛ばした</span>。
            </span>
            <span>
              ゲームが<span style={{ color: GREEN }}>気づいた</span>。
            </span>
          </h1>
          <p style={{ fontSize: 20, color: INK_2, marginTop: 32, maxWidth: 880, lineHeight: 1.6 }}>
            <span style={{ color: INK }}>parabreak</span>はゲームの縫い目を<span style={{ color: INK }}>型付JSONブロック</span>として露出する。物語が反応できる形に。{" "}
            <span style={{ color: GREEN }}>35フック</span>、3ティア、Godot 4.xネイティブ。
          </p>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            color: MUTE,
            letterSpacing: "0.14em",
          }}
        >
          <span>
            <span style={{ color: GREEN }}>//</span> 第四の壁、商用で
          </span>
          <span>
            parabreak.com/ja · <span style={{ color: GREEN }}>35型付ブロック</span>
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
