"use client";

import Link from "next/link";
import * as React from "react";
import { primaryNav } from "@/lib/navigation";
import { Logo } from "@/components/site/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandPalette } from "@/components/site/command-palette";
import { MobileNav } from "@/components/site/mobile-nav";
import { cn } from "@/lib/utils";

/**
 * Site header.
 *
 * Composed of two strips:
 *   1. Affiliation strip — thin, monospace; signals Mayo affiliation + live status
 *   2. Main header — logo + wordmark, primary nav, search, theme, mobile menu
 *
 * Scroll-aware: the main header gets a backdrop once the user scrolls past 4px,
 * so the hero can read against the grid backdrop without a flat band on top.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Affiliation strip — always solid, monospace, very thin */}
      <div className="w-full border-b border-[var(--color-border)] bg-[var(--color-background)]">
        <div className="mx-auto flex h-7 max-w-7xl items-center justify-between px-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted-foreground)] sm:px-6 lg:px-8">
          <span>Mayo Clinic · Surgery Innovation</span>
          <span className="hidden items-center gap-2 sm:inline-flex">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ekg rounded-full bg-[var(--color-status-deployed)] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-status-deployed)]" />
            </span>
            <span>Lab Active</span>
          </span>
        </div>
      </div>

      {/* Main header — scroll-aware backdrop */}
      <div
        className={cn(
          "w-full transition-all duration-300",
          scrolled
            ? "border-b border-[var(--color-border)] bg-[var(--color-background)]/85 backdrop-blur-md"
            : "border-b border-transparent bg-[var(--color-background)]/0",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            aria-label="AIST home"
            className="group flex shrink-0 items-center gap-2.5"
          >
            <Logo className="h-8 w-8 transition-transform duration-300 group-hover:scale-105" />
            <span className="font-display text-xl tracking-tight text-[var(--color-foreground)]">
              AIST
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <CommandPalette />
            <ThemeToggle />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
