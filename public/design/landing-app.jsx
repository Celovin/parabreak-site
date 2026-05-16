/* global React, ReactDOM */
const { useState, useEffect } = React;

// ============================================================
// Section: Under the engine — credibility row
// ============================================================
function UnderEngine() {
  return (
    <section className="under">
      <div className="container under-row">
        <div className="label">// compatibility</div>
        <div className="marks">
          <div className="mark"><span className="badge">ENGINE</span> Godot 4.x</div>
          <div className="mark"><span className="badge">PLUGIN</span> Dialogic 2 ready</div>
          <div className="mark"><span className="badge">LICENSE</span> MIT core</div>
          <div className="mark"><span className="badge">PLATFORMS</span> win · mac · linux</div>
          <div className="mark"><span className="badge">BUILT WITH</span> an indie VN (early access)</div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section: What is parabreak — 3 cards
// ============================================================
function WhatIs() {
  return (
    <section id="what" className="what">
      <div className="container">
        <window.SectionLabel num="01" text="What is parabreak" />
        <div className="what-head">
          <div>
            <h2>An engine layer<br/>that knows it's an engine.</h2>
          </div>
          <div className="lead">
            <p>
              Most game engines pretend the player isn't there. <b>Parabreak is the opposite.</b> It exposes the seams — save files, dialogue, the menu, the camera — as <span className="acc">first-class hooks</span> your story can react to. <span className="strike">Plug-in.</span> Engine.
            </p>
          </div>
        </div>

        <div className="what-cards">
          <div className="wcard">
            <div className="num"><span className="acc">01.</span> THE PROBLEM</div>
            <h4>Meta moments are one-offs.</h4>
            <p>
              Every "the game knows" trick is a 200-line hand-rolled hack — save scanning, file IO, custom dialogue patches. It works once, then breaks on the next patch.
            </p>
            <div className="strip">{`# fragile, hand-rolled
if FileAccess.file_exists(
    "user://save_001.dat"):
    `}<span className="red">// custom parser. brittle.</span></div>
            <div className="meta"><span>before parabreak</span><span className="acc">~200 LOC / hook</span></div>
          </div>

          <div className="wcard">
            <div className="num"><span className="acc">02.</span> THE PRIMITIVE</div>
            <h4>Hooks. <span style={{whiteSpace:'nowrap'}}>Thirty-five</span> and counting.</h4>
            <p>
              Save tampering, dialogue rewrites, choice locks, menu drift, narrator interruption — each one a typed block you drop into a scenario JSON.
            </p>
            <div className="strip">{`{"type": "save_delete",
  "slot": 0,
  `}<span className="green">{`"mark_persistent": true`}</span>{`}
`}<span className="mute">// one block. that's the hook.</span></div>
            <div className="meta"><span>with parabreak</span><span className="acc">1 block</span></div>
          </div>

          <div className="wcard">
            <div className="num"><span className="acc">03.</span> THE ENGINE</div>
            <h4>Native to Godot 4.x.</h4>
            <p>
              GDScript-first. Plays nicely with Dialogue plugins. Doesn't require a fork. Ships as an addon you can vendor or drop into <code style={{color:'var(--green)'}}>res://addons</code>.
            </p>
            <div className="strip">{`# project.godot
[autoload]
parabreak="res://addons/parabreak"
# `}<span className="green">that's the install.</span></div>
            <div className="meta"><span>install</span><span className="acc">addon · no fork</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Hero section wrapper
// ============================================================
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
              The meta engine<br/>
              for <span className="br">Godot</span>.
            </h1>
          </div>

          <p className="hero-sub">
            Parabreak is a runtime layer that gives your characters access to the things outside the game — the save file, the menu, the player's last session, the system clock. <b>Build games that notice you back</b>, without rewriting the engine.
          </p>

          <div className="hero-actions">
            <a href="#" className="btn primary">Install parabreak <span className="arrow">→</span></a>
            <a href="#hooks" className="btn">See all 35 hooks</a>
            <a href="#docs" className="btn ghost">Read docs</a>
          </div>

          <div className="hero-stickers">
            <div className="sticker-pill"><span className="dot"></span>Break the fourth wall · commercially</div>
            <div className="sticker-pill"><span className="dot amber"></span>Your player deleted their save</div>
            <div className="sticker-pill dialogic"><span className="dot violet"></span>Compatible with <b>Dialogic 2</b></div>
          </div>

          <div className="hero-meta">
            <div className="item"><div className="k">install</div><div className="v">1 line · <span className="acc">addon</span></div></div>
            <div className="item"><div className="k">hooks</div><div className="v"><span className="acc">35</span> typed signals · growing</div></div>
            <div className="item"><div className="k">license</div><div className="v">MIT core · <span className="acc">commercial OK</span></div></div>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <window.HeroAnim />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// App
// ============================================================
function App() {
  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    document.body.classList.toggle('theme-dark', theme === 'dark');
    document.body.classList.toggle('theme-light', theme === 'light');
  }, [theme]);

  return (
    <>
      <window.Nav theme={theme} setTheme={setTheme} />
      <Hero />
      <UnderEngine />
      <WhatIs />
      <window.WhatBreaks />
      <window.Hooks />
      <window.KoreanSection />
      <window.Pricing />
      <window.DialogicBanner />
      <window.FAQ />
      <window.Community />
      <window.Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
