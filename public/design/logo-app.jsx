/* global React, ReactDOM, DesignCanvas, DCSection, DCArtboard */
const { useState, useEffect } = React;

// =========================================================
// Concept 1 — Bracket-break wordmark
// "para" stays on baseline, "break" lifts up and tilts
// like a section of the wall pulled away
// =========================================================
function Logo1Hero() {
  return (
    <div className="lg-card l1">
      <div className="topbar">
        <span className="dot"></span>
        <span className="name">CONCEPT 01</span>
        <span>· Bracket break</span>
        <span className="meta">wordmark / primary</span>
      </div>
      <div className="stage">
        <div className="grid-bg"></div>
        <div style={{position:'relative', zIndex:1}}>
          <div className="word">
            <span className="para">para</span>
            <span className="br">break</span>
          </div>
          <div className="tag">The meta engine for Godot</div>
        </div>
      </div>
      <div className="footer">
        <span>SPACE GROTESK 600</span>
        <span className="c b">#46E49E ON #0A0B0F</span>
        <span className="r">— 4°  ·  +12px lift</span>
      </div>
    </div>
  );
}

function Logo1Variations() {
  return (
    <div className="lg-card l1" style={{height: 220}}>
      <div className="topbar">
        <span className="dot"></span>
        <span className="name">01 · Variations</span>
        <span className="meta">scale / mono / inverse / app</span>
      </div>
      <div className="stage" style={{padding:0}}>
        <div className="var-row" style={{width:'100%'}}>
          <div className="var-cell">
            <div className="var-label">@ 26PX</div>
            <span className="vp-1 dark"><span>para</span><span className="br">break</span></span>
          </div>
          <div className="var-cell">
            <div className="var-label">MONO</div>
            <span className="vp-1 dark" style={{color:'#E6E8EF'}}><span>para</span><span className="br" style={{color:'#E6E8EF'}}>break</span></span>
          </div>
          <div className="var-cell light">
            <div className="var-label">INVERSE</div>
            <span className="vp-1 light"><span>para</span><span className="br">break</span></span>
          </div>
          <div className="var-cell">
            <div className="var-label">APP ICON</div>
            <div className="v-app" style={{paddingLeft:0}}>p<span style={{color:'#46E49E', display:'inline-block', transform:'translateY(-3px) rotate(-3deg)'}}>b</span></div>
          </div>
        </div>
      </div>
      <div className="footer" style={{display:'none'}}></div>
    </div>
  );
}

// =========================================================
// Concept 2 — Self-edit wordmark
// "parabreak" with one segment struck and rewritten —
// the dialogue self-edit moment, frozen in the mark
// =========================================================
function Logo2Hero() {
  return (
    <div className="lg-card l2">
      <div className="topbar">
        <span className="dot"></span>
        <span className="name">CONCEPT 02</span>
        <span>· Self-edit</span>
        <span className="meta">wordmark / primary</span>
      </div>
      <div className="stage">
        <div className="grid-bg"></div>
        <div style={{position:'relative', zIndex:1, textAlign:'center'}}>
          <div className="word">
            <span>para</span><span className="strike">make</span><span className="new">break</span><span className="caret"></span>
          </div>
          <div className="tag">// the engine knows you're watching</div>
        </div>
      </div>
      <div className="footer">
        <span>JETBRAINS MONO 700</span>
        <span className="c b">strike #E44C4C / new #46E49E</span>
        <span className="r">— caret blink 1.05s</span>
      </div>
    </div>
  );
}

