import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 628 };
export const contentType = "image/png";
export const alt = "parabreak — Godot을 위한 메타 엔진";

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
            // 메타 엔진 · <span style={{ color: GREEN }}>v0.1</span>
          </span>
        </div>

        <div style={{ marginTop: 64, display: "flex", flexDirection: "column" }}>
          <h1 style={{ fontSize: 80, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.15, margin: 0, display: "flex", flexDirection: "column" }}>
            <span>
              플레이어가 <span style={{ color: MUTE, textDecorationLine: "line-through", textDecorationColor: RED, textDecorationThickness: 3 }}>튜토리얼을</span>
            </span>
            <span>
              <span style={{ color: GREEN }}>건너뛰었다</span>.
            </span>
            <span>
              게임이 <span style={{ color: GREEN }}>눈치 챘다</span>.
            </span>
          </h1>
          <p style={{ fontSize: 20, color: INK_2, marginTop: 32, maxWidth: 880, lineHeight: 1.6 }}>
            <span style={{ color: INK }}>parabreak</span>는 게임의 솔기를 <span style={{ color: INK }}>타입드 JSON 블록</span>으로 노출한다. 이야기가 반응할 수 있게.{" "}
            <span style={{ color: GREEN }}>훅 35개</span>, 3 티어, Godot 4.x 네이티브.
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
            <span style={{ color: GREEN }}>//</span> 4번째 벽, 상업적으로
          </span>
          <span>
            parabreak.com/ko · <span style={{ color: GREEN }}>타입드 블록 35개</span>
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
