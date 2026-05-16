/* global React, ReactDOM */
const { useState } = React;

// ============================================================
// Atom — BFM
// ============================================================
function BFM({ size = 26, stroke = 8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M 12 12 L 12 88 L 88 88 L 88 56" stroke="#E6E8EF" strokeWidth={stroke} strokeLinecap="square" strokeLinejoin="miter" />
      <g transform="translate(8 -4) rotate(-3 50 30)">
        <path d="M 12 12 L 88 12 L 88 56" stroke="#46E49E" strokeWidth={stroke} strokeLinecap="square" strokeLinejoin="miter" />
      </g>
      <rect x="84" y="48" width="3" height="3" fill="#46E49E" />
      <rect x="78" y="52" width="2" height="2" fill="#46E49E" fillOpacity="0.6" />
      <rect x="72" y="46" width="2" height="2" fill="#46E49E" fillOpacity="0.4" />
    </svg>
  );
}

// ============================================================
// Color preview swatch list
// ============================================================
const SWATCHES = [
  { v: '--color-bg',        h: '#0A0B0F' },
  { v: '--color-bg-2',      h: '#0F1116' },
  { v: '--color-panel',     h: '#151821' },
  { v: '--color-line',      h: '#1E2230' },
  { v: '--color-line-2',    h: '#2A2F40' },
  { v: '--color-ink',       h: '#E6E8EF' },
  { v: '--color-ink-2',     h: '#B4B8C5' },
  { v: '--color-mute',      h: '#6B7080' },
  { v: '--color-mute-2',    h: '#4A4F60' },
  { v: '--color-green',     h: '#46E49E' },
  { v: '--color-green-dim', h: '#2A8F62' },
  { v: '--color-amber',     h: '#F2B544' },
  { v: '--color-violet',    h: '#8B5CF6' },
  { v: '--color-red',       h: '#E44C4C' },
];

// ============================================================
// File content — embedded as template strings so we can render
// them in a code block. Single source of truth is /assets/*.
// We mirror the content here for the showcase only.
// ============================================================
const TOKENS_CSS_SNIPPET = `/* parabreak / tokens.css — v1.0 */

:root,
.theme-dark {
  /* ---------- color · surfaces ---------- */
  --color-bg:        #0A0B0F;
  --color-bg-2:      #0F1116;
  --color-panel:     #151821;

  /* ---------- color · text ---------- */
  --color-ink:       #E6E8EF;
  --color-ink-2:     #B4B8C5;
  --color-mute:      #6B7080;
  --color-mute-2:    #4A4F60;

  /* ---------- color · accent (semantic) ---------- */
  --color-green:     #46E49E;
  --color-amber:     #F2B544;
  --color-violet:    #8B5CF6;
  --color-red:       #E44C4C;

  /* ---------- type · families ---------- */
  --font-display:  'Space Grotesk', sans-serif;
  --font-mono:     'JetBrains Mono', monospace;
  --font-mono-2:   'IBM Plex Mono', monospace;
  --font-kr:       'Pretendard', sans-serif;

  /* ---------- spacing · 4-base scale ---------- */
  --s-1:  4px;   --s-2:  8px;   --s-3:  12px;
  --s-4:  16px;  --s-5:  24px;  --s-6:  32px;
  --s-7:  48px;  --s-8:  64px;  --s-9:  96px;
  --s-10: 128px;

  /* ---------- motion ---------- */
  --motion-fast: 120ms;
  --motion-base: 200ms;
  --motion-slow: 320ms;
}

.theme-light {
  --color-bg:    #F4F4EE;
  --color-bg-2:  #ECECE5;
  --color-panel: #FFFFFF;
  --color-ink:   #0A0B0F;
  --color-ink-2: #2A2F40;
  --color-green: #1A8B5A;
  /* amber/violet/red unchanged */
}

/* ... full file: 9 type sizes, 10 spacing steps, easings,
   radii, scanline + vignette effects, etc.
   download .css for the complete contract. */
`;