function Logo2Variations() {
  return (
    <div className="lg-card l2" style={{height: 220}}>
      <div className="topbar">
        <span className="dot"></span>
        <span className="name">02 · Variations</span>
        <span className="meta">scale / mono / inverse / app</span>
      </div>
      <div className="stage" style={{padding:0}}>
        <div className="var-row" style={{width:'100%'}}>
          <div className="var-cell">
            <div className="var-label">@ 24PX</div>
            <span className="vp-2 dark">para<span className="strike">make</span><span className="new">break</span></span>
          </div>
          <div className="var-cell">
            <div className="var-label">MONO (NO STRIKE)</div>
            <span className="vp-2 dark" style={{color:'#E6E8EF'}}>parabreak<span style={{display:'inline-block', width:'2px', height:'18px', background:'#E6E8EF', marginLeft:'4px', verticalAlign:'-2px'}}></span></span>
          </div>
          <div className="var-cell light">
            <div className="var-label">INVERSE</div>
            <span className="vp-2 light">para<span className="strike">make</span><span className="new">break</span></span>
          </div>
          <div className="var-cell">
            <div className="var-label">APP ICON</div>
            <div className="v-app">p<span style={{color:'#E44C4C', textDecoration:'line-through', textDecorationThickness:'2px'}}>m</span><span style={{color:'#46E49E'}}>b</span></div>
          </div>
        </div>
      </div>
      <div className="footer" style={{display:'none'}}></div>
    </div>
  );
}

// =========================================================
// Concept 3 — Terminal cursor wordmark
// `> parabreak_` — the dev-tool angle, all-green phosphor
// =========================================================
function Logo3Hero() {
  return (
    <div className="lg-card l3">
      <div className="topbar">
        <span className="dot"></span>
        <span className="name">CONCEPT 03</span>
        <span>· Phosphor terminal</span>
        <span className="meta">wordmark / primary</span>
      </div>
      <div className="stage">
        <div className="grid-bg" style={{opacity:0.5}}></div>
        <div style={{position:'relative', zIndex:1, textAlign:'center'}}>
          <div className="row">
            <span className="prompt">$</span>
            <span>parabreak</span>
            <span className="cur"></span>
          </div>
          <div className="tag">A Godot toolkit for fourth-wall games</div>
        </div>
      </div>
      <div className="footer">
        <span>IBM PLEX MONO 500</span>
        <span className="c b">#46E49E · phosphor glow</span>
        <span className="r">— mono palette, all-green</span>
      </div>
    </div>
  );
}

function Logo3Variations() {
  return (
    <div className="lg-card l3" style={{height: 220}}>
      <div className="topbar">
        <span className="dot"></span>
        <span className="name">03 · Variations</span>
        <span className="meta">scale / mono / inverse / app</span>
      </div>
      <div className="stage" style={{padding:0}}>
        <div className="var-row" style={{width:'100%'}}>
          <div className="var-cell">
            <div className="var-label">@ 24PX</div>
            <span className="vp-3 dark"><span className="prompt">$</span>parabreak_</span>
          </div>
          <div className="var-cell">
            <div className="var-label">MONO INK</div>
            <span className="vp-3" style={{color:'#E6E8EF'}}><span style={{opacity:0.5}}>$</span> parabreak_</span>
          </div>
          <div className="var-cell light">
            <div className="var-label">INVERSE</div>
            <span className="vp-3 light"><span className="prompt">$</span>parabreak_</span>
          </div>
          <div className="var-cell">
            <div className="var-label">APP ICON</div>
            <div className="v-app" style={{color:'#46E49E', fontSize:'22px'}}>$_</div>
          </div>
        </div>
      </div>
      <div className="footer" style={{display:'none'}}></div>
    </div>
  );
}

// =========================================================
// Concept 4 — Broken-frame mark + wordmark
// A square (the "fourth wall") with one corner displaced
// =========================================================
function BrokenFrameMark({size = 110, accent = '#46E49E', ink = '#E6E8EF'}) {
  // Square frame, top-right corner is broken away and offset
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* main frame: bottom-left L */}
      <path
        d="M 12 12 L 12 88 L 88 88 L 88 56"
        stroke={ink}
        strokeWidth="6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* broken segment, offset +6 / -4 and tilted */}
      <g transform="translate(8 -4) rotate(-3 50 30)">
        <path
          d="M 12 12 L 56 12 L 88 12 L 88 56"
          stroke={accent}
          strokeWidth="6"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </g>
      {/* break point dots — fragments */}
      <rect x="84" y="48" width="3" height="3" fill={accent} />
      <rect x="78" y="52" width="2" height="2" fill={accent} opacity="0.6" />
      <rect x="72" y="46" width="2" height="2" fill={accent} opacity="0.4" />
    </svg>
  );
}

