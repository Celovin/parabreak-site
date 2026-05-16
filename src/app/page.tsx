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
      <span style={{ padding: "2px 6px", border: "1px solid var(--green)", color: "var(--green)" }}>EN</span>
      <a href="/ko" style={{ padding: "2px 6px", border: "1px solid var(--line-2)" }}>KO</a>
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
            <a href="#what">What</a>
            <a href="#breaks">Breaks</a>
            <a href="#hooks">Hooks</a>
            <a href="#korean">Korea</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="nav-right">
            <LangSwitcher />
            <span className="ver">
              <span className="acc">v0.1</span> · Godot 4.x
            </span>
            <button
              className="theme-toggle"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <span className="knob"></span>
            </button>
            <a href="#" className="btn primary">
              Install <span className="arrow">→</span>
            </a>
            <button className="hamburger" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
              <span className="bars"><span></span><span></span><span></span></span>
              Menu
            </button>
          </div>
        </div>
      </nav>
      {menuOpen && (
        <div className="mobile-menu open" role="dialog" aria-modal="true">
          <button className="close" onClick={close}>Close ×</button>
          <a href="#what" onClick={close}>What</a>
          <a href="#breaks" onClick={close}>Breaks</a>
          <a href="#hooks" onClick={close}>Hooks</a>
          <a href="#korean" onClick={close}>Korea</a>
          <a href="#pricing" onClick={close}>Pricing</a>
          <a href="#faq" onClick={close}>FAQ</a>
          <div className="switch">
            <span className="active">EN</span>
            <a href="/ko">KO</a>
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
        the dialogue types itself out, like always
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
        the dialogue types itself out, like always.{" "}
        <span style={{ color: "var(--mute)" }}>…</span>
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
        the dialogue types itself out, like always. …
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
        the dialogue <span className="strike">types itself out</span>{" "}
        <span className="new">writes itself</span>. …
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
        the dialogue <span className="new">writes itself</span>.<br />
        <span className="new">you noticed.</span>
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
        you noticed. now choose.<span className="caret"></span>
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
              ARCHIVIST <span className="meta">// flag: {step >= 2 ? <span style={{ color: "var(--green)" }}>NOTICED=true</span> : "NOTICED=false"}</span>
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
              <span>&quot;sorry. I&apos;ll restart.&quot;</span>
            </div>
            <div className="choice locked">
              <span className="pre">›</span>
              <span>&quot;I didn&apos;t notice anything.&quot;</span>
              <span className="lock-tag">locked · FLAG_PLAYER_NOTICED</span>
            </div>
            <div className="choice selected">
              <span className="pre">›</span>
              <span>&quot;how do you remember?&quot;</span>
            </div>
          </div>
        ) : (
          <div className="choices" style={{ visibility: "hidden" }}>
            <div className="choice">
              <span className="pre">›</span>
              <span>placeholder</span>
            </div>
            <div className="choice">
              <span className="pre">›</span>
              <span>placeholder</span>
            </div>
            <div className="choice">
              <span className="pre">›</span>
              <span>placeholder</span>
            </div>
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
        <button onClick={() => setPlaying(!playing)}>{playing ? "❚❚ pause" : "▶ play"}</button>
        <button
          onClick={() => {
            setStep(0);
            setPlaying(true);
          }}
        >
          ↺ restart
        </button>
        <span className="step">/ {cur.name.toLowerCase()} · 5.0s loop</span>
      </div>
    </div>
  );
}

