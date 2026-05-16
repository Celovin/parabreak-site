/* global React, ReactDOM */
const { useState } = React;

// ============================================================
// 35 block icons — 24×24 viewBox · 1.5 ink stroke · semantic accent
// ============================================================

// shared shorthand for SVG props
const SV = (size) => ({
  width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
});

const ink = '#E6E8EF';
const green = '#46E49E';
const red = '#E44C4C';
const amber = '#F2B544';

// ============================================================
// CORE 13
// ============================================================
const I = {
  save_delete: (s = 24) => (
    <svg {...SV(s)}>
      {/* file */}
      <path d="M5 3h9l3 3v15H5z" stroke={ink} strokeWidth="1.5" strokeLinejoin="miter"/>
      <path d="M14 3v3h3" stroke={ink} strokeWidth="1.5"/>
      {/* red strike */}
      <path d="M3 19L21 5" stroke={red} strokeWidth="2"/>
    </svg>
  ),

  save_corrupt: (s = 24) => (
    <svg {...SV(s)}>
      <path d="M5 3h9l3 3v15H5z" stroke={ink} strokeWidth="1.5" strokeLinejoin="miter"/>
      <path d="M14 3v3h3" stroke={ink} strokeWidth="1.5"/>
      {/* jagged glyph inside */}
      <path d="M8 13l2 -2l1 2l2 -3l2 4" stroke={amber} strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
    </svg>
  ),

  persistent_flag_set: (s = 24) => (
    <svg {...SV(s)}>
      <path d="M5 3v18" stroke={ink} strokeWidth="1.5"/>
      <path d="M5 4h12l-3 3l3 3H5" fill={green} stroke={green} strokeWidth="1.5" strokeLinejoin="miter"/>
    </svg>
  ),

  persistent_flag_get: (s = 24) => (
    <svg {...SV(s)}>
      <path d="M5 3v18" stroke={ink} strokeWidth="1.5"/>
      <circle cx="5" cy="3" r="1.5" fill={green}/>
      <path d="M5 5h12l-3 3l3 3H5" stroke={ink} strokeWidth="1.5" strokeLinejoin="miter"/>
    </svg>
  ),

  ui_button_destroy: (s = 24) => (
    <svg {...SV(s)}>
      <rect x="3" y="8" width="18" height="8" stroke={ink} strokeWidth="1.5"/>
      <path d="M9 10l6 4M15 10l-6 4" stroke={red} strokeWidth="1.8"/>
    </svg>
  ),

  ui_button_disable: (s = 24) => (
    <svg {...SV(s)}>
      <rect x="3" y="8" width="18" height="8" stroke={ink} strokeWidth="1.5" opacity="0.6"/>
      {/* diagonal hatch */}
      <path d="M5 16l4 -8M11 16l4 -8M17 16l4 -8" stroke={ink} strokeWidth="1" opacity="0.6"/>
      <path d="M3 12h18" stroke={green} strokeWidth="1.5" strokeDasharray="2 1.5"/>
    </svg>
  ),

  window_title_set: (s = 24) => (
    <svg {...SV(s)}>
      <rect x="3" y="4" width="18" height="16" stroke={ink} strokeWidth="1.5"/>
      <path d="M3 9h18" stroke={ink} strokeWidth="1.5"/>
      {/* caret */}
      <path d="M9 6.5v2M9 6.5h1M9 8.5h1" stroke={green} strokeWidth="1.4"/>
      <path d="M11 7h6" stroke={green} strokeWidth="1.4"/>
    </svg>
  ),

  slot_rename: (s = 24) => (
    <svg {...SV(s)}>
      <path d="M4 4h9l3 3v9H4z" stroke={ink} strokeWidth="1.5" strokeLinejoin="miter"/>
      <path d="M13 4v3h3" stroke={ink} strokeWidth="1.5"/>
      <path d="M9 11h6" stroke={ink} strokeWidth="1"/>
      <path d="M9 13h4" stroke={ink} strokeWidth="1"/>
      {/* rename arrow */}
      <path d="M15 18l5 -5l-2 -2l-5 5v2z" stroke={green} strokeWidth="1.5" strokeLinejoin="miter"/>
    </svg>
  ),

  title_screen_variant: (s = 24) => (
    <svg {...SV(s)}>
      <rect x="3" y="5" width="14" height="10" stroke={ink} strokeWidth="1.5"/>
      <rect x="7" y="9" width="14" height="10" stroke={green} strokeWidth="1.5"/>
      <path d="M11 13h6" stroke={green} strokeWidth="1.2"/>
    </svg>
  ),

  save_integrity_check: (s = 24) => (
    <svg {...SV(s)}>
      <path d="M5 3h9l3 3v15H5z" stroke={ink} strokeWidth="1.5" strokeLinejoin="miter"/>
      <path d="M14 3v3h3" stroke={ink} strokeWidth="1.5"/>
      <path d="M8 13l2.5 2.5L16 10" stroke={green} strokeWidth="1.8" strokeLinejoin="miter" strokeLinecap="square"/>
    </svg>
  ),

  game_quit: (s = 24) => (
    <svg {...SV(s)}>
      <path d="M11 4h-7v16h7" stroke={ink} strokeWidth="1.5" strokeLinejoin="miter"/>
      <path d="M9 12h12M15 7l6 5l-6 5" stroke={red} strokeWidth="1.8" strokeLinejoin="miter"/>
    </svg>
  ),

  game_crash: (s = 24) => (
    <svg {...SV(s)}>
      {/* 3 fragments */}
      <path d="M3 4l6 0l-2 7l-4 -1z" stroke={red} strokeWidth="1.5" strokeLinejoin="miter"/>
      <path d="M11 5l9 -1l1 8l-7 1z" stroke={ink} strokeWidth="1.5" strokeLinejoin="miter"/>
      <path d="M5 14l8 1l1 6l-9 -1z" stroke={ink} strokeWidth="1.5" strokeLinejoin="miter"/>
    </svg>
  ),

  window_close: (s = 24) => (
    <svg {...SV(s)}>
      <rect x="3" y="4" width="18" height="16" stroke={ink} strokeWidth="1.5"/>
      <path d="M3 9h18" stroke={ink} strokeWidth="1.5"/>
      <path d="M16 6.5l3 1M19 6.5l-3 1" stroke={red} strokeWidth="1.6"/>
    </svg>
  ),

  // ============================================================
  // HOOKS 8
  // ============================================================
  shader_effect: (s = 24) => (
    <svg {...SV(s)}>
      <rect x="3" y="4" width="18" height="16" stroke={ink} strokeWidth="1.5"/>
      <path d="M3 8L21 8M3 12L21 12M3 16L21 16" stroke={green} strokeWidth="0.9"/>
      <path d="M3 10L21 10M3 14L21 14M3 18L21 18" stroke={green} strokeWidth="0.5" opacity="0.5"/>
    </svg>
  ),

  audio_effect: (s = 24) => (
    <svg {...SV(s)}>
      <path d="M4 9h3l4 -3v12l-4 -3h-3z" stroke={ink} strokeWidth="1.5" strokeLinejoin="miter"/>
      <path d="M14 8c2 1.5 2 6.5 0 8M17 6c3 2.5 3 9.5 0 12" stroke={green} strokeWidth="1.5"/>
    </svg>
  ),

  text_corrupt: (s = 24) => (
    <svg {...SV(s)}>
      <text x="4" y="17" fontFamily="Space Grotesk" fontWeight="700" fontSize="15" fill={ink} letterSpacing="-0.04em">Aa</text>
      <path d="M3 13l16 -3" stroke={amber} strokeWidth="1.6"/>
      <path d="M14 7l2 2l-1 2l1 2" stroke={amber} strokeWidth="1.3" strokeLinejoin="miter" fill="none"/>
    </svg>
  ),

  dialogue_reactive: (s = 24) => (
    <svg {...SV(s)}>
      <path d="M3 5h12v9h-6l-3 3v-3h-3z" stroke={ink} strokeWidth="1.5" strokeLinejoin="miter"/>
      <path d="M15 9l4 2l-4 2v-1h-2" stroke={green} strokeWidth="1.5" strokeLinejoin="miter"/>
      <path d="M15 17l4 -2" stroke={green} strokeWidth="1.5"/>
    </svg>
  ),

  input_hijack: (s = 24) => (
    <svg {...SV(s)}>
      <path d="M4 12h12l-3 -3M16 12l-3 3" stroke={ink} strokeWidth="1.5" strokeLinejoin="miter"/>
      {/* intercept slash */}
      <path d="M14 4l3 16" stroke={green} strokeWidth="1.8"/>
    </svg>
  ),

  wait_for_action: (s = 24) => (
    <svg {...SV(s)}>
      <rect x="6" y="5" width="3" height="11" stroke={ink} strokeWidth="1.5"/>
      <rect x="13" y="5" width="3" height="11" stroke={ink} strokeWidth="1.5"/>
      <circle cx="11" cy="20" r="1.5" fill={green}/>
    </svg>
  ),

  detect_repeat_choice: (s = 24) => (
    <svg {...SV(s)}>
      <path d="M19 9a8 8 0 1 0 -2 9" stroke={ink} strokeWidth="1.5" strokeLinecap="square"/>
      <path d="M16 4l3 5l-5 1" stroke={ink} strokeWidth="1.5" strokeLinejoin="miter"/>
      <circle cx="12" cy="12" r="2" fill={green}/>
    </svg>
  ),

  detect_back_attempt: (s = 24) => (
    <svg {...SV(s)}>
      <path d="M11 5l-6 7l6 7" stroke={green} strokeWidth="1.8" strokeLinejoin="miter"/>
      <path d="M5 12h15" stroke={ink} strokeWidth="1.5" strokeDasharray="2 1.5"/>
    </svg>
  ),

  // ============================================================
  // PLUS 14
  // ============================================================
  fake_dialog: (s = 24) => (
    <svg {...SV(s)}>
      <rect x="3" y="5" width="18" height="14" stroke={ink} strokeWidth="1.5"/>
      <path d="M3 9h18" stroke={ink} strokeWidth="1.5"/>
      <path d="M16 6.5l3 1M19 6.5l-3 1" stroke={ink} strokeWidth="1.2"/>
      <path d="M11 12v3M11 17v0.5" stroke={green} strokeWidth="1.6" strokeLinecap="square"/>
    </svg>
  ),

  fake_permission_popup: (s = 24) => (
    <svg {...SV(s)}>
      <rect x="3" y="4" width="18" height="16" stroke={ink} strokeWidth="1.5" strokeDasharray="2 1.5"/>
      <rect x="9" y="11" width="6" height="5" stroke={green} strokeWidth="1.5"/>
      <path d="M10.5 11v-1.5a1.5 1.5 0 0 1 3 0V11" stroke={green} strokeWidth="1.5" fill="none"/>
    </svg>
  ),

  clipboard_write: (s = 24) => (
    <svg {...SV(s)}>
      <rect x="6" y="5" width="12" height="15" stroke={ink} strokeWidth="1.5"/>
      <rect x="9" y="3" width="6" height="3" stroke={ink} strokeWidth="1.5"/>
      <path d="M12 9v6M12 15l-2 -2M12 15l2 -2" stroke={green} strokeWidth="1.5" strokeLinejoin="miter"/>
    </svg>
  ),

  clipboard_read: (s = 24) => (
    <svg {...SV(s)}>
      <rect x="6" y="5" width="12" height="15" stroke={ink} strokeWidth="1.5"/>
      <rect x="9" y="3" width="6" height="3" stroke={ink} strokeWidth="1.5"/>
      <path d="M12 16v-6M12 10l-2 2M12 10l2 2" stroke={green} strokeWidth="1.5" strokeLinejoin="miter"/>
    </svg>
  ),

  real_time_check: (s = 24) => (
    <svg {...SV(s)}>
      <circle cx="12" cy="12" r="9" stroke={ink} strokeWidth="1.5"/>
      <path d="M12 7v5h5" stroke={green} strokeWidth="1.8" strokeLinejoin="miter" strokeLinecap="square"/>
      <circle cx="12" cy="12" r="1.2" fill={green}/>
    </svg>
  ),

  user_file_read: (s = 24) => (
    <svg {...SV(s)}>
      <path d="M3 7v12h18v-9h-9l-2 -3z" stroke={ink} strokeWidth="1.5" strokeLinejoin="miter"/>
      <path d="M12 14v-5M12 9l-2 2M12 9l2 2" stroke={green} strokeWidth="1.5" strokeLinejoin="miter"/>
    </svg>
  ),

  user_file_write: (s = 24) => (
    <svg {...SV(s)}>
      <path d="M3 7v12h18v-9h-9l-2 -3z" stroke={ink} strokeWidth="1.5" strokeLinejoin="miter"/>
      <path d="M12 8v6M12 14l-2 -2M12 14l2 -2" stroke={green} strokeWidth="1.5" strokeLinejoin="miter"/>
    </svg>
  ),

  cross_slot_bleed: (s = 24) => (
    <svg {...SV(s)}>
      <rect x="2" y="6" width="8" height="12" stroke={ink} strokeWidth="1.5"/>
      <rect x="14" y="6" width="8" height="12" stroke={ink} strokeWidth="1.5"/>
      <path d="M9 12h6M13 9l3 3l-3 3" stroke={green} strokeWidth="1.6" strokeLinejoin="miter"/>
    </svg>
  ),

  slot_impersonation: (s = 24) => (
    <svg {...SV(s)}>
      <rect x="4" y="5" width="16" height="14" stroke={ink} strokeWidth="1.5"/>
      {/* mask overlay (dotted) */}
      <path d="M7 9h10v6h-10z" stroke={green} strokeWidth="1.5" strokeDasharray="2 1.5"/>
      <circle cx="10" cy="12" r="0.8" fill={green}/>
      <circle cx="14" cy="12" r="0.8" fill={green}/>
    </svg>
  ),

  scene_live_reload: (s = 24) => (
    <svg {...SV(s)}>
      <path d="M20 11a8 8 0 1 0 -3 8" stroke={ink} strokeWidth="1.5" strokeLinecap="square"/>
      <path d="M14 4l6 0l0 6" stroke={ink} strokeWidth="1.5" strokeLinejoin="miter"/>
      <circle cx="12" cy="12" r="1.5" fill={green}/>
    </svg>
  ),

  text_i18n: (s = 24) => (
    <svg {...SV(s)}>
      <circle cx="12" cy="12" r="9" stroke={ink} strokeWidth="1.5"/>
      <path d="M3 12h18" stroke={ink} strokeWidth="1"/>
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke={ink} strokeWidth="1"/>
      {/* "가" character */}
      <path d="M9 9v6M9 12h2v-3M11 9v6" stroke={green} strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter"/>
    </svg>
  ),

  discord_presence: (s = 24) => (
    <svg {...SV(s)}>
      <path d="M3 5h14v9h-6l-3 3v-3h-5z" stroke={ink} strokeWidth="1.5" strokeLinejoin="miter"/>
      <circle cx="19" cy="6" r="2.5" fill={green}/>
      <circle cx="19" cy="6" r="3.5" stroke={green} strokeWidth="0.8" fill="none" opacity="0.5"/>
    </svg>
  ),

  steam_overlay_awareness: (s = 24) => (
    <svg {...SV(s)}>
      <rect x="3" y="3" width="14" height="11" stroke={ink} strokeWidth="1.5"/>
      <rect x="7" y="9" width="14" height="11" stroke={green} strokeWidth="1.5"/>
      <path d="M11 16h6" stroke={green} strokeWidth="1.2"/>
    </svg>
  ),

  accessibility_hook: (s = 24) => (
    <svg {...SV(s)}>
      <circle cx="12" cy="12" r="9" stroke={ink} strokeWidth="1.5"/>
      <path d="M12 3a9 9 0 0 1 0 18z" fill={green}/>
      <path d="M12 3v18" stroke={ink} strokeWidth="1.5"/>
    </svg>
  ),
};

