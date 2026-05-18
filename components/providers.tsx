"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import Lenis from "lenis";

/**
 * Application-wide providers.
 *
 * Lenis smooth scroll is initialised here with a calm, professional config.
 * prefers-reduced-motion is respected — Lenis is disabled entirely when set.
 *
 * Add future providers (analytics, query client, modals) inside Providers below.
 */
function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 0,
    });

    let raf: number;
    function tick(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange={false}
    >
      <SmoothScroll>{children}</SmoothScroll>
    </ThemeProvider>
  );
}
