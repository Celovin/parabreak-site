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
      <a href="/ko" style={{ padding: "2px 6px", border: "1px solid var(--line-2)" }}>KO</a>
      <span style={{ padding: "2px 6px", border: "1px solid var(--green)", color: "var(--green)" }}>JA</span>
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
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <div className="nav-logo">
          <BrokenFrameMark size={28} stroke={8} />
          <span className="word">
            para<span className="br">break</span>
          </span>
        </div>
        <div className="nav-links">
          <a href="#what">概要</a>
          <a href="#breaks">壊れる所</a>
          <a href="#hooks">フック</a>
          <a href="#korean">韓国市場</a>
          <a href="#pricing">価格</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="nav-right">
          <LangSwitcher />
          <span className="ver">
            <span className="acc">v0.1</span> · Godot 4.x
          </span>
          <button
            className="theme-toggle"
            aria-label="テーマ切替"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <span className="knob"></span>
          </button>
          <a href="#" className="btn primary">
            インストール <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </nav>
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
        セリフがいつも通り、文字を打つ
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
        セリフがいつも通り、文字を打つ。<span style={{ color: "var(--mute)" }}>…</span>
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
        セリフがいつも通り、文字を打つ。…
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
        セリフが<span className="strike">文字を打つ</span>{" "}
        <span className="new">自分で書く</span>。…
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
        セリフが<span className="new">自分で書く</span>。<br />
        <span className="new">気づいたな。</span>
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
        気づいたな。なら、選べ。<span className="caret"></span>
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
              アーキビスト <span className="meta">// flag: {step >= 2 ? <span style={{ color: "var(--green)" }}>NOTICED=true</span> : "NOTICED=false"}</span>
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
              <span>「ごめん。やり直す。」</span>
            </div>
            <div className="choice locked">
              <span className="pre">›</span>
              <span>「何も見てない。」</span>
              <span className="lock-tag">ロック · FLAG_PLAYER_NOTICED</span>
            </div>
            <div className="choice selected">
              <span className="pre">›</span>
              <span>「どうして覚えてる?」</span>
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
        <button onClick={() => setPlaying(!playing)}>{playing ? "❚❚ 一時停止" : "▶ 再生"}</button>
        <button
          onClick={() => {
            setStep(0);
            setPlaying(true);
          }}
        >
          ↺ 最初から
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
            <span className="acc">// パブリックアルファ</span>
          </div>

          <div className="hero-h1-wrap">
            <h1>
              Godotのための<br />
              メタ<span className="br">エンジン</span>。
            </h1>
          </div>

          <p className="hero-sub">
            parabreakはランタイムレイヤーだ。キャラクターをゲームの外側 — セーブファイル、メニュー、プレイヤーの前回セッション、システム時計 — に届かせる。<b>プレイヤーに気づくゲーム</b>を、エンジンを書き直さずに作る。
          </p>

          <div className="hero-actions">
            <a href="#" className="btn primary">
              parabreakをインストール <span className="arrow">→</span>
            </a>
            <a href="#hooks" className="btn">
              35フックを見る
            </a>
            <a href="#docs" className="btn ghost">
              ドキュメント
            </a>
          </div>

          <div className="hero-stickers">
            <div className="sticker-pill">
              <span className="dot"></span>第四の壁、商用で
            </div>
            <div className="sticker-pill">
              <span className="dot amber"></span>プレイヤーがセーブを消した
            </div>
            <div className="sticker-pill dialogic">
              <span className="dot violet"></span><b>Dialogic 2</b>互換
            </div>
          </div>

          <div className="hero-meta">
            <div className="item">
              <div className="k">インストール</div>
              <div className="v">
                1行 · <span className="acc">アドオン</span>
              </div>
            </div>
            <div className="item">
              <div className="k">フック</div>
              <div className="v">
                <span className="acc">35</span>本の型付シグナル · 増加中
              </div>
            </div>
            <div className="item">
              <div className="k">ライセンス</div>
              <div className="v">
                MITコア · <span className="acc">商用OK</span>
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
        <div className="label">// 互換性</div>
        <div className="marks">
          <div className="mark">
            <span className="badge">エンジン</span> Godot 4.x
          </div>
          <div className="mark">
            <span className="badge">プラグイン</span> Dialogic 2 対応
          </div>
          <div className="mark">
            <span className="badge">ライセンス</span> MITコア
          </div>
          <div className="mark">
            <span className="badge">プラットフォーム</span> win · mac · linux
          </div>
          <div className="mark">
            <span className="badge">使用作品</span> KNOT(早期アクセス)
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
        <SectionLabel num="01" text="parabreakとは" />
        <div className="what-head">
          <div>
            <h2>
              自分がエンジンだと<br />
              知っているレイヤー。
            </h2>
          </div>
          <div className="lead">
            <p>
              大抵のエンジンは、プレイヤーがそこに居ないふりをする。<b>parabreakは逆だ。</b>セーブファイル、セリフ、メニュー、カメラ — その縫い目を<span className="acc">第一級のフック</span>として露出し、物語が反応できる形にする。<span className="strike">プラグイン。</span>エンジン。
            </p>
          </div>
        </div>

        <div className="what-cards">
          <div className="wcard">
            <div className="num">
              <span className="acc">01.</span> 問題
            </div>
            <h4>メタ演出は一度きり。</h4>
            <p>
              「ゲームが知っている」系の演出は、毎回200行の手書きハック。セーブ走査、ファイルIO、セリフシステムへのパッチ。一度通って、次のアップデートで壊れる。
            </p>
            <div className="strip">
              {`# 脆い、手書き\nif FileAccess.file_exists(\n    "user://save_001.dat"):\n    `}
              <span className="red">// カスタムパーサ。壊れやすい。</span>
            </div>
            <div className="meta">
              <span>parabreak以前</span>
              <span className="acc">フック1本 ~200行</span>
            </div>
          </div>

          <div className="wcard">
            <div className="num">
              <span className="acc">02.</span> プリミティブ
            </div>
            <h4>
              フック<span style={{ whiteSpace: "nowrap" }}>三十五本</span>、まだ増える。
            </h4>
            <p>
              セーブ改ざん、セリフ書き換え、選択肢ロック、メニュー変形、ナレーター介入 — どれもシナリオJSONに落とす型付ブロックだ。
            </p>
            <div className="strip">
              {`{"type": "save_delete",\n  "slot": 0,\n  `}
              <span className="green">{`"mark_persistent": true`}</span>
              {`}\n`}
              <span className="mute">// ブロック1個。それがフック。</span>
            </div>
            <div className="meta">
              <span>parabreakで</span>
              <span className="acc">ブロック1個</span>
            </div>
          </div>

          <div className="wcard">
            <div className="num">
              <span className="acc">03.</span> エンジン
            </div>
            <h4>Godot 4.xにネイティブ。</h4>
            <p>
              GDScript優先。Dialogueプラグインと一緒に動く。フォーク不要。<code style={{ color: "var(--green)" }}>res://addons</code>に落とすアドオンとして出す。
            </p>
            <div className="strip">
              {`# project.godot\n[autoload]\nparabreak="res://addons/parabreak"\n# `}
              <span className="green">インストール終わり。</span>
            </div>
            <div className="meta">
              <span>インストール</span>
              <span className="acc">アドオン · フォークなし</span>
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
        <SectionLabel num="02" text="壊れる所" />
        <div className="breaks-head">
          <div>
            <h2>
              縫い目は四種類、<br />
              その上に三十五のフック。
            </h2>
          </div>
          <div className="lead">
            <p>
              メタ演出は四つのプリミティブにまとまる。parabreakはそれぞれに対応する型付シナリオブロックを持つ — 落とすだけ。エンジンのフォーク不要。下のイラストは各カテゴリがランタイムで<i>どう感じるか</i>だ。特定ゲームのスクリーンショットではない。
            </p>
          </div>
        </div>

        <div className="breaks-grid">
          <div className="bcard">
            <div>
              <div className="label">
                <span className="acc">A.</span> セーブ改ざん
              </div>
              <h4>ゲームがセーブフォルダを見る。</h4>
              <p>読む、リネーム、削除、破壊、スロットや再インストールを跨ぐ永続フラグを刻む。ゲームはプレイヤーが<i>前回</i>した事を覚える。</p>
              <div className="blocks">
                <code>save_delete</code><code>save_corrupt</code><code>persistent_flag_set</code><code>slot_rename</code><code>save_integrity_check</code>
              </div>
            </div>
            <div className="illus save">
              <div className="file-list">
                <div className="file-row"><span>save_001.dat</span><span className="meta">12 KB · ok</span></div>
                <div className="file-row del"><span>save_002.dat</span><span className="meta">— 削除済</span></div>
                <div className="file-row"><span>save_003.dat</span><span className="meta">8 KB · <span style={{color:"var(--red)"}}>破損</span></span></div>
                <div className="file-row new"><span>FLAG_PLAYER_NOTICED</span><span className="meta">true · 永続</span></div>
                <div className="file-row"><span>last_session.log</span><span className="meta">3分前</span></div>
              </div>
            </div>
          </div>

          <div className="bcard">
            <div>
              <div className="label">
                <span className="acc">B.</span> セリフ書き換え
              </div>
              <h4>読んでいる間にセリフが変わる。</h4>
              <p>キャラがプレイヤーのセーブ、名前、直前の選択を見て — 文の途中で書き直す。繰り返した選択を捕まえ、戻るボタンを止め、行動を待つ。</p>
              <div className="blocks">
                <code>text_corrupt</code><code>dialogue_reactive</code><code>wait_for_action</code><code>detect_repeat_choice</code><code>detect_back_attempt</code>
              </div>
            </div>
            <div className="illus dialog">
              <div className="lines">
                <div>› アーキビスト</div>
                <div>「戻ったか。<span className="strike">チュートリアルは終えた?</span>」</div>
                <div><span className="new">「…飛ばしたな。」</span></div>
                <div className="narr">ナレーター: 彼が知るはずのない事だった。</div>
              </div>
            </div>
          </div>

          <div className="bcard">
            <div>
              <div className="label">
                <span className="acc">C.</span> UI解体
              </div>
              <h4>メニューが嘘をつき、流れ、拒む。</h4>
              <p>ボタンを破壊または無効化。スロット名を変える。ウィンドウタイトルを変える。終了を拒む。クロームも物語の一部だ。</p>
              <div className="blocks">
                <code>ui_button_destroy</code><code>ui_button_disable</code><code>window_title_set</code><code>title_screen_variant</code><code>game_quit</code>
              </div>
            </div>
            <div className="illus ui">
              <div className="frame">
                <div className="title">メインメニュー · v0.1</div>
                <div className="menu">
                  <div className="item kept">続きから</div>
                  <div className="item gone">はじめから</div>
                  <div className="item">オプション</div>
                  <div className="item gone">終了</div>
                </div>
                <div className="title" style={{ textAlign: "right", color: "var(--red)" }}>// ボタン2つ破壊</div>
              </div>
            </div>
          </div>

          <div className="bcard">
            <div>
              <div className="label">
                <span className="acc">D.</span> 偽OS + 世界の漏れ · <span style={{ color: "var(--violet)" }}>PLUS</span>
              </div>
              <h4>ゲームが窓の外へ漏れる。</h4>
              <p>OS風の偽ダイアログ、クリップボード読み書き、実時間時計の認識、スロットなりすまし、シーンのライブリロード。多用するな — 稀だから効く。</p>
              <div className="blocks">
                <code>fake_dialog</code><code>clipboard_write</code><code>clipboard_read</code><code>real_time_check</code><code>fake_permission_popup</code><code>slot_impersonation</code>
              </div>
            </div>
            <div className="illus fake">
              <div className="scanline"></div>
              <div className="alert">
                <div className="bar"><span>通知</span><span>×</span></div>
                <div className="body">まだゲームの中だ。そう思ってないだけ。</div>
                <div className="row">
                  <div className="b">キャンセル</div>
                  <div className="b p">OK</div>
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
    sub: "オープンソース · MIT · エンジンに同梱",
    color: "var(--green)",
    hooks: [
      ["save_delete", "ディスクからセーブスロットを消す。", { type: "save_delete", slot: 0, mark_persistent: true }],
      ["save_corrupt", "再現可能な形でセーブを壊す。", { type: "save_corrupt", slot: 0, mode: "header" }],
      ["persistent_flag_set", "再インストール後も残るフラグを刻む。", { type: "persistent_flag_set", key: "FLAG_PLAYER_NOTICED", value: true }],
      ["persistent_flag_get", "複数の周回で書かれたフラグを読む。", { type: "persistent_flag_get", key: "FLAG_PLAYER_NOTICED" }],
      ["ui_button_destroy", "UIボタンを丸ごと消す。", { type: "ui_button_destroy", target: "main_menu.quit" }],
      ["ui_button_disable", "消さずにグレーアウトのみ。", { type: "ui_button_disable", target: "main_menu.continue" }],
      ["window_title_set", "ランタイムでOSのウィンドウタイトルを変える。", { type: "window_title_set", value: "parabreak — また来たな?" }],
      ["slot_rename", "セーブ一覧のスロット名を変える。", { type: "slot_rename", slot: 0, name: "archivist" }],
      ["title_screen_variant", "タイトル画面を変種に差し替える。", { type: "title_screen_variant", id: "after_first_death" }],
      ["save_integrity_check", "セーブをハッシュ化し、改ざんに反応。", { type: "save_integrity_check", slot: 0 }],
      ["game_quit", "綺麗に終了するか、拒む。", { type: "game_quit", allow: false }],
      ["game_crash", "演出としてクラッシュを擬装。", { type: "game_crash", style: "segfault" }],
      ["window_close", "プログラム的に窓を閉じる。", { type: "window_close" }],
    ],
  },
  hooks: {
    label: "HOOKS",
    sub: "$49 · 反応型ブロック8本",
    color: "var(--amber)",
    hooks: [
      ["shader_effect", "スキャンライン、歪み、色収差。時間制限あり。", { type: "shader_effect", effect: "scanline", intensity: 0.45, duration: 1.5 }],
      ["audio_effect", "ピッチ、ビットクラッシュ、逆再生。チャネル別。", { type: "audio_effect", effect: "pitch_shift", amount: -0.3 }],
      ["text_corrupt", "次のテキストをスクランブルまたは置換。", { type: "text_corrupt", mode: "scramble_chars", target: "next_block" }],
      ["dialogue_reactive", "フラグやセーブ状態でセリフを分岐。", { type: "dialogue_reactive", flag: "FLAG_PLAYER_NOTICED" }],
      ["input_hijack", "短時間、入力を拒否、入れ替え、反転。", { type: "input_hijack", mode: "invert_xy", duration: 2.0 }],
      ["wait_for_action", "プレイヤーが何かをする(または拒む)まで待つ。", { type: "wait_for_action", expect: "click_quit", timeout: 30 }],
      ["detect_repeat_choice", "同じ選択肢を2度選ぶのを捕える。", { type: "detect_repeat_choice", choice_id: "lie_to_archivist", threshold: 2 }],
      ["detect_back_attempt", "リロード/戻る再試行を捕える。", { type: "detect_back_attempt", within_seconds: 5 }],
    ],
  },
  plus: {
    label: "PLUS",
    sub: "$69 · 上級ブロック14本",
    color: "var(--violet)",
    hooks: [
      ["fake_dialog", "エンジン内でOS風の偽ポップアップ。", { type: "fake_dialog", style: "windows_error", title: "通知", body: "まだゲームの中だ。" }],
      ["fake_permission_popup", "偽の権限要求ポップアップ。", { type: "fake_permission_popup", kind: "mic_access" }],
      ["clipboard_write", "同意付きでシステムクリップボードに書く。", { type: "clipboard_write", value: "セーブを見ろ。" }],
      ["clipboard_read", "同意付きでクリップボードを読む。", { type: "clipboard_read", on_match: "reactive_line" }],
      ["real_time_check", "実時間を読み、日付/時刻に反応。", { type: "real_time_check", condition: "after_midnight" }],
      ["user_file_read", "サンドボックスuserパスからファイルを読む。", { type: "user_file_read", path: "user://notes.txt" }],
      ["user_file_write", "サンドボックスuserパスにファイルを書く。", { type: "user_file_write", path: "user://letter.txt", body: "見ている。" }],
      ["cross_slot_bleed", "あるスロットの状態を別スロットへ漏らす。", { type: "cross_slot_bleed", from: 1, to: 0, key: "memory" }],
      ["slot_impersonation", "スロットNをプレイヤーにスロットMと見せる。", { type: "slot_impersonation", shown_as: 0, actually: 2 }],
      ["scene_live_reload", "プレイ中にシーンを変種へホットスワップ。", { type: "scene_live_reload", target: "res://scenes/room.tscn", variant: "after_meta" }],
      ["text_i18n", "シナリオブロック毎のロケール別テキスト。", { type: "text_i18n", key: "NARRATOR_GREETING", locales: { en: "…", ko: "…" } }],
      ["discord_presence", "演出ビートとしてDiscordリッチプレゼンスを設定。", { type: "discord_presence", state: "still inside the game", details: "archivist · day 3" }],
      ["steam_overlay_awareness", "Steamオーバーレイの開閉に反応。", { type: "steam_overlay_awareness", on: "overlay_open" }],
      ["accessibility_hook", "スクリーンリーダー/高コントラスト/モーション軽減で分岐。", { type: "accessibility_hook", flag: "reduced_motion" }],
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
        <SectionLabel num="03" text="35フック" />
        <div className="hooks-head">
          <div>
            <h2>
              <span className="acc" style={{ fontFamily: "var(--f-mono)", fontSize: "0.7em", verticalAlign: "0.18em", marginRight: "0.15em" }}>35</span>本の型付ブロック。<br />一つのシナリオ形式。
            </h2>
          </div>
          <div>
            <p style={{ fontFamily: "var(--f-mono)", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6 }}>
              全フックはシナリオファイル内のJSONブロックだ。同じスキーマ、同じローダー、同じホットリロード。<span style={{ color: "var(--green)" }}>Core</span>はオープンで出す。<span style={{ color: "var(--amber)" }}>Hooks</span> + <span style={{ color: "var(--violet)" }}>Plus</span>が反応型と上級レイヤーを解放する。
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
              {plusExpanded ? <>最初の8本に折りたたむ <span className="arrow">↑</span></> : <>Plusブロック14本を全て表示 <span className="arrow">↓</span></>}
            </button>
          </div>
        )}

        <div className="hooks-foot">
          <span><span className="acc">{visibleHooks.length}</span>/{t.hooks.length} {t.label.toLowerCase()}を表示 · 計35本 · {t.sub}</span>
          <span>// ブロックにホバーで効果プレビュー(このページは視覚のみ)</span>
        </div>
      </div>
    </section>
  );
}

