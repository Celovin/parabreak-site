/* global React, ReactDOM, DesignCanvas, DCSection, DCArtboard */
const { useState } = React;

// =========================================================
// Parametric BrokenFrameMark — angle/offset variations
// =========================================================
function BrokenFrameMark({
  size = 110,
  accent = '#46E49E',
  ink = '#E6E8EF',
  stroke = 6,
  offsetX = 8,
  offsetY = -4,
  angle = -3,
  fragments = true,
  // where the frame "breaks" along the right edge — y in viewBox 0..100
  breakY = 56,
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* main frame: bottom-left L */}
      <path
        d={`M 12 12 L 12 88 L 88 88 L 88 ${breakY}`}
        stroke={ink}
        strokeWidth={stroke}
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* broken segment, offset & rotated */}
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

// =========================================================
// Angle / offset variations — 6 cells, 2 rows of 3
// =========================================================
function AngleVariationsRow({ items, title }) {
  return (
    <div className="lg-card" style={{ height: 260 }}>
      <div className="topbar">
        <span className="dot"></span>
        <span className="name">{title}</span>
        <span className="meta">offset · angle · break-height</span>
      </div>
      <div className="stage" style={{ padding: 0 }}>
        <div className="angle-grid">
          {items.map((it, i) => (
            <div className={"angle-cell"} key={i}>
              <div className="lab">{it.lab}</div>
              {it.star && <div className="star">★ PICK</div>}
              <BrokenFrameMark
                size={120}
                offsetX={it.offsetX}
                offsetY={it.offsetY}
                angle={it.angle}
                stroke={it.stroke || 6}
                breakY={it.breakY || 56}
                fragments={it.fragments !== false}
              />
              <div className="meta-row">
                <b>off</b> {it.offsetX > 0 ? '+' : ''}{it.offsetX} / {it.offsetY > 0 ? '+' : ''}{it.offsetY}
                {'  ·  '}
                <b>θ</b> {it.angle > 0 ? '+' : ''}{it.angle}°
                {'  ·  '}
                <b>brk</b> {it.breakY || 56}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="footer" style={{ display: 'none' }}></div>
    </div>
  );
}

// =========================================================
// Construction grid — final dims annotated
// =========================================================
function ConstructionR2() {
  return (
    <div className="construct" style={{ height: 520 }}>
      <div className="topbar">
        <span className="dot"></span>
        <span>CONSTRUCTION · BROKEN FRAME · LOCKED</span>
      </div>
      <div className="stage" style={{ padding: 32 }}>
        <svg width="420" height="420" viewBox="0 0 100 100" fill="none">
          {/* unit grid */}
          <g stroke="#1E2230" strokeWidth="0.3">
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={'h' + i} x1="0" y1={i * 10} x2="100" y2={i * 10} />
            ))}
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={'v' + i} x1={i * 10} y1="0" x2={i * 10} y2="100" />
            ))}
          </g>
          {/* keylines */}
          <g stroke="#46E49E" strokeWidth="0.25" strokeDasharray="0.6 0.8" opacity="0.55">
            <line x1="12" y1="0" x2="12" y2="100" />
            <line x1="88" y1="0" x2="88" y2="100" />
            <line x1="0" y1="12" x2="100" y2="12" />
            <line x1="0" y1="88" x2="100" y2="88" />
            <line x1="0" y1="56" x2="100" y2="56" />
          </g>

          {/* main frame */}
          <path d="M 12 12 L 12 88 L 88 88 L 88 56" stroke="#E6E8EF" strokeWidth="6" strokeLinejoin="miter" />
          {/* broken */}
          <g transform="translate(8 -4) rotate(-3 50 30)">
            <path d="M 12 12 L 88 12 L 88 56" stroke="#46E49E" strokeWidth="6" strokeLinejoin="miter" />
          </g>
          <rect x="84" y="48" width="3" height="3" fill="#46E49E" />
          <rect x="78" y="52" width="2" height="2" fill="#46E49E" opacity="0.6" />
          <rect x="72" y="46" width="2" height="2" fill="#46E49E" opacity="0.4" />

          {/* annotations */}
          <g fontFamily="JetBrains Mono" fontSize="2" fill="#6B7080">
            <text x="1" y="11">12u</text>
            <text x="1" y="89">88u</text>
            <text x="89" y="11">88u</text>
            <text x="89" y="58">56u brk</text>
            <text x="14" y="6">offset +8 / −4</text>
            <text x="50" y="98" textAnchor="middle">stroke 6u · square caps · miter joins</text>
          </g>
          <g stroke="#46E49E" strokeWidth="0.3" fill="none">
            <path d="M 50 30 L 62 30" markerEnd="url(#arr)" />
          </g>
          <defs>
            <marker id="arr" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="3" markerHeight="3" orient="auto">
              <path d="M 0 0 L 5 3 L 0 6 z" fill="#46E49E" />
            </marker>
          </defs>
          <text x="63" y="31" fontFamily="JetBrains Mono" fontSize="2" fill="#46E49E">−3°</text>

          {/* clear-space bracket */}
          <g stroke="#6B7080" strokeWidth="0.2" fill="none" strokeDasharray="0.6 0.6">
            <rect x="6" y="6" width="88" height="88" />
          </g>
          <text x="6" y="4" fontFamily="JetBrains Mono" fontSize="1.8" fill="#6B7080">clear-space = 6u (½ stroke)</text>
        </svg>
      </div>
    </div>
  );
}

