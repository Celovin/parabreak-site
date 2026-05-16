/* global React, ReactDOM */
const { useState } = React;

// ============================================================
// Atom: Broken Frame Mark (locked geometry from logo-r2)
// ============================================================
function BFM({ size = 100, accent = 'var(--green)', ink = 'var(--ink)', stroke = 6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <path d="M 12 12 L 12 88 L 88 88 L 88 56" stroke={ink} strokeWidth={stroke} strokeLinecap="square" strokeLinejoin="miter" />
      <g transform="translate(8 -4) rotate(-3 50 30)">
        <path d="M 12 12 L 88 12 L 88 56" stroke={accent} strokeWidth={stroke} strokeLinecap="square" strokeLinejoin="miter" />
      </g>
      <g>
        <rect x="84" y="48" width="3" height="3" fill={accent} />
        <rect x="78" y="52" width="2" height="2" fill={accent} opacity="0.6" />
        <rect x="72" y="46" width="2" height="2" fill={accent} opacity="0.4" />
      </g>
    </svg>
  );
}

// ============================================================
// Atom: Hybrid wordmark
// ============================================================
function Wordmark({ size = 56, variant = 'default' }) {
  // variant: default | ink-dark (for light-bg) | ink-light (for any dark bg) | mono-white | mono-black
  const cls = "hybrid-word " + (variant === 'ink-dark' ? 'ink-dark' : variant === 'ink-light' ? 'ink-light' : '');
  return (
    <span className={cls} style={{ fontSize: size }}>
      <span>para</span><span className="br">break</span>
    </span>
  );
}

// ============================================================
// Section frame
// ============================================================
function Frame({ name, meta, children }) {
  return (
    <div className="frame">
      <div className="frame-top">
        <span className="dot"></span>
        <span className="name">{name}</span>
        {meta && <span className="meta">{meta}</span>}
      </div>
      <div className="frame-body">{children}</div>
    </div>
  );
}