const APP_CSS_SNIPPET = `/* parabreak / app.css — Tailwind 4 entry */

@import "./tokens.css";
@import "tailwindcss";

@theme inline {
  /* color — exposes bg-bg / text-ink / border-line / etc. */
  --color-bg:     var(--color-bg);
  --color-bg-2:   var(--color-bg-2);
  --color-ink:    var(--color-ink);
  --color-ink-2:  var(--color-ink-2);
  --color-mute:   var(--color-mute);
  --color-green:  var(--color-green);
  --color-amber:  var(--color-amber);
  --color-violet: var(--color-violet);
  --color-red:    var(--color-red);

  /* font — font-display / font-mono / font-kr */
  --font-display: var(--font-display);
  --font-mono:    var(--font-mono);
  --font-kr:      var(--font-kr);

  /* spacing — p-1..p-10 / gap-1..10 etc. */
  --spacing-1:  var(--s-1);
  --spacing-2:  var(--s-2);
  --spacing-3:  var(--s-3);
  --spacing-4:  var(--s-4);
  --spacing-5:  var(--s-5);
  --spacing-6:  var(--s-6);
  --spacing-7:  var(--s-7);
  --spacing-8:  var(--s-8);
  --spacing-9:  var(--s-9);
  --spacing-10: var(--s-10);

  /* container — max-width default for Tailwind <Container /> */
  --container-max-width: var(--container-max);
}
`;

const TW_CONFIG_SNIPPET = `// parabreak / tailwind.config.js — JS fallback

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg:        "var(--color-bg)",
        "bg-2":    "var(--color-bg-2)",
        ink:       "var(--color-ink)",
        "ink-2":   "var(--color-ink-2)",
        mute:      "var(--color-mute)",
        green:     "var(--color-green)",
        amber:     "var(--color-amber)",
        violet:    "var(--color-violet)",
        red:       "var(--color-red)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        mono:    ["var(--font-mono)"],
        kr:      ["var(--font-kr)"],
      },
      fontSize: {
        h1: ["var(--text-h1)", { lineHeight: "var(--lh-h1)", letterSpacing: "var(--ls-h1)" }],
        h2: ["var(--text-h2)", { lineHeight: "var(--lh-h2)", letterSpacing: "var(--ls-h2)" }],
        // ...
      },
      spacing: {
        s1: "var(--s-1)", s2: "var(--s-2)",
        s3: "var(--s-3)", s4: "var(--s-4)",
        // ...
      },
    },
  },
};
`;

