/**
 * Canonical logo paths. Always import from here — never hardcode logo paths
 * in components. If a file moves, change it once here.
 *
 * Current files are SVG placeholders. Replace with production assets from
 * newLogos/ when available — see public/logos/astar/README.md for specs.
 */
export const logos = {
  // Full stacked (vertical) lockups — used in hero
  fullStackedDark: "/logos/astar/astar-stacked-dark.svg",
  fullStackedLight: "/logos/astar/astar-stacked-light.svg",

  // Full horizontal lockups — used in header and footer
  fullHorizontalDark: "/logos/astar/astar-horizontal-dark.svg",
  fullHorizontalLight: "/logos/astar/astar-horizontal-light.svg",

  // Mark only (no wordmark)
  markDark: "/logos/astar/astar-mark-dark.svg",
  markLight: "/logos/astar/astar-mark-light.svg",
  // Works acceptably on both light and dark backgrounds
  markNeutral: "/logos/astar/astar-mark-neutral.svg",
} as const;
