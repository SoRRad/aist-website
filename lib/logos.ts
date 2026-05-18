/**
 * Canonical logo paths. Always import from here instead of hardcoding paths.
 *
 * Current production A-STAR logo assets are WebP files (with transparency) in
 * public/logos/astar. The source PNG files are kept alongside for reference.
 * The SVG files in the legacy folder are outdated and must not be used in
 * active UI code until regenerated from the new logo artwork.
 *
 * Naming convention:
 *   "Dark"  suffix = dark-ink logo intended for light/white backgrounds (onLight).
 *   "Light" suffix = light-ink logo intended for dark backgrounds (onDark).
 */
export const logos = {
  // Mark-only (square)
  markDark: "/logos/astar/astar-mark-dark.webp",       // onLight — dark mark, transparent bg
  markLight: "/logos/astar/astar-mark-light.webp",     // onDark  — light mark, transparent bg
  markNeutral: "/logos/astar/astar-mark-neutral.webp", // neutral variant (transparent bg)

  // Full horizontal wordmark
  fullHorizontalDark: "/logos/astar/astar-horizontal-dark.webp",   // onLight
  fullHorizontalLight: "/logos/astar/astar-horizontal-light.webp", // onDark

  // Full stacked layout
  fullStackedDark: "/logos/astar/astar-stacked-dark.webp",   // onLight
  fullStackedLight: "/logos/astar/astar-stacked-light.webp", // onDark
} as const;
