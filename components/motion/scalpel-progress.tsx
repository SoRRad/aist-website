"use client";

import { useScroll, useMotionValueEvent } from "motion/react";
import { useState, useEffect, useId } from "react";

const BAR_HEIGHT = 20;
const STITCH_UNIT = 40; // px per suture repeat

function SutureUnit({ x }: { x: number }) {
  return (
    <g transform={`translate(${x}, 0)`}>
      <path
        d={`M0 ${BAR_HEIGHT / 2 + 2} Q10 ${BAR_HEIGHT / 2 - 6} 20 ${BAR_HEIGHT / 2 + 2} Q30 ${BAR_HEIGHT / 2 + 10} 40 ${BAR_HEIGHT / 2 + 2}`}
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
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

function Scalpel({
  x,
  bladeGradientId,
  handleGradientId,
}: {
  x: number;
  bladeGradientId: string;
  handleGradientId: string;
}) {
  const cx = x - 2;
  const cy = BAR_HEIGHT / 2;

  return (
    <g transform={`translate(${cx - 78}, ${cy - 8})`}>
      <path
        d="M3 6.2 C1.2 6.4 0.3 7.3 0.3 8.1 C0.3 9 1.2 9.8 3 10 L52 12.2 C56 12.35 58.9 11.4 61.2 9.9 L61.7 7.3 C58.6 6.4 55.4 5.8 52 5.6 Z"
        fill={`url(#${handleGradientId})`}
        stroke="#64748B"
        strokeWidth="0.55"
      />
      <path
        d="M8 7.35 L46 8.55"
        stroke="#E2E8F0"
        strokeWidth="0.55"
        strokeLinecap="round"
        opacity="0.72"
      />
      {[14, 20, 26, 32, 38, 44].map((groove) => (
        <path
          key={groove}
          d={`M${groove} 6.2 L${groove - 4} 11.1`}
          stroke="#475569"
          strokeWidth="0.75"
          strokeLinecap="round"
          opacity="0.58"
        />
      ))}
      <path
        d="M56.5 6.2 C59.5 6.65 62.6 7.7 65.1 9.2 L64 12.2 C61.6 11.2 59.1 10.45 56.4 10.05 Z"
        fill="#CBD5E1"
        stroke="#64748B"
        strokeWidth="0.5"
      />
      <path
        d="M64.2 5.1 C69.2 2.2 76 2.1 81.4 5.6 C79.4 8.5 76.9 11 73.8 13.1 C70.9 15.1 67.2 15.2 63.9 12.2 C64.8 9.8 65 7.7 64.2 5.1 Z"
        fill={`url(#${bladeGradientId})`}
        stroke="#64748B"
        strokeWidth="0.55"
        strokeLinejoin="round"
      />
      <path
        d="M66.1 11.9 C70.8 12.9 75.8 9.6 79.9 5.9"
        stroke="#F8FAFC"
        strokeWidth="0.85"
        strokeLinecap="round"
        opacity="0.88"
      />
      <path
        d="M65.3 5.7 C68.9 4.55 73.9 4.8 79.5 5.9"
        stroke="#94A3B8"
        strokeWidth="0.45"
        strokeLinecap="round"
        opacity="0.65"
      />
    </g>
  );
}

export function ScalpelProgress() {
  const { scrollYProgress } = useScroll();
  const svgId = useId().replace(/:/g, "");
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
  const clipId = `${svgId}-scalpel-progress-clip`;
  const trailGradientId = `${svgId}-scalpel-progress-trail`;
  const bladeGradientId = `${svgId}-scalpel-progress-blade`;
  const handleGradientId = `${svgId}-scalpel-progress-handle`;

  if (reducedMotion) {
    return (
      <div
        className="fixed left-0 top-0 z-[200] h-[2px] bg-[var(--color-accent)] transition-all pointer-events-none"
        style={{ width: `${progress * 100}%` }}
        aria-hidden="true"
      />
    );
  }

  if (width === 0) return null;

  return (
    <div
      className="fixed left-0 top-0 z-[200] pointer-events-none"
      aria-hidden="true"
      style={{ height: BAR_HEIGHT, width: "100%" }}
    >
      <svg width={width} height={BAR_HEIGHT} style={{ display: "block", overflow: "visible" }}>
        <defs>
          <linearGradient id={trailGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id={handleGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="42%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
          <linearGradient id={bladeGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="44%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
        </defs>

        <line
          x1={0}
          y1={BAR_HEIGHT / 2 + 2}
          x2={width}
          y2={BAR_HEIGHT / 2 + 2}
          stroke="var(--color-accent)"
          strokeWidth="0.5"
          opacity="0.08"
        />

        <Sutures width={width} opacity={0.18} />

        <clipPath id={clipId}>
          <rect x={0} y={0} width={filledWidth} height={BAR_HEIGHT + 4} />
        </clipPath>
        <g clipPath={`url(#${clipId})`}>
          <Sutures width={width} opacity={1} />
        </g>

        {filledWidth > 60 && (
          <rect
            x={Math.max(0, filledWidth - 60)}
            y={BAR_HEIGHT / 2 - 1}
            width={60}
            height={2}
            fill={`url(#${trailGradientId})`}
          />
        )}

        {filledWidth > 82 && (
          <Scalpel
            x={filledWidth}
            bladeGradientId={bladeGradientId}
            handleGradientId={handleGradientId}
          />
        )}
      </svg>
    </div>
  );
}
