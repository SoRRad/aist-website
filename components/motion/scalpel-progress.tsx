"use client";

import { useScroll, useMotionValueEvent } from "motion/react";
import { useState, useEffect } from "react";

const STITCH_SPACING = 20;
const BAR_HEIGHT = 12;

/** Generates evenly spaced "X" suture marks across a given width */
function Sutures({ width, opacity }: { width: number; opacity: number }) {
  const count = Math.ceil(width / STITCH_SPACING);
  return (
    <g opacity={opacity} stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round">
      {Array.from({ length: count }, (_, i) => {
        const cx = i * STITCH_SPACING + STITCH_SPACING / 2;
        const cy = BAR_HEIGHT / 2;
        return (
          <g key={i} transform={`translate(${cx}, ${cy})`}>
            <line x1="-3" y1="-3" x2="3" y2="3" />
            <line x1="3" y1="-3" x2="-3" y2="3" />
          </g>
        );
      })}
    </g>
  );
}

/** Minimal inline scalpel SVG at the progress tip */
function Scalpel({ x }: { x: number }) {
  return (
    <g transform={`translate(${x - 10}, ${BAR_HEIGHT / 2 - 5})`}>
      {/* Blade */}
      <path d="M0 5 L14 2 L14 8 Z" fill="var(--color-accent)" opacity="0.9" />
      {/* Handle */}
      <rect x="-8" y="3.5" width="8" height="3" rx="1" fill="var(--color-accent)" opacity="0.7" />
    </g>
  );
}

/**
 * Scalpel-and-sutures scroll progress bar.
 * Fixed at the top of the viewport (z-50, 12px tall).
 * A row of faint "X" suture marks spans full width.
 * As the user scrolls, a second clipped layer of sutures is revealed behind
 * a small scalpel icon at the leading edge.
 * Respects prefers-reduced-motion by falling back to a 2px solid bar.
 */
export function ScalpelProgress() {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);
  const [width, setWidth] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setWidth(window.innerWidth);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => setProgress(v));

  const filledWidth = progress * width;

  if (reducedMotion) {
    return (
      <div
        className="fixed left-0 top-0 z-50 h-[2px] bg-[var(--color-accent)] transition-all"
        style={{ width: `${progress * 100}%` }}
        aria-hidden="true"
      />
    );
  }

  if (width === 0) return null;

  return (
    <div className="fixed left-0 top-0 z-50" aria-hidden="true" style={{ height: BAR_HEIGHT, width: "100%" }}>
      <svg width={width} height={BAR_HEIGHT} style={{ display: "block" }}>
        {/* Background sutures — full width, low opacity */}
        <Sutures width={width} opacity={0.2} />

        {/* Filled sutures — clipped to progress */}
        <clipPath id="progress-clip">
          <rect x={0} y={0} width={filledWidth} height={BAR_HEIGHT} />
        </clipPath>
        <g clipPath="url(#progress-clip)">
          <Sutures width={width} opacity={1} />
        </g>

        {/* Scalpel at leading edge */}
        {filledWidth > 14 && <Scalpel x={filledWidth} />}
      </svg>
    </div>
  );
}
