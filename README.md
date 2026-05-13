# AIST — Artificial Intelligence & Surgical Technology

> Intelligence at every phase of surgical care.

The website for **AIST**, a research lab at Mayo Clinic advancing artificial
intelligence across the full surgical journey — pre-operative planning,
intra-operative guidance, post-operative recovery, and external validation.

This is **Step 1** of a progressive build. It includes the design system,
layout shell, command palette, theme switching, and a minimal but visually
grounded home page. Subsequent steps add the full home, projects, team,
publications, news/events, and resources pages.

---

## Stack

| Concern         | Choice                                |
| --------------- | ------------------------------------- |
| Framework       | Next.js 15 (App Router) + React 19    |
| Styling         | Tailwind CSS v4                       |
| Components      | Custom + Radix UI primitives          |
| Content (later) | MDX via Velite                        |
| Search          | `cmdk` palette (Cmd+K)                |
| Theme           | `next-themes` (light/dark/system)     |
| Icons           | `lucide-react`                        |
| Animations      | CSS + `motion` library (Framer Motion) |
| Hosting         | Vercel (auto-deploy from `main`)      |
| Analytics       | Plausible (optional)                  |

---

## Quick start

```bash
# 1. Install
npm install

# 2. Copy environment template
cp .env.example .env.local

# 3. Run the dev server
npm run dev
```

Open <http://localhost:3000>.

---

## Project structure

```
aist-website/
├── app/                       # Next.js App Router
│   ├── globals.css            # Design system (all CSS variables live here)
│   ├── layout.tsx             # Root layout: fonts, theme, header, footer
│   └── page.tsx               # Home page
├── components/
│   ├── ui/                    # Primitives (Button, Dialog, …)
│   ├── site/                  # Site chrome (Header, Footer, Logo, Nav)
│   ├── lab/                   # Lab-specific components (added in Step 2+)
│   └── motion/                # Motion components (added in Step 2+)
├── content/                   # MDX content (added in Step 3+)
│   ├── team/
│   ├── projects/
│   ├── publications/
│   ├── news/
│   ├── events/
│   └── glossary/
├── lib/
│   ├── utils.ts               # cn(), date helpers
│   ├── site-config.ts         # Lab name, tagline, address, social — edit this
│   └── navigation.ts          # Header, footer, command palette nav
├── public/
│   ├── logos/                 # Drop production logos here (filenames preserved)
│   ├── team/                  # Drop team photos here
│   ├── projects/              # Project images, screenshots, demo thumbnails
│   ├── og/                    # Open Graph share images
│   └── favicon.svg
└── README.md
```

### Where to edit common things

| Want to change          | Edit                            |
| ----------------------- | ------------------------------- |
| Lab name / tagline      | `lib/site-config.ts`            |
| Header navigation       | `lib/navigation.ts` → `primaryNav` |
| Colors / fonts          | `app/globals.css`               |
| Logo                    | Replace `public/logos/aist-logo.svg` with the production file |
| Mayo Clinic logo        | Replace `public/logos/mayo-clinic.svg` |

---

## Design system

All theme tokens are declared in `app/globals.css` under `@theme`. The palette
is anchored in the AIST logo:

- **Navy 900** `#0A1A3A` — dominant primary
- **Blue 500** `#1E88E5` — electric accent
- **Coral 400** `#FB7185` — reserved for "new" markers and urgent CTAs
- **Ink** scale — cool neutrals

### Typography

- **Display**: Instrument Serif (editorial, for hero and section headings)
- **Body**: Geist (modern, technical, exceptional reading)
- **Mono**: Geist Mono (BibTeX, code, technical chrome)

### Motion language

- **EKG pulse** (`.animate-ekg`) — used on "live" indicators
- **Stroke draw** (`.animate-stroke-draw`) — used on the logo on first load
- All motion respects `prefers-reduced-motion`

---

## Working with Claude Code

This repo is designed for content edits to be straightforward Markdown/MDX
changes. Once Step 3 ships, adding a new team member, publication, or news item
will be one file in `content/`.

Suggested Claude Code prompts during the build:

- "Add a new team member: name X, role Y, photo path Z."
- "Add a publication: title, authors, venue, year, PDF link, project tag."
- "Update the MOSI project page status from 'validation' to 'clinical'."

---

## Deployment

### Vercel (recommended)

1. Push the repo to GitHub.
2. Import the repo at <https://vercel.com/new>.
3. Set `NEXT_PUBLIC_SITE_URL` to the production URL.
4. Deploy — every push to `main` redeploys automatically.

### Custom domain

When the domain is registered (suggestion: `aistlab.org`), add it in Vercel →
Project → Settings → Domains. Update `NEXT_PUBLIC_SITE_URL` to the new origin.

---

## Roadmap

- [x] **Step 1** — Foundation: design system, layout shell, command palette, theme
- [ ] **Step 2** — Full home: animated logo, surgical phase wheel, featured project, news strip, counters
- [ ] **Step 3** — Projects: MOSI and SIRIS deep pages with embedded live tools
- [ ] **Step 4** — Team & About: members, collaborators, alumni
- [ ] **Step 5** — Publications, News, Events with filtering and BibTeX export
- [ ] **Step 6** — Resources, Join, Contact, co-authorship graph, accessibility & SEO polish

---

## License

© Mayo Foundation for Medical Education and Research. All rights reserved
unless otherwise specified.

The website source code is maintained for and by the AIST team. The MOSI and
SIRIS projects have their own licensing — see their respective project pages.
