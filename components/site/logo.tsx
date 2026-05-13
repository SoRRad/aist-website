import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "mark" | "wordmark";
  animated?: boolean;
}

/**
 * AIST logo component.
 *
 * - "mark" renders just the scalpel-meets-circuit icon
 * - "wordmark" renders the icon + "AIST" type lockup
 *
 * Uses currentColor for the dark fill so the logo adapts to the parent's
 * text color in dark mode without needing a separate asset.
 */
export function Logo({ className, variant = "mark", animated = false }: LogoProps) {
  if (variant === "wordmark") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <LogoMark animated={animated} className="h-8 w-8 shrink-0" />
        <span className="font-display text-2xl tracking-tight">AIST</span>
      </div>
    );
  }
  return <LogoMark animated={animated} className={className} />;
}

function LogoMark({ animated, className }: { animated?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      role="img"
      aria-label="AIST logo"
      className={cn("text-navy-900 dark:text-ink-100", className)}
    >
      {/* Scalpel / teardrop — dark fill */}
      <path
        d="M100 12 C 60 60, 50 110, 60 145 C 70 175, 90 188, 100 188 L 100 12 Z"
        fill="currentColor"
      />
      {/* Scalpel highlight lines */}
      <line x1="100" y1="50" x2="100" y2="170" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="2" />
      <line x1="92" y1="160" x2="108" y2="160" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="1.5" />
      <line x1="92" y1="166" x2="108" y2="166" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="1.5" />

      {/* Circuit tree — electric blue, optionally animated */}
      <g
        stroke="var(--color-blue-500)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M100 30 L 100 188" strokeOpacity="0.25" />
        <path
          d="M100 60 L 130 60 L 145 50"
          className={animated ? "animate-stroke-draw" : ""}
          style={{ "--draw-length": "70" } as React.CSSProperties}
        />
        <path
          d="M100 80 L 140 80 L 160 70"
          className={animated ? "animate-stroke-draw" : ""}
          style={{ "--draw-length": "90", animationDelay: "0.1s" } as React.CSSProperties}
        />
        <path
          d="M100 100 L 150 100 L 170 92"
          className={animated ? "animate-stroke-draw" : ""}
          style={{ "--draw-length": "100", animationDelay: "0.2s" } as React.CSSProperties}
        />
        <path
          d="M100 120 L 145 120 L 165 130"
          className={animated ? "animate-stroke-draw" : ""}
          style={{ "--draw-length": "100", animationDelay: "0.3s" } as React.CSSProperties}
        />
        <path
          d="M100 140 L 135 140 L 150 155"
          className={animated ? "animate-stroke-draw" : ""}
          style={{ "--draw-length": "90", animationDelay: "0.4s" } as React.CSSProperties}
        />
        <path
          d="M100 158 L 125 158 L 138 170"
          className={animated ? "animate-stroke-draw" : ""}
          style={{ "--draw-length": "80", animationDelay: "0.5s" } as React.CSSProperties}
        />
      </g>
      <g fill="var(--color-blue-500)">
        <circle cx="145" cy="50" r="3.5" />
        <circle cx="160" cy="70" r="3.5" />
        <circle cx="170" cy="92" r="3.5" />
        <circle cx="165" cy="130" r="3.5" />
        <circle cx="150" cy="155" r="3.5" />
        <circle cx="138" cy="170" r="3.5" />
        <circle cx="130" cy="60" r="2.5" />
        <circle cx="140" cy="80" r="2.5" />
        <circle cx="150" cy="100" r="2.5" />
        <circle cx="145" cy="120" r="2.5" />
        <circle cx="135" cy="140" r="2.5" />
        <circle cx="125" cy="158" r="2.5" />
      </g>
    </svg>
  );
}
