/* global React, ReactDOM */
const { useState, useRef, useEffect } = React;

// ============================================================
// Atom: Broken Frame Mark (inline, locked geometry)
// ============================================================
function BFM({ size = 96, accent = '#46E49E', ink = '#E6E8EF', stroke = 6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M 12 12 L 12 88 L 88 88 L 88 56" stroke={ink} strokeWidth={stroke} strokeLinecap="square" strokeLinejoin="miter" />
      <g transform="translate(8 -4) rotate(-3 50 30)">
        <path d="M 12 12 L 88 12 L 88 56" stroke={accent} strokeWidth={stroke} strokeLinecap="square" strokeLinejoin="miter" />
      </g>
      <rect x="84" y="48" width="3" height="3" fill={accent} />
      <rect x="78" y="52" width="2" height="2" fill={accent} fillOpacity="0.6" />
      <rect x="72" y="46" width="2" height="2" fill={accent} fillOpacity="0.4" />
    </svg>
  );
}

// ============================================================
// Scaled viewport — show the asset at scaled-down size
// while the inner .export stays at exact target px.
// This is what makes a screenshot of `.export` come out
// at real 1200/512/etc size.
// ============================================================
function ScaledViewport({ width, height, scale, children, safeRing = false }) {
  return (
    <div
      className="viewport"
      style={{
        width: width * scale,
        height: height * scale,
      }}
    >
      <div className="ruler top">{width} × {height} px · scale {Math.round(scale * 100)}%</div>
      {safeRing && <div className="ruler safe">safe-ring 80% · 410×410</div>}
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: width,
          height: height,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ============================================================
// OG 1200×630 — Hero-style composition
// ============================================================
function OGImage() {
  return (
    <div className="export scanlines og" style={{ width: 1200, height: 630 }}>
      <div className="chrome">
        <span className="lights"><span></span><span></span><span></span></span>
        <span className="file">// scene_03 · scenario.json</span>
        <span className="right">v0.1 · godot 4.x · <span className="acc">35 hooks</span></span>
      </div>

      <div className="left">
        <div className="lockup">
          <BFM size={68} stroke={6} />
          <span className="word">para<span className="br">break</span></span>
        </div>
        <h1>
          The meta engine<br/>for <span className="br">Godot</span>.
        </h1>
        <p className="sub">
          A runtime layer that gives your characters access to the things outside the game — the save file, the menu, the player's last session. <b>Build games that notice you back.</b>
        </p>
        <div className="stickers">
          <span className="pill"><span className="dot"></span>v0.1 · public alpha</span>
          <span className="pill"><span className="dot"></span>MIT core · commercial OK</span>
        </div>
      </div>

      <div className="right">
        <div className="frame-bar">
          <span className="lights"><span></span><span></span><span></span></span>
          <span className="file">// scenario.json</span>
          <span className="step">block 4/6 · REWRITE</span>
        </div>

        <div className="npc-row">
          <div className="portrait"></div>
          <div style={{ flex: 1 }}>
            <div className="npc-name">ARCHIVIST <span className="m">// flag: NOTICED=true</span></div>
            <div className="body">
              the dialogue <span className="strike">types itself out</span> <span className="new">writes itself</span>. <span className="new">you noticed.</span><span className="caret"></span>
            </div>
          </div>
        </div>

        <div className="blocks">
{`{`}<br/>
{`  `}<span className="k">"type"</span>: <span className="s">"text_corrupt"</span>,<br/>
{`  `}<span className="k">"mode"</span>: <span className="s">"scramble_chars"</span>,<br/>
{`  `}<span className="k">"target"</span>: <span className="s">"next_block"</span> <span className="c">// 1 of 35</span><br/>
{`}`}
        </div>
      </div>

      <div className="corner bl">
        <span className="acc">//</span> parabreak.dev
      </div>
      <div className="corner br">
        the engine notices.
      </div>
    </div>
  );
}

// ============================================================
// Twitter 1200×628 — Alternate, dialogue-forward
// ============================================================
function TwitterImage() {
  return (
    <div className="export scanlines tw" style={{ width: 1200, height: 628 }}>
      <div className="top-bar">
        <BFM size={28} stroke={8} />
        <span className="word">para<span className="br">break</span></span>
        <span className="meta">// THE META ENGINE · <span className="acc">v0.1</span></span>
      </div>

      <div className="center">
        <div>
          <h1>
            Your player <span className="strike">finished</span><br/>
            <span className="new">skipped</span> the tutorial.<br/>
            Your game <span className="new">noticed</span>.
          </h1>
          <p className="lead">
            <b>Parabreak</b> exposes the seams — save files, dialogue, the menu, the camera — as <b>typed JSON blocks</b> your story can react to. <span style={{ color: '#46E49E' }}>35 hooks</span> across 3 tiers, native to Godot 4.x.
          </p>
        </div>

        <div className="right">
          <div className="scene">
            <div className="top">
              <span className="dot"></span>
              <span>scene_03 · NPC.dialogue</span>
              <span className="right">block 5/6 · BREAK</span>
            </div>
            <div className="narr">// narrator: he wasn't supposed to know that.</div>
            <div className="npc">ARCHIVIST · awareness: high</div>
            <div className="line">
              You skipped it. <span className="new">I noticed.</span>
            </div>
          </div>

          <div className="stickers">
            <span className="pill"><span className="dot"></span>Godot 4.x</span>
            <span className="pill"><span className="dot"></span>MIT core</span>
            <span className="pill" style={{ borderColor: '#8B5CF6', color: '#B4B8C5' }}>
              <span className="dot" style={{ background: '#8B5CF6' }}></span>
              Dialogic 2 ready
            </span>
          </div>
        </div>
      </div>

      <div className="bot-bar">
        <span className="label">//</span>
        <span>break the fourth wall · commercially</span>
        <span className="right">parabreak.dev · <span className="acc">35 typed blocks</span></span>
      </div>
    </div>
  );
}

// ============================================================
// Discord 512×512 — Lockup B stacked, circle-safe
// ============================================================
function DiscordImage({ showSafe = false }) {
  return (
    <div className={"export dc " + (showSafe ? 'show-safe' : '')} style={{ width: 512, height: 512, background: '#0A0B0F' }}>
      <div className="safe-ring"></div>
      <div className="corner-tl">// SERVER</div>
      <div className="lockup">
        <BFM size={172} stroke={7} />
        <span className="word">para<span className="br">break</span></span>
        <span className="caption">v0.1 <span className="acc">·</span> godot 4.x</span>
      </div>
      <div className="corner-br">
        <span className="acc">//</span> meta engine
      </div>
    </div>
  );
}

// ============================================================
// Sections
// ============================================================
function Section01() {
  const previewW = 1100; // available width inside .sec-inner ~ 1256 - padding
  const scale = previewW / 1200;
  return (
    <section className="sec" id="og">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">01</span><span>OG IMAGE</span>
            </div>
            <h2 className="sec-title">Open Graph · 1200×630.<br/>The default share card.</h2>
          </div>
          <p className="sec-lead">
            Used by Facebook, LinkedIn, iMessage, Slack, Discord embeds, and most aggregators. Two-column composition: lockup + H1 + sub-copy on the left, dialogue self-edit scene + a real scenario JSON block on the right. Subtle CRT scanlines and vignette.
          </p>
        </div>

        <div className="asset-card">
          <div className="asset-meta">
            <div>
              <h3>parabreak-og.png</h3>
              <div className="specs">
                <span>1200 × 630 PX</span>
                <span>·</span>
                <span className="acc">CRT GREEN</span>
                <span>·</span>
                <span>1.91 : 1</span>
              </div>
            </div>
            <div className="actions">
              <a href="#" onClick={(e) => { e.preventDefault(); document.getElementById('og-asset').scrollIntoView({ behavior: 'smooth', block: 'center' }); }}>view 100%</a>
              <a href="#export-info">export →</a>
            </div>
          </div>

          <ScaledViewport width={1200} height={630} scale={scale}>
            <div id="og-asset"><OGImage /></div>
          </ScaledViewport>
        </div>
      </div>
    </section>
  );
}

function Section02() {
  const previewW = 1100;
  const scale = previewW / 1200;
  return (
    <section className="sec" id="twitter">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">02</span><span>TWITTER / X CARD</span>
            </div>
            <h2 className="sec-title">Twitter card · 1200×628.<br/>Dialogue-forward variant.</h2>
          </div>
          <p className="sec-lead">
            Same width, 2px shorter than OG (Twitter's recommended summary_large_image is 1200×628). Composition diverges deliberately — H1 leads with the "your player <s>finished</s> skipped" line so the preview reads as a meta-fiction moment, not a product card. Used as <code style={{color:'var(--green)'}}>twitter:image</code> override.
          </p>
        </div>

        <div className="asset-card">
          <div className="asset-meta">
            <div>
              <h3>parabreak-twitter.png</h3>
              <div className="specs">
                <span>1200 × 628 PX</span>
                <span>·</span>
                <span className="acc">CRT GREEN</span>
                <span>·</span>
                <span>summary_large_image</span>
              </div>
            </div>
            <div className="actions">
              <a href="#twitter-asset" onClick={(e) => { e.preventDefault(); document.getElementById('tw-asset').scrollIntoView({ behavior: 'smooth', block: 'center' }); }}>view 100%</a>
              <a href="#export-info">export →</a>
            </div>
          </div>

          <ScaledViewport width={1200} height={628} scale={scale}>
            <div id="tw-asset"><TwitterImage /></div>
          </ScaledViewport>
        </div>
      </div>
    </section>
  );
}

function Section03() {
  return (
    <section className="sec" id="discord">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">03</span><span>DISCORD SERVER ICON</span>
            </div>
            <h2 className="sec-title">Discord · 512×512.<br/>Bleed-safe square + circle.</h2>
          </div>
          <p className="sec-lead">
            Discord renders the server icon as a <b>rounded square (16px radius) in the active state</b> and a <b>full circle when inactive</b>. The lockup sits inside a 410×410 safe-ring (~80%) so the wordmark survives the circle crop. Dark bg with bleed so no edge artifact at the corners.
          </p>
        </div>

        <div className="asset-card">
          <div className="asset-meta">
            <div>
              <h3>parabreak-discord.png</h3>
              <div className="specs">
                <span>512 × 512 PX</span>
                <span>·</span>
                <span className="acc">CRT GREEN</span>
                <span>·</span>
                <span>circle-safe</span>
              </div>
            </div>
            <div className="actions">
              <a href="#" onClick={(e) => e.preventDefault()}>view 100%</a>
              <a href="#export-info">export →</a>
            </div>
          </div>

          <div className="dc-row">
            <div>
              <ScaledViewport width={512} height={512} scale={1.0}>
                <div id="dc-asset"><DiscordImage /></div>
              </ScaledViewport>
              <div className="lbl"><span className="acc">/</span> ACTIVE — square · 16px radius</div>
            </div>
            <div>
              <div className="viewport" style={{ width: 512, height: 512, borderRadius: '50%', overflow: 'hidden' }}>
                <DiscordImage />
              </div>
              <div className="lbl"><span className="acc">/</span> INACTIVE — circle crop</div>
            </div>
            <div>
              <ScaledViewport width={512} height={512} scale={0.5} safeRing>
                <DiscordImage showSafe />
              </ScaledViewport>
              <div className="lbl"><span className="acc">/</span> SAFE-RING — 410×410 (80%)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section04() {
  return (
    <section className="sec" id="export-info">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">04</span><span>EXPORT</span>
            </div>
            <h2 className="sec-title">How to ship the bitmaps.</h2>
          </div>
          <p className="sec-lead">
            The HTML above renders each asset at exact pixel size. To export, capture <code style={{color:'var(--green)'}}>.export</code> at 1:1 (the <code style={{color:'var(--green)'}}>transform: scale</code> wrapper is purely visual). Two recommended paths:
          </p>
        </div>

        <div className="export-grid">
          <div className="export-card">
            <h4>Path A — Headless capture</h4>
            <p>Open <code>social.html</code> in a real browser, run the snippet in DevTools console. Saves three PNGs to disk. Requires no extra tooling.</p>
            <div style={{
              background: 'var(--bg)', border: '1px solid var(--line)', padding: '14px 16px',
              fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--ink-2)', whiteSpace: 'pre',
              lineHeight: 1.65, overflowX: 'auto',
            }}>
{`// in DevTools console:
const snap = async (sel, name) => {
  const el = document.querySelector(sel);
  el.style.transform = "none";  // remove preview scale
  await new Promise(r => setTimeout(r, 60));
  // use any html-to-image lib of choice, e.g.
  const dataUrl = await htmlToImage.toPng(el, {
    pixelRatio: 1, cacheBust: true
  });
  const a = document.createElement("a");
  a.href = dataUrl; a.download = name; a.click();
};
await snap("#og-asset > .export", "parabreak-og.png");
await snap("#tw-asset > .export", "parabreak-twitter.png");
await snap("#dc-asset > .export", "parabreak-discord.png");`}
            </div>
          </div>

          <div className="export-card">
            <h4>Path B — Direct browser screenshot</h4>
            <p>Open each preview in its own page at real size (no scale wrapper) and use the OS / browser screenshot tool. Best for one-offs or when you need to adjust per-platform.</p>
            <div style={{ display: 'grid', gap: 10, marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '8px 12px', border: '1px solid var(--line)', background: 'var(--bg)' }}>
                <span style={{ color: 'var(--green)' }}>parabreak-og.png</span>
                <a href="social-og.html" target="_blank" style={{ color: 'var(--green)', borderBottom: '1px solid var(--line-2)' }}>open 1200×630 →</a>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '8px 12px', border: '1px solid var(--line)', background: 'var(--bg)' }}>
                <span style={{ color: 'var(--green)' }}>parabreak-twitter.png</span>
                <a href="social-twitter.html" target="_blank" style={{ color: 'var(--green)', borderBottom: '1px solid var(--line-2)' }}>open 1200×628 →</a>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '8px 12px', border: '1px solid var(--line)', background: 'var(--bg)' }}>
                <span style={{ color: 'var(--green)' }}>parabreak-discord.png</span>
                <a href="social-discord.html" target="_blank" style={{ color: 'var(--green)', borderBottom: '1px solid var(--line-2)' }}>open 512×512 →</a>
              </div>
            </div>
            <p style={{ marginTop: 0, fontSize: 12, color: 'var(--mute)' }}>Each standalone page opens with no chrome, body at the asset's exact dimensions. Crop the screenshot to the asset's pixel size — no scaling needed.</p>
          </div>
        </div>

        <div className="export-card" style={{ marginTop: 22 }}>
          <h4>HTML head — meta tags for each platform</h4>
          <p>Add to <code>parabreak.dev</code> head once the PNGs are exported and hosted at <code>/assets/social/</code>.</p>
          <div style={{
            background: 'var(--bg)', border: '1px solid var(--line)', padding: '14px 16px',
            fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--ink-2)', whiteSpace: 'pre',
            lineHeight: 1.65, overflowX: 'auto',
          }}>
{`<!-- Open Graph -->
<meta property="og:title" content="parabreak — the meta engine for Godot" />
<meta property="og:description" content="A runtime layer that gives your characters access to the things outside the game." />
<meta property="og:image" content="https://parabreak.dev/assets/social/parabreak-og.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://parabreak.dev" />

<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="parabreak" />
<meta name="twitter:description" content="Break the fourth wall. Commercially." />
<meta name="twitter:image" content="https://parabreak.dev/assets/social/parabreak-twitter.png" />`}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Expose for solo export pages
// ============================================================
window.__BFM = BFM;
window.__OGImage = OGImage;
window.__TwitterImage = TwitterImage;
window.__DiscordImage = DiscordImage;

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
        <span className="title">// SOCIAL ASSETS · <span className="acc">P2.3</span></span>
        <nav className="doc-toc">
          <a href="#og">01 OG</a>
          <a href="#twitter">02 Twitter</a>
          <a href="#discord">03 Discord</a>
          <a href="#export-info">04 Export</a>
        </nav>
      </div>
    </header>
  );
}

function Foot() {
  return (
    <footer className="doc-foot">
      <span>// social assets · v1.0 · </span><span className="acc">3 surfaces · 1 tone · 0 hype</span>
      <div style={{ marginTop: 18 }}>
        <a href="brand.html">→ brand system</a>
        <a href="logo-export.html">→ logo export</a>
        <a href="landing.html">→ landing</a>
      </div>
    </footer>
  );
}

function App() {
  // Solo-export mode: if URL ?solo=og|twitter|discord, render that asset only,
  // full-bleed with no chrome.
  const solo = new URLSearchParams(window.location.search).get('solo');
  if (solo === 'og') return <OGImage />;
  if (solo === 'twitter') return <TwitterImage />;
  if (solo === 'discord') return <DiscordImage />;
  return (
    <>
      <Head />
      <Section01 />
      <Section02 />
      <Section03 />
      <Section04 />
      <Foot />
    </>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