/* ===================== Korean Market Signal — 日本語視点 ===================== */
function KoreanSection() {
  return (
    <section id="korean" className="korean">
      <div className="container korean-grid">
        <div>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.2em", color: "var(--mute)", textTransform: "uppercase", marginBottom: 18 }}>
            <span style={{ color: "var(--green)" }}>04</span> · 韓国市場シグナル
          </div>
          <h2>
            韓国で作られる<br />
            <span className="acc">メタゲーム</span>のために。
          </h2>
          <p className="lead">
            韓国インディシーンは、メタフィクションと第四の壁破りに最も速く反応する市場の一つだ。<b>parabreakは韓国語テキスト、ハングルのシステムメッセージ、韓国インディフェスティバルのトラック</b>を最優先で扱う。
          </p>

          <div className="signals">
            <div className="sig">
              <span className="num">01</span>
              <span><b>ハングルnarration</b> · 字母単位のtext_corrupt · 分かち書き保持</span>
              <span className="arrow">→</span>
            </div>
            <div className="sig">
              <span className="num">02</span>
              <span><b>BIC · インディクラフト</b>ブース素材テンプレ · トレーラー字幕</span>
              <span className="arrow">→</span>
            </div>
            <div className="sig">
              <span className="num">03</span>
              <span><b>text_i18n</b>ブロック · 韓国語シナリオ変種を同時翻訳</span>
              <span className="arrow">→</span>
            </div>
            <div className="sig">
              <span className="num">04</span>
              <span><b>韓国語docs</b> · リリース初日から同時翻訳</span>
              <span className="arrow">→</span>
            </div>
          </div>
        </div>

        <div className="korean-side">
          <div className="stamp">// SIGNAL 01 · DEV NOTE</div>
          <h4>なぜ韓国から?</h4>
          <p>
            メタゲームのインパクトは<b>「開発者が私を見ている」</b>という感覚から来る。その感覚は翻訳調で半分死ぬ。parabreakの初回リリースは英語と韓国語を同時に、同じ品質で扱う — 韓国の作り手が英訳して出すゲームでも、韓国語原典のゲームでも、同じフックが自然に動くように。
          </p>
          <hr />
          <div className="qt">
            「韓国インディシーンはシステム自体を疑うゲームに寛容だ。だからメタエンジンの最初の検証はここでやる。」
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
        <SectionLabel num="05" text="価格" />
        <div className="pricing-head">
          <div>
            <div className="price-badge">
              <span className="dot"></span>
              <span>Steamリリース後に値上げ</span>
            </div>
            <h2>
              三つのティア。<br />一つの<span className="acc">インストール</span>。
            </h2>
          </div>
          <div>
            <p style={{ fontFamily: "var(--f-mono)", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6 }}>
              エンジンはエンジンだ。ティアはブロック種を解放するだけで、別のランタイムを出すわけではない。必要なティアを買い、後でアップグレードしても、シナリオはそのまま読み込まれる。<b>買い切り。サブスクなし。</b>
            </p>
          </div>
        </div>

        <div className="price-grid">
          <div className="pcard">
            <div className="label">VN CORE · <span className="acc">無料</span></div>
            <div className="name">parabreak<br />VN Core</div>
            <div className="price"><span className="cur">$</span>0<span className="per">/ MIT 永続</span></div>
            <div className="future">リリース後: そのまま無料</div>
            <div className="desc">ビジュアルノベル向けコアブロック13本。セーブ改ざん、永続フラグ、UIボタン制御、タイトル画面変種。永続オープンソース。</div>
            <ul>
              <li>コアブロック13本</li>
              <li>シナリオJSONローダー</li>
              <li>Godot 4.x アドオン</li>
              <li className="x">シェーダー / オーディオFXなし</li>
              <li className="x">fake_dialog / real_time なし</li>
            </ul>
            <div className="cta"><a href="#" className="btn" style={{ width: "100%", justifyContent: "center" }}>インストール <span className="arrow">→</span></a></div>
          </div>

          <div className="pcard">
            <div className="label">HOOKS</div>
            <div className="name">parabreak<br />Hooks</div>
            <div className="price"><span className="cur">$</span>49<span className="per">/ 買い切り</span></div>
            <div className="future">リリース後: $69</div>
            <div className="desc">反応型ブロック8本を追加。シェーダーとオーディオ効果、テキスト破壊、入力ハイジャック、繰り返し選択 / 戻る検出 — プレイヤーが<i>感じる</i>瞬間のための道具。</div>
            <ul>
              <li>Coreの全て</li>
              <li>+ 反応型ブロック8本</li>
              <li>シェーダー / オーディオ / テキストFX</li>
              <li>wait_for_action · detect_repeat_choice</li>
              <li className="x">Plusブロックなし</li>
            </ul>
            <div className="cta"><a href="#" className="btn" style={{ width: "100%", justifyContent: "center" }}>Hooksを買う <span className="arrow">→</span></a></div>
          </div>

          <div className="pcard">
            <div className="label">PLUS</div>
            <div className="name">parabreak<br />Plus</div>
            <div className="price"><span className="cur">$</span>69<span className="per">/ 買い切り</span></div>
            <div className="future">リリース後: $149</div>
            <div className="desc">上級ブロック14本を追加。偽OSダイアログ、クリップボード読み書き、実時間、スロットなりすまし、シーンライブリロード、Discord / Steamの認識 — 稀な「今、ゲームが何かやったのか?」の効果。</div>
            <ul>
              <li>Hooksの全て</li>
              <li>+ 上級ブロック14本</li>
              <li>fake_dialog · clipboard r/w</li>
              <li>scene_live_reload · text_i18n</li>
              <li>discord_presence · steam_overlay</li>
            </ul>
            <div className="cta"><a href="#" className="btn primary" style={{ width: "100%", justifyContent: "center" }}>Plusを買う <span className="arrow">→</span></a></div>
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
          <div className="dlg-eyebrow">// 互換</div>
          <div className="dlg-title"><b>Dialogic 2</b> — そのまま動く。</div>
          <div className="dlg-sub">
            parabreakの<code>dialogue_reactive</code>、<code>text_corrupt</code>、<code>wait_for_action</code>、<code>detect_repeat_choice</code>ブロックは、薄いアダプタ経由でDialogic 2のタイムラインへプロキシされる。両アドオンを落として終わり。パッチ不要。
          </div>
        </div>
        <div className="dlg-actions">
          <a href="#" className="btn">アダプタ文書 <span className="arrow">→</span></a>
        </div>
      </div>
    </section>
  );
}