/* ===================== Hero section ===================== */
function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <div className="hero-eyebrow">
            <span className="dot"></span>
            <span>v0.1 · Godot 4.x · MIT core</span>
            <span className="acc">// public alpha</span>
          </div>

          <div className="hero-h1-wrap">
            <h1>
              The meta engine<br />
              for <span className="br">Godot</span>.
            </h1>
          </div>

          <p className="hero-sub">
            Parabreak is a runtime layer that gives your characters access to the things outside the game — the save file, the menu, the player&apos;s last session, the system clock. <b>Build games that notice you back</b>, without rewriting the engine.
          </p>

          <div className="hero-actions">
            <a href="#" className="btn primary">
              Install parabreak <span className="arrow">→</span>
            </a>
            <a href="#hooks" className="btn">
              See all 35 hooks
            </a>
            <a href="#docs" className="btn ghost">
              Read docs
            </a>
          </div>

          <div className="hero-stickers">
            <div className="sticker-pill">
              <span className="dot"></span>Break the fourth wall · commercially
            </div>
            <div className="sticker-pill">
              <span className="dot amber"></span>Your player deleted their save
            </div>
            <div className="sticker-pill dialogic">
              <span className="dot violet"></span>Compatible with <b>Dialogic 2</b>
            </div>
          </div>

          <div className="hero-meta">
            <div className="item">
              <div className="k">install</div>
              <div className="v">
                1 line · <span className="acc">addon</span>
              </div>
            </div>
            <div className="item">
              <div className="k">hooks</div>
              <div className="v">
                <span className="acc">35</span> typed signals · growing
              </div>
            </div>
            <div className="item">
              <div className="k">license</div>
              <div className="v">
                MIT core · <span className="acc">commercial OK</span>
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
        <div className="label">// compatibility</div>
        <div className="marks">
          <div className="mark">
            <span className="badge">ENGINE</span> Godot 4.x
          </div>
          <div className="mark">
            <span className="badge">PLUGIN</span> Dialogic 2 ready
          </div>
          <div className="mark">
            <span className="badge">LICENSE</span> MIT core
          </div>
          <div className="mark">
            <span className="badge">PLATFORMS</span> win · mac · linux
          </div>
          <div className="mark">
            <span className="badge">BUILT WITH</span> KNOT (early access)
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
        <SectionLabel num="01" text="What is parabreak" />
        <div className="what-head">
          <div>
            <h2>
              An engine layer<br />
              that knows it&apos;s an engine.
            </h2>
          </div>
          <div className="lead">
            <p>
              Most game engines pretend the player isn&apos;t there. <b>Parabreak is the opposite.</b> It exposes the seams — save files, dialogue, the menu, the camera — as <span className="acc">first-class hooks</span> your story can react to. <span className="strike">Plug-in.</span> Engine.
            </p>
          </div>
        </div>

        <div className="what-cards">
          <div className="wcard">
            <div className="num">
              <span className="acc">01.</span> THE PROBLEM
            </div>
            <h4>Meta moments are one-offs.</h4>
            <p>
              Every &quot;the game knows&quot; trick is a 200-line hand-rolled hack — save scanning, file IO, custom dialogue patches. It works once, then breaks on the next patch.
            </p>
            <div className="strip">
              {`# fragile, hand-rolled\nif FileAccess.file_exists(\n    "user://save_001.dat"):\n    `}
              <span className="red">// custom parser. brittle.</span>
            </div>
            <div className="meta">
              <span>before parabreak</span>
              <span className="acc">~200 LOC / hook</span>
            </div>
          </div>

          <div className="wcard">
            <div className="num">
              <span className="acc">02.</span> THE PRIMITIVE
            </div>
            <h4>
              Hooks. <span style={{ whiteSpace: "nowrap" }}>Thirty-five</span> and counting.
            </h4>
            <p>
              Save tampering, dialogue rewrites, choice locks, menu drift, narrator interruption — each one a typed block you drop into a scenario JSON.
            </p>
            <div className="strip">
              {`{"type": "save_delete",\n  "slot": 0,\n  `}
              <span className="green">{`"mark_persistent": true`}</span>
              {`}\n`}
              <span className="mute">// one block. that&apos;s the hook.</span>
            </div>
            <div className="meta">
              <span>with parabreak</span>
              <span className="acc">1 block</span>
            </div>
          </div>

          <div className="wcard">
            <div className="num">
              <span className="acc">03.</span> THE ENGINE
            </div>
            <h4>Native to Godot 4.x.</h4>
            <p>
              GDScript-first. Plays nicely with Dialogue plugins. Doesn&apos;t require a fork. Ships as an addon you can vendor or drop into <code style={{ color: "var(--green)" }}>res://addons</code>.
            </p>
            <div className="strip">
              {`# project.godot\n[autoload]\nparabreak="res://addons/parabreak"\n# `}
              <span className="green">that&apos;s the install.</span>
            </div>
            <div className="meta">
              <span>install</span>
              <span className="acc">addon · no fork</span>
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
        <SectionLabel num="02" text="What breaks" />
        <div className="breaks-head">
          <div>
            <h2>
              Four kinds of seam,<br />
              over thirty hooks across them.
            </h2>
          </div>
          <div className="lead">
            <p>
              Meta moments cluster into four primitives. Parabreak ships typed scenario blocks for each — drop them in, no engine fork. The illustrations below are how each category <i>feels</i> at runtime, not screenshots of any specific game.
            </p>
          </div>
        </div>

        <div className="breaks-grid">
          <div className="bcard">
            <div>
              <div className="label">
                <span className="acc">A.</span> SAVE TAMPER
              </div>
              <h4>The game looks at the save folder.</h4>
              <p>Read, rename, delete, corrupt, or stamp persistent flags that survive across slots and reinstalls. The game notices what the player did <i>last time</i>.</p>
              <div className="blocks">
                <code>save_delete</code><code>save_corrupt</code><code>persistent_flag_set</code><code>slot_rename</code><code>save_integrity_check</code>
              </div>
            </div>
            <div className="illus save">
              <div className="file-list">
                <div className="file-row"><span>save_001.dat</span><span className="meta">12 KB · ok</span></div>
                <div className="file-row del"><span>save_002.dat</span><span className="meta">— deleted</span></div>
                <div className="file-row"><span>save_003.dat</span><span className="meta">8 KB · <span style={{color:"var(--red)"}}>corrupt</span></span></div>
                <div className="file-row new"><span>FLAG_PLAYER_NOTICED</span><span className="meta">true · persistent</span></div>
                <div className="file-row"><span>last_session.log</span><span className="meta">3m ago</span></div>
              </div>
            </div>
          </div>

          <div className="bcard">
            <div>
              <div className="label">
                <span className="acc">B.</span> DIALOGUE REWRITE
              </div>
              <h4>Lines change while the player reads.</h4>
              <p>Characters notice your save, your name, your last choice — and rewrite mid-sentence. Detect repeated choices, intercept back-button retries, pause for player action.</p>
              <div className="blocks">
                <code>text_corrupt</code><code>dialogue_reactive</code><code>wait_for_action</code><code>detect_repeat_choice</code><code>detect_back_attempt</code>
              </div>
            </div>
            <div className="illus dialog">
              <div className="lines">
                <div>› ARCHIVIST</div>
                <div>&quot;Welcome back. Did you finish the <span className="strike">tutorial?</span>&quot;</div>
                <div><span className="new">&quot;…you skipped it.&quot;</span></div>
                <div className="narr">narrator: he wasn&apos;t supposed to know that.</div>
              </div>
            </div>
          </div>

          <div className="bcard">
            <div>
              <div className="label">
                <span className="acc">C.</span> UI DECONSTRUCTION
              </div>
              <h4>The menu lies, drifts, or refuses.</h4>
              <p>Destroy or disable buttons. Rename slots. Change the window title. Fail the quit. The chrome is now part of the story, not separate from it.</p>
              <div className="blocks">
                <code>ui_button_destroy</code><code>ui_button_disable</code><code>window_title_set</code><code>title_screen_variant</code><code>game_quit</code>
              </div>
            </div>
            <div className="illus ui">
              <div className="frame">
                <div className="title">main menu · v0.1</div>
                <div className="menu">
                  <div className="item kept">continue</div>
                  <div className="item gone">new game</div>
                  <div className="item">options</div>
                  <div className="item gone">quit</div>
                </div>
                <div className="title" style={{ textAlign: "right", color: "var(--red)" }}>// 2 buttons destroyed</div>
              </div>
            </div>
          </div>

          <div className="bcard">
            <div>
              <div className="label">
                <span className="acc">D.</span> FAKE OS + WORLD LEAK · <span style={{ color: "var(--violet)" }}>PLUS</span>
              </div>
              <h4>The game escapes the window.</h4>
              <p>OS-style fake dialogs, clipboard read/write, real-time clock awareness, slot impersonation, scene live-reload. Use sparingly — these earn their reaction by being rare.</p>
              <div className="blocks">
                <code>fake_dialog</code><code>clipboard_write</code><code>clipboard_read</code><code>real_time_check</code><code>fake_permission_popup</code><code>slot_impersonation</code>
              </div>
            </div>
            <div className="illus fake">
              <div className="scanline"></div>
              <div className="alert">
                <div className="bar"><span>NOTICE</span><span>×</span></div>
                <div className="body">this is still inside the game. you just don&apos;t think so yet.</div>
                <div className="row">
                  <div className="b">cancel</div>
                  <div className="b p">ok</div>
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
    sub: "open source · MIT · ships with engine",
    color: "var(--green)",
    hooks: [
      ["save_delete", "Delete a save slot from disk.", { type: "save_delete", slot: 0, mark_persistent: true }],
      ["save_corrupt", "Mangle a save in a controlled, replayable way.", { type: "save_corrupt", slot: 0, mode: "header" }],
      ["persistent_flag_set", "Stamp a flag that survives reinstalls.", { type: "persistent_flag_set", key: "FLAG_PLAYER_NOTICED", value: true }],
      ["persistent_flag_get", "Read flags written across runs.", { type: "persistent_flag_get", key: "FLAG_PLAYER_NOTICED" }],
      ["ui_button_destroy", "Remove a UI button entirely.", { type: "ui_button_destroy", target: "main_menu.quit" }],
      ["ui_button_disable", "Grey out a button without removing it.", { type: "ui_button_disable", target: "main_menu.continue" }],
      ["window_title_set", "Change the OS window title at runtime.", { type: "window_title_set", value: "parabreak — you again?" }],
      ["slot_rename", "Rename a save slot in the list.", { type: "slot_rename", slot: 0, name: "archivist" }],
      ["title_screen_variant", "Swap the title screen for a variant.", { type: "title_screen_variant", id: "after_first_death" }],
      ["save_integrity_check", "Hash a save and react if tampered.", { type: "save_integrity_check", slot: 0 }],
      ["game_quit", "Force a clean quit (or refuse one).", { type: "game_quit", allow: false }],
      ["game_crash", "Simulate a crash for narrative effect.", { type: "game_crash", style: "segfault" }],
      ["window_close", "Programmatically close the window.", { type: "window_close" }],
    ],
  },
  hooks: {
    label: "HOOKS",
    sub: "$49 · 8 reactive blocks",
    color: "var(--amber)",
    hooks: [
      ["shader_effect", "Scanlines, distort, chromatic. Time-bounded.", { type: "shader_effect", effect: "scanline", intensity: 0.45, duration: 1.5 }],
      ["audio_effect", "Pitch, bitcrush, reverse. Per-channel.", { type: "audio_effect", effect: "pitch_shift", amount: -0.3 }],
      ["text_corrupt", "Scramble or replace upcoming text.", { type: "text_corrupt", mode: "scramble_chars", target: "next_block" }],
      ["dialogue_reactive", "Branch a line on flags or save state.", { type: "dialogue_reactive", flag: "FLAG_PLAYER_NOTICED" }],
      ["input_hijack", "Refuse, swap, or invert inputs briefly.", { type: "input_hijack", mode: "invert_xy", duration: 2.0 }],
      ["wait_for_action", "Pause until the player does (or refuses) something.", { type: "wait_for_action", expect: "click_quit", timeout: 30 }],
      ["detect_repeat_choice", "Notice when the player picks the same option twice.", { type: "detect_repeat_choice", choice_id: "lie_to_archivist", threshold: 2 }],
      ["detect_back_attempt", "Catch reload / back-button retries.", { type: "detect_back_attempt", within_seconds: 5 }],
    ],
  },
  plus: {
    label: "PLUS",
    sub: "$69 · 14 advanced blocks",
    color: "var(--violet)",
    hooks: [
      ["fake_dialog", "OS-styled fake popup, in-engine.", { type: "fake_dialog", style: "windows_error", title: "Notice", body: "this is still inside the game." }],
      ["fake_permission_popup", "Display a fake permission prompt.", { type: "fake_permission_popup", kind: "mic_access" }],
      ["clipboard_write", "Write to system clipboard with consent prompt.", { type: "clipboard_write", value: "go look at your saves." }],
      ["clipboard_read", "Read clipboard with consent prompt.", { type: "clipboard_read", on_match: "reactive_line" }],
      ["real_time_check", "Read wall-clock; react to date / hour.", { type: "real_time_check", condition: "after_midnight" }],
      ["user_file_read", "Read a file from a sandboxed user path.", { type: "user_file_read", path: "user://notes.txt" }],
      ["user_file_write", "Write a file to a sandboxed user path.", { type: "user_file_write", path: "user://letter.txt", body: "I see you." }],
      ["cross_slot_bleed", "Make state from one slot leak into another.", { type: "cross_slot_bleed", from: 1, to: 0, key: "memory" }],
      ["slot_impersonation", "Make slot N appear to be slot M to the player.", { type: "slot_impersonation", shown_as: 0, actually: 2 }],
      ["scene_live_reload", "Hot-swap a scene mid-play with a variant.", { type: "scene_live_reload", target: "res://scenes/room.tscn", variant: "after_meta" }],
      ["text_i18n", "Locale-aware text variants per scenario block.", { type: "text_i18n", key: "NARRATOR_GREETING", locales: { en: "…", ko: "…" } }],
      ["discord_presence", "Set Discord rich presence as a narrative beat.", { type: "discord_presence", state: "still inside the game", details: "archivist · day 3" }],
      ["steam_overlay_awareness", "React when Steam overlay opens / closes.", { type: "steam_overlay_awareness", on: "overlay_open" }],
      ["accessibility_hook", "Branch on screen-reader / high-contrast / reduced motion.", { type: "accessibility_hook", flag: "reduced_motion" }],
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
        <SectionLabel num="03" text="35 hooks" />
        <div className="hooks-head">
          <div>
            <h2>
              <span className="acc" style={{ fontFamily: "var(--f-mono)", fontSize: "0.7em", verticalAlign: "0.18em", marginRight: "0.15em" }}>35</span> typed blocks.<br />One scenario format.
            </h2>
          </div>
          <div>
            <p style={{ fontFamily: "var(--f-mono)", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6 }}>
              Every hook is a JSON block in a scenario file. Same schema, same loader, same hot-reload. <span style={{ color: "var(--green)" }}>Core</span> ships open. <span style={{ color: "var(--amber)" }}>Hooks</span> + <span style={{ color: "var(--violet)" }}>Plus</span> unlock the reactive and advanced layers.
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
              {plusExpanded ? <>Collapse to first 8 <span className="arrow">↑</span></> : <>Show all 14 plus blocks <span className="arrow">↓</span></>}
            </button>
          </div>
        )}

        <div className="hooks-foot">
          <span>showing <span className="acc">{visibleHooks.length}</span> of {t.hooks.length} {t.label.toLowerCase()} · 35 total · {t.sub}</span>
          <span>// hover any block to simulate the effect (visual only on this page)</span>
        </div>
      </div>
    </section>
  );
}

