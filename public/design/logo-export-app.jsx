/* global React, ReactDOM */
const { useState } = React;

// ============================================================
// Atoms — re-rendered for each context (uses inline SVG so it
// works exactly like the master .svg files)
// ============================================================
function MarkColor({ size = 96, stroke = 6 }) {
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
function MarkMonoBlack({ size = 96, stroke = 6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M 12 12 L 12 88 L 88 88 L 88 56" stroke="#0A0B0F" strokeWidth={stroke} strokeLinecap="square" strokeLinejoin="miter" />
      <g transform="translate(8 -4) rotate(-3 50 30)">
        <path d="M 12 12 L 88 12 L 88 56" stroke="#0A0B0F" strokeWidth={stroke} strokeLinecap="square" strokeLinejoin="miter" />
      </g>
      <rect x="84" y="48" width="3" height="3" fill="#0A0B0F" />
      <rect x="78" y="52" width="2" height="2" fill="#0A0B0F" fillOpacity="0.6" />
      <rect x="72" y="46" width="2" height="2" fill="#0A0B0F" fillOpacity="0.4" />
    </svg>
  );
}
function MarkMonoWhite({ size = 96, stroke = 6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M 12 12 L 12 88 L 88 88 L 88 56" stroke="#FFFFFF" strokeWidth={stroke} strokeLinecap="square" strokeLinejoin="miter" />
      <g transform="translate(8 -4) rotate(-3 50 30)">
        <path d="M 12 12 L 88 12 L 88 56" stroke="#FFFFFF" strokeWidth={stroke} strokeLinecap="square" strokeLinejoin="miter" />
      </g>
      <rect x="84" y="48" width="3" height="3" fill="#FFFFFF" />
      <rect x="78" y="52" width="2" height="2" fill="#FFFFFF" fillOpacity="0.6" />
      <rect x="72" y="46" width="2" height="2" fill="#FFFFFF" fillOpacity="0.4" />
    </svg>
  );
}
// Simplified favicon-32 — heavier stroke, no fragments
function Favi32({ size = 32, bg = null }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={bg ? { background: bg } : {}}>
      <path d="M 14 14 L 14 86 L 86 86 L 86 56" stroke="#E6E8EF" strokeWidth="9" strokeLinecap="square" strokeLinejoin="miter" />
      <g transform="translate(8 -4) rotate(-3 50 30)">
        <path d="M 14 14 L 86 14 L 86 56" stroke="#46E49E" strokeWidth="9" strokeLinecap="square" strokeLinejoin="miter" />
      </g>
    </svg>
  );
}
// Pixel-snapped favicon-16
function Favi16({ size = 16, bg = null }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={bg ? { background: bg } : {}} shapeRendering="crispEdges">
      <path d="M 2 2 L 2 14 L 14 14 L 14 9" stroke="#E6E8EF" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
      <path d="M 3 1 L 15 1 L 15 8" stroke="#46E49E" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}
// Apple touch icon — black bg + mark inset
function AppleTouch({ size = 180 }) {
  const scale = size / 180;
  return (
    <svg width={size} height={size} viewBox="0 0 180 180" fill="none">
      <rect width="180" height="180" fill="#0A0B0F" />
      <g transform="translate(36 36)">
        <path d="M 13 13 L 13 95 L 95 95 L 95 60" stroke="#E6E8EF" strokeWidth="7" strokeLinecap="square" strokeLinejoin="miter" />
        <g transform="translate(9 -4) rotate(-3 54 32)">
          <path d="M 13 13 L 95 13 L 95 60" stroke="#46E49E" strokeWidth="7" strokeLinecap="square" strokeLinejoin="miter" />
        </g>
        <rect x="91" y="52" width="3" height="3" fill="#46E49E" />
        <rect x="84" y="56" width="2" height="2" fill="#46E49E" fillOpacity="0.6" />
        <rect x="77" y="50" width="2" height="2" fill="#46E49E" fillOpacity="0.4" />
      </g>
    </svg>
  );
}

