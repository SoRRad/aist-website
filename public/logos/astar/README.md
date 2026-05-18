# A-STAR Logo Assets

## Current Production Assets

All active UI logo files are **WebP with transparency** located in `public/logos/astar/`.
WebP versions were generated from the PNG originals with background-color keying to produce
transparent backgrounds. The source PNG files are kept alongside for archival reference.

### Naming convention

| Suffix | Meaning | Use on |
| --- | --- | --- |
| `*-dark.webp` | Dark-ink logo ("onLight") | Light / white backgrounds |
| `*-light.webp` | Light-ink logo ("onDark") | Dark backgrounds |
| `*-neutral.webp` | Neutral / standalone variant | Depends on context |

### Active UI files

| File | Variant | Intrinsic size | Used by |
| --- | --- | --- | --- |
| `astar-mark-dark.webp` | Mark (square), dark ink | 1254×1254 | `<Logo variant="mark">` in light mode |
| `astar-mark-light.webp` | Mark (square), light ink | 1254×1254 | `<Logo variant="mark">` in dark mode |
| `astar-mark-neutral.webp` | Mark (square), neutral | 1254×1254 | Available for standalone use |
| `astar-horizontal-dark.webp` | Horizontal wordmark, dark ink | ~1580×559 | `<Logo variant="horizontal">` in light mode |
| `astar-horizontal-light.webp` | Horizontal wordmark, light ink | ~1559×558 | `<Logo variant="horizontal">` in dark mode |
| `astar-stacked-dark.webp` | Stacked wordmark, dark ink | ~1048×1132 | `<Logo variant="stacked">` in light mode |
| `astar-stacked-light.webp` | Stacked wordmark, light ink | ~962×1103 | `<Logo variant="stacked">` in dark mode |
| `favicon-512.png` | Browser favicon | 512×512 | `<link rel="icon">` in `app/layout.tsx` |
| `apple-touch-icon.png` | Apple home-screen icon | 1254×1254 | `<link rel="apple-touch-icon">` |
| `astar-og-image.png` | OpenGraph social image | 1731×909 | `og:image` meta tag |

## Site logo usage

| Location | Component / file | Variant |
| --- | --- | --- |
| Header home link | `components/site/header.tsx` | `mark` |
| Research dropdown icons | `components/site/header.tsx` | `mark` (via `<Logo>`) |
| Hero section | `components/sections/hero-section.tsx` | `mark` + HTML headline |
| Sidebar | `components/site/command-palette.tsx` | `mark` |
| Footer wordmark | `components/site/footer.tsx` | `horizontal` |

## How the Logo component works

`components/site/logo.tsx` renders **two** `<Image>` elements simultaneously — one visible
in light mode (`dark:hidden`) and one in dark mode (`dark:block`). This avoids
`useTheme()` and produces no FOUC. Paths come from `lib/logos.ts`.

## Legacy SVGs

The original SVG files have been moved to `legacy/` and **must not be imported or
hardcoded in any active site code**. They were generated from an older version of the logo
artwork and are kept only for historical reference.
