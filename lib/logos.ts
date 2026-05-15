/**
 * Canonical logo paths. Always import from here — never hardcode logo paths
 * in components. If a file moves, change it once here.
 *
 * All transparent variants are used on colored/textured/gradient backgrounds
 * so there is no white box behind the logo.
 */
export const logos = {
  // Full stacked (vertical) lockups — used in hero
  fullStackedDark: "/logos/aist_logo_png/aist-full-stacked-dark-transparent.png",
  fullStackedLight: "/logos/aist_logo_png/aist-full-stacked-light-transparent.png",

  // Full horizontal lockups — used in header and footer
  fullHorizontalDark: "/logos/aist_logo_png/aist-full-horizontal-dark-transparent.png",
  // TODO: replace with a true horizontal light logo when available.
  fullHorizontalLight: "/logos/aist_logo_png/aist-full-stacked-light-transparent.png",

  // Mark only (no wordmark)
  markDark: "/logos/aist_logo_png/aist-mark-dark-transparent.png",
  markLight: "/logos/aist_logo_png/aist-mark-light-transparent.png",
  // Works acceptably on both light and dark backgrounds
  markNeutral: "/logos/aist_logo_png/aist-mark.png",
} as const;
