/* global React */
const { useState, useEffect, useRef } = React;

// ============================================================
// Shared atoms — locked logo lockup
// ============================================================
window.BrokenFrameMark = function BrokenFrameMark({
  size = 110,
  accent = 'var(--green)',
  ink = 'var(--ink)',
  stroke = 6,
  offsetX = 8,
  offsetY = -4,
  angle = -3,
  fragments = true,
  breakY = 56,
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <path
        d={`M 12 12 L 12 88 L 88 88 L 88 ${breakY}`}
        stroke={ink} strokeWidth={stroke}
        strokeLinecap="square" strokeLinejoin="miter"
      />
      <g transform={`translate(${offsetX} ${offsetY}) rotate(${angle} 50 30)`}>
        <path
          d={`M 12 12 L 88 12 L 88 ${breakY}`}
          stroke={accent} strokeWidth={stroke}
          strokeLinecap="square" strokeLinejoin="miter"
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
};

// Top nav (sticky)
window.Nav = function Nav({ theme, setTheme }) {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <div className="nav-logo">
          <window.BrokenFrameMark size={28} stroke={8} />
          <span className="word">para<span className="br">break</span></span>
        </div>
        <div className="nav-links">
          <a href="#what">What</a>
          <a href="#breaks">Breaks</a>
          <a href="#hooks">Hooks</a>
          <a href="#korean">한국어</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="nav-right">
          <span className="ver"><span className="acc">v0.1</span> · Godot 4.x</span>
          <button
            className="theme-toggle"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <span className="knob"></span>
          </button>
          <a href="#" className="btn primary">Install <span className="arrow">→</span></a>
        </div>
      </div>
    </nav>
  );
};

// Section label atom
window.SectionLabel = function SectionLabel({ num, text }) {
  return (
    <div className="section-label">
      <span className="line"></span>
      <span className="num">{num}</span>
      <span>{text}</span>
    </div>
  );
};