// ============================================================
// Tier registry (registry-verified order)
// ============================================================
const REGISTRY = {
  core: {
    label: 'CORE',
    sub: '13 typed blocks · MIT · free forever',
    color: green,
    items: [
      ['save_delete',          'Delete a save slot from disk.',                        red],
      ['save_corrupt',         'Mangle a save in a controlled, replayable way.',       amber],
      ['persistent_flag_set',  'Stamp a flag that survives reinstalls.',                green],
      ['persistent_flag_get',  'Read flags written across runs.',                       green],
      ['ui_button_destroy',    'Remove a UI button entirely.',                          red],
      ['ui_button_disable',    'Grey out a button without removing it.',                green],
      ['window_title_set',     'Change the OS window title at runtime.',                green],
      ['slot_rename',          'Rename a save slot in the list.',                       green],
      ['title_screen_variant', 'Swap the title screen for a variant.',                  green],
      ['save_integrity_check', 'Hash a save and react if tampered.',                    green],
      ['game_quit',            'Force a clean quit (or refuse one).',                   red],
      ['game_crash',           'Simulate a crash for narrative effect.',                red],
      ['window_close',         'Programmatically close the window.',                    red],
    ],
  },
  hooks: {
    label: 'HOOKS',
    sub: '8 reactive blocks · $49 · post-launch $69',
    color: amber,
    items: [
      ['shader_effect',         'Scanlines, distort, chromatic. Time-bounded.',          green],
      ['audio_effect',          'Pitch, bitcrush, reverse. Per-channel.',                green],
      ['text_corrupt',          'Scramble or replace upcoming text.',                    amber],
      ['dialogue_reactive',     'Branch a line on flags or save state.',                 green],
      ['input_hijack',          'Refuse, swap, or invert inputs briefly.',               green],
      ['wait_for_action',       "Pause until the player does something.",                green],
      ['detect_repeat_choice',  'Notice when the player picks the same option twice.',   green],
      ['detect_back_attempt',   'Catch reload / back-button retries.',                   green],
    ],
  },
  plus: {
    label: 'PLUS',
    sub: '14 advanced blocks · $69 · post-launch $149',
    color: '#8B5CF6',
    items: [
      ['fake_dialog',             'OS-styled fake popup, in-engine.',                    green],
      ['fake_permission_popup',   'Display a fake permission prompt.',                   green],
      ['clipboard_write',         'Write to system clipboard with consent prompt.',      green],
      ['clipboard_read',          'Read clipboard with consent prompt.',                 green],
      ['real_time_check',         'Read wall-clock; react to date / hour.',              green],
      ['user_file_read',          'Read a file from a sandboxed user path.',             green],
      ['user_file_write',         'Write a file to a sandboxed user path.',              green],
      ['cross_slot_bleed',        'Make state from one slot leak into another.',         green],
      ['slot_impersonation',      'Make slot N appear to be slot M.',                    green],
      ['scene_live_reload',       'Hot-swap a scene mid-play with a variant.',           green],
      ['text_i18n',               'Locale-aware text variants per block.',               green],
      ['discord_presence',        'Set Discord rich presence.',                          green],
      ['steam_overlay_awareness', 'React when Steam overlay opens / closes.',            green],
      ['accessibility_hook',      'Branch on screen-reader / reduced motion.',           green],
    ],
  },
};

