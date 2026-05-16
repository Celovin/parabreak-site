/* global React, ReactDOM */
const { useState } = React;

// ============================================================
// Atom: Broken Frame Mark
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
// Scaled viewport
// ============================================================
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
// Tier data (registry-verified 35 hooks)
// ============================================================
const TIERS = {
  core: {
    label: 'CORE',
    num: '13',
    total: '/ 35',
    title: 'parabreak',
    sub: 'VN Core',
    accent: '#46E49E',
    desc: 'The 13 core blocks for visual novels. Save tampering, persistent flags, UI button control, title-screen variants.',
    blocks: ['save_delete', 'persistent_flag_set', 'ui_button_destroy', 'title_screen_variant', 'window_title_set'],
    price: '0',
    priceLabel: 'FREE',
    al: { tag: 'free', tagLabel: 'FREE' },
    itchSub: 'MIT FOREVER',
  },
  hooks: {
    label: 'HOOKS',
    num: '8',
    total: '+ 8 reactive',
    title: 'parabreak',
    sub: 'Hooks',
    accent: '#F2B544',
    desc: 'Adds the 8 reactive blocks. Shader / audio effects, text corruption, input hijack, detect-repeat / back-attempt.',
    blocks: ['shader_effect', 'text_corrupt', 'audio_effect', 'wait_for_action', 'detect_repeat_choice'],
    price: '49',
    priceLabel: '$49',
    al: { tag: 'paid', tagLabel: 'PAID' },
    itchSub: 'ONE-TIME',
    futurePrice: '$69',
  },
  plus: {
    label: 'PLUS',
    num: '14',
    total: '+ 14 advanced',
    title: 'parabreak',
    sub: 'Plus',
    accent: '#8B5CF6',
    desc: 'Adds the 14 advanced blocks. fake_dialog, clipboard read/write, real-time, scene_live_reload, Discord/Steam awareness.',
    blocks: ['fake_dialog', 'clipboard_read', 'scene_live_reload', 'slot_impersonation', 'discord_presence'],
    price: '69',
    priceLabel: '$69',
    al: { tag: 'paid', tagLabel: 'PAID' },
    itchSub: 'ONE-TIME',
    futurePrice: '$149',
  },
};

