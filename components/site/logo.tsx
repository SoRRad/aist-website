import Image from "next/image";
import { logos } from "@/lib/logos";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "mark" | "horizontal" | "stacked";
  animated?: boolean;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
}

/**
 * A-STAR logo — renders both light and dark variants and lets CSS hide one.
 * No useTheme(), no mounted check, no FOUC, fully SSR-correct.
 *
 * Naming semantics used throughout this file:
 *   onLight = logo intended for light backgrounds (dark ink)  → markDark / fullHorizontalDark / fullStackedDark
 *   onDark  = logo intended for dark backgrounds (light ink)  → markLight / fullHorizontalLight / fullStackedLight
 *
 * All source files are WebP with transparent backgrounds (generated from the
 * PNG originals). The SVG files under public/logos/astar/legacy are outdated
 * and must not be imported here.
 */
export function Logo({
  className,
  variant = "mark",
  animated = false,
  priority = false,
  sizes,
  width,
  height,
}: LogoProps) {
  // onLight = shown in light mode (CSS `dark:hidden`)
  // onDark  = shown in dark mode  (CSS `dark:block`)
  const sources = {
    mark: { onLight: logos.markDark, onDark: logos.markLight },
    horizontal: { onLight: logos.fullHorizontalDark, onDark: logos.fullHorizontalLight },
    stacked: { onLight: logos.fullStackedDark, onDark: logos.fullStackedLight },
  };

  // Intrinsic dimensions derived from the cropped WebP files.
  // These set the srcset optimization hints and aspect-ratio for layout.
  // horizontal WebP is ~1580×559 after cropping (ratio ≈ 2.83).
  // stacked  WebP is ~1048×1132 after cropping (ratio ≈ 0.93).
  // mark     WebP is 1254×1254 (square).
  const dims = {
    mark: { w: width ?? 80, h: height ?? 80 },
    horizontal: { w: width ?? 282, h: height ?? 100 },
    stacked: { w: width ?? 195, h: height ?? 210 },
  }[variant];

  const defaultSizes = {
    mark: "80px",
    horizontal: "280px",
    stacked: "(max-width: 640px) 200px, 280px",
  }[variant];

  const { onLight, onDark } = sources[variant];
  const alt =
    variant === "mark"
      ? "A-STAR logo mark"
      : "A-STAR — AI in Surgical Technology & Augmentation Research";
  const wrapClass = cn("relative", animated && "animate-logo-entrance", className);

  return (
    <div className={wrapClass}>
      {/* Light mode: dark-ink logo on light background */}
      <Image
        src={onLight}
        alt={alt}
        width={dims.w}
        height={dims.h}
        priority={priority}
        sizes={sizes ?? defaultSizes}
        className="block h-auto w-full object-contain dark:hidden"
      />
      {/* Dark mode: light-ink logo on dark background */}
      <Image
        src={onDark}
        alt=""
        aria-hidden="true"
        width={dims.w}
        height={dims.h}
        priority={priority}
        sizes={sizes ?? defaultSizes}
        className="hidden h-auto w-full object-contain dark:block"
      />
    </div>
  );
}
