"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* ===================== Shared atoms ===================== */
function BrokenFrameMark({
  size = 110,
  accent = "var(--green)",
  ink = "var(--ink)",
  stroke = 6,
  offsetX = 8,
  offsetY = -4,
  angle = -3,
  fragments = true,
  breakY = 56,
}: {
  size?: number;
  accent?: string;
  ink?: string;
  stroke?: number;
  offsetX?: number;
  offsetY?: number;
  angle?: number;
  fragments?: boolean;
  breakY?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <path
        d={`M 12 12 L 12 88 L 88 88 L 88 ${breakY}`}
        stroke={ink}
        strokeWidth={stroke}
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <g transform={`translate(${offsetX} ${offsetY}) rotate(${angle} 50 30)`}>
        <path
          d={`M 12 12 L 88 12 L 88 ${breakY}`}
          stroke={accent}
          strokeWidth={stroke}
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </g>
      {fragments && (
        <g>
          <rect x="84" y={breakY - 8} width="3" height="3" fill={accent} />
          <rect x="78" y={breakY - 4} width="2" height="2" fill={accent} opacity="0.6" />
          <rect x="72" y={breakY - 10} width="2" height="2" fill={accent} opacity="0.4" />
        </g>
      )}
    </svg>
  );
}

function LangSwitcher() {
  return (
    <div style={{ display: "flex", gap: 6, fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--mute)" }}>
      <a href="/" style={{ padding: "2px 6px", border: "1px solid var(--line-2)" }}>EN</a>
      <span style={{ padding: "2px 6px", border: "1px solid var(--green)", color: "var(--green)" }}>KO</span>
      <a href="/ja" style={{ padding: "2px 6px", border: "1px solid var(--line-2)" }}>JA</a>
    </div>
  );
}

function Nav({
  theme,
  setTheme,
}: {
  theme: "dark" | "light";
  setTheme: (t: "dark" | "light") => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);
  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <div className="nav-logo">
            <BrokenFrameMark size={28} stroke={8} />
            <span className="word">
              para<span className="br">break</span>
            </span>
          </div>
          <div className="nav-links">
            <a href="#what">소개</a>
            <a href="#breaks">깨지는 곳</a>
            <a href="#hooks">훅</a>
            <a href="#korean">한국 시장</a>
            <a href="#pricing">가격</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="nav-right">
            <LangSwitcher />
            <span className="ver">
              <span className="acc">v0.1</span> · Godot 4.x
            </span>
            <button
              className="theme-toggle"
              aria-label="테마 전환"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <span className="knob"></span>
            </button>
            <a href="#" className="btn primary">
              설치 <span className="arrow">→</span>
            </a>
            <button className="hamburger" aria-label="메뉴 열기" onClick={() => setMenuOpen(true)}>
              <span className="bars"><span></span><span></span><span></span></span>
              메뉴
            </button>
          </div>
        </div>
      </nav>
      {menuOpen && (
        <div className="mobile-menu open" role="dialog" aria-modal="true">
          <button className="close" onClick={close}>닫기 ×</button>
          <a href="#what" onClick={close}>소개</a>
          <a href="#breaks" onClick={close}>깨지는 곳</a>
          <a href="#hooks" onClick={close}>훅</a>
          <a href="#korean" onClick={close}>한국 시장</a>
          <a href="#pricing" onClick={close}>가격</a>
          <a href="#faq" onClick={close}>FAQ</a>
          <div className="switch">
            <a href="/">EN</a>
            <span className="active">KO</span>
            <a href="/ja">JA</a>
          </div>
        </div>
      )}
    </>
  );
}

function SectionLabel({ num, text }: { num: string; text: string }) {
  return (
    <div className="section-label">
      <span className="line"></span>
      <span className="num">{num}</span>
      <span>{text}</span>
    </div>
  );
}

/* ===================== Hero animation ===================== */
type Callout = { k: string; v: string };
type Step = {
  name: string;
  dur: number;
  body: ReactNode;
  callouts: Callout[];
  showChoices?: boolean;
};

const STEPS: Step[] = [
  {
    name: "TYPE",
    dur: 600,
    body: (
      <>
        대사가 평소처럼 타자를 친다
        <span className="caret"></span>
      </>
    ),
    callouts: [{ k: "01", v: "block: narration" }],
  },
  {
    name: "PAUSE",
    dur: 700,
    body: (
      <>
        대사가 평소처럼 타자를 친다. <span style={{ color: "var(--mute)" }}>…</span>
        <span className="caret"></span>
      </>
    ),
    callouts: [
      { k: "01", v: "block: narration" },
      { k: "02", v: 'beat · narration "..."' },
    ],
  },
  {
    name: "NOTICE",
    dur: 600,
    body: (
      <>
        대사가 평소처럼 타자를 친다. …
        <span className="caret"></span>
      </>
    ),
    callouts: [
      { k: "02", v: 'beat · narration "..."' },
      { k: "03", v: "persistent_flag_set" },
      { k: "04", v: "FLAG_PLAYER_NOTICED = true" },
    ],
  },
  {
    name: "REWRITE",
    dur: 900,
    body: (
      <>
        대사가 <span className="strike">타자를 친다</span>{" "}
        <span className="new">스스로 쓰기 시작한다</span>. …
        <span className="caret"></span>
      </>
    ),
    callouts: [
      { k: "03", v: "persistent_flag_set" },
      { k: "05", v: "text_corrupt · scramble_chars" },
      { k: "06", v: "target: next_block" },
    ],
  },
  {
    name: "BREAK",
    dur: 1000,
    body: (
      <>
        대사가 <span className="new">스스로 쓴다</span>.<br />
        <span className="new">눈치 챘구나.</span>
        <span className="caret"></span>
      </>
    ),
    callouts: [
      { k: "05", v: "text_corrupt · scramble_chars" },
      { k: "07", v: "shader_effect · scanline" },
      { k: "08", v: "intensity 0.6 · 0.8s" },
    ],
  },
  {
    name: "CHOICE",
    dur: 1200,
    body: (
      <>
        눈치 챘구나. 그럼 고르자.<span className="caret"></span>
      </>
    ),
    callouts: [
      { k: "07", v: "shader_effect · scanline" },
      { k: "09", v: "narration · resume" },
      { k: "10", v: "flag persists across runs" },
    ],
    showChoices: true,
  },
];