// ============================================================
// Atom
// ============================================================
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

// ============================================================
// Sections
// ============================================================
function TierGrid({ tier, data, onPick }) {
  const cls = "ic " + (tier === 'hooks' ? 'hooks' : tier === 'plus' ? 'plus' : '');
  let offset = 0;
  if (tier === 'hooks') offset = 13;
  if (tier === 'plus') offset = 21;
  return (
    <div className="icon-grid">
      {data.items.map(([name], i) => (
        <div className={cls} key={name} onClick={() => onPick(name)} style={{ cursor: 'pointer' }}>
          <div className="ic-display">{I[name] ? I[name](64) : null}</div>
          <div className="name">{name}</div>
          <div className="num">{String(i + 1 + offset).padStart(2, '0')} / 35</div>
        </div>
      ))}
    </div>
  );
}

function Section01({ setPick }) {
  return (
    <section className="sec" id="catalog">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">01</span><span>CATALOG</span>
            </div>
            <h2 className="sec-title">Thirty-five blocks.<br/>Thirty-five icons.</h2>
          </div>
          <p className="sec-lead">
            One mark per block. 24×24 viewBox, 1.5 ink stroke, single accent — green by default, <span style={{color:'var(--red)'}}>red</span> for destructive ops, <span style={{color:'var(--amber)'}}>amber</span> for corrupt / warn. The accent color is <b>semantic, not tier-coded</b> — tier shows up in the section label, not the icon, so a row of icons reads what each block <i>does</i> at a glance.
          </p>
        </div>

        {Object.entries(REGISTRY).map(([key, data]) => (
          <div key={key}>
            <div className={"tier-head " + (key === 'hooks' ? 'hooks' : key === 'plus' ? 'plus' : '')}>
              <h3>{data.label} <span className="acc">/ {data.items.length}</span></h3>
              <span className="meta">{data.sub}</span>
            </div>
            <TierGrid tier={key} data={data} onPick={setPick} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Section02({ pick, setPick }) {
  const allNames = Object.keys(I);
  const cur = pick || 'save_delete';
  const { meta } = (() => {
    for (const [t, data] of Object.entries(REGISTRY)) {
      const item = data.items.find(([n]) => n === cur);
      if (item) return { meta: { tier: t, name: item[0], desc: item[1], accent: item[2] } };
    }
    return { meta: { tier: 'core', name: cur, desc: '', accent: green } };
  })();
  return (
    <section className="sec" id="anatomy">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">02</span><span>ANATOMY</span>
            </div>
            <h2 className="sec-title">One icon, three scales.<br/>Same SVG, no bitmaps.</h2>
          </div>
          <p className="sec-lead">
            Every icon survives 16/24/64 because the strokes are integer-multiples of the 24u grid. Drop into <code style={{color:'var(--green)'}}>{'<icon-block />'}</code> components and they inherit container color via CSS <code style={{color:'var(--green)'}}>currentColor</code>; the accent stays fixed per icon.
          </p>
        </div>

        <div className="focus">
          <div className="focus-side">
            <h4>{meta.name}</h4>
            <div style={{ color: 'var(--ink-2)', fontSize: 12, lineHeight: 1.55, marginBottom: 14 }}>{meta.desc}</div>
            <div className="label"><span className="acc">/</span> TIER</div>
            <span>{REGISTRY[meta.tier].label}</span>
            <div className="label"><span className="acc">/</span> ACCENT</div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 14, height: 14, background: meta.accent, display: 'inline-block', border: '1px solid rgba(255,255,255,0.1)' }}></span>
              <code>{meta.accent}</code>
            </span>
            <div className="label"><span className="acc">/</span> STROKE</div>
            <span>1.5u · square caps · miter joins</span>
            <div className="label"><span className="acc">/</span> CLEAR</div>
            <span>2u all sides (viewBox 24)</span>
          </div>

          <div className="focus-stage">
            <div className="cell">
              <div className="stage" style={{ padding: 8 }}>{I[cur] ? I[cur](16) : null}</div>
              <div className="size">16PX</div>
            </div>
            <div className="cell">
              <div className="stage" style={{ padding: 12 }}>{I[cur] ? I[cur](24) : null}</div>
              <div className="size">24PX · BASE</div>
            </div>
            <div className="cell">
              <div className="stage" style={{ padding: 18 }}>{I[cur] ? I[cur](64) : null}</div>
              <div className="size">64PX</div>
            </div>
          </div>

          <div className="focus-side">
            <h4>Pick another</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {allNames.slice(0, 20).map((n) => (
                <button
                  key={n}
                  onClick={() => setPick(n)}
                  style={{
                    background: n === cur ? 'var(--green)' : 'transparent',
                    color: n === cur ? 'var(--bg)' : 'var(--mute)',
                    border: '1px solid ' + (n === cur ? 'var(--green)' : 'var(--line-2)'),
                    padding: '4px 8px',
                    fontFamily: 'var(--f-mono)',
                    fontSize: 10,
                    letterSpacing: '0.06em',
                    cursor: 'pointer',
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
            <div style={{ color: 'var(--mute)', fontSize: 11, marginTop: 12 }}>// 20 of 35 shown — click any catalog tile above to focus another.</div>
          </div>
        </div>

        {/* in-context cards */}
        <div className="card-row">
          <div className="card-sample">
            <div className="top">
              <div style={{ flexShrink: 0 }}>{I[cur] ? I[cur](24) : null}</div>
              <span className="name">{meta.name}</span>
              <span className="badge">{REGISTRY[meta.tier].label}</span>
            </div>
            <div className="desc">{meta.desc}</div>
            <div className="code">
              <span className="k">{'"type"'}</span>: <span className="s">{`"${meta.name}"`}</span>
            </div>
          </div>

          <div className="card-sample">
            <div className="top">
              <div style={{ flexShrink: 0 }}>{I[cur] ? I[cur](20) : null}</div>
              <span className="name" style={{ fontSize: 13, color: 'var(--ink-2)' }}>scenario_03.json · line 14</span>
            </div>
            <div className="desc" style={{ color: 'var(--mute)' }}>// in an editor sidebar — the icon plus a thin row prefix.</div>
            <div className="code">
              <span style={{ color: 'var(--mute)' }}>14</span>{' '}<span className="k">{'"type"'}</span>: <span className="s">{`"${meta.name}"`}</span>,
            </div>
          </div>

          <div className="card-sample">
            <div className="top">
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green)' }}>// FAVORITES</span>
            </div>
            <div className="desc" style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
              {['save_delete', 'text_corrupt', 'shader_effect', 'fake_dialog'].map((n) => (
                <span key={n} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--ink-2)' }}>
                  {I[n] ? I[n](20) : null}
                  <span>{n}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section03() {
  // Export all 35 SVGs as a downloadable bundle (single file with all SVGs catalogued)
  const exportAll = () => {
    const tier = (n) => {
      for (const [t, data] of Object.entries(REGISTRY)) {
        if (data.items.find(([nn]) => nn === n)) return t;
      }
      return 'core';
    };
    // Read the live SVG markup from rendered DOM
    const lines = ['<!-- parabreak icon catalog · 35 SVGs · v1.0 -->'];
    Object.keys(I).forEach((name, i) => {
      const t = tier(name);
      lines.push(`\n<!-- [${String(i + 1).padStart(2, '0')}/35] ${t.toUpperCase()} · ${name} -->`);
      // find the rendered svg in the catalog grid by index — simpler approach: regenerate from React via static markup
      const div = document.createElement('div');
      const root = ReactDOM.createRoot(div);
      // dummy — can't synchronously render. Fallback: encode each as string from a known source.
      lines.push(`<!-- view live at icons.html — anatomy section, click "${name}" -->`);
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'icons-catalog.txt';
    a.click();
  };

  return (
    <section className="sec" id="usage">
      <div className="sec-inner">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <span className="line"></span><span className="num">03</span><span>USAGE</span>
            </div>
            <h2 className="sec-title">Drop in.<br/>Inherit color.</h2>
          </div>
          <p className="sec-lead">
            Every icon component is a pure inline SVG with explicit stroke colors. When you want them to react to theme (light/dark) instead of staying fixed, replace the ink stroke with <code style={{color:'var(--green)'}}>currentColor</code> and pass <code style={{color:'var(--green)'}}>style={'{{color: ink}}'}</code> from the parent. Accents stay fixed — that's the whole point of semantic color.
          </p>
        </div>

        <div className="export-card">
          <h4>React component</h4>
          <p>Each icon is exported from <code>icons-app.jsx</code> in the <code>I</code> object keyed by block name. Import the whole map; render <code>{`{I[blockName](24)}`}</code> in your row.</p>
          <div style={{
            background: 'var(--bg)', border: '1px solid var(--line)', padding: '14px 16px',
            fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: 'var(--ink-2)', whiteSpace: 'pre',
            lineHeight: 1.65, overflowX: 'auto',
          }}>
{`import { I } from "./icons-app.jsx";

function HookRow({ name, desc }) {
  return (
    <div className="row">
      <span className="icon">{I[name](20)}</span>
      <span className="name">{name}</span>
      <span className="desc">{desc}</span>
    </div>
  );
}`}
          </div>
        </div>

        <div className="export-card">
          <h4>SVG export — one per block</h4>
          <p>The 35 icons are rendered live in this page. To extract them to standalone <code>.svg</code> files, capture the inner <code>{'<svg>'}</code> of each catalog tile. The DevTools snippet below saves all 35 as named SVG files.</p>
          <div style={{
            background: 'var(--bg)', border: '1px solid var(--line)', padding: '14px 16px',
            fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: 'var(--ink-2)', whiteSpace: 'pre',
            lineHeight: 1.65, overflowX: 'auto', marginBottom: 14,
          }}>
{`// in DevTools on icons.html:
const tiles = document.querySelectorAll('.icon-grid .ic');
tiles.forEach((tile) => {
  const name = tile.querySelector('.name').textContent;
  const svgEl = tile.querySelector('svg');
  // strip width/height for source SVG (keep viewBox)
  const clone = svgEl.cloneNode(true);
  clone.removeAttribute('width');
  clone.removeAttribute('height');
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\\n' +
    new XMLSerializer().serializeToString(clone);
  const blob = new Blob([xml], { type: 'image/svg+xml' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = \`block-\${name}.svg\`;
  a.click();
});`}
          </div>
          <p style={{ marginTop: 0, fontSize: 12, color: 'var(--mute)' }}>// Outputs <code>block-save_delete.svg</code> ... <code>block-accessibility_hook.svg</code> at 24×24 viewBox. Save to <code>/assets/icons/</code>.</p>
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
        <span className="title">// BLOCK ICONS · <span className="acc">P3.1 · 35/35</span></span>
        <nav className="doc-toc">
          <a href="#catalog">01 Catalog</a>
          <a href="#anatomy">02 Anatomy</a>
          <a href="#usage">03 Usage</a>
        </nav>
      </div>
    </header>
  );
}

function Foot() {
  return (
    <footer className="doc-foot">
      <span>// icons v1.0 · </span><span className="acc">35 SVG · 1.5 stroke · semantic accent</span>
      <div style={{ marginTop: 18 }}>
        <a href="brand.html">→ brand</a>
        <a href="logo-export.html">→ logo</a>
        <a href="tokens.html">→ tokens</a>
        <a href="landing.html">→ landing</a>
      </div>
    </footer>
  );
}

function App() {
  const [pick, setPick] = useState('save_delete');
  return (
    <>
      <Head />
      <Section01 setPick={setPick} />
      <Section02 pick={pick} setPick={setPick} />
      <Section03 />
      <Foot />
    </>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
