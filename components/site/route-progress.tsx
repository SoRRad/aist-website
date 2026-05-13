"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

/**
 * Thin accent-blue progress bar fixed at the very top of the viewport.
 * Appears on route changes and fades out once navigation completes.
 * Uses pathname changes as a navigation proxy (App Router doesn't expose router events).
 */
export function RouteProgress() {
  const pathname = usePathname();
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const prevPathname = React.useRef(pathname);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    if (pathname !== prevPathname.current) {
      /* Navigation completed — jump to 100% then hide */
      setProgress(100);
      timerRef.current = setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 400);
      prevPathname.current = pathname;
    }
  }, [pathname]);

  /* Expose a way for Link clicks to trigger the bar — not needed for App Router
   * but we use a simple interval-based fill to 80% as navigation indication. */
  React.useEffect(() => {
    const handleClick = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setLoading(true);
      setProgress(15);
      /* Simulate incremental progress toward 80% */
      let p = 15;
      const interval = setInterval(() => {
        p = Math.min(p + Math.random() * 10, 80);
        setProgress(p);
        if (p >= 80) clearInterval(interval);
      }, 200);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="route-progress"
          className="fixed left-0 top-0 z-[100] h-[2px] bg-[var(--color-accent)]"
          style={{ width: `${progress}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </AnimatePresence>
  );
}
