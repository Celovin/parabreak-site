export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl">
        <p className="font-mono text-xs tracking-[0.22em] uppercase text-[var(--fg-muted)] mb-8">
          A Celovin Studio
        </p>
        <h1 className="font-mono text-5xl sm:text-6xl font-semibold tracking-tight text-[var(--fg-primary)] mb-8">
          Parabreak
        </h1>
        <p className="text-xl sm:text-2xl text-[var(--fg-primary)] mb-3">
          The meta engine for Godot.
        </p>
        <p className="text-[var(--fg-muted)] mb-12">
          30 hooks across save manipulation, UI deconstruction, and OS-layer
          narrative. Free Core. Paid Hooks and Plus when you need the full
          stack.
        </p>
        <p className="font-mono text-sm text-[var(--accent-phos)]">
          Launching with KNOT Week 1–4 — June 2026.
        </p>
      </div>
    </main>
  );
}
