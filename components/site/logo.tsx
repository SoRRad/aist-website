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
  const sources = {
    mark: { light: logos.markLight, dark: logos.markDark },
    horizontal: { light: logos.fullHorizontalLight, dark: logos.fullHorizontalDark },
    stacked: { light: logos.fullStackedLight, dark: logos.fullStackedDark },
  };

  const dims = {
    mark: { w: width ?? 80, h: height ?? 80 },
    horizontal: { w: width ?? 200, h: height ?? 50 },
    stacked: { w: width ?? 420, h: height ?? 210 },
  }[variant];

  const defaultSizes = {
    mark: "80px",
    horizontal: "200px",
    stacked: "(max-width: 640px) 280px, 420px",
  }[variant];

  const { light, dark } = sources[variant];
  const alt = variant === "mark" ? "A-STAR logo mark" : "A-STAR — AI in Surgical Technology & Augmentation Research";
  const wrapClass = cn("relative", animated && "animate-logo-entrance", className);

  return (
    <div className={wrapClass}>
      {/* Light mode variant */}
      <Image
        src={light}
        alt={alt}
        width={dims.w}
        height={dims.h}
        priority={priority}
        sizes={sizes ?? defaultSizes}
        className="block h-auto w-full dark:hidden"
      />
      {/* Dark mode variant */}
      <Image
        src={dark}
        alt=""
        aria-hidden="true"
        width={dims.w}
        height={dims.h}
        priority={priority}
        sizes={sizes ?? defaultSizes}
        className="hidden h-auto w-full dark:block"
      />
    </div>
  );
}
