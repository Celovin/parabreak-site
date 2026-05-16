/* global React */
const { useState } = React;

// ============================================================
// Section 03 — What breaks (4 categories of meta-tricks)
// Original illustrations only. No IP references.
// ============================================================
window.WhatBreaks = function WhatBreaks() {
  return (
    <section id="breaks" className="breaks">
      <div className="container">
        <window.SectionLabel num="02" text="What breaks" />
        <div className="breaks-head">
          <div>
            <h2>Four kinds of seam,<br/>over thirty hooks across them.</h2>
          </div>
          <div className="lead">
            <p>
              Meta moments cluster into four primitives. Parabreak ships typed scenario blocks for each — drop them in, no engine fork. The illustrations below are how each category <i>feels</i> at runtime, not screenshots of any specific game.
            </p>
          </div>
        </div>

        <div className="breaks-grid">
          {/* Save tamper */}
          <div className="bcard">
            <div>
              <div className="label"><span className="acc">A.</span> SAVE TAMPER</div>
              <h4>The game looks at the save folder.</h4>
              <p>Read, rename, delete, corrupt, or stamp persistent flags that survive across slots and reinstalls. The game notices what the player did <i>last time</i>.</p>
              <div className="blocks">
                <code>save_delete</code><code>save_corrupt</code><code>persistent_flag_set</code><code>slot_rename</code><code>save_integrity_check</code>
              </div>
            </div>
            <div className="illus save">
              <div className="file-list">
                <div className="file-row"><span>save_001.dat</span><span className="meta">12 KB · ok</span></div>
                <div className="file-row del"><span>save_002.dat</span><span className="meta">— deleted</span></div>
                <div className="file-row"><span>save_003.dat</span><span className="meta">8 KB · <span style={{color:'var(--red)'}}>corrupt</span></span></div>
                <div className="file-row new"><span>FLAG_PLAYER_NOTICED</span><span className="meta">true · persistent</span></div>
                <div className="file-row"><span>last_session.log</span><span className="meta">3m ago</span></div>
              </div>
            </div>
          </div>

          {/* Dialogue rewrite */}
          <div className="bcard">
            <div>
              <div className="label"><span className="acc">B.</span> DIALOGUE REWRITE</div>
              <h4>Lines change while the player reads.</h4>
              <p>Characters notice your save, your name, your last choice — and rewrite mid-sentence. Detect repeated choices, intercept back-button retries, pause for player action.</p>
              <div className="blocks">
                <code>text_corrupt</code><code>dialogue_reactive</code><code>wait_for_action</code><code>detect_repeat_choice</code><code>detect_back_attempt</code>
              </div>
            </div>
            <div className="illus dialog">
              <div className="lines">
                <div>› ARCHIVIST</div>
                <div>"Welcome back. Did you finish the <span className="strike">tutorial?</span>"</div>
                <div><span className="new">"…you skipped it."</span></div>
                <div className="narr">narrator: he wasn't supposed to know that.</div>
              </div>
            </div>
          </div>

          {/* UI deconstruction */}
          <div className="bcard">
            <div>
              <div className="label"><span className="acc">C.</span> UI DECONSTRUCTION</div>
              <h4>The menu lies, drifts, or refuses.</h4>
              <p>Destroy or disable buttons. Rename slots. Change the window title. Fail the quit. The chrome is now part of the story, not separate from it.</p>
              <div className="blocks">
                <code>ui_button_destroy</code><code>ui_button_disable</code><code>window_title_set</code><code>title_screen_variant</code><code>game_quit</code>
              </div>
            </div>
            <div className="illus ui">
              <div className="frame">
                <div className="title">main menu · v0.1</div>
                <div className="menu">
                  <div className="item kept">continue</div>
                  <div className="item gone">new game</div>
                  <div className="item">options</div>
                  <div className="item gone">quit</div>
                </div>
                <div className="title" style={{textAlign:'right', color:'var(--red)'}}>// 2 buttons destroyed</div>
              </div>
            </div>
          </div>

          {/* Plus tier */}
          <div className="bcard">
            <div>
              <div className="label"><span className="acc">D.</span> FAKE OS + WORLD LEAK · <span style={{color:'var(--violet)'}}>PLUS</span></div>
              <h4>The game escapes the window.</h4>
              <p>OS-style fake dialogs, clipboard read/write, real-time clock awareness, slot impersonation, scene live-reload. Use sparingly — these earn their reaction by being rare.</p>
              <div className="blocks">
                <code>fake_dialog</code><code>clipboard_write</code><code>clipboard_read</code><code>real_time_check</code><code>fake_permission_popup</code><code>slot_impersonation</code>
              </div>
            </div>
            <div className="illus fake">
              <div className="scanline"></div>
              <div className="alert">
                <div className="bar"><span>NOTICE</span><span>×</span></div>
                <div className="body">this is still inside the game. you just don't think so yet.</div>
                <div className="row">
                  <div className="b">cancel</div>
                  <div className="b p">ok</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// Section 04 — 35 Hooks (registry-verified)
// 13 core + 8 hooks + 14 plus = 35
// ============================================================
const HOOK_TIERS = {
  core: {
    label: 'CORE',
    sub: 'open source · MIT · ships with engine',
    color: 'var(--green)',
    hooks: [
      ['save_delete', 'Delete a save slot from disk.', { type: 'save_delete', slot: 0, mark_persistent: true }],
      ['save_corrupt', 'Mangle a save in a controlled, replayable way.', { type: 'save_corrupt', slot: 0, mode: 'header' }],
      ['persistent_flag_set', 'Stamp a flag that survives reinstalls.', { type: 'persistent_flag_set', key: 'FLAG_PLAYER_NOTICED', value: true }],
      ['persistent_flag_get', 'Read flags written across runs.', { type: 'persistent_flag_get', key: 'FLAG_PLAYER_NOTICED' }],
      ['ui_button_destroy', 'Remove a UI button entirely.', { type: 'ui_button_destroy', target: 'main_menu.quit' }],
      ['ui_button_disable', 'Grey out a button without removing it.', { type: 'ui_button_disable', target: 'main_menu.continue' }],
      ['window_title_set', 'Change the OS window title at runtime.', { type: 'window_title_set', value: 'parabreak — you again?' }],
      ['slot_rename', 'Rename a save slot in the list.', { type: 'slot_rename', slot: 0, name: 'archivist' }],
      ['title_screen_variant', 'Swap the title screen for a variant.', { type: 'title_screen_variant', id: 'after_first_death' }],
      ['save_integrity_check', 'Hash a save and react if tampered.', { type: 'save_integrity_check', slot: 0 }],
      ['game_quit', 'Force a clean quit (or refuse one).', { type: 'game_quit', allow: false }],
      ['game_crash', 'Simulate a crash for narrative effect.', { type: 'game_crash', style: 'segfault' }],
      ['window_close', 'Programmatically close the window.', { type: 'window_close' }],
    ],
  },
  hooks: {
    label: 'HOOKS',
    sub: '$49 · 8 reactive blocks',
    color: 'var(--amber)',
    hooks: [
      ['shader_effect', 'Scanlines, distort, chromatic. Time-bounded.', { type: 'shader_effect', effect: 'scanline', intensity: 0.45, duration: 1.5 }],
      ['audio_effect', 'Pitch, bitcrush, reverse. Per-channel.', { type: 'audio_effect', effect: 'pitch_shift', amount: -0.3 }],
      ['text_corrupt', 'Scramble or replace upcoming text.', { type: 'text_corrupt', mode: 'scramble_chars', target: 'next_block' }],
      ['dialogue_reactive', 'Branch a line on flags or save state.', { type: 'dialogue_reactive', flag: 'FLAG_PLAYER_NOTICED' }],
      ['input_hijack', 'Refuse, swap, or invert inputs briefly.', { type: 'input_hijack', mode: 'invert_xy', duration: 2.0 }],
      ['wait_for_action', 'Pause until the player does (or refuses) something.', { type: 'wait_for_action', expect: 'click_quit', timeout: 30 }],
      ['detect_repeat_choice', 'Notice when the player picks the same option twice.', { type: 'detect_repeat_choice', choice_id: 'lie_to_archivist', threshold: 2 }],
      ['detect_back_attempt', 'Catch reload / back-button retries.', { type: 'detect_back_attempt', within_seconds: 5 }],
    ],
  },
  plus: {
    label: 'PLUS',
    sub: '$69 · 14 advanced blocks',
    color: 'var(--violet)',
    hooks: [
      ['fake_dialog', 'OS-styled fake popup, in-engine.', { type: 'fake_dialog', style: 'windows_error', title: 'Notice', body: 'this is still inside the game.' }],
      ['fake_permission_popup', 'Display a fake permission prompt.', { type: 'fake_permission_popup', kind: 'mic_access' }],
      ['clipboard_write', 'Write to system clipboard with consent prompt.', { type: 'clipboard_write', value: 'go look at your saves.' }],
      ['clipboard_read', 'Read clipboard with consent prompt.', { type: 'clipboard_read', on_match: 'reactive_line' }],
      ['real_time_check', 'Read wall-clock; react to date / hour.', { type: 'real_time_check', condition: 'after_midnight' }],
      ['user_file_read', 'Read a file from a sandboxed user path.', { type: 'user_file_read', path: 'user://notes.txt' }],
      ['user_file_write', 'Write a file to a sandboxed user path.', { type: 'user_file_write', path: 'user://letter.txt', body: 'I see you.' }],
      ['cross_slot_bleed', 'Make state from one slot leak into another.', { type: 'cross_slot_bleed', from: 1, to: 0, key: 'memory' }],
      ['slot_impersonation', 'Make slot N appear to be slot M to the player.', { type: 'slot_impersonation', shown_as: 0, actually: 2 }],
      ['scene_live_reload', 'Hot-swap a scene mid-play with a variant.', { type: 'scene_live_reload', target: 'res://scenes/room.tscn', variant: 'after_meta' }],
      ['text_i18n', 'Locale-aware text variants per scenario block.', { type: 'text_i18n', key: 'NARRATOR_GREETING', locales: { en: '…', ko: '…' } }],
      ['discord_presence', 'Set Discord rich presence as a narrative beat.', { type: 'discord_presence', state: 'still inside the game', details: 'archivist · day 3' }],
      ['steam_overlay_awareness', 'React when Steam overlay opens / closes.', { type: 'steam_overlay_awareness', on: 'overlay_open' }],
      ['accessibility_hook', 'Branch on screen-reader / high-contrast / reduced motion.', { type: 'accessibility_hook', flag: 'reduced_motion' }],
    ],
  },
};

function JsonRender({ obj }) {
  const lines = JSON.stringify(obj, null, 2).split('\n');
  return (
    <>
      {lines.map((ln, i) => {
        // simple tokenization
        const parts = [];
        const re = /"([^"]+)"\s*:|"([^"]*)"|(true|false|null)|([-]?\d+\.?\d*)/g;
        let last = 0; let m; let key = 0;
        while ((m = re.exec(ln)) !== null) {
          if (m.index > last) parts.push(<span key={key++}>{ln.slice(last, m.index)}</span>);
          if (m[1] !== undefined) parts.push(<span key={key++} className="k">{`"${m[1]}"`}</span>, <span key={key++}>:</span>);
          else if (m[2] !== undefined) parts.push(<span key={key++} className="s">{`"${m[2]}"`}</span>);
          else if (m[3] !== undefined) parts.push(<span key={key++} className="b">{m[3]}</span>);
          else if (m[4] !== undefined) parts.push(<span key={key++} className="n">{m[4]}</span>);
          last = re.lastIndex;
        }
        if (last < ln.length) parts.push(<span key={key++}>{ln.slice(last)}</span>);
        return <div key={i}>{parts}</div>;
      })}
    </>
  );
}

window.Hooks = function Hooks() {
  const [tier, setTier] = useState('core');
  const [plusExpanded, setPlusExpanded] = useState(false);
  const t = HOOK_TIERS[tier];
  const visibleHooks = (tier === 'plus' && !plusExpanded) ? t.hooks.slice(0, 8) : t.hooks;
  return (
    <section id="hooks" className="hooks">
      <div className="container">
        <window.SectionLabel num="03" text="35 hooks" />
        <div className="hooks-head">
          <div>
            <h2><span className="acc" style={{fontFamily:'var(--f-mono)', fontSize:'0.7em', verticalAlign:'0.18em', marginRight:'0.15em'}}>35</span> typed blocks.<br/>One scenario format.</h2>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--f-mono)', fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6 }}>
              Every hook is a JSON block in a scenario file. Same schema, same loader, same hot-reload. <span style={{color:'var(--green)'}}>Core</span> ships open. <span style={{color:'var(--amber)'}}>Hooks</span> + <span style={{color:'var(--violet)'}}>Plus</span> unlock the reactive and advanced layers.
            </p>
          </div>
        </div>

        <div className="hooks-tabs">
          {Object.entries(HOOK_TIERS).map(([key, v]) => (
            <button
              key={key}
              className={"hooks-tab " + (tier === key ? 'active' : '')}
              onClick={() => setTier(key)}
            >
              <span>{v.label}</span>
              <span className="count">{v.hooks.length}</span>
            </button>
          ))}
        </div>

        <div className="hooks-grid">
          {visibleHooks.map(([name, desc, json], i) => (
            <div className="hcard" key={name}>
              <div className="top">
                <span className="id">{String(i + 1).padStart(2, '0')} · {name}</span>
                <span className="tier" style={{ color: t.color, borderColor: 'var(--line-2)' }}>{t.label}</span>
              </div>
              <div className="name">{name}</div>
              <div className="desc">{desc}</div>
              <div className="json"><JsonRender obj={json} /></div>
            </div>
          ))}
        </div>

        {tier === 'plus' && (
          <div className="hooks-expand">
            <button className="btn" onClick={() => setPlusExpanded(!plusExpanded)}>
              {plusExpanded
                ? <>Collapse to first 8 <span className="arrow">↑</span></>
                : <>Show all 14 plus blocks <span className="arrow">↓</span></>}
            </button>
          </div>
        )}

        <div className="hooks-foot">
          <span>showing <span className="acc">{visibleHooks.length}</span> of {t.hooks.length} {t.label.toLowerCase()} · 35 total · {t.sub}</span>
          <span>// hover any block to simulate the effect (visual only on this page)</span>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// Section 05 — Korean Tier Signal
// ============================================================
window.KoreanSection = function KoreanSection() {
  return (
    <section id="korean" className="korean">
      <div className="container korean-grid">
        <div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.2em', color: 'var(--mute)', textTransform: 'uppercase', marginBottom: 18 }}>
            <span style={{ color: 'var(--green)' }}>04</span> · 한국 시장 신호
          </div>
          <h2>한국에서 만든<br/><span className="acc">메타 게임</span>을 위해.</h2>
          <p className="lead">
            한국 인디 씬은 메타 픽션과 4번째 벽 깨기에 가장 빨리 반응하는 시장 중 하나입니다. <b>parabreak는 한국어 텍스트, 한글 시스템 메시지, 한국 인디 페스티벌 트랙</b>을 1순위로 지원합니다.
          </p>

          <div className="signals">
            <div className="sig">
              <span className="num">01</span>
              <span><b>한글 narration</b> · 자모 단위 text_corrupt · 띄어쓰기 보존</span>
              <span className="arrow">→</span>
            </div>
            <div className="sig">
              <span className="num">02</span>
              <span><b>BIC · 인디크래프트</b> 부스 자료 템플릿 · 트레일러 자막</span>
              <span className="arrow">→</span>
            </div>
            <div className="sig">
              <span className="num">03</span>
              <span><b>text_i18n</b> 블록 · 한국어 시나리오 변형 동시 번역</span>
              <span className="arrow">→</span>
            </div>
            <div className="sig">
              <span className="num">04</span>
              <span><b>한국어 docs</b> · 첫 출시일부터 동시 번역</span>
              <span className="arrow">→</span>
            </div>
          </div>
        </div>

        <div className="korean-side">
          <div className="stamp">// SIGNAL 01 · DEV NOTE</div>
          <h4>왜 한국부터?</h4>
          <p>
            메타 게임의 임팩트는 <b>"개발자가 나를 본다"</b>는 감각에서 옵니다. 그 감각은 번역체에서 절반쯤 죽습니다. parabreak의 첫 출시는 영어와 한국어를 동시에, 같은 품질로 다룹니다 — 한국 개발자가 영어로 번역해 출시하는 게임에서도, 한국어 원문 게임에서도, 같은 hook이 자연스럽게 동작하도록.
          </p>
          <hr/>
          <div className="qt">
            "한국 인디씬은 시스템 자체를 의심하는 게임에 관대하다. 그래서 메타 엔진의 첫 검증은 여기서 한다."
            <cite>— team note, 2026.04</cite>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// Section 06 — Pricing
// ============================================================
window.Pricing = function Pricing() {
  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <window.SectionLabel num="05" text="Pricing" />
        <div className="pricing-head">
          <div>
            <div className="price-badge">
              <span className="dot"></span>
              <span>prices rise after Steam launch</span>
            </div>
            <h2>Three tiers.<br/>One <span className="acc">install</span>.</h2>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--f-mono)', fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6 }}>
              The engine is the engine. Tiers unlock more block types — they don't ship a different runtime. Buy the tier you need, upgrade later, the scenarios still load. <b>One-time payment, no subscriptions.</b>
            </p>
          </div>
        </div>

        <div className="price-grid">
          <div className="pcard">
            <div className="label">VN CORE · <span className="acc">free</span></div>
            <div className="name">parabreak<br/>VN Core</div>
            <div className="price"><span className="cur">$</span>0<span className="per">/ MIT forever</span></div>
            <div className="future">post-launch: still free</div>
            <div className="desc">The 13 core blocks for visual novels. Save tampering, persistent flags, UI button control, title-screen variants. Open source forever.</div>
            <ul>
              <li>13 core blocks</li>
              <li>scenario JSON loader</li>
              <li>Godot 4.x addon</li>
              <li className="x">no shaders / audio FX</li>
              <li className="x">no fake_dialog / real_time</li>
            </ul>
            <div className="cta"><a href="#" className="btn" style={{width:'100%', justifyContent:'center'}}>Install <span className="arrow">→</span></a></div>
          </div>

          <div className="pcard">
            <div className="label">HOOKS</div>
            <div className="name">parabreak<br/>Hooks</div>
            <div className="price"><span className="cur">$</span>49<span className="per">/ one-time</span></div>
            <div className="future">post-launch: $69</div>
            <div className="desc">Adds the 8 reactive blocks. Shader and audio effects, text corruption, input hijack, repeat-choice / back-attempt detection — the toolkit for moments the player <i>feels</i>.</div>
            <ul>
              <li>everything in Core</li>
              <li>+ 8 reactive blocks</li>
              <li>shader / audio / text FX</li>
              <li>wait_for_action · detect_repeat_choice</li>
              <li className="x">no Plus blocks</li>
            </ul>
            <div className="cta"><a href="#" className="btn" style={{width:'100%', justifyContent:'center'}}>Buy Hooks <span className="arrow">→</span></a></div>
          </div>

          <div className="pcard">
            <div className="label">PLUS</div>
            <div className="name">parabreak<br/>Plus</div>
            <div className="price"><span className="cur">$</span>69<span className="per">/ one-time</span></div>
            <div className="future">post-launch: $149</div>
            <div className="desc">Adds the 14 advanced blocks. Fake OS dialogs, clipboard read/write, real-time, slot impersonation, scene live-reload, Discord / Steam awareness — the rare "did the game just do that?" effects.</div>
            <ul>
              <li>everything in Hooks</li>
              <li>+ 14 advanced blocks</li>
              <li>fake_dialog · clipboard r/w</li>
              <li>scene_live_reload · text_i18n</li>
              <li>discord_presence · steam_overlay</li>
            </ul>
            <div className="cta"><a href="#" className="btn primary" style={{width:'100%', justifyContent:'center'}}>Buy Plus <span className="arrow">→</span></a></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// Dialogic 2 companion banner (after Pricing)
// ============================================================
window.DialogicBanner = function DialogicBanner() {
  return (
    <section className="dialogic-banner">
      <div className="container dialogic-row">
        <div className="dlg-mark">
          {/* Dialogic-evoking mark: speech-bubble bracket pair */}
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <rect x="6" y="10" width="30" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" />
            <path d="M 14 32 L 14 40 L 22 32" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="miter" />
            <rect x="20" y="22" width="30" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.55" />
            <path d="M 42 44 L 42 50 L 36 44" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="miter" opacity="0.55" />
          </svg>
        </div>
        <div className="dlg-body">
          <div className="dlg-eyebrow">// COMPATIBLE WITH</div>
          <div className="dlg-title"><b>Dialogic 2</b> — out of the box.</div>
          <div className="dlg-sub">
            Parabreak's <code>dialogue_reactive</code>, <code>text_corrupt</code>, <code>wait_for_action</code> and <code>detect_repeat_choice</code> blocks proxy through Dialogic 2 timelines via a thin adapter. Drop both addons in, no patching required.
          </div>
        </div>
        <div className="dlg-actions">
          <a href="#" className="btn">Adapter docs <span className="arrow">→</span></a>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// Section 07 — FAQ
// ============================================================
const FAQS = [
  {
    q: "Is this a fork of Godot?",
    a: <>No. Parabreak ships as a standard addon under <code>res://addons/parabreak</code> and registers an autoload. You stay on stock Godot 4.x and update normally — we track the engine, not the other way around.</>,
  },
  {
    q: "Can players mod parabreak hooks at runtime?",
    a: <>Yes — scenario blocks are JSON and the loader supports a <code>res://mods/</code> override path. Modders can swap or extend block handlers without recompiling. We document the mod surface in the docs site, and the <code>Plus</code> tier ships an example mod template.</>,
  },
  {
    q: "Does it play nice with Dialogic 2?",
    a: <>Parabreak doesn't replace dialogue plugins — it augments them. The <code>dialogue_reactive</code>, <code>wait_for_action</code>, and <code>detect_repeat_choice</code> blocks proxy through whatever dialogue system you're using, including Dialogic 2. There's a thin adapter; we'll keep it current.</>,
  },
  {
    q: "What about commercial use? Royalties?",
    a: <>None. The Core is MIT licensed. Hooks and Plus tiers are commercial licenses with no royalties — buy once, ship forever, including paid Steam releases. We only ask that you don't redistribute the paid blocks as a separate product.</>,
  },
  {
    q: "Can I buy Plus, then downgrade?",
    a: <>You can. Scenarios using Plus blocks will refuse to load on a Hooks or Core install with a clear error pointing to which block needs the upgrade — your project doesn't break silently.</>,
  },
  {
    q: "Is fake_dialog deceptive? Will Steam reject it?",
    a: <>Used as a narrative beat (rare, in-context, with a clear "you're still in the game" reveal), it's standard meta-fiction craft. Used to actually deceive the player — phishing, fake updates — Steam will reject and so will we. The block ships with a <code>safe_mode</code> default that watermarks the dialog corner with a small "in-game" tag unless you opt out.</>,
  },
  {
    q: "Why Korean docs at launch?",
    a: <>Because the meta-fiction reading is sharper there, and our team can ship that quality without translating through a third party. See the Korean Tier Signal section above.</>,
  },
];

window.FAQ = function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="faq">
      <div className="container">
        <window.SectionLabel num="06" text="FAQ" />
        <div className="faq-head">
          <h2>Practical answers,<br/>before you install.</h2>
        </div>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div className="faq-item" key={i}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span className="q-text">{f.q}</span>
                <span className="toggle">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <div className="faq-a">
                  <div className="spacer"></div>
                  <div className="body">{f.a}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// Section 08 — Community
// ============================================================
window.Community = function Community() {
  return (
    <section id="community" className="community">
      <div className="container">
        <window.SectionLabel num="07" text="Community" />
        <div style={{ marginBottom: 36, display:'grid', gridTemplateColumns:'1fr 1fr', gap: 64, alignItems:'end' }}>
          <h2>Where the engine<br/>gets weird with you.</h2>
          <p style={{ fontFamily: 'var(--f-mono)', fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6 }}>
            Parabreak is small enough that the people building it talk to the people shipping with it. Here's where that happens.
          </p>
        </div>
        <div className="com-grid">
          <div className="ccard">
            <div className="ctype">CHAT</div>
            <h4>Dev chat</h4>
            <p>Real-time questions, scenario reviews, build-shares. Korean and English channels, both staffed by the team.</p>
            <div className="meta-line"><span>~340 members</span><span className="acc">join →</span></div>
          </div>
          <div className="ccard">
            <div className="ctype">CODE</div>
            <h4>Open issues</h4>
            <p>Core is MIT and developed in the open. File issues, send PRs, watch the roadmap update in real time.</p>
            <div className="meta-line"><span>v0.1 · 18 open</span><span className="acc">repo →</span></div>
          </div>
          <div className="ccard">
            <div className="ctype">SHOWCASE</div>
            <h4>Scenario gallery</h4>
            <p>Community-submitted scenario JSONs you can drop into your project as a starting point. Tag your own, get featured.</p>
            <div className="meta-line"><span>27 scenarios · growing</span><span className="acc">browse →</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// Footer
// ============================================================
window.Footer = function Footer() {
  return (
    <footer className="foot">
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <div style={{ display:'flex', alignItems:'center', gap: 14 }}>
              <window.BrokenFrameMark size={42} stroke={8} />
              <span className="word">para<span className="br">break</span></span>
            </div>
            <p>The meta engine for Godot. Build games that notice you back.</p>
          </div>
          <div className="foot-col">
            <h5>Engine</h5>
            <ul>
              <li><a href="#">Install</a></li>
              <li><a href="#">Hooks reference</a></li>
              <li><a href="#">Scenario format</a></li>
              <li><a href="changelog.html">Changelog</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Buy</h5>
            <ul>
              <li><a href="#">Hooks · $49</a></li>
              <li><a href="#">Plus · $69</a></li>
              <li><a href="#">Compare tiers</a></li>
              <li><a href="#">License FAQ</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Community</h5>
            <ul>
              <li><a href="#">Dev chat</a></li>
              <li><a href="#">Repo · MIT</a></li>
              <li><a href="#">Scenario gallery</a></li>
              <li><a href="#">한국어 docs</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>About</h5>
            <ul>
              <li><a href="#">Team</a></li>
              <li><a href="manifesto.html">Manifesto</a></li>
              <li><a href="#">Press kit</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bot">
          <span>© parabreak · 2026 · MIT core · <span className="acc">made small, on purpose</span></span>
          <span className="right">
            <span>v0.1 · public alpha</span>
            <span>// you are still inside the game</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