// ============================================================
// Asset Library thumbnail · 660 × 440
// ============================================================
function ALThumb({ tier }) {
  const t = TIERS[tier];
  const cls = "export al " + (tier === 'plus' ? 'plus' : tier === 'hooks' ? 'hooks' : '');
  return (
    <div className={cls} style={{ width: 660, height: 440 }}>
      <div className="chrome">
        <span className="dot"></span>
        <span>// parabreak — godot asset library</span>
        <span className="right">v0.1 · <span className="acc">godot 4.x</span></span>
      </div>

      <div className="mark-corner">
        <BFM size={64} stroke={7} accent={t.accent} />
      </div>

      <div className="left">
        <div>
          <div className="label">
            <span className="ln"></span>
            <span className="num">·</span>
            <span>{t.label} TIER</span>
          </div>
          <div className="tier-name">
            {t.title}<br/><span className="acc" style={{color: t.accent}}>{t.sub}</span>
            <span className="small">{tier === 'core' ? 'visual novel base' : tier === 'hooks' ? 'reactive blocks' : 'advanced blocks'}</span>
          </div>
        </div>
        <div className={"pill " + (t.al.tag === 'free' ? 'free' : tier === 'plus' ? 'plus' : 'paid')}>
          <span className="dot"></span>
          <span>{t.al.tagLabel}</span>
        </div>
      </div>

      <div className="right">
        <div>
          <div className="label" style={{ marginBottom: 14 }}>
            <span className="ln" style={{background: t.accent}}></span>
            <span className="num" style={{color: t.accent}}>·</span>
            <span>BLOCKS</span>
          </div>
          <div className="blocks-list">
            {t.blocks.slice(0, 5).map((b, i) => (
              <div className="block" key={b}>
                <span className="k" style={{color: t.accent}}>{String(i + 1).padStart(2, '0')}</span>
                <span className="sep"></span>
                <span className="nm">{b}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="count" style={{color: t.accent}}>{t.num}<span className="total">{t.total}</span></div>
          <div className="count-cap">
            <span className="acc" style={{color: t.accent}}>// </span>{tier === 'core' ? 'core blocks' : tier === 'hooks' ? 'reactive blocks' : 'advanced blocks'}
          </div>
        </div>
        <div className="br-corner">
          <span className="acc" style={{color: t.accent}}>//</span> parabreak.dev
        </div>
      </div>
    </div>
  );
}

// ============================================================
// itch.io cover · 630 × 500
// ============================================================
function ItchCover({ tier }) {
  const t = TIERS[tier];
  const cls = "export itch " + (tier === 'core' ? 'free' : tier === 'plus' ? 'plus' : 'paid');
  return (
    <div className={cls} style={{ width: 630, height: 500 }}>
      <div className="chrome">
        <span className="dot"></span>
        <span>// itch.io · parabreak — {t.label}</span>
        <span className="right">godot 4.x · <span className="acc">MIT core</span></span>
      </div>

      <div className="body">
        <div className="left">
          <div className="label">
            <span className="ln" style={{background: t.accent}}></span>
            <span className="num" style={{color: t.accent}}>·</span>
            <span>{t.label} TIER</span>
          </div>
          <div className="tier-name">
            {t.title}<br/><span className="acc" style={{color: t.accent}}>{t.sub}</span>
          </div>
          <div className="desc">{t.desc}</div>
          <div className="blocks-tags">
            {t.blocks.slice(0, 5).map((b) => (
              <code key={b} style={{color: t.accent}}>{b}</code>
            ))}
          </div>
        </div>

        <div className="right">
          <div className="mark">
            <BFM size={132} stroke={6} accent={t.accent} />
          </div>
          <div className="price-block">
            {tier === 'core' ? (
              <>
                <div className="price"><span className="free-tag">FREE</span></div>
                <div className="price-sub"><span className="acc">/</span> MIT · open source</div>
              </>
            ) : (
              <>
                <div className="price" style={{color: t.accent}}>
                  <span className="cur">$</span>{t.price}
                </div>
                <div className="price-sub"><span className="acc" style={{color: t.accent}}>/</span> ONE-TIME · post-launch {t.futurePrice}</div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="badge-bar">
        <span className="dot"></span>
        {tier === 'core' ? (
          <span>FREE NOW · FREE FOREVER · MIT</span>
        ) : (
          <span>PRICES RISE AFTER STEAM LAUNCH</span>
        )}
        <span className="right">
          parabreak.dev <span className="acc">·</span> v0.1 alpha
        </span>
      </div>
    </div>
  );
}

// ============================================================
// Section 01 — Asset Library
// ============================================================
function Section01() {
  const scale = 0.55;
  const tiers = ['core', 'hooks', 'plus'];
  return (
    <section className="sec" id="al">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">01</span><span>GODOT ASSET LIBRARY</span>
            </div>
            <h2 className="sec-title">Three thumbnails.<br/>660 × 440 each.</h2>
          </div>
          <p className="sec-lead">
            Asset Library convention is a free-software listing — we follow it. <b>Tier name, block count, what's in it.</b> A small "FREE" or "PAID" pill in the corner — no dollar amounts (the store handles its own price chrome). Same composition across all three so the family reads at thumbnail size.
          </p>
        </div>

        <div className="asset-card">
          <div className="meta">
            <div>
              <h3>parabreak-asset-library × 3</h3>
              <div className="specs">
                <span>660 × 440 PX</span>
                <span>·</span>
                <span className="acc">CRT GREEN</span>
                <span>·</span>
                <span>NO PRICE</span>
                <span>·</span>
                <span>TIER + FREE/PAID PILL</span>
              </div>
            </div>
            <div className="actions">
              <a href="store.html?solo=al-core">core 100% →</a>
              <a href="store.html?solo=al-hooks">hooks 100% →</a>
              <a href="store.html?solo=al-plus">plus 100% →</a>
            </div>
          </div>

          <div className="triplet">
            {tiers.map((tier) => (
              <div className="triplet-cell" key={tier}>
                <ScaledViewport width={660} height={440} scale={scale}>
                  <ALThumb tier={tier} />
                </ScaledViewport>
                <div className="lbl">
                  <span className="acc">/</span> {tier.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section 02 — itch.io
// ============================================================
function Section02() {
  const scale = 0.58;
  const tiers = ['core', 'hooks', 'plus'];
  return (
    <section className="sec" id="itch">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">02</span><span>ITCH.IO COVER</span>
            </div>
            <h2 className="sec-title">Three covers.<br/>630 × 500 each.</h2>
          </div>
          <p className="sec-lead">
            itch.io is commerce — <b>price is the headline</b>. Each cover shows the tier, a 132px mark, the active price (large, in tier color), and the post-launch price as small print. Bottom bar carries the <span style={{color:'var(--amber)'}}>"Prices rise after Steam launch"</span> badge, swapped to <span style={{color:'var(--green)'}}>"Free now · free forever"</span> on Core so the line never feels like a hidden upsell.
          </p>
        </div>

        <div className="asset-card">
          <div className="meta">
            <div>
              <h3>parabreak-itch × 3</h3>
              <div className="specs">
                <span>630 × 500 PX</span>
                <span>·</span>
                <span className="acc">CRT GREEN</span>
                <span>·</span>
                <span>WITH PRICE</span>
                <span>·</span>
                <span>POST-LAUNCH NOTE</span>
              </div>
            </div>
            <div className="actions">
              <a href="store.html?solo=itch-core">core 100% →</a>
              <a href="store.html?solo=itch-hooks">hooks 100% →</a>
              <a href="store.html?solo=itch-plus">plus 100% →</a>
            </div>
          </div>

          <div className="triplet">
            {tiers.map((tier) => (
              <div className="triplet-cell" key={tier}>
                <ScaledViewport width={630} height={500} scale={scale}>
                  <ItchCover tier={tier} />
                </ScaledViewport>
                <div className="lbl">
                  <span className="acc">/</span> {tier.toUpperCase()} · {tier === 'core' ? 'FREE' : tier === 'hooks' ? '$49 → $69' : '$69 → $149'}
                </div>
              </div>
            ))}
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
            <h2 className="sec-title">Six PNGs.<br/>Solo pages per asset.</h2>
          </div>
          <p className="sec-lead">
            Each asset is rendered at exact pixel size in its own solo URL. Open the link, OS-screenshot the body — no scale to fight. Naming follows <code style={{color:'var(--green)'}}>parabreak-{'{platform}'}-{'{tier}'}.png</code>.
          </p>
        </div>

        <div className="export-card">
          <h4>Asset Library — 660 × 440</h4>
          <div className="row"><span className="name">parabreak-al-core.png</span><a href="store.html?solo=al-core" target="_blank">open · screenshot →</a></div>
          <div className="row"><span className="name">parabreak-al-hooks.png</span><a href="store.html?solo=al-hooks" target="_blank">open · screenshot →</a></div>
          <div className="row"><span className="name">parabreak-al-plus.png</span><a href="store.html?solo=al-plus" target="_blank">open · screenshot →</a></div>
        </div>

        <div className="export-card">
          <h4>itch.io — 630 × 500</h4>
          <div className="row"><span className="name">parabreak-itch-core.png</span><a href="store.html?solo=itch-core" target="_blank">open · screenshot →</a></div>
          <div className="row"><span className="name">parabreak-itch-hooks.png</span><a href="store.html?solo=itch-hooks" target="_blank">open · screenshot →</a></div>
          <div className="row"><span className="name">parabreak-itch-plus.png</span><a href="store.html?solo=itch-plus" target="_blank">open · screenshot →</a></div>
        </div>

        <div className="export-card">
          <h4>Bulk capture (DevTools)</h4>
          <p>Same pattern as <code>social.html</code>. Open this page, run in DevTools console:</p>
          <div style={{
            background: 'var(--bg)', border: '1px solid var(--line)', padding: '14px 16px',
            fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--ink-2)', whiteSpace: 'pre',
            lineHeight: 1.65, overflowX: 'auto',
          }}>
{`const snap = async (sel, name) => {
  const el = document.querySelector(sel);
  el.style.transform = "none";
  await new Promise(r => setTimeout(r, 60));
  const dataUrl = await htmlToImage.toPng(el, {
    pixelRatio: 1, cacheBust: true
  });
  const a = document.createElement("a");
  a.href = dataUrl; a.download = name; a.click();
};
// asset library
await snap(".triplet-cell:nth-child(1) .export.al", "parabreak-al-core.png");
await snap(".triplet-cell:nth-child(2) .export.al", "parabreak-al-hooks.png");
await snap(".triplet-cell:nth-child(3) .export.al", "parabreak-al-plus.png");
// itch
await snap("#itch .triplet-cell:nth-child(1) .export.itch", "parabreak-itch-core.png");
await snap("#itch .triplet-cell:nth-child(2) .export.itch", "parabreak-itch-hooks.png");
await snap("#itch .triplet-cell:nth-child(3) .export.itch", "parabreak-itch-plus.png");`}
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
          <BFM size={26} stroke={8} />
          <span className="word">para<span className="br">break</span></span>
        </div>
        <span className="title">// STORE THUMBNAILS · <span className="acc">P2.4</span></span>
        <nav className="doc-toc">
          <a href="#al">01 Asset Library</a>
          <a href="#itch">02 itch.io</a>
          <a href="#export">03 Export</a>
        </nav>
      </div>
    </header>
  );
}

function Foot() {
  return (
    <footer className="doc-foot">
      <span>// store thumbnails · v1.0 · </span><span className="acc">6 PNGs · CRT green · 35 hooks · 3 tiers</span>
      <div style={{ marginTop: 18 }}>
        <a href="brand.html">→ brand system</a>
        <a href="logo-export.html">→ logo export</a>
        <a href="social.html">→ social</a>
      </div>
    </footer>
  );
}

function App() {
  const solo = new URLSearchParams(window.location.search).get('solo');
  if (solo) {
    const [platform, tier] = solo.split('-');
    if (platform === 'al' && TIERS[tier]) return <ALThumb tier={tier} />;
    if (platform === 'itch' && TIERS[tier]) return <ItchCover tier={tier} />;
  }
  return (
    <>
      <Head />
      <Section01 />
      <Section02 />
      <Section03 />
      <Foot />
    </>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
