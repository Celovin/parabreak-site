/* global React, ReactDOM */
const { useState } = React;

function BFM({ size = 26, stroke = 8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M 12 12 L 12 88 L 88 88 L 88 56" stroke="#E6E8EF" strokeWidth={stroke} strokeLinecap="square" strokeLinejoin="miter"/>
      <g transform="translate(8 -4) rotate(-3 50 30)">
        <path d="M 12 12 L 88 12 L 88 56" stroke="#46E49E" strokeWidth={stroke} strokeLinecap="square" strokeLinejoin="miter"/>
      </g>
      <rect x="84" y="48" width="3" height="3" fill="#46E49E"/>
      <rect x="78" y="52" width="2" height="2" fill="#46E49E" fillOpacity="0.6"/>
      <rect x="72" y="46" width="2" height="2" fill="#46E49E" fillOpacity="0.4"/>
    </svg>
  );
}

function ScaledViewport({ width, height, scale, children }) {
  return (
    <div className="viewport" style={{ width: width * scale, height: height * scale }}>
      <div className="ruler top">{width} × {height} px · scale {Math.round(scale * 100)}%</div>
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width, height }}>
        {children}
      </div>
    </div>
  );
}

// ============================================================
// MAIN capsule · 616 × 353
// ============================================================
function CapsuleMain() {
  return (
    <div className="export cap-main" style={{ width: 616, height: 353 }}>
      <div className="grid-bg"></div>

      <div className="left">
        <div className="label"><span className="ln"></span><span className="num">·</span><span>parabreak</span></div>
        <div className="lockup">
          <BFM size={68} stroke={6}/>
          <div className="word">para<span className="br">break</span></div>
        </div>
        <div className="h1">The meta engine for <span style={{color:'#46E49E'}}>Godot</span>.</div>
        <div className="tag"><span className="acc">/</span> 35 typed blocks · 3 tiers</div>
        <div className="pills">
          <span className="pill"><span className="dot"></span>v0.1 alpha</span>
          <span className="pill"><span className="dot"></span>MIT core</span>
          <span className="pill"><span className="dot"></span>Dialogic 2</span>
        </div>
      </div>

      <div className="scene">
        <div className="head">
          <span className="dot"></span>
          <span>scenario.json</span>
          <span className="right">block 4/6</span>
        </div>
        <div className="line">
          the dialogue <span className="strike">types itself</span> <span className="new">writes itself</span>.
        </div>
        <div className="json">
          <span className="k">"type"</span>: <span className="s">"text_corrupt"</span>,<br/>
          <span className="k">"mode"</span>: <span className="s">"scramble_chars"</span>
        </div>
      </div>

      <div className="corner"><span className="acc">//</span> parabreak.dev</div>
    </div>
  );
}

// ============================================================
// SMALL capsule · 462 × 174
// ============================================================
function CapsuleSmall() {
  return (
    <div className="export cap-small" style={{ width: 462, height: 174 }}>
      <div className="grid-bg"></div>

      <div className="left">
        <div className="label"><span className="ln"></span><span className="num">·</span><span>v0.1 · godot 4.x</span></div>
        <div className="lockup">
          <BFM size={48} stroke={7}/>
          <div className="word">para<span className="br">break</span></div>
        </div>
        <div className="tag"><span className="acc">/</span> META ENGINE · MIT CORE</div>
      </div>

      <div className="right">
        <div className="num">35<span className="total">/ blocks</span></div>
        <div className="num-cap"><span className="acc">//</span> typed JSON</div>
      </div>
    </div>
  );
}

// ============================================================
// LIBRARY capsule · 600 × 900
// ============================================================
function CapsuleLibrary() {
  return (
    <div className="export cap-lib" style={{ width: 600, height: 900 }}>
      <div className="grid-bg"></div>

      <div className="chrome">
        <span className="lights"><span></span><span></span><span></span></span>
        <span className="file">// library · steam</span>
        <span className="right">v0.1 · <span className="acc">35 blocks</span></span>
      </div>

      <div className="center">
        <BFM size={300} stroke={6}/>
        <div className="lockup">
          <div className="word">para<span className="br">break</span></div>
          <div className="tag">/ THE META ENGINE <span className="acc">·</span> GODOT 4.X</div>
        </div>

        <div className="meta-stack">
          <div className="row"><span className="k">// core</span><span className="v"><span className="acc">13</span> blocks · MIT</span></div>
          <div className="row"><span className="k">// hooks</span><span className="v"><span className="acc">8</span> reactive · $49</span></div>
          <div className="row"><span className="k">// plus</span><span className="v"><span className="acc">14</span> advanced · $69</span></div>
          <div className="row"><span className="k">// total</span><span className="v"><span className="acc">35</span> typed JSON blocks</span></div>
        </div>
      </div>

      <div className="bot">
        <span className="dot"></span>
        <span>PRICES RISE AFTER STEAM LAUNCH</span>
        <span className="right">parabreak.dev <span className="acc">·</span> alpha</span>
      </div>
    </div>
  );
}