function Logo4Hero() {
  return (
    <div className="lg-card l4">
      <div className="topbar">
        <span className="dot"></span>
        <span className="name">CONCEPT 04</span>
        <span>· Broken frame</span>
        <span className="meta">mark + wordmark</span>
      </div>
      <div className="stage">
        <div className="grid-bg"></div>
        <div className="lockup" style={{position:'relative', zIndex:1}}>
          <div className="mark"><BrokenFrameMark size={110} /></div>
          <div>
            <div className="word">para<span className="accent">break</span></div>
            <div className="sub">The meta engine for Godot</div>
          </div>
        </div>
      </div>
      <div className="footer">
        <span>MARK · 6PX STROKE</span>
        <span className="c b">offset +8 / -4 · -3°</span>
        <span className="r">SPACE GROTESK 600</span>
      </div>
    </div>
  );
}

function Logo4Variations() {
  return (
    <div className="lg-card l4" style={{height: 220}}>
      <div className="topbar">
        <span className="dot"></span>
        <span className="name">04 · Variations</span>
        <span className="meta">mark only / lockup / inverse / favicon</span>
      </div>
      <div className="stage" style={{padding:0}}>
        <div className="var-row" style={{width:'100%'}}>
          <div className="var-cell">
            <div className="var-label">MARK ONLY</div>
            <BrokenFrameMark size={56} />
          </div>
          <div className="var-cell">
            <div className="var-label">@ 24PX</div>
            <span className="vp-4 dark">
              <BrokenFrameMark size={26} />
              <span>para<span className="accent">break</span></span>
            </span>
          </div>
          <div className="var-cell light">
            <div className="var-label">INVERSE</div>
            <span className="vp-4 light">
              <BrokenFrameMark size={26} accent="#0A0B0F" ink="#0A0B0F" />
              <span>para<span className="accent">break</span></span>
            </span>
          </div>
          <div className="var-cell">
            <div className="var-label">FAVICON 32</div>
            <div className="v-app" style={{padding:6}}>
              <BrokenFrameMark size={32} />
            </div>
          </div>
        </div>
      </div>
      <div className="footer" style={{display:'none'}}></div>
    </div>
  );
}

// =========================================================
// Concept 5 — Looking-back mark + wordmark
// A rectangular dialogue box with a tail that points BACK
// at the viewer. The character looks out.
// =========================================================
function LookBackMark({size = 116, accent = '#46E49E', ink = '#E6E8EF'}) {
  return (
    <svg width={size} height={size} viewBox="0 0 116 116" fill="none">
      {/* dialogue box */}
      <rect x="14" y="22" width="88" height="56" stroke={ink} strokeWidth="5" fill="none" />
      {/* tail pointing toward viewer (down-right, exits the box) */}
      <path d="M 70 78 L 84 102 L 78 78 Z" fill={ink} stroke={ink} strokeWidth="2" strokeLinejoin="round" />
      {/* two text lines inside */}
      <line x1="22" y1="38" x2="80" y2="38" stroke={accent} strokeWidth="3" strokeLinecap="square" />
      <line x1="22" y1="50" x2="62" y2="50" stroke={ink} strokeWidth="2.5" strokeLinecap="square" opacity="0.6" />
      {/* the eye — a small circle aimed at viewer */}
      <circle cx="92" cy="62" r="4" fill={accent} />
      <circle cx="92" cy="62" r="9" stroke={accent} strokeWidth="1.5" fill="none" opacity="0.5" />
    </svg>
  );
}

function Logo5Hero() {
  return (
    <div className="lg-card l5">
      <div className="topbar">
        <span className="dot"></span>
        <span className="name">CONCEPT 05</span>
        <span>· Looking back</span>
        <span className="meta">mark + wordmark</span>
      </div>
      <div className="stage">
        <div className="grid-bg"></div>
        <div className="lockup" style={{position:'relative', zIndex:1}}>
          <div className="mark"><LookBackMark size={116} /></div>
          <div>
            <div className="word">para<span className="br">break</span></div>
            <div className="sub">The character notices you</div>
          </div>
        </div>
      </div>
      <div className="footer">
        <span>MARK · 5PX STROKE</span>
        <span className="c b">eye = #46E49E · tail = ink</span>
        <span className="r">IBM PLEX MONO 600</span>
      </div>
    </div>
  );
}

