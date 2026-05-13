"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { phases } from "@/lib/phases";
import { logos } from "@/lib/logos";

/* ── SVG geometry ── */
const CX = 200;
const CY = 200;
const R_OUTER = 170;
const R_INNER = 70;
const GAP_DEG = 4;

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function quadrantPath(
  cx: number, cy: number,
  rOuter: number, rInner: number,
  startAngle: number, endAngle: number,
): string {
  const o1 = polarToCartesian(cx, cy, rOuter, startAngle);
  const o2 = polarToCartesian(cx, cy, rOuter, endAngle);
  const i2 = polarToCartesian(cx, cy, rInner, endAngle);
  const i1 = polarToCartesian(cx, cy, rInner, startAngle);
  return [
    `M ${o1.x} ${o1.y}`,
    `A ${rOuter} ${rOuter} 0 0 1 ${o2.x} ${o2.y}`,
    `L ${i2.x} ${i2.y}`,
    `A ${rInner} ${rInner} 0 0 0 ${i1.x} ${i1.y}`,
    "Z",
  ].join(" ");
}

const QUADS = phases.map((phase, i) => {
  const base = i * 90;
  return {
    phase,
    startAngle: base + GAP_DEG / 2,
    endAngle: base + 90 - GAP_DEG / 2,
    labelAngle: base + 45,
  };
});

function labelPos(cx: number, cy: number, r: number, angleDeg: number) {
  return polarToCartesian(cx, cy, r, angleDeg);
}

/**
 * Interactive surgical phase wheel.
 * Rotates 90° per selection so the active phase always points to 12 o'clock.
 * Labels counter-rotate to remain upright.
 * Spring: stiffness 80, damping 18 — calm, not jittery.
 */
export function PhaseWheel() {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % phases.length);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (i - 1 + phases.length) % phases.length);
    }
  }, []);

  const activePhase = phases[activeIdx];
  // Rotate the wheel so the active quadrant sits at 12 o'clock
  const wheelRotation = -activeIdx * 90;

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
      {/* ── Wheel ── */}
      <div className="mx-auto flex-shrink-0 lg:mx-0">
        <svg
          viewBox="0 0 400 400"
          className="w-full max-w-[360px] cursor-pointer select-none focus:outline-none"
          role="group"
          aria-label="Surgical phase wheel — use arrow keys to cycle phases"
          tabIndex={0}
          onKeyDown={handleKey}
        >
          {/* Wheel group rotates; labels counter-rotate to stay upright */}
          <motion.g
            animate={{ rotate: wheelRotation }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
            style={{ originX: "200px", originY: "200px" }}
          >
            {QUADS.map(({ phase, startAngle, endAngle, labelAngle }, i) => {
              const active = i === activeIdx;
              const lp = labelPos(CX, CY, (R_OUTER + R_INNER) / 2, labelAngle);
              return (
                <g
                  key={phase.id}
                  role="button"
                  tabIndex={-1}
                  aria-label={`Phase ${phase.code}: ${phase.title}`}
                  aria-pressed={active}
                  onClick={() => setActiveIdx(i)}
                  className="focus:outline-none"
                >
                  <motion.path
                    d={quadrantPath(CX, CY, R_OUTER, R_INNER, startAngle, endAngle)}
                    fill={active ? "var(--color-accent)" : "transparent"}
                    stroke={active ? "var(--color-accent)" : "var(--color-border)"}
                    strokeWidth={active ? 1.5 : 1}
                    animate={{ fillOpacity: active ? 0.15 : 0.04, strokeOpacity: active ? 1 : 0.4 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Labels counter-rotate so they remain legible */}
                  <motion.g
                    animate={{ rotate: -wheelRotation }}
                    transition={{ type: "spring", stiffness: 80, damping: 18 }}
                    style={{ originX: `${lp.x}px`, originY: `${lp.y}px` }}
                  >
                    <text
                      x={lp.x}
                      y={lp.y - 8}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{
                        fontSize: 10,
                        fill: active ? "var(--color-accent)" : "var(--color-muted-foreground)",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                      }}
                    >
                      {phase.code}
                    </text>
                    <text
                      x={lp.x}
                      y={lp.y + 8}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{
                        fontSize: 8,
                        fill: active ? "var(--color-foreground)" : "var(--color-muted-foreground)",
                        fontFamily: "var(--font-sans)",
                        fontWeight: active ? 600 : 400,
                      }}
                    >
                      {phase.title.length > 18 ? phase.title.slice(0, 16) + "…" : phase.title}
                    </text>
                  </motion.g>
                </g>
              );
            })}
          </motion.g>

          {/* Center — transparent mark, no white box */}
          <circle cx={CX} cy={CY} r={R_INNER - 4} fill="var(--color-card)" />
          <image
            href={logos.markNeutral}
            x={CX - 30}
            y={CY - 30}
            width={60}
            height={60}
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>

      {/* ── Content panel ── */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow mb-3">Phase {activePhase.code} / {activePhase.title}</p>
            <h3 className="font-display mb-4 text-2xl font-semibold tracking-tight lg:text-3xl">
              {activePhase.title}
            </h3>
            <p className="text-pretty leading-relaxed text-[var(--color-muted-foreground)]">
              {activePhase.description}
            </p>

            {activePhase.projects.length > 0 && (
              <div className="mt-6">
                <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[var(--color-muted-foreground)]">
                  Projects in this phase
                </p>
                <div className="flex flex-wrap gap-2">
                  {activePhase.projects.map((slug) => (
                    <Link
                      key={slug}
                      href={`/projects/${slug}`}
                      className="inline-flex items-center gap-1 rounded-md border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1.5 text-sm font-medium transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    >
                      {slug.toUpperCase()}
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Phase navigation dots */}
        <div className="mt-8 flex gap-2" role="tablist" aria-label="Select phase">
          {phases.map((p, i) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={i === activeIdx}
              aria-label={p.title}
              onClick={() => setActiveIdx(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIdx
                  ? "w-8 bg-[var(--color-accent)]"
                  : "w-1.5 bg-[var(--color-border)] hover:bg-[var(--color-muted-foreground)]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
