"use client";

import { useMemo } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

/** Deterministic pseudo-random with a fixed seed — same output on every render. */
function seededRandom(seed: number) {
  let s = seed;
  return function () {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateStars(count: number): Star[] {
  const rng = seededRandom(42);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rng() * 100,
    y: rng() * 100,
    size: 1 + rng() * 1.5,          // 1–2.5 px
    duration: 2.5 + rng() * 3.5,    // 2.5–6 s
    delay: rng() * 5,               // 0–5 s offset
    opacity: 0.3 + rng() * 0.7,     // 0.3–1.0 in dark mode
  }));
}

/**
 * Full-viewport star field, fixed behind all content.
 *
 * Light mode: stars are nearly invisible (very faint dots) so the clean
 * clinical look is preserved. Dark mode: vivid glowing blue-white stars
 * that evoke the galaxy/cosmos feel.
 *
 * Uses CSS custom properties to control per-star animation, keeping
 * animation logic entirely in CSS so JS stays idle after mount.
 */
export function StarField() {
  const stars = useMemo(() => generateStars(160), []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full animate-twinkle
            bg-[var(--color-blue-400)]
            opacity-[0.05] dark:opacity-[var(--star-opacity)]"
          style={
            {
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              "--star-opacity": star.opacity,
              "--star-duration": `${star.duration}s`,
              "--star-delay": `${star.delay}s`,
              "--star-min-opacity": 0.15,
              "--star-max-opacity": star.opacity,
              boxShadow: `0 0 ${star.size * 2}px 0 rgb(66 165 245 / 0.5)`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
