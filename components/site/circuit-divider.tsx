/**
 * Decorative SVG divider echoing the circuit-tree motif.
 * A single horizontal line with node circles — used between home page sections.
 */
export function CircuitDivider({ className }: { className?: string }) {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className ?? ""}`} aria-hidden="true">
      <svg viewBox="0 0 800 24" fill="none" className="w-full opacity-[0.12]">
        <g stroke="var(--color-accent)" strokeWidth="1" strokeLinecap="round">
          {/* Main horizontal rail */}
          <line x1="0" y1="12" x2="800" y2="12" />
          {/* Node 1 */}
          <line x1="180" y1="12" x2="180" y2="4" />
          <circle cx="180" cy="3" r="2.5" fill="var(--color-accent)" />
          {/* Node 2 */}
          <line x1="380" y1="12" x2="380" y2="20" />
          <circle cx="380" cy="21" r="2.5" fill="var(--color-accent)" />
          {/* Node 3 */}
          <line x1="600" y1="12" x2="600" y2="4" />
          <circle cx="600" cy="3" r="2.5" fill="var(--color-accent)" />
        </g>
      </svg>
    </div>
  );
}