function Logo5Variations() {
  return (
    <div className="lg-card l5" style={{height: 220}}>
      <div className="topbar">
        <span className="dot"></span>
        <span className="name">05 · Variations</span>
        <span className="meta">mark only / lockup / inverse / favicon</span>
      </div>
      <div className="stage" style={{padding:0}}>
        <div className="var-row" style={{width:'100%'}}>
          <div className="var-cell">
            <div className="var-label">MARK ONLY</div>
            <LookBackMark size={64} />
          </div>
          <div className="var-cell">
            <div className="var-label">@ 24PX</div>
            <span className="vp-5 dark">
              <LookBackMark size={28} />
              <span>para<span className="br">break</span></span>
            </span>
          </div>
          <div className="var-cell light">
            <div className="var-label">INVERSE</div>
            <span className="vp-5 light">
              <LookBackMark size={28} accent="#0A0B0F" ink="#0A0B0F" />
              <span>para<span className="br">break</span></span>
            </span>
          </div>
          <div className="var-cell">
            <div className="var-label">FAVICON 32</div>
            <div className="v-app" style={{padding:4}}>
              <LookBackMark size={36} />
            </div>
          </div>
        </div>
      </div>
      <div className="footer" style={{display:'none'}}></div>
    </div>
  );
}

// =========================================================
// Construction grid (for one chosen concept later) —
// for now: shown for 04 broken frame as a sample
// =========================================================
function ConstructionCard() {
  return (
    <div className="construct">
      <div className="topbar">
        <span className="dot"></span>
        <span>CONSTRUCTION · 04 BROKEN FRAME</span>
      </div>
      <div className="stage">
        <svg width="380" height="380" viewBox="0 0 100 100" fill="none">
          {/* unit grid markers */}
          <g stroke="#2A2F40" strokeDasharray="0.5 1" strokeWidth="0.3">
            <line x1="12" y1="0" x2="12" y2="100" />
            <line x1="88" y1="0" x2="88" y2="100" />
            <line x1="0" y1="12" x2="100" y2="12" />
            <line x1="0" y1="88" x2="100" y2="88" />
            <line x1="50" y1="0" x2="50" y2="100" />
            <line x1="0" y1="50" x2="100" y2="50" />
          </g>
          {/* main frame */}
          <path d="M 12 12 L 12 88 L 88 88 L 88 56" stroke="#E6E8EF" strokeWidth="6" />
          {/* broken segment */}
          <g transform="translate(8 -4) rotate(-3 50 30)">
            <path d="M 12 12 L 88 12 L 88 56" stroke="#46E49E" strokeWidth="6" />
          </g>
          <rect x="84" y="48" width="3" height="3" fill="#46E49E" />
          <rect x="78" y="52" width="2" height="2" fill="#46E49E" opacity="0.6" />
          <rect x="72" y="46" width="2" height="2" fill="#46E49E" opacity="0.4" />

          {/* annotations */}
          <g fontFamily="JetBrains Mono" fontSize="2.2" fill="#6B7080">
            <text x="2" y="11">12u</text>
            <text x="2" y="89">88u</text>
            <text x="89" y="11">88u</text>
            <text x="89" y="59">break</text>
            <text x="14" y="6">offset +8u / -4u</text>
            <text x="14" y="98">stroke 6u · square caps</text>
          </g>
          {/* angle indicator */}
          <g stroke="#46E49E" strokeWidth="0.3" fill="none">
            <path d="M 50 30 L 60 30" />
            <path d="M 50 30 L 60 28.5" />
          </g>
          <text x="61" y="30" fontFamily="JetBrains Mono" fontSize="2.2" fill="#46E49E">−3°</text>
        </svg>
      </div>
    </div>
  );
}