// ============================================================
// Frame shell
// ============================================================
function Frame({ name, meta, footer, bg = 'dark', children }) {
  return (
    <div className={"frame " + (bg === 'light' ? 'lightbg' : '')}>
      <div className="frame-top">
        <span className="dot"></span>
        <span className="name">{name}</span>
        {meta && <span className="meta">{meta}</span>}
      </div>
      <div className="frame-body">{children}</div>
      {footer && <div className="frame-foot">{footer}</div>}
    </div>
  );
}

// ============================================================
// Section 01 — Logo masters
// ============================================================
function Section01() {
  return (
    <section className="sec" id="masters">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">01</span><span>LOGO MASTERS</span>
            </div>
            <h2 className="sec-title">Three SVG masters.<br/>Everything else derives from these.</h2>
          </div>
          <p className="sec-lead">
            One canonical color master (phosphor green + ink) plus two single-color overrides (mono black for light backgrounds, mono white for dark). All three use the same locked geometry from <code style={{color:'var(--green)'}}>brand.html §01</code>. Export to any size by rendering the SVG — never trace bitmaps.
          </p>
        </div>

        <div className="logo-masters">
          <Frame
            name="MASTER · CANONICAL"
            meta="default · color · 100×100"
            footer={<><span>2 colors · #E6E8EF · #46E49E</span><a href="assets/logo-mark-color.svg" download>↓ download .svg</a></>}
          >
            <MarkColor size={140} />
          </Frame>

          <Frame
            name="MASTER · MONO BLACK"
            meta="light backgrounds · press · embossing"
            bg="light"
            footer={<><span>1 color · #0A0B0F on light</span><a href="assets/logo-mark-mono-black.svg" download>↓ download .svg</a></>}
          >
            <MarkMonoBlack size={140} />
          </Frame>

          <Frame
            name="MASTER · MONO WHITE"
            meta="dark backgrounds · video · merch"
            footer={<><span>1 color · #FFFFFF on dark</span><a href="assets/logo-mark-mono-white.svg" download>↓ download .svg</a></>}
          >
            <MarkMonoWhite size={140} />
          </Frame>
        </div>

        <div style={{ marginTop: 28, padding: '18px 22px', border: '1px solid var(--line)', background: 'var(--bg-2)', display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.55 }}>
            <span style={{ color: 'var(--amber)' }}>// rule</span> · 색이 있는 배경 위에는 mono를 쓰세요. canonical color는 #0A0B0F (다크) 또는 #F4F4EE (라이트) 위에서만. 다른 배경에서는 ink/accent 한 톤이 깨집니다.
          </span>
          <span style={{ fontSize: 10, color: 'var(--green)', letterSpacing: '0.18em' }}>BRAND §01 LOGO</span>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section 02 — Favicon scale ladder
// ============================================================
function Section02() {
  return (
    <section className="sec" id="favicon">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">02</span><span>FAVICON SCALE</span>
            </div>
            <h2 className="sec-title">Two SVG variants.<br/>Four bitmap sizes.</h2>
          </div>
          <p className="sec-lead">
            The canonical mark survives down to ~40px before the fragments dissolve. Below that, we ship two hand-tuned simplifications: <b>favicon-32.svg</b> (stroke +50%, fragments removed) and <b>favicon-16.svg</b> (pixel-snapped on the 16px integer grid, no anti-aliasing). Bitmap exports come from the matching SVG, never the canonical master.
          </p>
        </div>

        <div className="favi-scale">
          {[
            { sz: 16,  svg: <Favi16 size={16} />,  role: 'browser tab', src: 'favicon-16.svg' },
            { sz: 32,  svg: <Favi32 size={32} />,  role: 'browser tab @2×', src: 'favicon-32.svg' },
            { sz: 128, svg: <Favi32 size={128} />, role: 'taskbar · launcher', src: 'favicon-32.svg' },
            { sz: 192, svg: <Favi32 size={192} />, role: 'PWA · Android', src: 'icon-192.svg' },
            { sz: 256, svg: <MarkColor size={256} stroke={6} />, role: 'OG · spotlight', src: 'logo-mark-color.svg' },
            { sz: 512, svg: <MarkColor size={512} stroke={6} />, role: 'PWA · iOS · store', src: 'icon-512.svg' },
          ].map(({ sz, svg, role, src }) => (
            <div className="fav" key={sz}>
              <div className="display"><div style={{ width: sz, height: sz, overflow: 'hidden', display: 'grid', placeItems: 'center' }}>{svg}</div></div>
              <div className="size">{sz}<span className="unit">PX</span></div>
              <div className="role"><span className="acc">/</span> {role}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <Frame name="FAVI-16 · PIXEL DETAIL" meta="actual 16×16, scaled 12×" footer={<><span>shapeRendering crispEdges</span><a href="assets/favicon-16.svg" download>↓ .svg</a></>}>
            <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
              <Favi16 size={16} />
              <Favi16 size={192} />
            </div>
          </Frame>
          <Frame name="FAVI-32 · STROKE +50%" meta="actual 32×32, scaled 6×" footer={<><span>no fragments at this size</span><a href="assets/favicon-32.svg" download>↓ .svg</a></>}>
            <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
              <Favi32 size={32} />
              <Favi32 size={192} />
            </div>
          </Frame>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section 03 — In-context mocks
// ============================================================
function Section03() {
  return (
    <section className="sec" id="context">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">03</span><span>IN CONTEXT</span>
            </div>
            <h2 className="sec-title">How the icon reads<br/>in real chrome.</h2>
          </div>
          <p className="sec-lead">
            Three placements that decide whether a favicon works: browser tab (dark + light), macOS dock, iOS home, and Discord server list. The mark survives the rounded-corner mask iOS applies automatically. Discord's server list crops to a 48px circle when inactive — the broken corner reads at that size; the fragments collapse.
          </p>
        </div>

        <div className="mock-grid" style={{ marginBottom: 24 }}>
          <div className="mock-card">
            <div className="label"><span>BROWSER · DARK</span><span className="acc">Chrome / Edge dark mode</span></div>
            <div className="tab-strip">
              <div className="tab active"><Favi16 size={14} /><span className="ttl">parabreak — the meta engine for Godot</span><span className="close">×</span></div>
              <div className="tab"><span style={{ width: 14, height: 14, background: '#444', borderRadius: 2 }}></span><span className="ttl">Godot docs</span><span className="close">×</span></div>
              <div className="tab"><span style={{ width: 14, height: 14, background: '#444', borderRadius: 2 }}></span><span className="ttl">itch.io · dashboard</span><span className="close">×</span></div>
            </div>
            <div className="url-bar">parabreak.dev</div>
          </div>

          <div className="mock-card">
            <div className="label"><span>BROWSER · LIGHT</span><span className="acc">Safari / Firefox light</span></div>
            <div className="tab-strip light">
              <div className="tab active"><Favi16 size={14} /><span className="ttl">parabreak — the meta engine for Godot</span><span className="close">×</span></div>
              <div className="tab"><span style={{ width: 14, height: 14, background: '#bbb', borderRadius: 2 }}></span><span className="ttl">Godot docs</span><span className="close">×</span></div>
              <div className="tab"><span style={{ width: 14, height: 14, background: '#bbb', borderRadius: 2 }}></span><span className="ttl">itch.io · dashboard</span><span className="close">×</span></div>
            </div>
            <div className="url-bar">parabreak.dev</div>
          </div>
        </div>

        <div className="mock-grid" style={{ marginBottom: 24 }}>
          <div className="mock-card">
            <div className="label"><span>MACOS · DOCK</span><span className="acc">52×52 · rounded 11px</span></div>
            <div style={{ display: 'grid', placeItems: 'center', padding: '12px 0' }}>
              <div className="dock">
                <div className="app placeholder"></div>
                <div className="app placeholder"></div>
                <div className="sep"></div>
                <div className="app" style={{ background: '#0A0B0F' }}>
                  <Favi32 size={36} />
                </div>
                <div className="sep"></div>
                <div className="app placeholder"></div>
                <div className="app placeholder"></div>
              </div>
            </div>
          </div>

          <div className="mock-card">
            <div className="label"><span>iOS · HOME</span><span className="acc">Apple touch icon · 52×52 · rounded 12px</span></div>
            <div style={{ display: 'grid', placeItems: 'center', padding: '4px 0' }}>
              <div className="ios-grid" style={{ width: 280 }}>
                <div className="app placeholder"><div className="ic"></div><div className="nm">Notes</div></div>
                <div className="app placeholder"><div className="ic"></div><div className="nm">Music</div></div>
                <div className="app"><div className="ic"><AppleTouch size={52} /></div><div className="nm">parabreak</div></div>
                <div className="app placeholder"><div className="ic"></div><div className="nm">Settings</div></div>
                <div className="app placeholder"><div className="ic"></div><div className="nm">Photos</div></div>
                <div className="app placeholder"><div className="ic"></div><div className="nm">Camera</div></div>
                <div className="app placeholder"><div className="ic"></div><div className="nm">Mail</div></div>
                <div className="app placeholder"><div className="ic"></div><div className="nm">Maps</div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mock-card">
          <div className="label"><span>DISCORD · SERVER LIST</span><span className="acc">48×48 circle · expands on hover</span></div>
          <div style={{ display: 'grid', placeItems: 'center', padding: '8px 0' }}>
            <div className="discord" style={{ width: 90 }}>
              <div className="row">
                <div className="pill"></div>
                <div className="ic placeholder">A</div>
              </div>
              <div className="row">
                <div className="pill"></div>
                <div className="ic placeholder" style={{ background: '#36393F' }}>B</div>
              </div>
              <div className="row active">
                <div className="pill"></div>
                <div className="ic" style={{ background: '#0A0B0F' }}><Favi32 size={32} /></div>
              </div>
              <div className="row">
                <div className="pill"></div>
                <div className="ic placeholder" style={{ background: '#36393F' }}>K</div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 12, fontSize: 11, color: 'var(--mute)', letterSpacing: '0.08em', textAlign: 'center' }}>
            // Active server expands to 16px-rounded square. Mark survives both states because it has no fragments at this size.
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section 04 — HTML manifest tags
// ============================================================
function Section04() {
  return (
    <section className="sec" id="manifest">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">04</span><span>INSTALL</span>
            </div>
            <h2 className="sec-title">HTML head tags<br/>+ web manifest.</h2>
          </div>
          <p className="sec-lead">
            Drop the head snippet into <code style={{color:'var(--green)'}}>parabreak.dev</code> and add <code style={{color:'var(--green)'}}>site.webmanifest</code> to the project root. Modern browsers will pick the SVG; older Safari and Windows fall back to the .ico and PNG. All paths assume the assets sit at <code style={{color:'var(--green)'}}>/assets/</code>.
          </p>
        </div>

        <div className="code-grid">
          <div className="code-card">
            <div className="hdr">
              <span>HTML &lt;head&gt;</span>
              <span className="acc">parabreak.dev · all pages</span>
            </div>
            <div className="body">
{`<`}<span className="tag">link</span> <span className="k">rel</span>=<span className="s">"icon"</span> <span className="k">type</span>=<span className="s">"image/svg+xml"</span>
      <span className="k">href</span>=<span className="s">"/assets/favicon-32.svg"</span> /{`>`}
{`<`}<span className="tag">link</span> <span className="k">rel</span>=<span className="s">"icon"</span> <span className="k">type</span>=<span className="s">"image/svg+xml"</span>
      <span className="k">sizes</span>=<span className="s">"16x16"</span>
      <span className="k">href</span>=<span className="s">"/assets/favicon-16.svg"</span> /{`>`}
{`<`}<span className="tag">link</span> <span className="k">rel</span>=<span className="s">"icon"</span> <span className="k">type</span>=<span className="s">"image/x-icon"</span>
      <span className="k">href</span>=<span className="s">"/favicon.ico"</span> /{`>`}
{`<`}<span className="tag">link</span> <span className="k">rel</span>=<span className="s">"apple-touch-icon"</span>
      <span className="k">sizes</span>=<span className="s">"180x180"</span>
      <span className="k">href</span>=<span className="s">"/assets/apple-touch-icon.png"</span> /{`>`}
{`<`}<span className="tag">link</span> <span className="k">rel</span>=<span className="s">"manifest"</span>
      <span className="k">href</span>=<span className="s">"/site.webmanifest"</span> /{`>`}
{`<`}<span className="tag">meta</span> <span className="k">name</span>=<span className="s">"theme-color"</span>
      <span className="k">content</span>=<span className="s">"#0A0B0F"</span> /{`>`}
            </div>
          </div>

          <div className="code-card">
            <div className="hdr">
              <span>/site.webmanifest</span>
              <span className="acc">PWA · Android · iOS install</span>
            </div>
            <div className="body">
{`{`}
{`  `}<span className="k">"name"</span>: <span className="s">"parabreak"</span>,
{`  `}<span className="k">"short_name"</span>: <span className="s">"parabreak"</span>,
{`  `}<span className="k">"description"</span>:
{`    `}<span className="s">"The meta engine for Godot."</span>,
{`  `}<span className="k">"theme_color"</span>: <span className="s">"#0A0B0F"</span>,
{`  `}<span className="k">"background_color"</span>: <span className="s">"#0A0B0F"</span>,
{`  `}<span className="k">"display"</span>: <span className="s">"standalone"</span>,
{`  `}<span className="k">"icons"</span>: [
{`    {`} <span className="k">"src"</span>: <span className="s">"/assets/icon-192.png"</span>,
{`      `}<span className="k">"sizes"</span>: <span className="s">"192x192"</span>,
{`      `}<span className="k">"type"</span>: <span className="s">"image/png"</span> {`}`},
{`    {`} <span className="k">"src"</span>: <span className="s">"/assets/icon-512.png"</span>,
{`      `}<span className="k">"sizes"</span>: <span className="s">"512x512"</span>,
{`      `}<span className="k">"type"</span>: <span className="s">"image/png"</span> {`}`}
{`  ]`}
{`}`}
            </div>
          </div>
        </div>

        <div className="note-card" style={{ marginTop: 28 }}>
          <div>
            <h4>Generating the .ico + PNG bitmaps</h4>
            <p>The SVG masters are the source of truth. Export bitmaps once per release — the .ico for legacy Windows, PNGs for the PWA manifest and the OG image pipeline.</p>
            <div className="step">
              <span className="n">01</span>
              <span className="b">Open <code>assets/favicon-32.svg</code> in a vector tool. Export at 16, 32, 48 → combine into <code>favicon.ico</code> (use <code>magick convert</code> or <a href="https://realfavicongenerator.net" target="_blank" rel="noopener" style={{color:'var(--green)'}}>realfavicongenerator.net</a>).</span>
            </div>
            <div className="step">
              <span className="n">02</span>
              <span className="b">From <code>assets/apple-touch-icon.svg</code>, export 180×180 PNG as <code>apple-touch-icon.png</code>.</span>
            </div>
            <div className="step">
              <span className="n">03</span>
              <span className="b">From <code>assets/icon-512.svg</code>, export 192×192 and 512×512 PNG. Same source — same dark-bg variant.</span>
            </div>
          </div>
          <div>
            <h4>One-liner (ImageMagick)</h4>
            <p style={{ marginBottom: 18 }}>If you have <code style={{ background:'var(--bg)', padding: '1px 5px', border: '1px solid var(--line)', color: 'var(--green)' }}>magick</code> installed (ImageMagick ≥7), the whole bitmap set is two commands:</p>
            <div className="code-card">
              <div className="body" style={{ padding: '14px 16px', fontSize: 11.5 }}>
<span className="c"># favicon.ico — 16/32/48 stacked</span>
magick assets/favicon-16.svg -resize 16x16 \
       assets/favicon-32.svg -resize 32x32 \
       assets/favicon-32.svg -resize 48x48 \
       favicon.ico

<span className="c"># PWA + apple touch PNGs</span>
magick assets/apple-touch-icon.svg \
       -resize 180x180 apple-touch-icon.png
magick assets/icon-192.svg \
       -resize 192x192 icon-192.png
magick assets/icon-512.svg \
       -resize 512x512 icon-512.png
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section 05 — Download manifest
// ============================================================
function Section05() {
  const files = [
    ['logo-mark-color.svg', '805 B', 'canonical color · 2-tone', 'SVG'],
    ['logo-mark-mono-black.svg', '673 B', 'mono · #0A0B0F · light bg', 'SVG'],
    ['logo-mark-mono-white.svg', '672 B', 'mono · #FFFFFF · dark bg', 'SVG'],
    ['favicon-32.svg', '550 B', 'simplified · stroke +50% · no fragments', 'SVG'],
    ['favicon-16.svg', '462 B', 'pixel-snapped · 16×16 native grid', 'SVG'],
    ['apple-touch-icon.svg', '927 B', '180×180 · black bg + inset mark', 'SVG'],
    ['icon-192.svg', '762 B', 'PWA · 192×192', 'SVG'],
    ['icon-512.svg', '804 B', 'PWA · 512×512 · OG fallback', 'SVG'],
  ];
  return (
    <section className="sec" id="downloads">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">05</span><span>DOWNLOADS</span>
            </div>
            <h2 className="sec-title">Eight SVG files.<br/>That's the whole set.</h2>
          </div>
          <p className="sec-lead">
            Everything ships as SVG from <code style={{color:'var(--green)'}}>/assets/</code>. Generate .ico / .png with the ImageMagick one-liner above. Total source size for the entire icon system: <span style={{color:'var(--green)'}}>~5.6 KB</span>.
          </p>
        </div>

        <div className="dl-table">
          <div className="dl-row head">
            <span>FILENAME</span><span>SIZE</span><span>USE</span><span>FORMAT</span><span>ACTION</span>
          </div>
          {files.map(([n, s, u, f]) => (
            <div className="dl-row" key={n}>
              <span className="name">{n}</span>
              <span className="size">{s}</span>
              <span className="use">{u}</span>
              <span className="fmt">{f}</span>
              <span className="dl"><a href={"assets/" + n} download>↓ download</a></span>
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
          <MarkColor size={26} stroke={8} />
          <span className="word">para<span className="br">break</span></span>
        </div>
        <span className="title">// LOGO EXPORT · <span className="acc">P2.2</span></span>
        <nav className="doc-toc">
          <a href="#masters">01 Masters</a>
          <a href="#favicon">02 Favicon</a>
          <a href="#context">03 Context</a>
          <a href="#manifest">04 Install</a>
          <a href="#downloads">05 Downloads</a>
        </nav>
      </div>
    </header>
  );
}

function Foot() {
  return (
    <footer className="doc-foot">
      <span>// logo export · v1.0 · </span><span className="acc">8 SVG masters · 0 bitmaps shipped</span>
      <div style={{ marginTop: 18 }}>
        <a href="brand.html">→ brand system</a>
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