// ============================================================
// Section: 01 — Logo
// ============================================================
function LogoSection() {
  return (
    <section className="sec" id="logo">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">01</span><span>LOGO</span>
            </div>
            <h2 className="sec-title">Broken frame.<br/>The corner lifts.</h2>
          </div>
          <p className="sec-lead">
            One motif, two surfaces. The frame mark and the wordmark do the same thing — the corner / the word "break" lifts away. Use Lockup A everywhere by default. Lockup B only when square (app icon, social, vertical). Mark-only for ≤32px (favicon, watermark, in-product chrome).
          </p>
        </div>

        {/* Primary lockups */}
        <div className="logo-grid-1" style={{ marginBottom: 24 }}>
          <Frame name="LOCKUP A · HORIZONTAL · PRIMARY" meta="navbar · hero · press · OG">
            <div className="logo-stage" style={{ minHeight: 260, gap: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BFM size={92} stroke={6} />
              <div>
                <Wordmark size={64} />
                <div style={{ marginTop: 10, color: 'var(--mute)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: 'var(--f-mono)' }}>
                  The meta engine for Godot
                </div>
              </div>
            </div>
            <div className="logo-foot">
              <span>mark <span className="acc">92px</span> · gap 22px · clear 6u</span>
              <span>caption optional</span>
            </div>
          </Frame>

          <Frame name="LOCKUP B · STACKED · SECONDARY" meta="app icon · social · vertical · square">
            <div className="logo-stage" style={{ minHeight: 260, flexDirection: 'column', gap: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BFM size={120} stroke={6} />
              <Wordmark size={48} />
              <div style={{ color: 'var(--mute)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'var(--f-mono)' }}>
                v0.1 · godot 4.x
              </div>
            </div>
            <div className="logo-foot">
              <span>mark <span className="acc">120px</span> · v-gap 18px</span>
              <span>caption 10px / 0.3em</span>
            </div>
          </Frame>
        </div>

        {/* Mark only + sizes */}
        <div className="logo-grid-3" style={{ marginBottom: 24 }}>
          <Frame name="MARK · 128px" meta="install · launcher">
            <div className="logo-stage" style={{ minHeight: 180 }}>
              <BFM size={128} stroke={7} />
            </div>
            <div className="logo-foot"><span>full mark</span><span className="acc">128</span></div>
          </Frame>
          <Frame name="MARK · 64px" meta="header · doc nav">
            <div className="logo-stage" style={{ minHeight: 180 }}>
              <BFM size={64} stroke={7} />
            </div>
            <div className="logo-foot"><span>compact mark</span><span className="acc">64</span></div>
          </Frame>
          <Frame name="MARK · 32px" meta="favicon · in-product">
            <div className="logo-stage" style={{ minHeight: 180 }}>
              <BFM size={32} stroke={8} />
            </div>
            <div className="logo-foot"><span>icon mark</span><span className="acc">32</span></div>
          </Frame>
          <Frame name="MARK · 16px" meta="tab icon · minimum">
            <div className="logo-stage" style={{ minHeight: 180 }}>
              <BFM size={16} stroke={9} />
            </div>
            <div className="logo-foot"><span>tab icon — minimum</span><span className="acc">16</span></div>
          </Frame>
        </div>

        {/* Mono variants */}
        <div className="logo-grid-2" style={{ marginBottom: 32 }}>
          <Frame name="MONO · BLACK ON LIGHT" meta="press · print · embossing">
            <div className="logo-stage" style={{ minHeight: 240, background: '#F4F4EE' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <BFM size={84} stroke={6} accent="#0A0B0F" ink="#0A0B0F" />
                <Wordmark size={54} variant="ink-dark" />
              </div>
            </div>
            <div className="logo-foot"><span>ink: #0A0B0F · bg: #F4F4EE</span><span className="acc">single-color</span></div>
          </Frame>

          <Frame name="MONO · WHITE ON DARK" meta="black-bg overlays · video lower-thirds">
            <div className="logo-stage" style={{ minHeight: 240, background: '#0A0B0F' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <BFM size={84} stroke={6} accent="#FFFFFF" ink="#FFFFFF" />
                <Wordmark size={54} variant="ink-light" />
              </div>
            </div>
            <div className="logo-foot"><span>ink: #FFFFFF · bg: #0A0B0F</span><span className="acc">single-color</span></div>
          </Frame>
        </div>

        {/* Construction note */}
        <div className="sec-head" style={{ marginTop: 56, marginBottom: 32, gridTemplateColumns: '280px 1fr' }}>
          <div>
            <div className="sec-label"><span className="num">·</span><span>CONSTRUCTION</span></div>
            <h3 style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 22, margin: '14px 0 0' }}>Geometry, locked.</h3>
          </div>
          <p className="sec-lead">
            All values in viewBox units (100 = 100u). Stroke 6u, square caps, miter joins. The broken segment offsets +8 / −4 and rotates −3°. Break point at y=56u. Clear-space 6u all sides (= ½ stroke). Three fragments float free at the gap to signal that the corner snapped, not just lifted.
          </p>
        </div>

        <Frame name="CONSTRUCTION · ANNOTATED" meta="ratios · clear-space · annotations">
          <div className="logo-stage" style={{ minHeight: 360 }}>
            <svg width="380" height="380" viewBox="0 0 100 100" fill="none">
              <g stroke="#1E2230" strokeWidth="0.3">
                {Array.from({ length: 11 }).map((_, i) => (
                  <line key={'h' + i} x1="0" y1={i * 10} x2="100" y2={i * 10} />
                ))}
                {Array.from({ length: 11 }).map((_, i) => (
                  <line key={'v' + i} x1={i * 10} y1="0" x2={i * 10} y2="100" />
                ))}
              </g>
              <g stroke="#46E49E" strokeWidth="0.25" strokeDasharray="0.6 0.8" opacity="0.55">
                <line x1="12" y1="0" x2="12" y2="100" />
                <line x1="88" y1="0" x2="88" y2="100" />
                <line x1="0" y1="12" x2="100" y2="12" />
                <line x1="0" y1="88" x2="100" y2="88" />
                <line x1="0" y1="56" x2="100" y2="56" />
              </g>
              <path d="M 12 12 L 12 88 L 88 88 L 88 56" stroke="#E6E8EF" strokeWidth="6" strokeLinejoin="miter" />
              <g transform="translate(8 -4) rotate(-3 50 30)">
                <path d="M 12 12 L 88 12 L 88 56" stroke="#46E49E" strokeWidth="6" strokeLinejoin="miter" />
              </g>
              <rect x="84" y="48" width="3" height="3" fill="#46E49E" />
              <rect x="78" y="52" width="2" height="2" fill="#46E49E" opacity="0.6" />
              <rect x="72" y="46" width="2" height="2" fill="#46E49E" opacity="0.4" />
              <g fontFamily="JetBrains Mono" fontSize="2" fill="#6B7080">
                <text x="1" y="11">12u</text>
                <text x="1" y="89">88u</text>
                <text x="89" y="11">88u</text>
                <text x="89" y="58">56u brk</text>
                <text x="14" y="6">offset +8 / −4</text>
                <text x="50" y="98" textAnchor="middle">stroke 6u · square caps · miter joins · −3°</text>
              </g>
              <g stroke="#6B7080" strokeWidth="0.2" fill="none" strokeDasharray="0.6 0.6">
                <rect x="6" y="6" width="88" height="88" />
              </g>
              <text x="6" y="4" fontFamily="JetBrains Mono" fontSize="1.8" fill="#6B7080">clear-space = 6u (½ stroke)</text>
            </svg>
          </div>
          <div className="logo-foot">
            <span>viewBox 100 × 100 · stroke 6u · break y=56u · offset +8/−4 · θ −3°</span>
            <span className="acc">v1.0 locked</span>
          </div>
        </Frame>

        {/* Don'ts */}
        <div className="sec-head" style={{ marginTop: 56, marginBottom: 24, gridTemplateColumns: '280px 1fr' }}>
          <div>
            <div className="sec-label"><span className="num">·</span><span>USAGE</span></div>
            <h3 style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 22, margin: '14px 0 0' }}>Don'ts.</h3>
          </div>
          <p className="sec-lead">
            Four common ways to break the brand. Each violates one rule and weakens the motif. If you need a variant the rules don't cover, propose it — don't improvise.
          </p>
        </div>

        <div className="dodont">
          <div className="dd">
            <div className="preview">
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                <path d="M 12 12 L 12 88 L 88 88 L 88 56" stroke="#46E49E" strokeWidth="6" strokeLinejoin="miter" />
                <g transform="translate(8 -4) rotate(-3 50 30)">
                  <path d="M 12 12 L 88 12 L 88 56" stroke="#46E49E" strokeWidth="6" strokeLinejoin="miter" />
                </g>
              </svg>
            </div>
            <div className="stamp no">Both strokes accent</div>
            <div className="why">The contrast between ink frame and accent broken segment is the whole point. Single-color = use mono variant.</div>
          </div>

          <div className="dd">
            <div className="preview">
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                <path d="M 12 12 L 12 88 L 88 88 L 88 56" stroke="#E6E8EF" strokeWidth="6" strokeLinejoin="miter" />
                <g transform="translate(20 -12) rotate(-12 50 30)">
                  <path d="M 12 12 L 88 12 L 88 56" stroke="#46E49E" strokeWidth="6" strokeLinejoin="miter" />
                </g>
              </svg>
            </div>
            <div className="stamp no">Exaggerated tilt</div>
            <div className="why">−3° / +8 / −4 is the locked geometry. Steeper tilt looks broken-by-mistake, not broken-on-purpose.</div>
          </div>

          <div className="dd">
            <div className="preview">
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                <defs>
                  <linearGradient id="ddg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#46E49E" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
                <path d="M 12 12 L 12 88 L 88 88 L 88 56" stroke="#E6E8EF" strokeWidth="6" strokeLinejoin="miter" />
                <g transform="translate(8 -4) rotate(-3 50 30)">
                  <path d="M 12 12 L 88 12 L 88 56" stroke="url(#ddg)" strokeWidth="6" strokeLinejoin="miter" />
                </g>
              </svg>
            </div>
            <div className="stamp no">Gradient on accent</div>
            <div className="why">Flat phosphor green only. Gradients soften the "this is a circuit, not a vibe" reading.</div>
          </div>

          <div className="dd">
            <div className="preview" style={{ position: 'relative' }}>
              <BFM size={80} stroke={6} />
              <span style={{
                position: 'absolute', top: 50, left: 60,
                fontFamily: 'var(--f-display)', fontWeight: 700,
                fontSize: 12, color: '#E44C4C',
              }}>PB</span>
            </div>
            <div className="stamp no">Letters inside frame</div>
            <div className="why">Mark stands alone. Stuffing initials inside dilutes the broken-frame metaphor and reads as a generic monogram.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section: 02 — Color
// ============================================================
const PALETTE = {
  dark: [
    { name: 'bg',      sub: 'page',     hex: '#0A0B0F', use: 'page background', tok: '--bg' },
    { name: 'bg-2',    sub: 'card',     hex: '#0F1116', use: 'panels · code blocks', tok: '--bg-2' },
    { name: 'panel',   sub: 'tile',     hex: '#151821', use: 'raised tiles', tok: '--panel' },
    { name: 'line',    sub: '01',       hex: '#1E2230', use: 'grid lines · default borders', tok: '--line' },
    { name: 'line-2',  sub: '02',       hex: '#2A2F40', use: 'strong borders · pill outlines', tok: '--line-2' },
    { name: 'ink',     sub: 'primary',  hex: '#E6E8EF', use: 'headings · body emphasis', tok: '--ink' },
    { name: 'ink-2',   sub: 'body',     hex: '#B4B8C5', use: 'paragraph body', tok: '--ink-2' },
    { name: 'mute',    sub: 'label',    hex: '#6B7080', use: 'labels · captions · annotations', tok: '--mute' },
    { name: 'mute-2',  sub: 'whisper',  hex: '#4A4F60', use: 'placeholders · disabled', tok: '--mute-2' },
  ],
  accent: [
    { name: 'green',     sub: 'phosphor',  hex: '#46E49E', use: 'primary accent · CTAs · highlights', tok: '--green' },
    { name: 'green-dim', sub: 'phosphor 2',hex: '#2A8F62', use: 'hover-out · disabled accent', tok: '--green-dim' },
    { name: 'amber',     sub: 'warn',      hex: '#F2B544', use: 'pricing badge · time-sensitive', tok: '--amber' },
    { name: 'violet',    sub: 'plus tier', hex: '#8B5CF6', use: 'Plus tier · Dialogic badge', tok: '--violet' },
    { name: 'red',       sub: 'destruct',  hex: '#E44C4C', use: 'errors · LOCKED · strike-through', tok: '--red' },
  ],
  light: [
    { name: 'bg',      sub: 'page',     hex: '#F4F4EE', use: 'page background', tok: '--bg' },
    { name: 'bg-2',    sub: 'card',     hex: '#ECECE5', use: 'panels', tok: '--bg-2' },
    { name: 'panel',   sub: 'tile',     hex: '#FFFFFF', use: 'raised tiles', tok: '--panel' },
    { name: 'line',    sub: '01',       hex: '#D8D8D0', use: 'grid lines · default borders', tok: '--line' },
    { name: 'line-2',  sub: '02',       hex: '#C2C2BA', use: 'strong borders', tok: '--line-2' },
    { name: 'ink',     sub: 'primary',  hex: '#0A0B0F', use: 'headings', tok: '--ink' },
    { name: 'ink-2',   sub: 'body',     hex: '#2A2F40', use: 'paragraph', tok: '--ink-2' },
    { name: 'mute',    sub: 'label',    hex: '#6B7080', use: 'labels · captions', tok: '--mute' },
    { name: 'green',   sub: 'phosphor', hex: '#1A8B5A', use: 'accent (darker for AA contrast on cream)', tok: '--green' },
  ],
};

function Swatch({ s, dark }) {
  return (
    <div className="swatch" style={dark ? {} : { background: '#FFFFFF', borderColor: '#D8D8D0' }}>
      <div className="chip" style={{ background: s.hex }}></div>
      <div className="name" style={dark ? {} : { color: '#0A0B0F' }}>
        {s.name} <span className="sub">{s.sub}</span>
      </div>
      <div className="hex" style={dark ? {} : { color: '#2A2F40' }}>{s.hex}</div>
      <div className="use">{s.use}</div>
    </div>
  );
}

function ColorSection() {
  return (
    <section className="sec" id="color">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">02</span><span>COLOR</span>
            </div>
            <h2 className="sec-title">Dark CRT default.<br/>Light editorial for docs.</h2>
          </div>
          <p className="sec-lead">
            Two themes, one accent system. Dark is the canonical landing surface — phosphor green on near-black. Light mode reuses the same token slots with cream / paper tones for docs, blog, and print. Accent colors (amber / violet / red) keep the same hex in both modes; only the green dims slightly for AA contrast on cream.
          </p>
        </div>

        <div className="color-row">
          <div className="palette">
            <div className="ptitle">
              <span>DARK — CANONICAL</span>
              <span className="acc">9 tokens · default</span>
            </div>
            <div className="swatch-grid">
              {PALETTE.dark.map((s) => <Swatch key={s.name} s={s} dark />)}
            </div>
          </div>
          <div className="palette" style={{ background: '#F4F4EE', borderColor: '#D8D8D0' }}>
            <div className="ptitle" style={{ color: '#6B7080' }}>
              <span>LIGHT — DOCS · PRINT</span>
              <span className="acc" style={{ color: '#1A8B5A' }}>9 tokens · override</span>
            </div>
            <div className="swatch-grid">
              {PALETTE.light.map((s) => <Swatch key={s.name} s={s} dark={false} />)}
            </div>
          </div>
        </div>

        <div className="palette">
          <div className="ptitle">
            <span>ACCENT — SHARED ACROSS THEMES</span>
            <span className="acc">5 tokens · semantic</span>
          </div>
          <div className="swatch-grid" style={{ gridTemplateColumns: '1fr 1fr', display: 'grid', gap: 8 }}>
            {PALETTE.accent.map((s) => <Swatch key={s.name} s={s} dark />)}
          </div>
        </div>

        <div className="sec-head" style={{ marginTop: 56, marginBottom: 24, gridTemplateColumns: '280px 1fr' }}>
          <div>
            <div className="sec-label"><span className="num">·</span><span>CSS TOKENS</span></div>
            <h3 style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 22, margin: '14px 0 0' }}>tokens.css contract.</h3>
          </div>
          <p className="sec-lead">
            All themes expose the same variable names. <code style={{color:'var(--green)'}}>--green</code> means "primary accent" regardless of theme. Light mode swaps values, never adds new tokens. This is what makes the Tweaks light/dark toggle a one-class flip.
          </p>
        </div>

        <div className="tokens">
          <div className="tok-row head">
            <span>CSS VAR</span><span>DARK</span><span>LIGHT</span><span>USE</span>
          </div>
          {[
            ['--bg', '#0A0B0F', '#F4F4EE', 'page background'],
            ['--bg-2', '#0F1116', '#ECECE5', 'panel · card surface'],
            ['--panel', '#151821', '#FFFFFF', 'raised tile'],
            ['--line', '#1E2230', '#D8D8D0', 'default border · grid lines'],
            ['--line-2', '#2A2F40', '#C2C2BA', 'strong border'],
            ['--ink', '#E6E8EF', '#0A0B0F', 'headings · emphasis'],
            ['--ink-2', '#B4B8C5', '#2A2F40', 'body paragraph'],
            ['--mute', '#6B7080', '#6B7080', 'labels · captions'],
            ['--mute-2', '#4A4F60', '#9095A2', 'whisper / disabled'],
            ['--green', '#46E49E', '#1A8B5A', 'primary accent'],
            ['--green-dim', '#2A8F62', '#46E49E', 'accent secondary'],
            ['--amber', '#F2B544', '#F2B544', 'pricing badge · warn'],
            ['--violet', '#8B5CF6', '#8B5CF6', 'Plus tier · Dialogic'],
            ['--red', '#E44C4C', '#E44C4C', 'destructive · LOCKED'],
          ].map(([v, d, l, u]) => (
            <div className="tok-row" key={v}>
              <span className="var">{v}</span>
              <span className="val">{d}</span>
              <span className="light">{l}</span>
              <span className="use">{u}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section: 03 — Typography
// ============================================================
function TypeSection() {
  return (
    <section className="sec" id="type">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">03</span><span>TYPOGRAPHY</span>
            </div>
            <h2 className="sec-title">Four families.<br/>Each does one job.</h2>
          </div>
          <p className="sec-lead">
            Space Grotesk for everything display (H1–H4, lockups, pricing). JetBrains Mono for body, labels, UI chrome, kickers — the lived-in "this is a tool" voice. IBM Plex Mono for code blocks (more open `0` and `l`, fewer ambiguities). Pretendard for Korean — same rhythm and weight progression so KO/EN sit side-by-side without re-grading.
          </p>
        </div>

        <div className="type-grid" style={{ marginBottom: 32 }}>
          <div className="type-card">
            <div className="type-meta"><span>SPACE GROTESK · DISPLAY</span><span className="acc">600 · variable</span></div>
            <div className="type-sample">
              <h1>The meta engine.</h1>
              <h2>Hooks. Thirty-five.</h2>
              <h3>What breaks.</h3>
              <p style={{ marginTop: 14, color: 'var(--mute)' }}>headings · marketing · pricing · titles</p>
            </div>
          </div>

          <div className="type-card">
            <div className="type-meta"><span>JETBRAINS MONO · UI</span><span className="acc">400 · 500 · 600</span></div>
            <div className="type-sample">
              <p className="mono-body" style={{ fontSize: 22, color: 'var(--ink)' }}>// the game knows.</p>
              <p className="mono-body">Parabreak is a runtime layer that gives your characters access to things outside the game — the save file, the menu, the player's last session.</p>
              <p className="mono-body" style={{ color: 'var(--mute)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 14 }}>
                LABELS · KICKERS · ANNOTATIONS · BUTTONS
              </p>
            </div>
          </div>

          <div className="type-card">
            <div className="type-meta"><span>IBM PLEX MONO · CODE</span><span className="acc">400 · 500</span></div>
            <div className="type-sample">
              <div className="codeblock" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
{`{`}<br/>
{`  "type": `}<span style={{color:'var(--green)'}}>"save_delete"</span>,<br/>
{`  "slot": `}<span style={{color:'var(--violet)'}}>0</span>,<br/>
{`  "mark_persistent": `}<span style={{color:'var(--violet)'}}>true</span>,<br/>
{`}`}
              </div>
              <p className="mono-body" style={{ color: 'var(--mute)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 14 }}>
                JSON BLOCKS · INLINE CODE · TERMINAL
              </p>
            </div>
          </div>

          <div className="type-card">
            <div className="type-meta"><span>PRETENDARD · KOREAN</span><span className="acc">400 · 500 · 600</span></div>
            <div className="type-sample">
              <div className="kr" style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.04em', color: 'var(--ink)', lineHeight: 1.15 }}>
                한국에서 만든 메타 게임을 위해.
              </div>
              <div className="kr-sub" style={{ marginTop: 8 }}>
                parabreak는 한글 자모 단위 text_corrupt를 1순위로 지원합니다.
              </div>
              <p className="mono-body" style={{ color: 'var(--mute)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 14, fontFamily: 'var(--f-mono)' }}>
                KOREAN COPY · DOCS · FESTIVAL
              </p>
            </div>
          </div>
        </div>

        <div className="sec-head" style={{ marginTop: 0, marginBottom: 24, gridTemplateColumns: '280px 1fr' }}>
          <div>
            <div className="sec-label"><span className="num">·</span><span>SCALE</span></div>
            <h3 style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 22, margin: '14px 0 0' }}>Type scale.</h3>
          </div>
          <p className="sec-lead">
            Major-third ratio (1.25) for display, fixed steps for UI. Korean h1 / h2 keep the same px but tighten line-height to 1.15 (vs 1.0) to breathe with Hangul's taller character box.
          </p>
        </div>

        <div className="type-scale">
          <div className="row head">
            <span>TOKEN</span><span>SIZE</span><span>LS · LH</span><span>SAMPLE</span>
          </div>
          {[
            ['h1', '88 / 64', '-0.045em · 0.96', 'The meta engine.', 'display'],
            ['h2', '56 / 44', '-0.035em · 1.05', 'Four kinds of seam.', 'display'],
            ['h3', '28 / 22', '-0.02em · 1.2', 'Lines change while the player reads.', 'display'],
            ['h4', '22 / 18', '-0.01em · 1.3', 'Meta moments are one-offs.', 'display'],
            ['body', '15', '0 · 1.55', 'Parabreak exposes the seams as first-class hooks.', 'mn'],
            ['mono', '13', '0 · 1.55', 'res://addons/parabreak', 'mn'],
            ['label', '11', '0.2em · 1.5', '// READ-ONLY', 'mn'],
            ['micro', '10', '0.2em · 1.4', 'V0.1 · PUBLIC ALPHA', 'mn'],
            ['kr-h2', '56 / 38', '-0.04em · 1.15', '한국에서 만든 메타 게임.', 'kr'],
            ['kr-body', '15', '0 · 1.7', '한글 narration · 자모 단위 text_corrupt 지원', 'kr'],
          ].map(([lab, sz, ls, ex, fam]) => (
            <div className="row" key={lab}>
              <span className="lab">{lab}</span>
              <span className="sz">{sz}px</span>
              <span className="ls">{ls}</span>
              <span className={"ex " + (fam === 'mn' ? 'mn' : fam === 'kr' ? 'kr' : '')}>{ex}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section: 04 — Spacing
// ============================================================
function SpaceSection() {
  return (
    <section className="sec" id="space">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">04</span><span>SPACING</span>
            </div>
            <h2 className="sec-title">Four-base scale.<br/>Section rhythm.</h2>
          </div>
          <p className="sec-lead">
            Spacing is a 4px base with a doubling-after-16px progression. Section padding is 96px top/bottom on desktop, 60px on phone. Container max-width 1240px, padding 24px (20px mobile). Use the named tokens — never type raw px in components.
          </p>
        </div>

        <div className="space-grid">
          <div className="space-scale">
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.2em', color: 'var(--mute)', textTransform: 'uppercase', marginBottom: 18, display: 'flex', justifyContent: 'space-between' }}>
              <span>SPACING SCALE</span><span style={{ color: 'var(--green)' }}>10 steps · 4–128px</span>
            </div>
            {[
              ['--s1', 4],   ['--s2', 8],   ['--s3', 12],
              ['--s4', 16],  ['--s5', 24],  ['--s6', 32],
              ['--s7', 48],  ['--s8', 64],  ['--s9', 96],
              ['--s10', 128],
            ].map(([v, px]) => (
              <div className="row" key={v}>
                <span className="var">{v}</span>
                <span className="px">{px}px</span>
                <span className="bar" style={{ width: px + 'px' }}></span>
              </div>
            ))}
          </div>

          <div>
            <div className="layout-card">
              <h4><span className="acc">LAYOUT</span> · container</h4>
              <div className="layout-diag">
                <div className="container-line">
                  <p>container content · max 1240px · pad 24px (mobile 20px)</p>
                </div>
              </div>
              <div className="note">
                One container width across the site. Within it, content lives on a 12-col implied grid; we use flex / grid with explicit <code style={{color:'var(--green)'}}>gap</code> rather than per-column tracks for resilience.
              </div>
            </div>

            <div className="layout-card" style={{ marginTop: 16 }}>
              <h4><span className="acc">RHYTHM</span> · section padding</h4>
              <div style={{ display: 'grid', gap: 8, fontFamily: 'var(--f-mono)', fontSize: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--green)' }}>section · default</span><span style={{ color: 'var(--ink-2)' }}>96px top/bot</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--green)' }}>section · phone</span><span style={{ color: 'var(--ink-2)' }}>60px top/bot</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--green)' }}>card · default</span><span style={{ color: 'var(--ink-2)' }}>28px / 24px</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--green)' }}>grid gap · default</span><span style={{ color: 'var(--ink-2)' }}>24px · 0px on shared-border cards</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--green)' }}>inline gap · default</span><span style={{ color: 'var(--ink-2)' }}>10–14px</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section: 05 — Components
// ============================================================
function ComponentsSection() {
  return (
    <section className="sec" id="comp">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">05</span><span>COMPONENTS</span>
            </div>
            <h2 className="sec-title">A small kit.<br/>Used a lot.</h2>
          </div>
          <p className="sec-lead">
            Buttons, sticker pills, kickers, code blocks. That's most of it. Cards are framed with a thin 1px border and a 28px header strip (dot + name + meta) — anywhere we show structured content. Keep the kit small so the brand stays recognizable.
          </p>
        </div>

        <div className="comp-grid">
          {/* Buttons */}
          <div className="comp-card">
            <div className="meta-line"><span>BUTTONS · 3 VARIANTS</span><span className="acc">primary · default · ghost</span></div>
            <div className="btn-row">
              <a className="btn primary" href="#" onClick={(e) => e.preventDefault()}>Install <span className="arrow">→</span></a>
              <a className="btn" href="#" onClick={(e) => e.preventDefault()}>See all 35 hooks</a>
              <a className="btn ghost" href="#" onClick={(e) => e.preventDefault()}>Read docs</a>
            </div>
            <div className="btn-row" style={{ marginTop: 18 }}>
              <a className="btn primary" style={{ width: '100%', justifyContent: 'center' }} href="#" onClick={(e) => e.preventDefault()}>Buy Plus · $69 <span className="arrow">→</span></a>
            </div>
            <div style={{ marginTop: 18, fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--mute)', lineHeight: 1.6 }}>
              13px / 0.05em / uppercase. 14×22 padding default. Primary is filled phosphor green on near-black. Ghost has no border — for tertiary actions inside dense layouts.
            </div>
          </div>

          {/* Sticker pills */}
          <div className="comp-card">
            <div className="meta-line"><span>STICKER PILLS</span><span className="acc">trust signals · sub copy</span></div>
            <div className="sticker-row">
              <div className="sticker-pill"><span className="dot"></span>Break the fourth wall · commercially</div>
              <div className="sticker-pill"><span className="dot amber"></span>Your player deleted their save</div>
              <div className="sticker-pill dialogic"><span className="dot violet"></span>Compatible with <b>Dialogic 2</b></div>
              <div className="sticker-pill"><span className="dot red"></span>locked · FLAG_PLAYER_NOTICED</div>
            </div>
            <div style={{ marginTop: 18, fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--mute)', lineHeight: 1.6 }}>
              10px / 0.16em / uppercase. 5×10 padding. Dot color is semantic: green = primary, amber = time/warn, violet = Plus / Dialogic, red = locked / destruct.
            </div>
          </div>

          {/* Kickers */}
          <div className="comp-card">
            <div className="meta-line"><span>KICKERS · SECTION LABELS</span><span className="acc">site-wide section header</span></div>
            <div className="kicker-row">
              <div className="kicker"><span className="line"></span><span className="num">01</span><span>WHAT IS PARABREAK</span></div>
              <div className="kicker"><span className="line"></span><span className="num">03</span><span>35 HOOKS</span></div>
              <div className="kicker"><span className="line"></span><span className="num">04</span><span>한국 시장 신호</span></div>
            </div>
            <div style={{ marginTop: 18, fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--mute)', lineHeight: 1.6 }}>
              11px / 0.3em / uppercase. 24px green line + green numbered prefix. Sits 28px above the section heading. Korean kickers use the same dim but Pretendard font.
            </div>
          </div>

          {/* Code block */}
          <div className="comp-card">
            <div className="meta-line"><span>CODE BLOCK · JSON</span><span className="acc">scenario format</span></div>
            <div className="codeblock">
{`{`}<br/>
{`  `}<span className="k">"type"</span>: <span className="s">"shader_effect"</span>,<br/>
{`  `}<span className="k">"effect"</span>: <span className="s">"scanline"</span>,<br/>
{`  `}<span className="k">"intensity"</span>: <span className="n">0.45</span>,<br/>
{`  `}<span className="k">"duration"</span>: <span className="n">1.5</span>{`,`}<br/>
{`}  `}<span className="c">// 1 of 35 typed blocks</span>
            </div>
            <div style={{ marginTop: 18, fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--mute)', lineHeight: 1.6 }}>
              IBM Plex Mono 12px. Tokens: green keys, amber strings, violet numbers / bools, mute comments. No syntax highlighting library — colorize at render with simple regex.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section: 06 — Voice
// ============================================================
function VoiceSection() {
  return (
    <section className="sec" id="voice">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">06</span><span>VOICE</span>
            </div>
            <h2 className="sec-title">Plain. Slightly menacing.<br/>Always specific.</h2>
          </div>
          <p className="sec-lead">
            Parabreak's tone is a tool that knows what it's for. We don't write hype, but we don't write neutral either — every line should sound like it's been used. Korean and English share the same posture, not the same idiom. Translate the <i>feel</i>, not the words.
          </p>
        </div>

        <div className="voice-matrix" style={{ marginBottom: 32 }}>
          <div className="row head">
            <span>AXIS</span><span>YES</span><span>NO</span>
          </div>
          {[
            ['register', 'craftsperson · dry · specific', 'marketing · "delight" · vague'],
            ['authority', "tells you what's locked", 'asks permission · "powered by"'],
            ['humor', 'wry · meta-aware · earned', 'memes · references · winks'],
            ['certainty', 'admits the small print', 'overpromises · disclaimers'],
            ['korean', 'short · spoken · tightened', 'literal EN→KO machine tone'],
            ['hype', 'a single hard noun verbs the line', 'three adjectives in a row'],
          ].map(([k, y, n]) => (
            <div className="row" key={k}>
              <span className="lab">{k}</span>
              <span className="y">{y}</span>
              <span className="n">{n}</span>
            </div>
          ))}
        </div>

        <div className="voice-grid">
          <div className="voice-card">
            <div className="vstamp">// YES</div>
            <h4>Hero subhead</h4>
            <div className="quote">
              Parabreak is a runtime layer that gives your characters access to the things outside the game — the save file, the menu, the player's last session, the system clock.
              <span className="src">landing · §1 hero</span>
            </div>
            <p>One concrete list. No "revolutionize." The first noun ("runtime layer") tells you what it is in two words.</p>
          </div>

          <div className="voice-card bad">
            <div className="vstamp">// NO</div>
            <h4>Hero subhead (rewritten badly)</h4>
            <div className="quote">
              Unlock the next generation of immersive meta-narrative experiences with parabreak — the revolutionary engine that empowers your players.
              <span className="src">— what we are not</span>
            </div>
            <p>"Unlock · next generation · revolutionary · empowers" — four marketing tells in one sentence. Says nothing concrete. Erase.</p>
          </div>

          <div className="voice-card">
            <div className="vstamp">// YES</div>
            <h4>한국어 lead</h4>
            <div className="quote ko">
              메타 게임의 임팩트는 "개발자가 나를 본다"는 감각에서 옵니다. 그 감각은 번역체에서 절반쯤 죽습니다.
              <span className="src">landing · §4 dev note</span>
            </div>
            <p>구어체 + 단언 + 짧은 두 문장. 영어 카피의 길이를 직번역하지 않고, 한국어 호흡에 맞게 끊었음.</p>
          </div>

          <div className="voice-card bad">
            <div className="vstamp">// NO</div>
            <h4>한국어 lead (번역체)</h4>
            <div className="quote ko">
              Parabreak는 전례 없는 게임 개발 경험을 통해 당신의 플레이어가 진정으로 의식되는 순간을 가능하게 합니다.
              <span className="src">— 직역 톤</span>
            </div>
            <p>"전례 없는 · 진정으로 의식되는 순간을 가능하게" — 영어 마케팅 어법 그대로 옮긴 톤. 한국어 호흡 0, 신뢰 0.</p>
          </div>
        </div>

        <div className="sec-head" style={{ marginTop: 56, marginBottom: 24, gridTemplateColumns: '280px 1fr' }}>
          <div>
            <div className="sec-label"><span className="num">·</span><span>RULES</span></div>
            <h3 style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 22, margin: '14px 0 0' }}>Six rules.</h3>
          </div>
          <p className="sec-lead">
            Apply in order. If a line fails any of them, rewrite — don't add a disclaimer.
          </p>
        </div>

        <div style={{ border: '1px solid var(--line)', background: 'var(--bg-2)' }}>
          {[
            ["No verbs we wouldn't say at a desk.", "\"empower\", \"unlock\", \"revolutionize\", \"transform\". If you'd be embarrassed to say it to another engineer, don't write it."],
            ["One concrete noun per claim.", "If we can't point at the thing (save file, JSON block, menu button), the line is hot air."],
            ["The narrator can be wry, never smug.", "We're amused that the engine notices you. We are not amused at the player. Distinction matters."],
            ["Admit the corner.", "\"$49 now. $69 after launch.\" \"Open source core. Paid blocks for the rare stuff.\" State the trade — don't hide it."],
            ["Korean is its own copy, not a translation.", "Write the KR line in Korean from the brief, not from the EN final. Same posture, different idiom."],
            ["When in doubt, cut.", "A blank space says more than filler. The landing already over-explains; trust the visuals."],
          ].map(([t, d], i) => (
            <div key={i} style={{
              padding: '20px 24px',
              borderBottom: i < 5 ? '1px solid var(--line)' : 'none',
              display: 'grid',
              gridTemplateColumns: '40px 1fr',
              gap: 20,
              alignItems: 'baseline',
            }}>
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.18em', color: 'var(--green)' }}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <div style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 17, color: 'var(--ink)', letterSpacing: '-0.015em', marginBottom: 6 }}>{t}</div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6 }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Doc header + footer
// ============================================================
function DocHead() {
  return (
    <header className="doc-head">
      <div className="doc-head-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <BFM size={28} stroke={8} />
          <span className="word">para<span className="br">break</span></span>
        </div>
        <span className="title">// BRAND SYSTEM · <span className="acc">v1.0</span></span>
        <nav className="doc-toc">
          <a href="#logo">01 Logo</a>
          <a href="#color">02 Color</a>
          <a href="#type">03 Type</a>
          <a href="#space">04 Space</a>
          <a href="#comp">05 Components</a>
          <a href="#voice">06 Voice</a>
        </nav>
      </div>
    </header>
  );
}

function DocFoot() {
  return (
    <footer className="doc-foot">
      <span>// brand system v1.0 · 2026 · </span><span className="acc">parabreak — the meta engine for Godot</span>
      <div style={{ marginTop: 18 }}>
        <a href="landing.html">→ landing</a>
        <a href="logo-r2.html">→ logo refinement</a>
        <a href="logos.html">→ logo concepts</a>
      </div>
    </footer>
  );
}

// ============================================================
// App
// ============================================================
function App() {
  return (
    <>
      <DocHead />
      <LogoSection />
      <ColorSection />
      <TypeSection />
      <SpaceSection />
      <ComponentsSection />
      <VoiceSection />
      <DocFoot />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
