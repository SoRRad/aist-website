# A-STAR Logo Assets

These are SVG **placeholders** for the A-STAR brand. Replace each file with the production logo when it becomes available from `newLogos/`.

## Files

| File | Usage | Dimensions (replace with) | Background |
|------|-------|---------------------------|------------|
| `astar-mark-light.svg` | Favicon, mobile header | 80×80 px | Transparent (navy mark) |
| `astar-mark-dark.svg` | Favicon dark, mobile header dark | 80×80 px | Transparent (white mark) |
| `astar-mark-neutral.svg` | Dropdown icons, footer watermark | 80×80 px | Transparent (gray mark) |
| `astar-horizontal-light.svg` | Desktop header (light mode) | 320×64 px | Transparent |
| `astar-horizontal-dark.svg` | Desktop header (dark mode) | 320×64 px | Transparent |
| `astar-stacked-light.svg` | Hero section (light mode) | 280×200 px | Transparent |
| `astar-stacked-dark.svg` | Hero section (dark mode) | 280×200 px | Transparent |

## Replacement steps

1. Export each production logo to the exact filename above.
2. Drop files into this directory (`public/logos/astar/`).
3. Update `lib/logos.ts` if you switch from `.svg` to `.png` (change extensions only).
4. Run `npm run build` to verify no broken image paths.

## Design tokens used in placeholders
- Navy: `#061632`
- Electric blue: `#1e88e5` / `#42a5f5`
- Light text: `#e2e8f0`
- Muted: `#475569` / `#94a3b8`
