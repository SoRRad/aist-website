"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** "mark" = icon only (aist-mark.png), "full" = full lockup PNG, "wordmark" = mark + "AIST" text */
  variant?: "mark" | "wordmark" | "full";
  animated?: boolean;
  priority?: boolean;
  sizes?: string;
}

/**
 * AIST logo component — PNG-based with theme-aware light/dark swapping.
 *
 * Variants:
 *   mark      — aist-mark.png (icon only, default)
 *   wordmark  — aist-mark.png + "AIST" text in display font
 *   full      — aist-full-{dark|light}.png (full lockup with tagline)
 *
 * The "animated" prop applies a CSS scale-in + fade-in entrance (600ms ease-out).
 * Hydration-safe: renders nothing until mounted to avoid theme flicker.
 */
export function Logo({
  className,
  variant = "mark",
  animated = false,
  priority = false,
  sizes,
}: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  if (variant === "full") {
    return (
      <div
        className={cn(
          "relative",
          animated && "animate-logo-entrance",
          className,
        )}
      >
        {mounted ? (
          <Image
            src={isDark ? "/logos/aist-full-dark.png" : "/logos/aist-full-light.png"}
            alt="AIST — Artificial Intelligence in Surgical Technologies"
            width={480}
            height={240}
            priority={priority}
            sizes={sizes ?? "(max-width: 640px) 320px, 480px"}
            className="h-auto w-full"
          />
        ) : (
          /* Placeholder during SSR to reserve layout space */
          <div className="h-[240px] w-[480px] max-w-full" aria-hidden="true" />
        )}
      </div>
    );
  }

  if (variant === "wordmark") {
    return (
      <div
        className={cn(
          "flex items-center gap-3",
          animated && "animate-logo-entrance",
          className,
        )}
      >
        <MarkImage mounted={mounted} priority={priority} className="h-8 w-8 shrink-0" />
        <span className="font-display text-2xl tracking-tight">AIST</span>
      </div>
    );
  }

  /* Default: mark */
  return (
    <MarkImage
      mounted={mounted}
      priority={priority}
      className={cn(animated && "animate-logo-entrance", className)}
    />
  );
}

function MarkImage({
  mounted,
  priority,
  className,
}: {
  mounted: boolean;
  priority?: boolean;
  className?: string;
}) {
  if (!mounted) {
    return <div className={cn("rounded-sm bg-transparent", className)} aria-hidden="true" />;
  }
  return (
    <Image
      src="/logos/aist-mark.png"
      alt="AIST logo mark"
      width={80}
      height={80}
      priority={priority}
      className={cn("h-auto w-auto", className)}
    />
  );
}