// ============================================================
// Section 01 — Main capsule
// ============================================================
function Section01() {
  const scale = 1.0;
  return (
    <section className="sec" id="main">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">01</span><span>MAIN CAPSULE</span>
            </div>
            <h2 className="sec-title">616 × 353.<br/>The store-page hero.</h2>
          </div>
          <p className="sec-lead">
            The capsule Steam shows on the front page, browse rows, and the product page header. Most readers see only this. Composition: lockup + H1 on the left, scenario beat on the right — same dialogue self-edit moment as the OG image, locally readable at 616 wide.
          </p>
        </div>

        <div className="asset-card">
          <div className="asset-meta">
            <div>
              <h3>parabreak-capsule-main.png</h3>
              <div className="specs">
                <span>616 × 353 PX</span>
                <span>·</span>
                <span className="acc">CRT GREEN</span>
                <span>·</span>
                <span>STORE FRONT · BROWSE · HEADER</span>
              </div>
            </div>
            <div className="actions">
              <a href="steam.html?solo=main" target="_blank">open 100% →</a>
            </div>
          </div>
          <ScaledViewport width={616} height={353} scale={scale}>
            <CapsuleMain />
          </ScaledViewport>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section 02 — Small capsule
// ============================================================
function Section02() {
  return (
    <section className="sec" id="small">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">02</span><span>SMALL CAPSULE</span>
            </div>
            <h2 className="sec-title">462 × 174.<br/>Search results · queue lists.</h2>
          </div>
          <p className="sec-lead">
            Very wide, very short. No room for hero comp — just the lockup and one stat. Composition: lockup left, 35-block hero number right. Reads as a row item, not a poster.
          </p>
        </div>

        <div className="asset-card">
          <div className="asset-meta">
            <div>
              <h3>parabreak-capsule-small.png</h3>
              <div className="specs">
                <span>462 × 174 PX</span>
                <span>·</span>
                <span className="acc">CRT GREEN</span>
                <span>·</span>
                <span>SEARCH · QUEUE · LIST ROW</span>
              </div>
            </div>
            <div className="actions">
              <a href="steam.html?solo=small" target="_blank">open 100% →</a>
            </div>
          </div>
          <ScaledViewport width={462} height={174} scale={1.0}>
            <CapsuleSmall />
          </ScaledViewport>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section 03 — Library capsule (vertical)
// ============================================================
function Section03() {
  return (
    <section className="sec" id="library">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">03</span><span>LIBRARY CAPSULE</span>
            </div>
            <h2 className="sec-title">600 × 900.<br/>Library grid · vertical.</h2>
          </div>
          <p className="sec-lead">
            The capsule users see <i>after</i> they own it — Steam library grid, "ready to play" rows, Steam Deck home. Vertical, big mark up top, tier breakdown in the middle, "prices rise" badge bar at the bottom (same as itch.io covers).
          </p>
        </div>

        <div className="asset-card">
          <div className="asset-meta">
            <div>
              <h3>parabreak-capsule-library.png</h3>
              <div className="specs">
                <span>600 × 900 PX</span>
                <span>·</span>
                <span className="acc">CRT GREEN</span>
                <span>·</span>
                <span>LIBRARY GRID · STEAM DECK</span>
              </div>
            </div>
            <div className="actions">
              <a href="steam.html?solo=library" target="_blank">open 100% →</a>
            </div>
          </div>
          <ScaledViewport width={600} height={900} scale={0.55}>
            <CapsuleLibrary />
          </ScaledViewport>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section 04 — In-context store mock
// ============================================================
function Section04() {
  return (
    <section className="sec" id="context">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">04</span><span>IN CONTEXT</span>
            </div>
            <h2 className="sec-title">How they sit in the Steam UI.</h2>
          </div>
          <p className="sec-lead">
            Three storefront placements at native size. Main capsule in the "Recommended" carousel, small capsule in a search result row, library capsule in the vertical grid. None of these are pixel-perfect Steam — they're enough to test reading.
          </p>
        </div>

        <div className="asset-card" style={{ padding: 0 }}>
          <div className="store-mock">
            <div className="header">
              <div className="logo">STEAM</div>
              <div className="nav">
                <span>STORE</span><span>LIBRARY</span><span>COMMUNITY</span><span>PROFILE</span>
              </div>
            </div>

            <div className="row-section">
              <h4>Recommended · Engines</h4>
              <div className="row">
                <CapsuleMain />
              </div>
            </div>

            <div className="row-section">
              <h4>Search results · "godot meta"</h4>
              <div className="small-result">
                <CapsuleSmall />
                <div className="info">
                  <div className="title">parabreak — the meta engine for Godot</div>
                  <div className="sub">Development tool · v0.1 alpha · MIT core + paid tiers</div>
                </div>
                <div className="price">$49</div>
              </div>
            </div>

            <div className="row-section">
              <h4>Your Library</h4>
              <div className="lib-row">
                <div className="lib-item">
                  <div className="ph" style={{ width: 200, height: 300 }}>// placeholder</div>
                  <div className="title">Some Game</div>
                  <div className="sub">Last played 3d ago</div>
                </div>
                <div className="lib-item">
                  <div style={{ width: 200, height: 300, overflow: 'hidden' }}>
                    <div style={{ transform: 'scale(0.333)', transformOrigin: 'top left', width: 600, height: 900 }}>
                      <CapsuleLibrary />
                    </div>
                  </div>
                  <div className="title">parabreak</div>
                  <div className="sub">Tool · installed today</div>
                </div>
                <div className="lib-item">
                  <div className="ph" style={{ width: 200, height: 300 }}>// placeholder</div>
                  <div className="title">Another Game</div>
                  <div className="sub">Last played 1mo ago</div>
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
// Section 05 — Export
// ============================================================
function Section05() {
  return (
    <section className="sec" id="export">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">05</span><span>EXPORT</span>
            </div>
            <h2 className="sec-title">Three PNGs.<br/>Solo pages at native size.</h2>
          </div>
          <p className="sec-lead">
            Steam upload requires PNG or JPG, sRGB, no transparency. The solo URLs render the body at exact pixel size — OS-screenshot and you're done. Or use the DevTools snippet to save all three at once.
          </p>
        </div>

        <div className="export-card">
          <h4>Solo capture URLs</h4>
          <div className="row"><span className="name">parabreak-capsule-main.png · 616 × 353</span><a href="steam.html?solo=main" target="_blank">open →</a></div>
          <div className="row"><span className="name">parabreak-capsule-small.png · 462 × 174</span><a href="steam.html?solo=small" target="_blank">open →</a></div>
          <div className="row"><span className="name">parabreak-capsule-library.png · 600 × 900</span><a href="steam.html?solo=library" target="_blank">open →</a></div>
        </div>

        <div className="export-card">
          <h4>Bulk DevTools capture</h4>
          <div style={{
            background: 'var(--bg)', border: '1px solid var(--line)', padding: '14px 16px',
            fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: 'var(--ink-2)', whiteSpace: 'pre',
            lineHeight: 1.65, overflowX: 'auto',
          }}>
{`const snap = async (sel, name, w, h) => {
  const el = document.querySelector(sel);
  el.style.transform = "none";
  await new Promise(r => setTimeout(r, 60));
  const dataUrl = await htmlToImage.toPng(el, {
    pixelRatio: 1, cacheBust: true, width: w, height: h
  });
  const a = document.createElement("a");
  a.href = dataUrl; a.download = name; a.click();
};
await snap("#main .cap-main", "parabreak-capsule-main.png", 616, 353);
await snap("#small .cap-small", "parabreak-capsule-small.png", 462, 174);
await snap("#library .cap-lib", "parabreak-capsule-library.png", 600, 900);`}
          </div>
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
          <BFM size={26} stroke={8}/>
          <span className="word">para<span className="br">break</span></span>
        </div>
        <span className="title">// STEAM CAPSULES · <span className="acc">P3.3 · 3 sizes</span></span>
        <nav className="doc-toc">
          <a href="#main">01 Main</a>
          <a href="#small">02 Small</a>
          <a href="#library">03 Library</a>
          <a href="#context">04 Context</a>
          <a href="#export">05 Export</a>
        </nav>
      </div>
    </header>
  );
}

function Foot() {
  return (
    <footer className="doc-foot">
      <span>// steam capsules v1.0 · </span><span className="acc">main · small · library · 1 tone</span>
      <div style={{ marginTop: 18 }}>
        <a href="brand.html">→ brand</a>
        <a href="store.html">→ asset library</a>
        <a href="youtube.html">→ youtube</a>
        <a href="social.html">→ social</a>
      </div>
    </footer>
  );
}

function App() {
  const solo = new URLSearchParams(window.location.search).get('solo');
  if (solo === 'main') return <CapsuleMain />;
  if (solo === 'small') return <CapsuleSmall />;
  if (solo === 'library') return <CapsuleLibrary />;
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
