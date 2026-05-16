/* global React */
const { useState, useEffect, useRef } = React;

// ============================================================
// Hero — dialogue self-edit, mapped to real parabreak JSON blocks
// 6 steps · 600/700/600/900/1000/1200 = 5.0s cycle
// ============================================================
const STEPS = [
  {
    name: 'TYPE',
    dur: 600,
    block: { type: 'narration', text: 'the dialogue types itself out, like always.' },
    body: <>the dialogue types itself out, like always<span className="caret"></span></>,
    callouts: [{ k: '01', v: 'block: narration' }],
  },
  {
    name: 'PAUSE',
    dur: 700,
    block: { type: 'narration', text: '...' },
    body: <>the dialogue types itself out, like always. <span style={{color:'var(--mute)'}}>…</span><span className="caret"></span></>,
    callouts: [{ k: '01', v: 'block: narration' }, { k: '02', v: 'beat · narration "..."' }],
  },
  {
    name: 'NOTICE',
    dur: 600,
    block: { type: 'persistent_flag_set', key: 'FLAG_PLAYER_NOTICED', value: true },
    body: <>the dialogue types itself out, like always. …<span className="caret"></span></>,
    callouts: [
      { k: '02', v: 'beat · narration "..."' },
      { k: '03', v: 'persistent_flag_set' },
      { k: '04', v: 'FLAG_PLAYER_NOTICED = true' },
    ],
  },
  {
    name: 'REWRITE',
    dur: 900,
    block: { type: 'text_corrupt', mode: 'scramble_chars', target: 'next_block' },
    body: <>the dialogue <span className="strike">types itself out</span> <span className="new">writes itself</span>. …<span className="caret"></span></>,
    callouts: [
      { k: '03', v: 'persistent_flag_set' },
      { k: '05', v: 'text_corrupt · scramble_chars' },
      { k: '06', v: 'target: next_block' },
    ],
  },
  {
    name: 'BREAK',
    dur: 1000,
    block: { type: 'shader_effect', effect: 'scanline', intensity: 0.6, duration: 0.8 },
    body: <>the dialogue <span className="new">writes itself</span>.<br/><span className="new">you noticed.</span><span className="caret"></span></>,
    callouts: [
      { k: '05', v: 'text_corrupt · scramble_chars' },
      { k: '07', v: 'shader_effect · scanline' },
      { k: '08', v: 'intensity 0.6 · 0.8s' },
    ],
  },
  {
    name: 'CHOICE',
    dur: 1200,
    block: { type: 'narration', text: 'you noticed. now choose.' },
    body: <>you noticed. now choose.<span className="caret"></span></>,
    callouts: [
      { k: '07', v: 'shader_effect · scanline' },
      { k: '09', v: 'narration · resume' },
      { k: '10', v: 'flag persists across runs' },
    ],
    showChoices: true,
  },
];

window.HeroAnim = function HeroAnim() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const tRef = useRef(null);
  useEffect(() => {
    if (!playing) return;
    tRef.current = setTimeout(() => setStep((s) => (s + 1) % STEPS.length), STEPS[step].dur);
    return () => clearTimeout(tRef.current);
  }, [step, playing]);
  const cur = STEPS[step];

  // glitch overlay during BREAK step
  const breaking = cur.name === 'BREAK';

  return (
    <div className="hero-anim">
      <div className="anim-header">
        <span className="lights"><span></span><span></span><span></span></span>
        <span className="file">// scene_03 · scenario.json</span>
        <span className="right">block {step + 1}/{STEPS.length} · {cur.name}</span>
      </div>
      <div className={"dialog-stage" + (breaking ? ' breaking' : '')}>
        <div className="character">
          <div className="portrait">
            <span className="scan"></span>
          </div>
          <div style={{ flex: 1, paddingTop: 4 }}>
            <div className="name">
              ARCHIVIST <span className="meta">// flag: {step >= 2 ? <span style={{color:'var(--green)'}}>NOTICED=true</span> : 'NOTICED=false'}</span>
            </div>
            <div className="body">
              <span className="typed" key={step}>{cur.body}</span>
            </div>
          </div>
        </div>

        {cur.showChoices ? (
          <div className="choices">
            <div className="choice"><span className="pre">›</span><span>"sorry. I'll restart."</span></div>
            <div className="choice locked">
              <span className="pre">›</span>
              <span>"I didn't notice anything."</span>
              <span className="lock-tag">locked · FLAG_PLAYER_NOTICED</span>
            </div>
            <div className="choice selected"><span className="pre">›</span><span>"how do you remember?"</span></div>
          </div>
        ) : (
          <div className="choices" style={{ visibility: 'hidden' }}>
            <div className="choice"><span className="pre">›</span><span>placeholder</span></div>
            <div className="choice"><span className="pre">›</span><span>placeholder</span></div>
            <div className="choice"><span className="pre">›</span><span>placeholder</span></div>
          </div>
        )}

        <div className="hero-callouts">
          {[0,1,2,3,4].map((i) => {
            const c = cur.callouts[i];
            return (
              <div key={i} className={"item " + (c ? 'on' : '')}>
                {c && <><span className="k">{c.k}</span> · {c.v}</>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="anim-controls">
        <button onClick={() => setPlaying(!playing)}>{playing ? '❚❚ pause' : '▶ play'}</button>
        <button onClick={() => { setStep(0); setPlaying(true); }}>↺ restart</button>
        <span className="step">/ {cur.name.toLowerCase()} · 5.0s loop</span>
      </div>
    </div>
  );
};