function HeroAnim() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const tRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlaying(false);
    }
  }, []);
  useEffect(() => {
    if (!playing) return;
    tRef.current = setTimeout(() => setStep((s) => (s + 1) % STEPS.length), STEPS[step].dur);
    return () => {
      if (tRef.current) clearTimeout(tRef.current);
    };
  }, [step, playing]);
  const cur = STEPS[step];
  const breaking = cur.name === "BREAK";

  return (
    <div className="hero-anim">
      <div className="anim-header">
        <span className="lights">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <span className="file">// scene_03 · scenario.json</span>
        <span className="right">
          block {step + 1}/{STEPS.length} · {cur.name}
        </span>
      </div>
      <div className={"dialog-stage" + (breaking ? " breaking" : "")}>
        <div className="character">
          <div className="portrait">
            <span className="scan"></span>
          </div>
          <div style={{ flex: 1, paddingTop: 4 }}>
            <div className="name">
              아키비스트 <span className="meta">// flag: {step >= 2 ? <span style={{ color: "var(--green)" }}>NOTICED=true</span> : "NOTICED=false"}</span>
            </div>
            <div className="body">
              <span className="typed" key={step}>
                {cur.body}
              </span>
            </div>
          </div>
        </div>

        {cur.showChoices ? (
          <div className="choices">
            <div className="choice">
              <span className="pre">›</span>
              <span>&apos;미안. 다시 시작할게.&apos;</span>
            </div>
            <div className="choice locked">
              <span className="pre">›</span>
              <span>&apos;아무것도 못 봤어.&apos;</span>
              <span className="lock-tag">잠김 · FLAG_PLAYER_NOTICED</span>
            </div>
            <div className="choice selected">
              <span className="pre">›</span>
              <span>&apos;어떻게 기억해?&apos;</span>
            </div>
          </div>
        ) : (
          <div className="choices" style={{ visibility: "hidden" }}>
            <div className="choice"><span className="pre">›</span><span>placeholder</span></div>
            <div className="choice"><span className="pre">›</span><span>placeholder</span></div>
            <div className="choice"><span className="pre">›</span><span>placeholder</span></div>
          </div>
        )}

        <div className="hero-callouts">
          {[0, 1, 2, 3, 4].map((i) => {
            const c = cur.callouts[i];
            return (
              <div key={i} className={"item " + (c ? "on" : "")}>
                {c && (
                  <>
                    <span className="k">{c.k}</span> · {c.v}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="anim-controls">
        <button onClick={() => setPlaying(!playing)}>{playing ? "❚❚ 일시정지" : "▶ 재생"}</button>
        <button
          onClick={() => {
            setStep(0);
            setPlaying(true);
          }}
        >
          ↺ 처음으로
        </button>
        <span className="step">/ {cur.name.toLowerCase()} · 5.0s loop</span>
      </div>
    </div>
  );
}

/* ===================== Hero ===================== */
function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <div className="hero-eyebrow">
            <span className="dot"></span>
            <span>v0.1 · Godot 4.x · MIT core</span>
            <span className="acc">// 공개 알파</span>
          </div>

          <div className="hero-h1-wrap">
            <h1>
              Godot을 위한<br />
              메타 <span className="br">엔진</span>.
            </h1>
          </div>

          <p className="hero-sub">
            parabreak는 캐릭터가 게임 바깥의 것들에 접근하게 해주는 런타임 레이어다. 세이브 파일, 메뉴, 플레이어의 지난 세션, 시스템 시계까지. <b>플레이어를 의식하는 게임</b>을 엔진을 새로 짤 필요 없이 만든다.
          </p>

          <div className="hero-actions">
            <a href="#" className="btn primary">
              parabreak 설치 <span className="arrow">→</span>
            </a>
            <a href="#hooks" className="btn">
              35개 훅 보기
            </a>
            <a href="#docs" className="btn ghost">
              문서 읽기
            </a>
          </div>

          <div className="hero-stickers">
            <div className="sticker-pill">
              <span className="dot"></span>4번째 벽, 상업적으로
            </div>
            <div className="sticker-pill">
              <span className="dot amber"></span>플레이어가 세이브를 지웠다
            </div>
            <div className="sticker-pill dialogic">
              <span className="dot violet"></span><b>Dialogic 2</b> 호환
            </div>
          </div>

          <div className="hero-meta">
            <div className="item">
              <div className="k">설치</div>
              <div className="v">
                1줄 · <span className="acc">애드온</span>
              </div>
            </div>
            <div className="item">
              <div className="k">훅</div>
              <div className="v">
                <span className="acc">35개</span> 타입드 시그널 · 계속 추가
              </div>
            </div>
            <div className="item">
              <div className="k">라이선스</div>
              <div className="v">
                MIT 코어 · <span className="acc">상용 OK</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <HeroAnim />
        </div>
      </div>
    </section>
  );
}

/* ===================== Under engine ===================== */
function UnderEngine() {
  return (
    <section className="under">
      <div className="container under-row">
        <div className="label">// 호환성</div>
        <div className="marks">
          <div className="mark">
            <span className="badge">엔진</span> Godot 4.x
          </div>
          <div className="mark">
            <span className="badge">플러그인</span> Dialogic 2 호환
          </div>
          <div className="mark">
            <span className="badge">라이선스</span> MIT 코어
          </div>
          <div className="mark">
            <span className="badge">플랫폼</span> win · mac · linux
          </div>
          <div className="mark">
            <span className="badge">제작 사례</span> KNOT (얼리액세스)
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== What is parabreak ===================== */
function WhatIs() {
  return (
    <section id="what" className="what">
      <div className="container">
        <SectionLabel num="01" text="parabreak 소개" />
        <div className="what-head">
          <div>
            <h2>
              자기가 엔진인 줄 아는<br />
              엔진 레이어.
            </h2>
          </div>
          <div className="lead">
            <p>
              대부분의 게임 엔진은 플레이어가 거기 있는 척 안 한다. <b>parabreak는 반대다.</b> 세이브 파일, 대사, 메뉴, 카메라 — 이 솔기들을 <span className="acc">1급 훅</span>으로 노출해서 이야기가 반응할 수 있게 한다. <span className="strike">플러그인.</span> 엔진.
            </p>
          </div>
        </div>

        <div className="what-cards">
          <div className="wcard">
            <div className="num">
              <span className="acc">01.</span> 문제
            </div>
            <h4>메타 연출은 일회용이 된다.</h4>
            <p>
              &apos;게임이 안다&apos; 류 연출은 매번 200줄짜리 핸드롤 해킹이다. 세이브 스캔, 파일 IO, 대사 시스템 패치. 한 번 통하고 다음 패치에 깨진다.
            </p>
            <div className="strip">
              {`# 깨지기 쉬운 핸드롤\nif FileAccess.file_exists(\n    "user://save_001.dat"):\n    `}
              <span className="red">// 커스텀 파서. 부서지기 쉽다.</span>
            </div>
            <div className="meta">
              <span>parabreak 없이</span>
              <span className="acc">훅 1개에 ~200줄</span>
            </div>
          </div>

          <div className="wcard">
            <div className="num">
              <span className="acc">02.</span> 프리미티브
            </div>
            <h4>
              훅 <span style={{ whiteSpace: "nowrap" }}>서른다섯 개</span>, 계속 늘어남.
            </h4>
            <p>
              세이브 조작, 대사 재작성, 선택지 잠금, 메뉴 변형, 내레이터 개입 — 전부 시나리오 JSON에 떨어뜨리는 타입드 블록이다.
            </p>
            <div className="strip">
              {`{"type": "save_delete",\n  "slot": 0,\n  `}
              <span className="green">{`"mark_persistent": true`}</span>
              {`}\n`}
              <span className="mute">// 블록 하나. 그게 훅이다.</span>
            </div>
            <div className="meta">
              <span>parabreak로</span>
              <span className="acc">블록 1개</span>
            </div>
          </div>

          <div className="wcard">
            <div className="num">
              <span className="acc">03.</span> 엔진
            </div>
            <h4>Godot 4.x 네이티브.</h4>
            <p>
              GDScript 우선. Dialogue 플러그인과 같이 돈다. 포크 안 한다. <code style={{ color: "var(--green)" }}>res://addons</code>에 떨어뜨리는 애드온으로 출고.
            </p>
            <div className="strip">
              {`# project.godot\n[autoload]\nparabreak="res://addons/parabreak"\n# `}
              <span className="green">설치 끝.</span>
            </div>
            <div className="meta">
              <span>설치</span>
              <span className="acc">애드온 · 포크 X</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== What breaks ===================== */
function WhatBreaks() {
  return (
    <section id="breaks" className="breaks">
      <div className="container">
        <SectionLabel num="02" text="깨지는 곳" />
        <div className="breaks-head">
          <div>
            <h2>
              네 가지 솔기,<br />
              그 위에 서른다섯 개 훅.
            </h2>
          </div>
          <div className="lead">
            <p>
              메타 연출은 네 가지 프리미티브로 묶인다. parabreak는 각각에 대응하는 타입드 시나리오 블록을 가진다 — 떨어뜨리고 끝. 엔진 포크 없다. 아래 일러스트는 각 카테고리가 런타임에 <i>어떻게 느껴지는지</i>다. 특정 게임 스크린샷이 아니다.
            </p>
          </div>
        </div>

        <div className="breaks-grid">
          <div className="bcard">
            <div>
              <div className="label">
                <span className="acc">A.</span> 세이브 조작
              </div>
              <h4>게임이 세이브 폴더를 본다.</h4>
              <p>읽고, 이름 바꾸고, 지우고, 망가뜨리고, 슬롯과 재설치를 가로지르는 영속 플래그를 찍는다. 게임은 플레이어가 <i>지난번</i>에 한 짓을 기억한다.</p>
              <div className="blocks">
                <code>save_delete</code><code>save_corrupt</code><code>persistent_flag_set</code><code>slot_rename</code><code>save_integrity_check</code>
              </div>
            </div>
            <div className="illus save">
              <div className="file-list">
                <div className="file-row"><span>save_001.dat</span><span className="meta">12 KB · ok</span></div>
                <div className="file-row del"><span>save_002.dat</span><span className="meta">— 삭제됨</span></div>
                <div className="file-row"><span>save_003.dat</span><span className="meta">8 KB · <span style={{color:"var(--red)"}}>손상</span></span></div>
                <div className="file-row new"><span>FLAG_PLAYER_NOTICED</span><span className="meta">true · 영속</span></div>
                <div className="file-row"><span>last_session.log</span><span className="meta">3분 전</span></div>
              </div>
            </div>
          </div>

          <div className="bcard">
            <div>
              <div className="label">
                <span className="acc">B.</span> 대사 재작성
              </div>
              <h4>읽는 동안 대사가 바뀐다.</h4>
              <p>캐릭터가 너의 세이브, 이름, 직전 선택을 보고 — 문장 중간에 다시 쓴다. 반복된 선택을 잡고, 뒤로 가기를 막고, 플레이어의 행동을 기다린다.</p>
              <div className="blocks">
                <code>text_corrupt</code><code>dialogue_reactive</code><code>wait_for_action</code><code>detect_repeat_choice</code><code>detect_back_attempt</code>
              </div>
            </div>
            <div className="illus dialog">
              <div className="lines">
                <div>› 아키비스트</div>
                <div>&apos;돌아왔네. <span className="strike">튜토리얼은 끝냈어?</span>&apos;</div>
                <div><span className="new">&apos;…건너뛰었구나.&apos;</span></div>
                <div className="narr">내레이터: 그가 그걸 알 리 없었다.</div>
              </div>
            </div>
          </div>

          <div className="bcard">
            <div>
              <div className="label">
                <span className="acc">C.</span> UI 해체
              </div>
              <h4>메뉴가 거짓말하고, 흘러내리고, 거부한다.</h4>
              <p>버튼을 파괴하거나 비활성화. 슬롯 이름 바꾸기. 윈도우 제목 변경. 종료 실패. 크롬도 이제 이야기의 일부다.</p>
              <div className="blocks">
                <code>ui_button_destroy</code><code>ui_button_disable</code><code>window_title_set</code><code>title_screen_variant</code><code>game_quit</code>
              </div>
            </div>
            <div className="illus ui">
              <div className="frame">
                <div className="title">메인 메뉴 · v0.1</div>
                <div className="menu">
                  <div className="item kept">이어하기</div>
                  <div className="item gone">새 게임</div>
                  <div className="item">옵션</div>
                  <div className="item gone">종료</div>
                </div>
                <div className="title" style={{ textAlign: "right", color: "var(--red)" }}>// 버튼 2개 파괴됨</div>
              </div>
            </div>
          </div>

          <div className="bcard">
            <div>
              <div className="label">
                <span className="acc">D.</span> 가짜 OS + 세계 유출 · <span style={{ color: "var(--violet)" }}>PLUS</span>
              </div>
              <h4>게임이 창 밖으로 새어 나간다.</h4>
              <p>OS 풍 가짜 다이얼로그, 클립보드 읽기/쓰기, 실시간 시계 인지, 슬롯 사칭, 씬 라이브 리로드. 자주 쓰지 마라 — 드물어야 효과가 산다.</p>
              <div className="blocks">
                <code>fake_dialog</code><code>clipboard_write</code><code>clipboard_read</code><code>real_time_check</code><code>fake_permission_popup</code><code>slot_impersonation</code>
              </div>
            </div>
            <div className="illus fake">
              <div className="scanline"></div>
              <div className="alert">
                <div className="bar"><span>알림</span><span>×</span></div>
                <div className="body">아직 게임 안이다. 네가 아니라고 생각할 뿐.</div>
                <div className="row">
                  <div className="b">취소</div>
                  <div className="b p">확인</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== Hooks (35 typed blocks) ===================== */
type Hook = [string, string, Record<string, unknown>];
type Tier = { label: string; sub: string; color: string; hooks: Hook[] };

const HOOK_TIERS: Record<"core" | "hooks" | "plus", Tier> = {
  core: {
    label: "CORE",
    sub: "오픈소스 · MIT · 엔진에 포함",
    color: "var(--green)",
    hooks: [
      ["save_delete", "디스크에서 세이브 슬롯을 지운다.", { type: "save_delete", slot: 0, mark_persistent: true }],
      ["save_corrupt", "재현 가능한 방식으로 세이브를 망가뜨린다.", { type: "save_corrupt", slot: 0, mode: "header" }],
      ["persistent_flag_set", "재설치 후에도 살아남는 플래그를 찍는다.", { type: "persistent_flag_set", key: "FLAG_PLAYER_NOTICED", value: true }],
      ["persistent_flag_get", "여러 회차에 걸쳐 쓰인 플래그를 읽는다.", { type: "persistent_flag_get", key: "FLAG_PLAYER_NOTICED" }],
      ["ui_button_destroy", "UI 버튼을 통째로 없앤다.", { type: "ui_button_destroy", target: "main_menu.quit" }],
      ["ui_button_disable", "버튼을 없애지 않고 회색 처리만 한다.", { type: "ui_button_disable", target: "main_menu.continue" }],
      ["window_title_set", "런타임에 OS 창 제목을 바꾼다.", { type: "window_title_set", value: "parabreak — 또 왔어?" }],
      ["slot_rename", "세이브 목록의 슬롯 이름을 바꾼다.", { type: "slot_rename", slot: 0, name: "archivist" }],
      ["title_screen_variant", "타이틀 화면을 변형판으로 바꾼다.", { type: "title_screen_variant", id: "after_first_death" }],
      ["save_integrity_check", "세이브를 해시하고 변조에 반응한다.", { type: "save_integrity_check", slot: 0 }],
      ["game_quit", "깨끗하게 종료시키거나 거부한다.", { type: "game_quit", allow: false }],
      ["game_crash", "내러티브용으로 크래시를 흉내낸다.", { type: "game_crash", style: "segfault" }],
      ["window_close", "프로그램적으로 창을 닫는다.", { type: "window_close" }],
    ],
  },
  hooks: {
    label: "HOOKS",
    sub: "$49 · 반응형 블록 8개",
    color: "var(--amber)",
    hooks: [
      ["shader_effect", "스캔라인, 왜곡, 색수차. 시간 제한.", { type: "shader_effect", effect: "scanline", intensity: 0.45, duration: 1.5 }],
      ["audio_effect", "피치, 비트크러시, 역재생. 채널별.", { type: "audio_effect", effect: "pitch_shift", amount: -0.3 }],
      ["text_corrupt", "다음 텍스트를 스크램블하거나 교체.", { type: "text_corrupt", mode: "scramble_chars", target: "next_block" }],
      ["dialogue_reactive", "플래그나 세이브 상태로 대사를 분기.", { type: "dialogue_reactive", flag: "FLAG_PLAYER_NOTICED" }],
      ["input_hijack", "잠깐 입력을 거부, 스왑, 또는 반전.", { type: "input_hijack", mode: "invert_xy", duration: 2.0 }],
      ["wait_for_action", "플레이어가 무언가를 (또는 거부를) 할 때까지 멈춤.", { type: "wait_for_action", expect: "click_quit", timeout: 30 }],
      ["detect_repeat_choice", "같은 선택을 두 번 고르는 것을 잡는다.", { type: "detect_repeat_choice", choice_id: "lie_to_archivist", threshold: 2 }],
      ["detect_back_attempt", "리로드/뒤로가기 재시도를 잡는다.", { type: "detect_back_attempt", within_seconds: 5 }],
    ],
  },
  plus: {
    label: "PLUS",
    sub: "$69 · 고급 블록 14개",
    color: "var(--violet)",
    hooks: [
      ["fake_dialog", "엔진 내부에서 OS 풍 가짜 팝업.", { type: "fake_dialog", style: "windows_error", title: "알림", body: "아직 게임 안이다." }],
      ["fake_permission_popup", "가짜 권한 요청 팝업.", { type: "fake_permission_popup", kind: "mic_access" }],
      ["clipboard_write", "동의 후 시스템 클립보드에 쓴다.", { type: "clipboard_write", value: "네 세이브 폴더를 봐." }],
      ["clipboard_read", "동의 후 클립보드를 읽는다.", { type: "clipboard_read", on_match: "reactive_line" }],
      ["real_time_check", "벽시계를 읽어 날짜/시간에 반응.", { type: "real_time_check", condition: "after_midnight" }],
      ["user_file_read", "샌드박스 user 경로에서 파일을 읽는다.", { type: "user_file_read", path: "user://notes.txt" }],
      ["user_file_write", "샌드박스 user 경로에 파일을 쓴다.", { type: "user_file_write", path: "user://letter.txt", body: "너를 본다." }],
      ["cross_slot_bleed", "한 슬롯의 상태가 다른 슬롯으로 새어 들어간다.", { type: "cross_slot_bleed", from: 1, to: 0, key: "memory" }],
      ["slot_impersonation", "슬롯 N을 플레이어에게 슬롯 M처럼 보이게 한다.", { type: "slot_impersonation", shown_as: 0, actually: 2 }],
      ["scene_live_reload", "플레이 중 씬을 변형판으로 핫스왑.", { type: "scene_live_reload", target: "res://scenes/room.tscn", variant: "after_meta" }],
      ["text_i18n", "시나리오 블록별 로케일 텍스트 변형.", { type: "text_i18n", key: "NARRATOR_GREETING", locales: { en: "…", ko: "…" } }],
      ["discord_presence", "내러티브 비트로 Discord 리치 프레즌스 설정.", { type: "discord_presence", state: "still inside the game", details: "archivist · day 3" }],
      ["steam_overlay_awareness", "Steam 오버레이가 열리거나 닫힐 때 반응.", { type: "steam_overlay_awareness", on: "overlay_open" }],
      ["accessibility_hook", "스크린리더/고대비/모션 감소 설정으로 분기.", { type: "accessibility_hook", flag: "reduced_motion" }],
    ],
  },
};

function JsonRender({ obj }: { obj: Record<string, unknown> }) {
  const lines = JSON.stringify(obj, null, 2).split("\n");
  return (
    <>
      {lines.map((ln, i) => {
        const parts: ReactNode[] = [];
        const re = /"([^"]+)"\s*:|"([^"]*)"|(true|false|null)|([-]?\d+\.?\d*)/g;
        let last = 0;
        let m: RegExpExecArray | null;
        let key = 0;
        while ((m = re.exec(ln)) !== null) {
          if (m.index > last) parts.push(<span key={key++}>{ln.slice(last, m.index)}</span>);
          if (m[1] !== undefined) parts.push(<span key={key++} className="k">{`"${m[1]}"`}</span>, <span key={key++}>:</span>);
          else if (m[2] !== undefined) parts.push(<span key={key++} className="s">{`"${m[2]}"`}</span>);
          else if (m[3] !== undefined) parts.push(<span key={key++} className="b">{m[3]}</span>);
          else if (m[4] !== undefined) parts.push(<span key={key++} className="n">{m[4]}</span>);
          last = re.lastIndex;
        }
        if (last < ln.length) parts.push(<span key={key++}>{ln.slice(last)}</span>);
        return <div key={i}>{parts}</div>;
      })}
    </>
  );
}

function Hooks() {
  const [tier, setTier] = useState<"core" | "hooks" | "plus">("core");
  const [plusExpanded, setPlusExpanded] = useState(false);
  const t = HOOK_TIERS[tier];
  const visibleHooks = tier === "plus" && !plusExpanded ? t.hooks.slice(0, 8) : t.hooks;
  return (
    <section id="hooks" className="hooks">
      <div className="container">
        <SectionLabel num="03" text="훅 35개" />
        <div className="hooks-head">
          <div>
            <h2>
              <span className="acc" style={{ fontFamily: "var(--f-mono)", fontSize: "0.7em", verticalAlign: "0.18em", marginRight: "0.15em" }}>35</span>개 타입드 블록.<br />하나의 시나리오 포맷.
            </h2>
          </div>
          <div>
            <p style={{ fontFamily: "var(--f-mono)", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6 }}>
              모든 훅은 시나리오 파일 안의 JSON 블록이다. 같은 스키마, 같은 로더, 같은 핫리로드. <span style={{ color: "var(--green)" }}>Core</span>는 오픈으로 출고. <span style={{ color: "var(--amber)" }}>Hooks</span> + <span style={{ color: "var(--violet)" }}>Plus</span>는 반응형과 고급 레이어를 푼다.
            </p>
          </div>
        </div>

        <div className="hooks-tabs">
          {(Object.entries(HOOK_TIERS) as [keyof typeof HOOK_TIERS, Tier][]).map(([key, v]) => (
            <button
              key={key}
              className={"hooks-tab " + (tier === key ? "active" : "")}
              onClick={() => setTier(key)}
            >
              <span>{v.label}</span>
              <span className="count">{v.hooks.length}</span>
            </button>
          ))}
        </div>

        <div className="hooks-grid">
          {visibleHooks.map(([name, desc, json], i) => (
            <div className="hcard" key={name}>
              <div className="top">
                <span className="id">{String(i + 1).padStart(2, "0")} · {name}</span>
                <span className="tier" style={{ color: t.color, borderColor: "var(--line-2)" }}>{t.label}</span>
              </div>
              <div className="name">{name}</div>
              <div className="desc">{desc}</div>
              <div className="json"><JsonRender obj={json} /></div>
            </div>
          ))}
        </div>

        {tier === "plus" && (
          <div className="hooks-expand">
            <button className="btn" onClick={() => setPlusExpanded(!plusExpanded)}>
              {plusExpanded ? <>처음 8개로 접기 <span className="arrow">↑</span></> : <>Plus 블록 14개 모두 보기 <span className="arrow">↓</span></>}
            </button>
          </div>
        )}

        <div className="hooks-foot">
          <span><span className="acc">{visibleHooks.length}</span>개 / {t.hooks.length}개 {t.label.toLowerCase()} 표시 · 총 35개 · {t.sub}</span>
          <span>// 블록 위에 호버하면 효과를 미리 본다 (이 페이지에선 시각 효과만)</span>
        </div>
      </div>
    </section>
  );
}

/* ===================== Korean Market Signal ===================== */
function KoreanSection() {
  return (
    <section id="korean" className="korean">
      <div className="container korean-grid">
        <div>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.2em", color: "var(--mute)", textTransform: "uppercase", marginBottom: 18 }}>
            <span style={{ color: "var(--green)" }}>04</span> · 한국 시장 신호
          </div>
          <h2>
            한국에서 만든<br />
            <span className="acc">메타 게임</span>을 위해.
          </h2>
          <p className="lead">
            한국 인디 씬은 메타 픽션과 4번째 벽 깨기에 가장 빨리 반응하는 시장 중 하나다. <b>parabreak는 한국어 텍스트, 한글 시스템 메시지, 한국 인디 페스티벌 트랙</b>을 1순위로 받는다.
          </p>

          <div className="signals">
            <div className="sig">
              <span className="num">01</span>
              <span><b>한글 narration</b> · 자모 단위 text_corrupt · 띄어쓰기 보존</span>
              <span className="arrow">→</span>
            </div>
            <div className="sig">
              <span className="num">02</span>
              <span><b>BIC · 인디크래프트</b> 부스 자료 템플릿 · 트레일러 자막</span>
              <span className="arrow">→</span>
            </div>
            <div className="sig">
              <span className="num">03</span>
              <span><b>text_i18n</b> 블록 · 한국어 시나리오 변형 동시 번역</span>
              <span className="arrow">→</span>
            </div>
            <div className="sig">
              <span className="num">04</span>
              <span><b>한국어 docs</b> · 첫 출시일부터 동시 번역</span>
              <span className="arrow">→</span>
            </div>
          </div>
        </div>

        <div className="korean-side">
          <div className="stamp">// SIGNAL 01 · DEV NOTE</div>
          <h4>왜 한국부터?</h4>
          <p>
            메타 게임의 임팩트는 <b>&apos;개발자가 나를 본다&apos;</b>는 감각에서 온다. 그 감각은 번역체에서 절반쯤 죽는다. parabreak의 첫 출시는 영어와 한국어를 동시에, 같은 품질로 다룬다 — 한국 개발자가 영어로 번역해 출시하는 게임에서도, 한국어 원문 게임에서도, 같은 hook이 자연스럽게 도는 식으로.
          </p>
          <hr />
          <div className="qt">
            &apos;한국 인디씬은 시스템 자체를 의심하는 게임에 관대하다. 그래서 메타 엔진의 첫 검증은 여기서 한다.&apos;
            <cite>— team note, 2026.04</cite>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== Pricing ===================== */
function Pricing() {
  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <SectionLabel num="05" text="가격" />
        <div className="pricing-head">
          <div>
            <div className="price-badge">
              <span className="dot"></span>
              <span>Steam 출시 후 가격 인상</span>
            </div>
            <h2>
              세 티어.<br />하나의 <span className="acc">설치</span>.
            </h2>
          </div>
          <div>
            <p style={{ fontFamily: "var(--f-mono)", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6 }}>
              엔진은 엔진이다. 티어는 블록 타입을 더 풀 뿐, 런타임 자체를 바꾸지 않는다. 필요한 티어를 사고, 나중에 업그레이드해도, 시나리오는 그대로 로드된다. <b>일회 결제. 구독 없음.</b>
            </p>
          </div>
        </div>

        <div className="price-grid">
          <div className="pcard">
            <div className="label">VN CORE · <span className="acc">무료</span></div>
            <div className="name">parabreak<br />VN Core</div>
            <div className="price"><span className="cur">$</span>0<span className="per">/ MIT 영구</span></div>
            <div className="future">출시 후: 그대로 무료</div>
            <div className="desc">비주얼 노벨을 위한 코어 13개 블록. 세이브 조작, 영속 플래그, UI 버튼 제어, 타이틀 화면 변형. 오픈소스 영구.</div>
            <ul>
              <li>코어 블록 13개</li>
              <li>시나리오 JSON 로더</li>
              <li>Godot 4.x 애드온</li>
              <li className="x">셰이더 / 오디오 FX 없음</li>
              <li className="x">fake_dialog / real_time 없음</li>
            </ul>
            <div className="cta"><a href="#" className="btn" style={{ width: "100%", justifyContent: "center" }}>설치 <span className="arrow">→</span></a></div>
          </div>

          <div className="pcard">
            <div className="label">HOOKS</div>
            <div className="name">parabreak<br />Hooks</div>
            <div className="price"><span className="cur">$</span>49<span className="per">/ 일회 결제</span></div>
            <div className="future">출시 후: $69</div>
            <div className="desc">반응형 블록 8개 추가. 셰이더와 오디오 효과, 텍스트 변형, 입력 가로채기, 반복 선택 / 뒤로가기 감지 — 플레이어가 <i>느끼는</i> 순간을 위한 도구.</div>
            <ul>
              <li>Core의 모든 것</li>
              <li>+ 반응형 블록 8개</li>
              <li>셰이더 / 오디오 / 텍스트 FX</li>
              <li>wait_for_action · detect_repeat_choice</li>
              <li className="x">Plus 블록 없음</li>
            </ul>
            <div className="cta"><a href="#" className="btn" style={{ width: "100%", justifyContent: "center" }}>Hooks 구매 <span className="arrow">→</span></a></div>
          </div>

          <div className="pcard">
            <div className="label">PLUS</div>
            <div className="name">parabreak<br />Plus</div>
            <div className="price"><span className="cur">$</span>69<span className="per">/ 일회 결제</span></div>
            <div className="future">출시 후: $149</div>
            <div className="desc">고급 블록 14개 추가. 가짜 OS 다이얼로그, 클립보드 읽기/쓰기, 실시간 시계, 슬롯 사칭, 씬 라이브 리로드, Discord / Steam 인지 — 드문 &apos;방금 게임이 뭐 한 거지?&apos; 효과들.</div>
            <ul>
              <li>Hooks의 모든 것</li>
              <li>+ 고급 블록 14개</li>
              <li>fake_dialog · clipboard r/w</li>
              <li>scene_live_reload · text_i18n</li>
              <li>discord_presence · steam_overlay</li>
            </ul>
            <div className="cta"><a href="#" className="btn primary" style={{ width: "100%", justifyContent: "center" }}>Plus 구매 <span className="arrow">→</span></a></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== Dialogic banner ===================== */
function DialogicBanner() {
  return (
    <section className="dialogic-banner">
      <div className="container dialogic-row">
        <div className="dlg-mark">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <rect x="6" y="10" width="30" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" />
            <path d="M 14 32 L 14 40 L 22 32" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="miter" />
            <rect x="20" y="22" width="30" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.55" />
            <path d="M 42 44 L 42 50 L 36 44" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="miter" opacity="0.55" />
          </svg>
        </div>
        <div className="dlg-body">
          <div className="dlg-eyebrow">// 호환</div>
          <div className="dlg-title"><b>Dialogic 2</b> — 바로 돈다.</div>
          <div className="dlg-sub">
            parabreak의 <code>dialogue_reactive</code>, <code>text_corrupt</code>, <code>wait_for_action</code>, <code>detect_repeat_choice</code> 블록은 얇은 어댑터를 통해 Dialogic 2 타임라인에 프록시된다. 두 애드온을 같이 떨어뜨리면 끝. 패치 필요 없음.
          </div>
        </div>
        <div className="dlg-actions">
          <a href="#" className="btn">어댑터 문서 <span className="arrow">→</span></a>
        </div>
      </div>
    </section>
  );
}

/* ===================== FAQ ===================== */
const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "이건 Godot 포크인가요?",
    a: <>아니다. parabreak는 <code>res://addons/parabreak</code> 아래 표준 애드온으로 출고되고 autoload를 등록한다. Godot 4.x 정식판 위에서 그대로 업데이트하면 된다 — 우리가 엔진을 따라가지, 그 반대가 아니다.</>,
  },
  {
    q: "플레이어가 런타임에 parabreak 훅을 mod할 수 있나요?",
    a: <>가능하다. 시나리오 블록이 JSON이고 로더가 <code>res://mods/</code> 오버라이드 경로를 지원한다. 모더는 재컴파일 없이 블록 핸들러를 교체하거나 확장할 수 있다. 문서 사이트에 mod 표면을 명시했고, <code>Plus</code> 티어는 예제 mod 템플릿을 같이 출고한다.</>,
  },
  {
    q: "Dialogic 2와 잘 도나요?",
    a: <>parabreak는 대사 플러그인을 대체하지 않는다 — 보강한다. <code>dialogue_reactive</code>, <code>wait_for_action</code>, <code>detect_repeat_choice</code> 블록은 쓰고 있는 대사 시스템을 그대로 통과해 프록시된다. Dialogic 2 포함. 얇은 어댑터가 있고, 우리가 최신 상태로 유지한다.</>,
  },
  {
    q: "상업용은요? 로열티 있나요?",
    a: <>없다. Core는 MIT다. Hooks와 Plus 티어는 상업 라이선스이고 로열티 없다 — 한 번 사고, 영구 출시, Steam 유료 출시 포함. 다만 유료 블록을 별개 제품으로 재배포하지는 말아달라.</>,
  },
  {
    q: "Plus 샀다가 다운그레이드 가능?",
    a: <>가능하다. Plus 블록을 쓰는 시나리오는 Hooks나 Core 설치에선 로드되지 않고, 어느 블록이 업그레이드 필요한지 명확한 에러를 띄운다 — 프로젝트가 조용히 깨지지 않는다.</>,
  },
  {
    q: "fake_dialog는 기만 아닌가요? Steam이 거부하지 않나요?",
    a: <>내러티브 비트로 (드물게, 맥락 안에서, &apos;아직 게임 안이다&apos;라는 공개와 함께) 쓰면 표준 메타픽션 기법이다. 실제로 플레이어를 속이는 용도 — 피싱, 가짜 업데이트 — 라면 Steam이 거부할 거고 우리도 거부한다. 블록은 <code>safe_mode</code> 기본값으로 다이얼로그 모서리에 작은 &apos;게임 내&apos; 워터마크를 박는다. 끄려면 직접 꺼야 한다.</>,
  },
  {
    q: "왜 출시부터 한국어 문서?",
    a: <>메타픽션 독해가 거기서 더 날카롭고, 우리 팀이 외부 번역을 거치지 않고도 그 품질을 출고할 수 있어서다. 위 한국 시장 신호 섹션을 참고.</>,
  },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="faq">
      <div className="container">
        <SectionLabel num="06" text="FAQ" />
        <div className="faq-head">
          <h2>설치 전,<br />실용적인 답변.</h2>
        </div>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div className="faq-item" key={i}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <span className="q-text">{f.q}</span>
                <span className="toggle">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <div className="faq-a">
                  <div className="spacer"></div>
                  <div className="body">{f.a}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== Community ===================== */
function Community() {
  return (
    <section id="community" className="community">
      <div className="container">
        <SectionLabel num="07" text="커뮤니티" />
        <div style={{ marginBottom: 36, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "end" }}>
          <h2>엔진이 당신과<br />같이 이상해지는 곳.</h2>
          <p style={{ fontFamily: "var(--f-mono)", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6 }}>
            parabreak는 만드는 사람과 출시하는 사람이 직접 얘기하는 규모다. 그게 일어나는 자리들.
          </p>
        </div>
        <div className="com-grid">
          <div className="ccard">
            <div className="ctype">채팅</div>
            <h4>개발 채팅</h4>
            <p>실시간 질문, 시나리오 리뷰, 빌드 공유. 한국어 / 영어 채널, 둘 다 팀이 직접 답한다.</p>
            <div className="meta-line"><span>약 340명</span><span className="acc">참가 →</span></div>
          </div>
          <div className="ccard">
            <div className="ctype">코드</div>
            <h4>오픈 이슈</h4>
            <p>Core는 MIT이고 공개 개발한다. 이슈 올리고, PR 보내고, 로드맵 갱신을 실시간으로 본다.</p>
            <div className="meta-line"><span>v0.1 · 18개 오픈</span><span className="acc">레포 →</span></div>
          </div>
          <div className="ccard">
            <div className="ctype">쇼케이스</div>
            <h4>시나리오 갤러리</h4>
            <p>커뮤니티가 올린 시나리오 JSON. 출발점으로 떨어뜨려서 쓰면 된다. 본인 것 태그하면 노출된다.</p>
            <div className="meta-line"><span>시나리오 27개 · 계속 추가</span><span className="acc">둘러보기 →</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== Footer ===================== */
function Footer() {
  return (
    <footer className="foot">
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <BrokenFrameMark size={42} stroke={8} />
              <span className="word">para<span className="br">break</span></span>
            </div>
            <p>Godot을 위한 메타 엔진. 플레이어를 의식하는 게임을 만든다.</p>
          </div>
          <div className="foot-col">
            <h5>엔진</h5>
            <ul>
              <li><a href="#">설치</a></li>
              <li><a href="#">훅 레퍼런스</a></li>
              <li><a href="#">시나리오 포맷</a></li>
              <li><a href="/design/changelog.html">체인지로그</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>구매</h5>
            <ul>
              <li><a href="#">Hooks · $49</a></li>
              <li><a href="#">Plus · $69</a></li>
              <li><a href="#">티어 비교</a></li>
              <li><a href="#">라이선스 FAQ</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>커뮤니티</h5>
            <ul>
              <li><a href="#">개발 채팅</a></li>
              <li><a href="#">레포 · MIT</a></li>
              <li><a href="#">시나리오 갤러리</a></li>
              <li><a href="#">한국어 docs</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>회사</h5>
            <ul>
              <li><a href="#">팀</a></li>
              <li><a href="/design/manifesto.html">매니페스토</a></li>
              <li><a href="/design/brand.html">브랜드 시스템</a></li>
              <li><a href="#">프레스 키트</a></li>
              <li><a href="#">연락</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bot">
          <span>© parabreak · 2026 · MIT 코어 · <span className="acc">의도적으로 작게</span></span>
          <span className="right">
            <span>v0.1 · 공개 알파</span>
            <span>// 아직 게임 안이다</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ===================== App ===================== */
export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    document.body.classList.toggle("theme-dark", theme === "dark");
    document.body.classList.toggle("theme-light", theme === "light");
  }, [theme]);

  return (
    <>
      <Nav theme={theme} setTheme={setTheme} />
      <Hero />
      <UnderEngine />
      <WhatIs />
      <WhatBreaks />
      <Hooks />
      <KoreanSection />
      <Pricing />
      <DialogicBanner />
      <FAQ />
      <Community />
      <Footer />
    </>
  );
}