// Simple syntax highlighter for the embedded snippets
function highlight(src, lang) {
  const lines = src.split('\n');
  return lines.map((ln, i) => {
    // tokenize
    const parts = [];
    let last = 0;
    const patterns = [
      [/(\/\*[\s\S]*?\*\/|\/\/[^\n]*|#[^\n]*)/g, 'c'],
      [/("[^"]*")/g, 's'],
      [/(--[a-zA-Z][-a-zA-Z0-9]*)/g, 'k'],
      [/\b(import|export|default|var|true|false|null)\b/g, 'b'],
      [/\b(\d+(?:px|ms|em|rem|%)?|#[0-9A-Fa-f]+)\b/g, 'n'],
      [/(@[a-z]+)/g, 'tag'],
    ];
    const tokens = [];
    patterns.forEach(([re, cls]) => {
      let m;
      while ((m = re.exec(ln)) !== null) {
        tokens.push({ start: m.index, end: m.index + m[0].length, text: m[0], cls });
      }
    });
    tokens.sort((a, b) => a.start - b.start);
    // resolve overlaps — keep earliest
    const resolved = [];
    let cursor = 0;
    for (const t of tokens) {
      if (t.start >= cursor) { resolved.push(t); cursor = t.end; }
    }
    let pos = 0;
    const out = [];
    let key = 0;
    for (const t of resolved) {
      if (t.start > pos) out.push(<span key={key++}>{ln.slice(pos, t.start)}</span>);
      out.push(<span key={key++} className={t.cls}>{t.text}</span>);
      pos = t.end;
    }
    if (pos < ln.length) out.push(<span key={key++}>{ln.slice(pos)}</span>);
    return <div key={i}>{out.length ? out : <>&nbsp;</>}</div>;
  });
}

// ============================================================
// File card
// ============================================================
function FileCard({ name, size, dl, snippet, lang, note }) {
  return (
    <div className="file-card">
      <div className="hdr">
        <span className="name">{name}</span>
        <span className="size">{size}</span>
        <a className="dl" href={dl} download>↓ download</a>
      </div>
      <div className="body">{highlight(snippet, lang)}</div>
      {note && <div style={{ padding: '10px 18px', borderTop: '1px solid var(--line)', fontSize: 11, color: 'var(--mute)', letterSpacing: '0.08em' }}>{note}</div>}
    </div>
  );
}

// ============================================================
// Section 01 — Three handoff files
// ============================================================
function Section01() {
  return (
    <section className="sec" id="files">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">01</span><span>HANDOFF FILES</span>
            </div>
            <h2 className="sec-title">Three files.<br/>One source of truth.</h2>
          </div>
          <p className="sec-lead">
            <code style={{color:'var(--green)'}}>tokens.css</code> is canonical — every value lives there. <code style={{color:'var(--green)'}}>app.css</code> is the Tailwind 4 entry point that re-exports those vars via <code style={{color:'var(--green)'}}>@theme inline</code>. <code style={{color:'var(--green)'}}>tailwind.config.js</code> is a 1:1 JS fallback for tools that need a config object (older VS Code plugins, preset systems). Same numbers, same names — kept in lock-step.
          </p>
        </div>

        <FileCard
          name="assets/tokens.css"
          size="5.0 KB · 200 lines"
          dl="assets/tokens.css"
          snippet={TOKENS_CSS_SNIPPET}
          note="// excerpt — full file has 9 type sizes, 10 spacing steps, easings, radii, scanline + vignette effects. Download for the complete contract."
        />

        <FileCard
          name="assets/app.css"
          size="4.1 KB · 130 lines · Tailwind 4 entry"
          dl="assets/app.css"
          snippet={APP_CSS_SNIPPET}
          note="// drop this in src/styles/app.css, reference once from index.html. The @theme inline directive reads existing CSS vars — light/dark switch is a class flip on <html>, zero rebuild."
        />

        <FileCard
          name="assets/tailwind.config.js"
          size="3.4 KB · JS fallback"
          dl="assets/tailwind.config.js"
          snippet={TW_CONFIG_SNIPPET}
          note="// optional — only use if a tool in your stack needs the JS config (some VS Code Intellisense, older presets). Tailwind 4 itself prefers @theme inline in app.css."
        />
      </div>
    </section>
  );
}

// ============================================================
// Section 02 — Live color swatches
// ============================================================
function Section02() {
  return (
    <section className="sec" id="colors">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">02</span><span>LIVE PALETTE</span>
            </div>
            <h2 className="sec-title">14 color tokens.<br/>Every one in this page.</h2>
          </div>
          <p className="sec-lead">
            Each swatch below is rendered directly from <code style={{color:'var(--green)'}}>var(--color-*)</code> — what you see is what production gets. Light-mode preview at the bottom shows the same names with swapped values.
          </p>
        </div>

        <div className="swatch-row">
          {SWATCHES.map((s) => (
            <div className="sw" key={s.v}>
              <div className="chip" style={{ background: s.h }}></div>
              <div className="meta">
                <span className="var">{s.v}</span>
                <span className="hex">{s.h}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="panes">
          <div className="pane">
            <div className="hdr"><span>DARK · CANONICAL</span><span className="acc">.theme-dark · default</span></div>
            <div className="body" style={{ padding: 24, background: '#0A0B0F' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ color: '#E6E8EF', fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: 28, letterSpacing: '-0.025em' }}>The meta engine.</div>
                <div style={{ color: '#B4B8C5', fontSize: 13 }}>Runtime layer that exposes the seams — save files, dialogue, menus.</div>
                <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                  <span style={{ background: '#46E49E', color: '#0A0B0F', padding: '8px 14px', fontFamily: 'JetBrains Mono', fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Install →</span>
                  <span style={{ border: '1px solid #2A2F40', color: '#E6E8EF', padding: '8px 14px', fontFamily: 'JetBrains Mono', fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase' }}>See 35 hooks</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pane">
            <div className="hdr"><span>LIGHT · DOCS</span><span className="acc">.theme-light · class swap</span></div>
            <div className="body" style={{ padding: 24, background: '#F4F4EE' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ color: '#0A0B0F', fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: 28, letterSpacing: '-0.025em' }}>The meta engine.</div>
                <div style={{ color: '#2A2F40', fontSize: 13 }}>Runtime layer that exposes the seams — save files, dialogue, menus.</div>
                <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                  <span style={{ background: '#1A8B5A', color: '#F4F4EE', padding: '8px 14px', fontFamily: 'JetBrains Mono', fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Install →</span>
                  <span style={{ border: '1px solid #C2C2BA', color: '#0A0B0F', padding: '8px 14px', fontFamily: 'JetBrains Mono', fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase' }}>See 35 hooks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section 03 — Tailwind vs vanilla CSS
// ============================================================
function Section03() {
  return (
    <section className="sec" id="parity">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">03</span><span>USAGE PARITY</span>
            </div>
            <h2 className="sec-title">Tailwind class<br/>= CSS var. Either works.</h2>
          </div>
          <p className="sec-lead">
            The same component, written two ways. Pick whichever your team prefers — they emit identical pixels because both resolve to the same <code style={{color:'var(--green)'}}>var(--color-*)</code> at runtime.
          </p>
        </div>

        <div className="panes" style={{ marginBottom: 24 }}>
          <div className="pane">
            <div className="hdr"><span>TAILWIND</span><span className="acc">JSX</span></div>
            <div className="body code">
{`<div className=`}<span className="v">"bg-bg-2 border border-line p-5"</span>{`>`}{'\n'}
{`  <div className=`}<span className="v">"text-ink font-display text-h3"</span>{`>`}{'\n'}
{`    Hooks. Thirty-five.`}{'\n'}
{`  </div>`}{'\n'}
{`  <div className=`}<span className="v">"text-ink-2 font-mono text-mono mt-3"</span>{`>`}{'\n'}
{`    Save tampering, dialogue rewrites...`}{'\n'}
{`  </div>`}{'\n'}
{`  <button className=`}<span className="v">"mt-5 bg-green text-bg px-5 py-3"</span>{`>`}{'\n'}
{`    Install`}{'\n'}
{`  </button>`}{'\n'}
{`</div>`}
            </div>
          </div>

          <div className="pane">
            <div className="hdr"><span>VANILLA CSS</span><span className="acc">tokens.css vars</span></div>
            <div className="body code">
<span className="c">{`/* card */`}</span>{'\n'}
<span className="tag">.card</span>{` { `}{'\n'}
{`  `}<span className="k">background</span>: <span className="v">var(--color-bg-2)</span>;{'\n'}
{`  `}<span className="k">border</span>: <span className="v">1px solid var(--color-line)</span>;{'\n'}
{`  `}<span className="k">padding</span>: <span className="v">var(--s-5)</span>;{'\n'}
{`}`}{'\n'}
<span className="tag">.card h3</span>{` { `}{'\n'}
{`  `}<span className="k">color</span>: <span className="v">var(--color-ink)</span>;{'\n'}
{`  `}<span className="k">font-family</span>: <span className="v">var(--font-display)</span>;{'\n'}
{`  `}<span className="k">font-size</span>: <span className="v">var(--text-h3)</span>;{'\n'}
{`}`}{'\n'}
<span className="c">{`/* same pixels, same theme-switch */`}</span>
            </div>
          </div>
        </div>

        <div className="pane" style={{ background: 'var(--bg)' }}>
          <div className="hdr"><span>RENDERED</span><span className="acc">// both inputs paint this</span></div>
          <div className="body demo" style={{ background: 'var(--bg)' }}>
            <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', padding: 24, maxWidth: 480 }}>
              <div style={{ color: 'var(--ink)', fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: 26, letterSpacing: '-0.02em' }}>Hooks. Thirty-five.</div>
              <div style={{ color: 'var(--ink-2)', fontFamily: 'JetBrains Mono', fontSize: 13, marginTop: 10, lineHeight: 1.55 }}>
                Save tampering, dialogue rewrites, choice locks, menu drift, narrator interruption — each one a typed JSON block.
              </div>
              <div style={{ marginTop: 18, background: 'var(--green)', color: 'var(--bg)', padding: '10px 18px', fontFamily: 'JetBrains Mono', fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'inline-flex', gap: 10 }}>
                Install <span>→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section 04 — Inventory cheat sheet (vanilla → tailwind)
// ============================================================
function Section04() {
  const rows = [
    ['Surfaces', 'color', 'var(--color-bg)', 'bg-bg'],
    ['',        'color', 'var(--color-bg-2)', 'bg-bg-2'],
    ['',        'color', 'var(--color-panel)', 'bg-panel'],
    ['Lines',   'color', 'var(--color-line)', 'border-line'],
    ['',        'color', 'var(--color-line-2)', 'border-line-2'],
    ['Text',    'color', 'var(--color-ink)', 'text-ink'],
    ['',        'color', 'var(--color-ink-2)', 'text-ink-2'],
    ['',        'color', 'var(--color-mute)', 'text-mute'],
    ['Accent',  'color', 'var(--color-green)', 'bg-green / text-green'],
    ['',        'color', 'var(--color-amber)', 'bg-amber / text-amber'],
    ['',        'color', 'var(--color-violet)', 'bg-violet / text-violet'],
    ['',        'color', 'var(--color-red)', 'text-red'],
    ['Display', 'font', 'var(--font-display)', 'font-display'],
    ['Mono',    'font', 'var(--font-mono)', 'font-mono'],
    ['Korean',  'font', 'var(--font-kr)', 'font-kr'],
    ['H1',      'type', 'var(--text-h1)', 'text-h1'],
    ['H2',      'type', 'var(--text-h2)', 'text-h2'],
    ['Body',    'type', 'var(--text-body)', 'text-body'],
    ['Label',   'type', 'var(--text-label)', 'text-label'],
    ['Space 1', 'space', 'var(--s-1) · 4px', 'p-1 / gap-1 / m-1'],
    ['Space 4', 'space', 'var(--s-4) · 16px', 'p-4 / gap-4 / m-4'],
    ['Space 5', 'space', 'var(--s-5) · 24px', 'p-5'],
    ['Space 8', 'space', 'var(--s-8) · 64px', 'p-8'],
    ['Container','layout','var(--container-max) · 1240px', 'max-w-container'],
    ['Motion fast','motion','var(--motion-fast) · 120ms', 'duration-fast'],
  ];
  return (
    <section className="sec" id="cheat">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">04</span><span>CHEAT SHEET</span>
            </div>
            <h2 className="sec-title">Vanilla CSS<br/>↔ Tailwind class.</h2>
          </div>
          <p className="sec-lead">
            Quick reference. Bookmark this — every token has a vanilla name and a Tailwind name, and they always resolve to the same value. Copy the row that fits the file you're in.
          </p>
        </div>

        <div className="inv">
          <div className="row head">
            <span>CATEGORY</span><span>KIND</span><span>VANILLA CSS</span><span>TAILWIND</span>
          </div>
          {rows.map(([cat, kind, css, tw], i) => (
            <div className="row" key={i}>
              <span className="name">{cat || ''}</span>
              <span className="css" style={{color:'var(--mute)', fontSize: 10, letterSpacing: '0.16em', textTransform:'uppercase'}}>{kind}</span>
              <span className="css"><code>{css}</code></span>
              <span className="tw"><code>{tw}</code></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section 05 — Six rules
// ============================================================
function Section05() {
  const RULES = [
    ['Never type a raw color.', 'Always reach for a token. If a value isn\'t in tokens.css and you\'re tempted to type a hex — add it to tokens first, then use it.'],
    ['Light mode is a class flip.', 'Setting <code>class="theme-light"</code> on <html> swaps every var simultaneously. Never write conditional color logic in JS — let CSS do it.'],
    ['Accent = semantic, not decorative.', 'Green is the primary CTA. Amber means time/warn. Violet is Plus / Dialogic. Red is destruct / locked. Don\'t reach for them as flavor.'],
    ['Use named spacing inside components.', 'p-1..p-10 (Tailwind) or var(--s-N) (CSS). Reserve raw px for one-off positioning (absolute offsets, transforms).'],
    ['Square corners by default.', 'radius-0 / radius-1 only. Pill exists for badges and toggle knobs — that\'s it. Rounded corners on cards = brand drift.'],
    ['Sync tokens.css and tailwind.config.js by hand.', 'They\'re kept in lock-step manually. Don\'t auto-generate one from the other; the manual review is the safety net against drift.'],
  ];
  return (
    <section className="sec" id="rules">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">05</span><span>USAGE RULES</span>
            </div>
            <h2 className="sec-title">Six rules.<br/>That's the whole contract.</h2>
          </div>
          <p className="sec-lead">
            If you find yourself wanting to break one, propose a token first. Don't backdoor.
          </p>
        </div>

        <div className="rules">
          {RULES.map(([t, w], i) => (
            <div className="item" key={i}>
              <span className="n">{String(i + 1).padStart(2, '0')}</span>
              <h4>{t}</h4>
              <div className="why" dangerouslySetInnerHTML={{ __html: w }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// App
// ============================================================
function Head() {
  return (
    <header className="doc-head">
      <div className="doc-head-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <BFM size={26} stroke={8} />
          <span className="word">para<span className="br">break</span></span>
        </div>
        <span className="title">// TOKENS HANDOFF · <span className="acc">P2.5</span></span>
        <nav className="doc-toc">
          <a href="#files">01 Files</a>
          <a href="#colors">02 Palette</a>
          <a href="#parity">03 Parity</a>
          <a href="#cheat">04 Cheat sheet</a>
          <a href="#rules">05 Rules</a>
        </nav>
      </div>
    </header>
  );
}

function Foot() {
  return (
    <footer className="doc-foot">
      <span>// tokens v1.0 · </span><span className="acc">3 files · 1 source · 0 drift</span>
      <div style={{ marginTop: 18 }}>
        <a href="brand.html">→ brand system</a>
        <a href="logo-export.html">→ logo</a>
        <a href="social.html">→ social</a>
        <a href="store.html">→ store</a>
        <a href="landing.html">→ landing</a>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <Head />
      <Section01 />
      <Section02 />
      <Section03 />
      <Section04 />
      <Section05 />
      <Foot />
    </>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
