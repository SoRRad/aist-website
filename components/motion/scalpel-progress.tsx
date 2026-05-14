"use client";

import { useScroll, useMotionValueEvent } from "motion/react";
import { useState, useEffect } from "react";

const BAR_HEIGHT = 16;
const STITCH_UNIT = 40; // px per suture repeat

/** Single suture stitch unit at origin — repeated across width via transform */
function SutureUnit({ x }: { x: number }) {
  return (
    <g transform={`translate(${x}, 0)`}>
      {/* Curved suture arc — thread going above wound */}
      <path
        d={`M0 ${BAR_HEIGHT / 2 + 2} Q10 ${BAR_HEIGHT / 2 - 6} 20 ${BAR_HEIGHT / 2 + 2} Q30 ${BAR_HEIGHT / 2 + 10} 40 ${BAR_HEIGHT / 2 + 2}`}
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Knot dot at crossing point */}
      <circle cx="20" cy={BAR_HEIGHT / 2 + 2} r="2" fill="var(--color-accent)" />
    </g>
  );
}

function Sutures({ width, opacity }: { width: number; opacity: number }) {
  const count = Math.ceil(width / STITCH_UNIT) + 1;
  return (
    <g opacity={opacity}>
      {Array.from({ length: count }, (_, i) => (
        <SutureUnit key={i} x={i * STITCH_UNIT} />
      ))}
    </g>
  );
}

/** Stylised No. 10 surgical scalpel — handle left, blade pointing right */
function Scalpel({ x }: { x: number }) {
  const cx = x - 4;
  const cy = BAR_HEIGHT / 2;
  return (
    <g transform={`translate(${cx - 52}, ${cy - 6})`}>
      {/* Handle */}
      <rect x="0" y="3.5" width="32" height="5" rx="1" fill="#94A3B8" />
      {/* Handle grip lines */}
      <rect x="4" y="4.5" width="24" height="1" rx="0.5" fill="#475569" opacity="0.7" />
      <rect x="4" y="6.5" width="24" height="1" rx="0.5" fill="#475569" opacity="0.7" />
      {/* Blade body */}
      <path d="M32 2 L54 5 Q56 6 54 7 L32 10 Z" fill="url(#bladeGrad)" />
      {/* Cutting edge highlight */}
      <path d="M32 6 L54 6" stroke="white" strokeWidth="0.5" opacity="0.6" />
      <defs>
        <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="45%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
      </defs>
    </g>
  );
}

/**
 * Scalpel-and-sutures scroll progress bar.
 * Fixed at the top of the viewport (z-50, 16px tall).
 * A row of continuous suture stitches spans full width (faint background).
 * As the user scrolls, filled sutures are revealed behind a scalpel icon.
 * Respects prefers-reduced-motion: falls back to a 2px solid accent bar.
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
      <svg width={width} height={BAR_HEIGHT} style={{ display: "block", overflow: "visible" }}>
        {/* Baseline wound edge — very faint */}
        <line
          x1={0} y1={BAR_HEIGHT / 2 + 2}
          x2={width} y2={BAR_HEIGHT / 2 + 2}
          stroke="var(--color-accent)"
          strokeWidth="0.5"
          opacity="0.08"
        />

        {/* Background sutures — full width, low opacity */}
        <Sutures width={width} opacity={0.18} />

        {/* Filled sutures — clipped to progress width */}
        <clipPath id="scalpel-progress-clip">
          <rect x={0} y={0} width={filledWidth} height={BAR_HEIGHT + 4} />
        </clipPath>
        <g clipPath="url(#scalpel-progress-clip)">
          <Sutures width={width} opacity={1} />
        </g>

        {/* Shadow trail behind scalpel tip */}
        {filledWidth > 60 && (
          <defs>
            <linearGradient id="trailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.25" />
            </linearGradient>
          </defs>
        )}
        {filledWidth > 60 && (
          <rect
            x={Math.max(0, filledWidth - 60)}
            y={BAR_HEIGHT / 2 - 1}
            width={60}
            height={2}
            fill="url(#trailGrad)"
          />
        )}

        {/* Scalpel icon at leading edge */}
        {filledWidth > 58 && <Scalpel x={filledWidth} />}
      </svg>
    </div>
  );
}
