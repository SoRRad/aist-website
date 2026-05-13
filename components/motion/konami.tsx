"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";

const SEQUENCE = ["a", "i", "s", "t"];

/**
 * Easter egg: typing "aist" anywhere on the page triggers a sparkle burst.
 * Skipped on touch devices and when prefers-reduced-motion is set.
 */
export function KonamiEgg() {
  const [triggered, setTriggered] = React.useState(false);
  const [sparkles, setSparkles] = React.useState<{ id: number; x: number; y: number }[]>([]);
  const bufRef = React.useRef<string[]>([]);
  const idRef = React.useRef(0);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if ("ontouchstart" in window) return;

    const onKey = (e: KeyboardEvent) => {
      bufRef.current = [...bufRef.current, e.key.toLowerCase()].slice(-SEQUENCE.length);
      if (bufRef.current.join("") === SEQUENCE.join("")) {
        bufRef.current = [];
        setTriggered(true);
        // Generate sparkles near top-left area of screen where logo sits
        const newSparkles = Array.from({ length: 6 }, () => ({
          id: idRef.current++,
          x: 80 + Math.random() * 80,
          y: 40 + Math.random() * 40,
        }));
        setSparkles(newSparkles);
        setTimeout(() => { setTriggered(false); setSparkles([]); }, 1200);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[200]" aria-hidden="true">
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 1, x: s.x, y: s.y, scale: 0 }}
            animate={{ opacity: 0, x: s.x + (Math.random() - 0.5) * 60, y: s.y - 40 - Math.random() * 30, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ position: "absolute" }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 0L7 5H12L8 8L9.5 12L6 9.5L2.5 12L4 8L0 5H5Z" fill="#1e88e5" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
      {/* Logo spin when triggered */}
      {triggered && (
        <motion.div
          className="absolute"
          style={{ top: 42, left: 16 }}
          animate={{ rotate: 360 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, duration: 0.8 }}
        />
      )}
    </div>
  );
}