/* ===================== Korean market signal ===================== */
function KoreanSection() {
  return (
    <section id="korean" className="korean">
      <div className="container korean-grid">
        <div>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.2em", color: "var(--mute)", textTransform: "uppercase", marginBottom: 18 }}>
            <span style={{ color: "var(--green)" }}>04</span> · Korean market signal
          </div>
          <h2>
            For the meta games<br />
            <span className="acc">made in Korea</span>.
          </h2>
          <p className="lead">
            The Korean indie scene is one of the fastest markets to read meta-fiction and fourth-wall work. <b>parabreak treats Korean text, Hangul system messages, and Korean indie festival tracks</b> as first-class — not as an afterthought translation pass.
          </p>

          <div className="signals">
            <div className="sig">
              <span className="num">01</span>
              <span><b>Hangul narration</b> · jamo-level text_corrupt · whitespace preserved</span>
              <span className="arrow">→</span>
            </div>
            <div className="sig">
              <span className="num">02</span>
              <span><b>BIC · IndieCraft</b> booth-asset templates · trailer subtitles</span>
              <span className="arrow">→</span>
            </div>
            <div className="sig">
              <span className="num">03</span>
              <span><b>text_i18n</b> block · Korean scenario variants alongside the source</span>
              <span className="arrow">→</span>
            </div>
            <div className="sig">
              <span className="num">04</span>
              <span><b>Korean docs</b> · shipped on day one, not three months later</span>
              <span className="arrow">→</span>
            </div>
          </div>
        </div>

        <div className="korean-side">
          <div className="stamp">// SIGNAL 01 · DEV NOTE</div>
          <h4>Why Korea first?</h4>
          <p>
            The meta-game lands on the feeling that <b>the developer is looking at you</b>. That feeling dies halfway through a translation pass. parabreak ships English and Korean side by side at launch, at the same quality — so a Korean studio shipping in English, and a Korean-language original, both get the same hook firing naturally.
          </p>
          <hr />
          <div className="qt">
            &apos;The Korean indie scene is unusually generous with games that question the system itself. So the meta engine&apos;s first proof gets built here.&apos;
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
        <SectionLabel num="05" text="Pricing" />
        <div className="pricing-head">
          <div>
            <div className="price-badge">
              <span className="dot"></span>
              <span>prices rise after Steam launch</span>
            </div>
            <h2>
              Three tiers.<br />One <span className="acc">install</span>.
            </h2>
          </div>
          <div>
            <p style={{ fontFamily: "var(--f-mono)", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6 }}>
              The engine is the engine. Tiers unlock more block types — they don&apos;t ship a different runtime. Buy the tier you need, upgrade later, the scenarios still load. <b>One-time payment, no subscriptions.</b>
            </p>
          </div>
        </div>

        <div className="price-grid">
          <div className="pcard">
            <div className="label">VN CORE · <span className="acc">free</span></div>
            <div className="name">parabreak<br />VN Core</div>
            <div className="price"><span className="cur">$</span>0<span className="per">/ MIT forever</span></div>
            <div className="future">post-launch: still free</div>
            <div className="desc">The 13 core blocks for visual novels. Save tampering, persistent flags, UI button control, title-screen variants. Open source forever.</div>
            <ul>
              <li>13 core blocks</li>
              <li>scenario JSON loader</li>
              <li>Godot 4.x addon</li>
              <li className="x">no shaders / audio FX</li>
              <li className="x">no fake_dialog / real_time</li>
            </ul>
            <div className="cta"><a href="#" className="btn" style={{ width: "100%", justifyContent: "center" }}>Install <span className="arrow">→</span></a></div>
          </div>

          <div className="pcard">
            <div className="label">HOOKS</div>
            <div className="name">parabreak<br />Hooks</div>
            <div className="price"><span className="cur">$</span>49<span className="per">/ one-time</span></div>
            <div className="future">post-launch: $69</div>
            <div className="desc">Adds the 8 reactive blocks. Shader and audio effects, text corruption, input hijack, repeat-choice / back-attempt detection — the toolkit for moments the player <i>feels</i>.</div>
            <ul>
              <li>everything in Core</li>
              <li>+ 8 reactive blocks</li>
              <li>shader / audio / text FX</li>
              <li>wait_for_action · detect_repeat_choice</li>
              <li className="x">no Plus blocks</li>
            </ul>
            <div className="cta"><a href="#" className="btn" style={{ width: "100%", justifyContent: "center" }}>Buy Hooks <span className="arrow">→</span></a></div>
          </div>

          <div className="pcard">
            <div className="label">PLUS</div>
            <div className="name">parabreak<br />Plus</div>
            <div className="price"><span className="cur">$</span>69<span className="per">/ one-time</span></div>
            <div className="future">post-launch: $149</div>
            <div className="desc">Adds the 14 advanced blocks. Fake OS dialogs, clipboard read/write, real-time, slot impersonation, scene live-reload, Discord / Steam awareness — the rare &quot;did the game just do that?&quot; effects.</div>
            <ul>
              <li>everything in Hooks</li>
              <li>+ 14 advanced blocks</li>
              <li>fake_dialog · clipboard r/w</li>
              <li>scene_live_reload · text_i18n</li>
              <li>discord_presence · steam_overlay</li>
            </ul>
            <div className="cta"><a href="#" className="btn primary" style={{ width: "100%", justifyContent: "center" }}>Buy Plus <span className="arrow">→</span></a></div>
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
          <div className="dlg-eyebrow">// COMPATIBLE WITH</div>
          <div className="dlg-title"><b>Dialogic 2</b> — out of the box.</div>
          <div className="dlg-sub">
            Parabreak&apos;s <code>dialogue_reactive</code>, <code>text_corrupt</code>, <code>wait_for_action</code> and <code>detect_repeat_choice</code> blocks proxy through Dialogic 2 timelines via a thin adapter. Drop both addons in, no patching required.
          </div>
        </div>
        <div className="dlg-actions">
          <a href="#" className="btn">Adapter docs <span className="arrow">→</span></a>
        </div>
      </div>
    </section>
  );
}

