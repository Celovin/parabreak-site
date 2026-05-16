/* global React, ReactDOM */
const { useState } = React;

function BFM({ size = 26, stroke = 8, accent = '#46E49E', ink = '#E6E8EF' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M 12 12 L 12 88 L 88 88 L 88 56" stroke={ink} strokeWidth={stroke} strokeLinecap="square" strokeLinejoin="miter"/>
      <g transform="translate(8 -4) rotate(-3 50 30)">
        <path d="M 12 12 L 88 12 L 88 56" stroke={accent} strokeWidth={stroke} strokeLinecap="square" strokeLinejoin="miter"/>
      </g>
      <rect x="84" y="48" width="3" height="3" fill={accent}/>
      <rect x="78" y="52" width="2" height="2" fill={accent} fillOpacity="0.6"/>
      <rect x="72" y="46" width="2" height="2" fill={accent} fillOpacity="0.4"/>
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
// YouTube banner — 2560 × 1440
// ============================================================
function YouTubeBanner({ showSafe = false }) {
  return (
    <div className={"export yt " + (showSafe ? 'show-safe' : '')} style={{ width: 2560, height: 1440 }}>
      <div className="grid-bg"></div>

      {/* outer top chrome strip (desktop visible only) */}
      <div className="outer-top">
        <span className="lights"><span></span><span></span><span></span></span>
        <span className="file">// scenario.json · v0.1 · godot 4.x</span>
        <span className="right">35 typed blocks · <span className="acc">MIT core</span></span>
      </div>

      {/* left wing — desktop ambient detail (3 tier numbers) */}
      <div className="wing-l">
        <div className="it"><span className="ln"></span><span className="num">13</span><span>core</span></div>
        <div className="it"><span className="ln"></span><span className="num">08</span><span>hooks</span></div>
        <div className="it"><span className="ln"></span><span className="num">14</span><span>plus</span></div>
        <div className="it" style={{ marginTop: 18, color: '#6B7080' }}><span className="ln" style={{background: '#6B7080'}}></span><span>== 35 total</span></div>
      </div>

      {/* right wing — desktop ambient detail */}
      <div className="wing-r">
        <div className="lg">35<span className="total">/ blocks</span></div>
        <div className="sub">// the engine notices</div>
      </div>

      {/* center safe area */}
      <div className="safe">
        <div className="lockup-area">
          <BFM size={300} stroke={6}/>
          <div>
            <div className="word">para<span className="br">break</span></div>
            <div className="tag">/ THE META ENGINE <span className="acc">·</span> GODOT 4.X</div>
          </div>
        </div>

        <div className="meta-stack">
          <div className="row">
            <span className="k">// engine</span>
            <span>runtime layer · <b>not a fork</b></span>
          </div>
          <div className="row">
            <span className="k">// hooks</span>
            <span><span className="acc">35 typed</span> JSON blocks · 3 tiers</span>
          </div>
          <div className="row">
            <span className="k">// license</span>
            <span>MIT core · <b>commercial OK</b></span>
          </div>
          <div className="row">
            <span className="k">// signal</span>
            <span>break the fourth wall <span className="acc">·</span> 商業利用 OK</span>
          </div>
        </div>
      </div>

      {/* outer bottom */}
      <div className="outer-bot">
        <span><span className="acc">//</span> parabreak.dev</span>
        <span className="right">v0.1 public alpha · prices rise after steam launch</span>
      </div>

      {/* safe-area overlays */}
      <div className="avatar-hint"></div>
      <div className="crop-l"></div>
      <div className="crop-r"></div>
    </div>
  );
}

// ============================================================
// Section 01 — Preview
// ============================================================
function Section01({ showSafe, setShowSafe }) {
  const previewW = 1100;
  const scale = previewW / 2560;
  return (
    <section className="sec" id="banner">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">01</span><span>BANNER</span>
            </div>
            <h2 className="sec-title">YouTube channel art.<br/>2560 × 1440 · safe band centered.</h2>
          </div>
          <p className="sec-lead">
            YouTube crops the banner differently on TV (1546×423 center band), mobile (same), and desktop (full bleed). All meaningful content sits inside the centered <span style={{color:'var(--amber)'}}>1546×423</span> safe band. The wings carry ambient detail — visible on desktop only, tolerable to clip elsewhere. Avatar zone (~196×196 circle) is reserved bottom-right, where YouTube places the channel avatar over the banner.
          </p>
        </div>

        <div className="asset-card">
          <div className="asset-meta">
            <div>
              <h3>parabreak-yt-banner.png</h3>
              <div className="specs">
                <span>2560 × 1440 PX</span>
                <span>·</span>
                <span className="acc">CRT GREEN</span>
                <span>·</span>
                <span>SAFE 1546 × 423 CENTER</span>
                <span>·</span>
                <span>AVATAR ~196 BOTTOM-RIGHT</span>
              </div>
            </div>
            <div className="actions">
              <button className={showSafe ? 'on' : ''} onClick={() => setShowSafe(!showSafe)}>
                {showSafe ? 'hide overlays' : 'show safe area'}
              </button>
              <a href="youtube.html?solo=banner" target="_blank">open 100% →</a>
            </div>
          </div>

          <ScaledViewport width={2560} height={1440} scale={scale}>
            <YouTubeBanner showSafe={showSafe} />
          </ScaledViewport>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section 02 — In-context mock
// ============================================================
function Section02() {
  return (
    <section className="sec" id="context">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">02</span><span>IN CONTEXT</span>
            </div>
            <h2 className="sec-title">How it crops in the channel header.</h2>
          </div>
          <p className="sec-lead">
            What the viewer actually sees on a desktop YouTube channel page — banner cropped to the visible band, avatar overlapping bottom-left, channel info row underneath. This is the reading; everything else is bleed.
          </p>
        </div>

        <div className="asset-card" style={{ padding: 0, background: '#0F0F0F' }}>
          <div className="yt-mock">
            <div className="banner-wrap">
              <div className="inner">
                <YouTubeBanner />
              </div>
            </div>
            <div className="channel-row">
              <div className="avatar">
                <BFM size={56} stroke={9}/>
              </div>
              <div className="channel-info">
                <div className="name">parabreak</div>
                <div className="handle">@parabreak · 1.2K subscribers · 4 videos</div>
                <div className="stats">// the meta engine for Godot · MIT core</div>
              </div>
              <div className="subscribe">Subscribe</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section 03 — Export
// ============================================================
function Section03() {
  return (
    <section className="sec" id="export">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">03</span><span>EXPORT</span>
            </div>
            <h2 className="sec-title">One PNG · 2560 × 1440.</h2>
          </div>
          <p className="sec-lead">
            Open the solo URL — body opens at exact pixel size, no chrome. Screenshot, or run the DevTools snippet below to save as PNG directly. YouTube accepts up to 6 MB.
          </p>
        </div>

        <div className="export-card">
          <h4>Solo capture URL</h4>
          <div className="row">
            <span className="name">parabreak-yt-banner.png</span>
            <a href="youtube.html?solo=banner" target="_blank">open · screenshot →</a>
          </div>
          <p style={{ fontSize: 12, color: 'var(--mute)', marginTop: 14 }}>// Body sized to 2560×1440 exactly. OS-screenshot or use html-to-image snippet.</p>
        </div>

        <div className="export-card">
          <h4>DevTools snippet</h4>
          <div style={{
            background: 'var(--bg)', border: '1px solid var(--line)', padding: '14px 16px',
            fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: 'var(--ink-2)', whiteSpace: 'pre',
            lineHeight: 1.65, overflowX: 'auto',
          }}>
{`// open youtube.html?solo=banner in a real browser, run:
const el = document.querySelector('.yt');
const dataUrl = await htmlToImage.toPng(el, {
  pixelRatio: 1, cacheBust: true, width: 2560, height: 1440
});
const a = document.createElement("a");
a.href = dataUrl; a.download = "parabreak-yt-banner.png"; a.click();`}
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
        <span className="title">// YOUTUBE CHANNEL ART · <span className="acc">P3.2</span></span>
        <nav className="doc-toc">
          <a href="#banner">01 Banner</a>
          <a href="#context">02 Context</a>
          <a href="#export">03 Export</a>
        </nav>
      </div>
    </header>
  );
}

function Foot() {
  return (
    <footer className="doc-foot">
      <span>// youtube banner v1.0 · </span><span className="acc">2560 × 1440 · safe band 1546 × 423</span>
      <div style={{ marginTop: 18 }}>
        <a href="brand.html">→ brand</a>
        <a href="social.html">→ social</a>
        <a href="store.html">→ store</a>
        <a href="landing.html">→ landing</a>
      </div>
    </footer>
  );
}

function App() {
  const [showSafe, setShowSafe] = useState(false);
  const solo = new URLSearchParams(window.location.search).get('solo');
  if (solo === 'banner') return <YouTubeBanner />;
  return (
    <>
      <Head />
      <Section01 showSafe={showSafe} setShowSafe={setShowSafe} />
      <Section02 />
      <Section03 />
      <Foot />
    </>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