/* ===================== FAQ ===================== */
const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "これはGodotのフォーク?",
    a: <>違う。parabreakは<code>res://addons/parabreak</code>下の標準アドオンとして出し、autoloadを登録する。素のGodot 4.xに乗せて通常通り更新できる — こちらがエンジンに追従する、逆ではない。</>,
  },
  {
    q: "プレイヤーはランタイムにparabreakフックをmodできる?",
    a: <>できる。シナリオブロックはJSONで、ローダーが<code>res://mods/</code>のオーバーライドパスをサポートする。modderは再コンパイル無しにブロックハンドラを差し替えたり拡張したりできる。modの表面は文書サイトに明記。<code>Plus</code>ティアにはmodテンプレ例も同梱する。</>,
  },
  {
    q: "Dialogic 2との相性は?",
    a: <>parabreakはセリフプラグインを置き換えない — 補強する。<code>dialogue_reactive</code>、<code>wait_for_action</code>、<code>detect_repeat_choice</code>ブロックは、使っているセリフシステムを通してプロキシされる。Dialogic 2もその一つ。薄いアダプタがあり、最新状態を維持する。</>,
  },
  {
    q: "商用利用は? ロイヤリティ?",
    a: <>無し。CoreはMITだ。HooksとPlusは商用ライセンスでロイヤリティ無し — 一度買って、永続出荷、Steam有料リリース含む。ただし有料ブロックを別商品として再配布しないでほしい。</>,
  },
  {
    q: "Plus買ってからダウングレードできる?",
    a: <>できる。Plusブロックを使うシナリオはHooksやCore環境では読み込まれず、どのブロックがアップグレード必要かを明確なエラーで示す — プロジェクトが黙って壊れない。</>,
  },
  {
    q: "fake_dialogは欺瞞では? Steamに弾かれない?",
    a: <>演出ビートとして(稀に、文脈の中で、「まだゲームの中だ」という開示と共に)使えば、標準のメタフィクション技法だ。実際にプレイヤーを騙す用途 — フィッシング、偽アップデート — ならSteamは弾くし、こちらも弾く。ブロックは<code>safe_mode</code>既定値でダイアログ隅に小さな「ゲーム内」ウォーターマークを刻む。外したいなら明示的に外す。</>,
  },
  {
    q: "なぜリリース時から韓国語ドキュメント?",
    a: <>メタフィクション読解がそこでより鋭いから、そしてチームが第三者翻訳を介さずにその品質を出せるから。上の韓国市場シグナル節を参照。</>,
  },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="faq">
      <div className="container">
        <SectionLabel num="06" text="FAQ" />
        <div className="faq-head">
          <h2>インストール前の、<br />実用的な答え。</h2>
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
        <SectionLabel num="07" text="コミュニティ" />
        <div style={{ marginBottom: 36, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "end" }}>
          <h2>エンジンが、あなたと<br />一緒に、おかしくなる場所。</h2>
          <p style={{ fontFamily: "var(--f-mono)", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6 }}>
            parabreakは作り手と出荷する人が直接話せる規模だ。それが起きる場所たち。
          </p>
        </div>
        <div className="com-grid">
          <div className="ccard">
            <div className="ctype">チャット</div>
            <h4>開発チャット</h4>
            <p>リアルタイムの質問、シナリオレビュー、ビルド共有。韓国語/英語のチャンネル、どちらもチームが直接対応。</p>
            <div className="meta-line"><span>約340名</span><span className="acc">参加 →</span></div>
          </div>
          <div className="ccard">
            <div className="ctype">コード</div>
            <h4>オープンIssue</h4>
            <p>CoreはMITで、公開開発する。Issue起票、PR送付、ロードマップ更新をリアルタイムで見られる。</p>
            <div className="meta-line"><span>v0.1 · 18件オープン</span><span className="acc">レポ →</span></div>
          </div>
          <div className="ccard">
            <div className="ctype">ショーケース</div>
            <h4>シナリオギャラリー</h4>
            <p>コミュニティ投稿のシナリオJSON。プロジェクトに落として出発点にできる。自作をタグ付けすれば紹介される。</p>
            <div className="meta-line"><span>シナリオ27件 · 増加中</span><span className="acc">見る →</span></div>
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
            <p>Godotのためのメタエンジン。プレイヤーに気づくゲームを作る。</p>
          </div>
          <div className="foot-col">
            <h5>エンジン</h5>
            <ul>
              <li><a href="#">インストール</a></li>
              <li><a href="#">フックリファレンス</a></li>
              <li><a href="#">シナリオ形式</a></li>
              <li><a href="#">変更履歴</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>購入</h5>
            <ul>
              <li><a href="#">Hooks · $49</a></li>
              <li><a href="#">Plus · $69</a></li>
              <li><a href="#">ティア比較</a></li>
              <li><a href="#">ライセンスFAQ</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>コミュニティ</h5>
            <ul>
              <li><a href="#">開発チャット</a></li>
              <li><a href="#">レポ · MIT</a></li>
              <li><a href="#">シナリオギャラリー</a></li>
              <li><a href="#">韓国語docs</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>運営</h5>
            <ul>
              <li><a href="#">チーム</a></li>
              <li><a href="#">マニフェスト</a></li>
              <li><a href="#">プレスキット</a></li>
              <li><a href="#">連絡</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bot">
          <span>© parabreak · 2026 · MITコア · <span className="acc">意図的に小さく</span></span>
          <span className="right">
            <span>v0.1 · パブリックアルファ</span>
            <span>// まだゲームの中だ</span>
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