/* ===================== FAQ ===================== */
const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "Is this a fork of Godot?",
    a: <>No. Parabreak ships as a standard addon under <code>res://addons/parabreak</code> and registers an autoload. You stay on stock Godot 4.x and update normally — we track the engine, not the other way around.</>,
  },
  {
    q: "Can players mod parabreak hooks at runtime?",
    a: <>Yes — scenario blocks are JSON and the loader supports a <code>res://mods/</code> override path. Modders can swap or extend block handlers without recompiling. We document the mod surface in the docs site, and the <code>Plus</code> tier ships an example mod template.</>,
  },
  {
    q: "Does it play nice with Dialogic 2?",
    a: <>Parabreak doesn&apos;t replace dialogue plugins — it augments them. The <code>dialogue_reactive</code>, <code>wait_for_action</code>, and <code>detect_repeat_choice</code> blocks proxy through whatever dialogue system you&apos;re using, including Dialogic 2. There&apos;s a thin adapter; we&apos;ll keep it current.</>,
  },
  {
    q: "What about commercial use? Royalties?",
    a: <>None. The Core is MIT licensed. Hooks and Plus tiers are commercial licenses with no royalties — buy once, ship forever, including paid Steam releases. We only ask that you don&apos;t redistribute the paid blocks as a separate product.</>,
  },
  {
    q: "Can I buy Plus, then downgrade?",
    a: <>You can. Scenarios using Plus blocks will refuse to load on a Hooks or Core install with a clear error pointing to which block needs the upgrade — your project doesn&apos;t break silently.</>,
  },
  {
    q: "Is fake_dialog deceptive? Will Steam reject it?",
    a: <>Used as a narrative beat (rare, in-context, with a clear &quot;you&apos;re still in the game&quot; reveal), it&apos;s standard meta-fiction craft. Used to actually deceive the player — phishing, fake updates — Steam will reject and so will we. The block ships with a <code>safe_mode</code> default that watermarks the dialog corner with a small &quot;in-game&quot; tag unless you opt out.</>,
  },
  {
    q: "Why Korean docs at launch?",
    a: <>Because the meta-fiction reading is sharper there, and our team can ship that quality without translating through a third party. See the Korean Tier Signal section above.</>,
  },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="faq">
      <div className="container">
        <SectionLabel num="06" text="FAQ" />
        <div className="faq-head">
          <h2>Practical answers,<br />before you install.</h2>
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
        <SectionLabel num="07" text="Community" />
        <div style={{ marginBottom: 36, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "end" }}>
          <h2>Where the engine<br />gets weird with you.</h2>
          <p style={{ fontFamily: "var(--f-mono)", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6 }}>
            Parabreak is small enough that the people building it talk to the people shipping with it. Here&apos;s where that happens.
          </p>
        </div>
        <div className="com-grid">
          <div className="ccard">
            <div className="ctype">CHAT</div>
            <h4>Dev chat</h4>
            <p>Real-time questions, scenario reviews, build-shares. Korean and English channels, both staffed by the team.</p>
            <div className="meta-line"><span>~340 members</span><span className="acc">join →</span></div>
          </div>
          <div className="ccard">
            <div className="ctype">CODE</div>
            <h4>Open issues</h4>
            <p>Core is MIT and developed in the open. File issues, send PRs, watch the roadmap update in real time.</p>
            <div className="meta-line"><span>v0.1 · 18 open</span><span className="acc">repo →</span></div>
          </div>
          <div className="ccard">
            <div className="ctype">SHOWCASE</div>
            <h4>Scenario gallery</h4>
            <p>Community-submitted scenario JSONs you can drop into your project as a starting point. Tag your own, get featured.</p>
            <div className="meta-line"><span>27 scenarios · growing</span><span className="acc">browse →</span></div>
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
            <p>The meta engine for Godot. Build games that notice you back.</p>
          </div>
          <div className="foot-col">
            <h5>Engine</h5>
            <ul>
              <li><a href="#">Install</a></li>
              <li><a href="#">Hooks reference</a></li>
              <li><a href="#">Scenario format</a></li>
              <li><a href="/design/changelog.html">Changelog</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Buy</h5>
            <ul>
              <li><a href="#">Hooks · $49</a></li>
              <li><a href="#">Plus · $69</a></li>
              <li><a href="#">Compare tiers</a></li>
              <li><a href="#">License FAQ</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Community</h5>
            <ul>
              <li><a href="#">Dev chat</a></li>
              <li><a href="#">Repo · MIT</a></li>
              <li><a href="#">Scenario gallery</a></li>
              <li><a href="#">한국어 docs</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>About</h5>
            <ul>
              <li><a href="#">Team</a></li>
              <li><a href="/design/manifesto.html">Manifesto</a></li>
              <li><a href="/design/brand.html">Brand system</a></li>
              <li><a href="#">Press kit</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bot">
          <span>© parabreak · 2026 · MIT core · <span className="acc">made small, on purpose</span></span>
          <span className="right">
            <span>v0.1 · public alpha</span>
            <span>// you are still inside the game</span>
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