// =========================================================
// Lockup A — Horizontal: mark + hybrid wordmark
// =========================================================
function LockupA() {
  return (
    <div className="lg-card" style={{ height: 280 }}>
      <div className="topbar">
        <span className="dot"></span>
        <span className="name">LOCKUP A · HORIZONTAL</span>
        <span className="meta">primary · navbar · header · pitch</span>
      </div>
      <div className="stage" style={{ padding: 0 }}>
        <div className="lockup-card">
          <div className="grid-bg"></div>
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 22, justifyContent: 'center' }}>
            <BrokenFrameMark size={92} />
            <div>
              <div className="hybrid-word" style={{ fontSize: 64 }}>
                <span>para</span><span className="br">break</span>
              </div>
              <div style={{ marginTop: 10, color: '#6B7080', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>
                The meta engine for Godot
              </div>
            </div>
          </div>
          <div className="meta">
            <span><b>mark</b> 92px · clear 6u</span>
            <span className="c"><b>type</b> Space Grotesk 600</span>
            <span className="r"><b>gap</b> 22px = 0.34× cap</span>
          </div>
        </div>
      </div>
      <div className="footer" style={{ display: 'none' }}></div>
    </div>
  );
}

// =========================================================
// Lockup B — Stacked: mark above wordmark
// =========================================================
function LockupB() {
  return (
    <div className="lg-card" style={{ height: 360 }}>
      <div className="topbar">
        <span className="dot"></span>
        <span className="name">LOCKUP B · STACKED</span>
        <span className="meta">app launch · square placements · social</span>
      </div>
      <div className="stage" style={{ padding: 0 }}>
        <div className="lockup-card">
          <div className="grid-bg"></div>
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
            <BrokenFrameMark size={132} />
            <div className="hybrid-word" style={{ fontSize: 56 }}>
              <span>para</span><span className="br">break</span>
            </div>
            <div style={{ color: '#6B7080', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>
              v0.1 · godot 4.x
            </div>
          </div>
          <div className="meta">
            <span><b>mark</b> 132px</span>
            <span className="c"><b>v-gap</b> 18px</span>
            <span className="r"><b>caption</b> +18px</span>
          </div>
        </div>
      </div>
      <div className="footer" style={{ display: 'none' }}></div>
    </div>
  );
}

// =========================================================
// Stickers / dividers — repurposing the cut 04 wordmark
// =========================================================
function Stickers() {
  return (
    <div className="lg-card" style={{ height: 260 }}>
      <div className="topbar">
        <span className="dot"></span>
        <span className="name">SECONDARY · STICKERS / DIVIDERS</span>
        <span className="meta">repurposed from 04 wordmark</span>
      </div>
      <div className="stage" style={{ padding: 0 }}>
        <div className="sticker-grid">
          <div className="sticker-cell">
            <div className="lab">SECTION DIVIDER</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', alignItems: 'center' }}>
              <div className="sticker divider">
                <span className="line"></span>
                <span className="line acc"></span>
                <span>03 · WHAT BREAKS</span>
                <span className="line acc"></span>
                <span className="line"></span>
              </div>
              <div className="sticker divider">
                <span className="line"></span>
                <span>04 · PRICING</span>
                <span className="line"></span>
              </div>
            </div>
          </div>
          <div className="sticker-cell">
            <div className="lab">META STICKERS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
              <div className="sticker"><span className="dot"></span><span>BREAK THE FOURTH WALL · COMMERCIALLY</span></div>
              <div className="sticker"><span className="dot" style={{ background: '#F2B544' }}></span><span>YOUR PLAYER DELETED THEIR SAVE</span></div>
              <div className="sticker" style={{ borderColor: '#46E49E', color: '#46E49E' }}>
                <span>// para</span><span style={{ color: '#E6E8EF' }}>·</span><span>break</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer" style={{ display: 'none' }}></div>
    </div>
  );
}

// =========================================================
// Notes
// =========================================================
function NotesR2() {
  return (
    <div className="notes">
      <h3>// r2 — refinement</h3>
      <h2>04 · broken frame</h2>
      <div className="sub">locked direction · 2 lockups · grid finalized</div>

      <div className="row"><span className="k">decision</span><span className="v"><span className="green">04 mark</span> + <span className="green">01 bracket-break wordmark</span> hybrid. one motif, two surfaces.</span></div>
      <div className="row"><span className="k">motif</span><span className="v">"break = lifts away."  the corner of the frame and the word "break" do the same thing — that's the whole brand in one move.</span></div>

      <hr/>
      <h3>// what changed</h3>
      <ul>
        <li>tested 6 break angles/offsets — landed on <span style={{ color: '#46E49E' }}>+8 / −4 · −3°</span> as best balance of read / instability</li>
        <li>kept frame as L-bracket, not full square — clearer "wall" reading at small sizes</li>
        <li>fragments retained — they're the proof that the corner <i>broke</i>, not just lifted</li>
        <li>04 wordmark (para white + break green) cut from primary — survives as section dividers + stickers</li>
      </ul>

      <hr/>
      <h3>// usage</h3>
      <div className="row"><span className="k">primary</span><span className="v">Lockup A (horizontal) — navbar, hero, deck title</span></div>
      <div className="row"><span className="k">stacked</span><span className="v">Lockup B — app launch, social, square placements</span></div>
      <div className="row"><span className="k">mark only</span><span className="v">favicon, app icon, watermark, ≤32px</span></div>
      <div className="row"><span className="k">clear</span><span className="v">6u all sides (= ½ stroke)</span></div>

      <hr/>
      <h3>// next</h3>
      <ul>
        <li>landing hero w/ Lockup A + dialogue self-edit anim</li>
        <li>full landing across 11 sections, dark CRT base, light tweak toggle</li>
      </ul>
    </div>
  );
}

// =========================================================
// App
// =========================================================
function App() {
  const angles = [
    { lab: '01 · subtle',     offsetX: 4,  offsetY: -2,  angle: -1.5, breakY: 56 },
    { lab: '02 · current ★',  offsetX: 8,  offsetY: -4,  angle: -3,   breakY: 56, star: true },
    { lab: '03 · dramatic',   offsetX: 14, offsetY: -8,  angle: -6,   breakY: 56 },
    { lab: '04 · low break',  offsetX: 8,  offsetY: -4,  angle: -3,   breakY: 70 },
    { lab: '05 · high break', offsetX: 8,  offsetY: -4,  angle: -3,   breakY: 40 },
    { lab: '06 · positive θ', offsetX: -6, offsetY: -4,  angle: +3,   breakY: 56 },
  ];

  return (
    <DesignCanvas
      title="parabreak / logo r2 · refinement"
      subtitle="04 broken frame — angle study · construction · 2 lockups · stickers"
    >
      <DCSection id="angles" title="01 — Break angle / offset study" subtitle="6 variants. Pick locked: +8/−4 · −3° · brk 56">
        <DCArtboard id="row1" label="Variations 01–03" width={720} height={260}>
          <AngleVariationsRow items={angles.slice(0, 3)} title="ANGLE STUDY · ROW 1" />
        </DCArtboard>
        <DCArtboard id="row2" label="Variations 04–06" width={720} height={260}>
          <AngleVariationsRow items={angles.slice(3, 6)} title="ANGLE STUDY · ROW 2" />
        </DCArtboard>
      </DCSection>

      <DCSection id="construct" title="02 — Construction grid" subtitle="Final geometry, clear-space, annotations">
        <DCArtboard id="cg2" label="Construction · locked" width={720} height={520}>
          <ConstructionR2 />
        </DCArtboard>
        <DCArtboard id="notes2" label="Rationale" width={360} height={520}>
          <NotesR2 />
        </DCArtboard>
      </DCSection>

      <DCSection id="lockups" title="03 — Lockups" subtitle="Mark + 01 bracket-break wordmark (locked hybrid)">
        <DCArtboard id="lkA" label="Lockup A · horizontal (primary)" width={720} height={280}>
          <LockupA />
        </DCArtboard>
        <DCArtboard id="lkB" label="Lockup B · stacked" width={720} height={360}>
          <LockupB />
        </DCArtboard>
        <DCArtboard id="stk" label="Stickers + dividers (cut wordmark, repurposed)" width={720} height={260}>
          <Stickers />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
