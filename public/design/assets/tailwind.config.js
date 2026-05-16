/* =====================================================================
   parabreak / tailwind.config.js (Tailwind 4 + JS config — optional)
   ---------------------------------------------------------------------
   Tailwind 4 prefers @theme inline in CSS (see assets/app.css).
   This file is provided as a 1:1 fallback for projects that still want
   a JS config — e.g. when integrating with a tool that introspects
   the config object (some VS Code plugins, older preset systems).
   Same values, same names — kept in lock-step with tokens.css.

   v1.0 · 2026-05
   ===================================================================== */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,vue,svelte,astro,html}",
  ],
  // theme.extend leaves built-in scales (e.g. spacing 0/0.5/1.5/...) intact
  // and adds parabreak's named tokens on top. Use the named ones in components,
  // built-ins only for utility spacing.
  theme: {
    extend: {
      colors: {
        // surfaces
        bg:        "var(--color-bg)",
        "bg-2":    "var(--color-bg-2)",
        panel:     "var(--color-panel)",
        // lines
        line:      "var(--color-line)",
        "line-2":  "var(--color-line-2)",
        // text
        ink:       "var(--color-ink)",
        "ink-2":   "var(--color-ink-2)",
        mute:      "var(--color-mute)",
        "mute-2":  "var(--color-mute-2)",
        // semantic accents
        green:     "var(--color-green)",
        "green-dim": "var(--color-green-dim)",
        amber:     "var(--color-amber)",
        violet:    "var(--color-violet)",
        red:       "var(--color-red)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        mono:    ["var(--font-mono)"],
        "mono-2":["var(--font-mono-2)"],
        kr:      ["var(--font-kr)"],
      },
      fontSize: {
        h1:    ["var(--text-h1)",    { lineHeight: "var(--lh-h1)",    letterSpacing: "var(--ls-h1)" }],
        h2:    ["var(--text-h2)",    { lineHeight: "var(--lh-h2)",    letterSpacing: "var(--ls-h2)" }],
        h3:    ["var(--text-h3)",    { lineHeight: "var(--lh-h3)",    letterSpacing: "var(--ls-h3)" }],
        h4:    ["var(--text-h4)",    { lineHeight: "var(--lh-h4)",    letterSpacing: "var(--ls-h4)" }],
        body:  ["var(--text-body)",  { lineHeight: "var(--lh-body)" }],
        mono:  ["var(--text-mono)",  { lineHeight: "var(--lh-body)" }],
        label: ["var(--text-label)", { lineHeight: "var(--lh-label)", letterSpacing: "var(--ls-label)" }],
        micro: ["var(--text-micro)", { lineHeight: "var(--lh-label)", letterSpacing: "var(--ls-label)" }],
      },
      spacing: {
        // named layer — for component padding/gaps
        s1:  "var(--s-1)",
        s2:  "var(--s-2)",
        s3:  "var(--s-3)",
        s4:  "var(--s-4)",
        s5:  "var(--s-5)",
        s6:  "var(--s-6)",
        s7:  "var(--s-7)",
        s8:  "var(--s-8)",
        s9:  "var(--s-9)",
        s10: "var(--s-10)",
      },
      borderRadius: {
        0:    "var(--radius-0)",
        1:    "var(--radius-1)",
        2:    "var(--radius-2)",
        pill: "var(--radius-pill)",
      },
      transitionDuration: {
        fast: "var(--motion-fast)",
        base: "var(--motion-base)",
        slow: "var(--motion-slow)",
      },
      maxWidth: {
        container: "var(--container-max)",
      },
    },
  },
  plugins: [],
};
