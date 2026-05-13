# Logo assets

Drop production logo files here using these exact filenames so no code changes
are needed when you swap them in:

| Filename            | What it is                                | Format    |
|---------------------|-------------------------------------------|-----------|
| `aist-logo.svg`     | Full AIST logo (mark + wordmark)          | SVG       |
| `aist-mark.svg`     | Logo mark only (no text), for header/favs | SVG       |
| `mayo-clinic.svg`   | Mayo Clinic affiliation logo              | SVG       |

## Adding partner logos

For collaborator strips on the home page, save them in this folder using
kebab-case filenames and reference them from `lib/site-config.ts`. Example:

```
public/logos/
  uhn-toronto.svg
  sara-platform.png
  mars-mayo.svg
```

## Guidelines

- **Prefer SVG.** Crisp at every size, recolors via `currentColor` if needed.
- **PNG fallback** is fine for logos with photographic detail. Use 2x size.
- **Background-transparent** is required.
- **No baked-in padding.** The CSS handles spacing.
