"use client";

import { useScroll, useMotionValueEvent } from "motion/react";
import { useEffect, useId, useState } from "react";

const BAR_HEIGHT = 22;
const PATH_UNIT = 44;

function TechnicalPathUnit({ x }: { x: number }) {
  const centerY = BAR_HEIGHT / 2 + 1;

  return (
    <g transform={`translate(${x}, 0)`}>
      <path
        d={`M0 ${centerY} C10 ${centerY - 4} 14 ${centerY - 4} 22 ${centerY} S34 ${centerY + 4} 44 ${centerY}`}
        stroke="var(--color-accent)"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="22" cy={centerY} r="1.8" fill="var(--color-accent)" />
    </g>
  );
}

function TechnicalPath({ width, opacity }: { width: number; opacity: number }) {
  const count = Math.ceil(width / PATH_UNIT) + 1;
  return (
    <g opacity={opacity}>
      {Array.from({ length: count }, (_, i) => (
        <TechnicalPathUnit key={i} x={i * PATH_UNIT} />
      ))}
    </g>
  );
}

function RoboticArm({
  x,
  armGradientId,
  jointGradientId,
}: {
  x: number;
  armGradientId: string;
  jointGradientId: string;
}) {
  const cx = x;
  const cy = BAR_HEIGHT / 2 + 1;

  return (
    <g transform={`translate(${cx - 34}, ${cy - 15})`}>
      <path
        d="M8 22 L17 11"
        stroke={`url(#${armGradientId})`}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M18 11 L31 15"
        stroke={`url(#${armGradientId})`}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M31 15 L40 9"
        stroke={`url(#${armGradientId})`}
        strokeWidth="3"
        strokeLinecap="round"
      />

      <circle cx="8" cy="22" r="4.5" fill={`url(#${jointGradientId})`} stroke="#0F2748" strokeWidth="0.7" />
      <circle cx="18" cy="11" r="4.2" fill={`url(#${jointGradientId})`} stroke="#0F2748" strokeWidth="0.7" />
      <circle cx="31" cy="15" r="3.6" fill="#CBD5E1" stroke="#334155" strokeWidth="0.7" />

      <path d="M39 9 L45 7" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M45 7 L48 4" stroke="#94A3B8" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M45 7 L49 9" stroke="#94A3B8" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="8" cy="22" r="1.5" fill="#E0F2FE" />
      <circle cx="18" cy="11" r="1.4" fill="#E0F2FE" />
    </g>
  );
}

export function RoboticArmProgress() {
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
  const clipId = `${svgId}-robotic-arm-progress-clip`;
  const trailGradientId = `${svgId}-robotic-arm-progress-trail`;
  const armGradientId = `${svgId}-robotic-arm-progress-arm`;
  const jointGradientId = `${svgId}-robotic-arm-progress-joint`;

  if (reducedMotion) {
    return (
      <div
        className="pointer-events-none fixed left-0 top-0 z-[200] h-[2px] bg-[var(--color-accent)] transition-all"
        style={{ width: `${progress * 100}%` }}
        aria-hidden="true"
      />
    );
  }

  if (width === 0) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[200]"
      aria-hidden="true"
      style={{ height: BAR_HEIGHT, width: "100%" }}
    >
      <svg width={width} height={BAR_HEIGHT} style={{ display: "block", overflow: "visible" }}>
        <defs>
          <linearGradient id={trailGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.28" />
          </linearGradient>
          <linearGradient id={armGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="48%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <radialGradient id={jointGradientId} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="45%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0F2748" />
          </radialGradient>
        </defs>

        <line
          x1={0}
          y1={BAR_HEIGHT / 2 + 1}
          x2={width}
          y2={BAR_HEIGHT / 2 + 1}
          stroke="var(--color-accent)"
          strokeWidth="0.5"
          opacity="0.08"
        />

        <TechnicalPath width={width} opacity={0.16} />

        <clipPath id={clipId}>
          <rect x={0} y={0} width={filledWidth} height={BAR_HEIGHT + 4} />
        </clipPath>
        <g clipPath={`url(#${clipId})`}>
          <TechnicalPath width={width} opacity={0.95} />
        </g>

        {filledWidth > 28 && (
          <rect
            x={Math.max(0, filledWidth - 72)}
            y={BAR_HEIGHT / 2}
            width={72}
            height={2}
            fill={`url(#${trailGradientId})`}
          />
        )}

        {filledWidth > 38 && (
          <RoboticArm
            x={Math.min(width - 8, filledWidth)}
            armGradientId={armGradientId}
            jointGradientId={jointGradientId}
          />
        )}
      </svg>
    </div>
  );
}