// =========================================================
// Notes panel — design rationale
// =========================================================
function NotesPanel() {
  return (
    <div className="notes">
      <h3>// brief</h3>
      <h2>parabreak — logo r1</h2>
      <div className="sub">5 concepts · pick 1–2 to refine</div>
      <div className="row"><span className="k">brand</span><span className="v">meta engine for Godot. fourth-wall break, character self-awareness, save-tampering — but as a credible commercial dev tool.</span></div>
      <div className="row"><span className="k">tension</span><span className="v">"weird game" energy ↔ "ship it" credibility. mark must read as serious tooling first, knowing wink second.</span></div>
      <hr/>
      <h3>// concepts</h3>
      <div className="row"><span className="k">01</span><span className="v"><b style={{color:'#E6E8EF'}}>bracket break</b> — second half lifts off the baseline. literal wall-break. type-led, simplest, scales best.</span></div>
      <div className="row"><span className="k">02</span><span className="v"><b style={{color:'#E6E8EF'}}>self-edit</b> — para<s>make</s>break. the engine catches you. most narrative. risk: reads as typo at small sizes.</span></div>
      <div className="row"><span className="k">03</span><span className="v"><b style={{color:'#E6E8EF'}}>phosphor terminal</b> — $ parabreak_. dev-tool credibility maxed. plays well with the CRT site direction. risk: generic without site context.</span></div>
      <div className="row"><span className="k">04</span><span className="v"><b style={{color:'#E6E8EF'}}>broken frame</b> — square w/ displaced corner. only abstract mark. license-safe, scales to favicon. recommended primary.</span></div>
      <div className="row"><span className="k">05</span><span className="v"><b style={{color:'#E6E8EF'}}>looking back</b> — dialogue box with eye + tail aimed at viewer. most narrative mark. risk: cute, fights the credibility goal.</span></div>
      <hr/>
      <h3>// recs</h3>
      <ul>
        <li>primary: <span style={{color:'#46E49E'}}>04</span> mark + 01 wordmark hybrid</li>
        <li>secondary (terminal contexts): 03</li>
        <li>cut: 05 (off-brief tone)</li>
      </ul>
      <hr/>
      <h3>// next</h3>
      <ul>
        <li>pick 1–2 → variations sweep</li>
        <li>then landing hero w/ chosen mark</li>
      </ul>
    </div>
  );
}

// =========================================================
// App — design canvas with sections
// =========================================================
function App() {
  return (
    <DesignCanvas
      title="parabreak / logo r1"
      subtitle="5 concepts · dark CRT system · phosphor green accent"
    >
      <DCSection id="hero" title="01 — Hero lockups" subtitle="Each concept at full presentation scale">
        <DCArtboard id="c1" label="01 · Bracket break" width={720} height={420}>
          <Logo1Hero />
        </DCArtboard>
        <DCArtboard id="c2" label="02 · Self-edit" width={720} height={420}>
          <Logo2Hero />
        </DCArtboard>
        <DCArtboard id="c3" label="03 · Phosphor terminal" width={720} height={420}>
          <Logo3Hero />
        </DCArtboard>
        <DCArtboard id="c4" label="04 · Broken frame ★" width={720} height={420}>
          <Logo4Hero />
        </DCArtboard>
        <DCArtboard id="c5" label="05 · Looking back" width={720} height={420}>
          <Logo5Hero />
        </DCArtboard>
      </DCSection>

      <DCSection id="vars" title="02 — Variations sweep" subtitle="Scale, mono, inverse, app icon — same artboard width">
        <DCArtboard id="v1" label="01 · Bracket break" width={720} height={220}>
          <Logo1Variations />
        </DCArtboard>
        <DCArtboard id="v2" label="02 · Self-edit" width={720} height={220}>
          <Logo2Variations />
        </DCArtboard>
        <DCArtboard id="v3" label="03 · Phosphor terminal" width={720} height={220}>
          <Logo3Variations />
        </DCArtboard>
        <DCArtboard id="v4" label="04 · Broken frame ★" width={720} height={220}>
          <Logo4Variations />
        </DCArtboard>
        <DCArtboard id="v5" label="05 · Looking back" width={720} height={220}>
          <Logo5Variations />
        </DCArtboard>
      </DCSection>

      <DCSection id="study" title="03 — Construction + notes" subtitle="Sample build of the recommended primary, plus design rationale">
        <DCArtboard id="cg" label="04 · Construction grid" width={720} height={480}>
          <ConstructionCard />
        </DCArtboard>
        <DCArtboard id="nt" label="Design rationale" width={360} height={480}>
          <NotesPanel />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
