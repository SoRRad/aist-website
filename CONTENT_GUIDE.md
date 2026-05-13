# AIST Website — Content Guide

Everything you'll commonly need to update lives in a small number of files.
No code changes are needed for routine updates — just edit data files and
drop images into the right folders.

## Quick reference

| What you want to change          | Where to edit                          |
| -------------------------------- | -------------------------------------- |
| Lab name, tagline, address       | `lib/site-config.ts`                   |
| Header / footer navigation       | `lib/navigation.ts`                    |
| Team members                     | `lib/team.ts` + photos in `/public/team/` |
| Collaborators                    | `lib/collaborators.ts` + logos in `/public/logos/partners/` |
| Projects                         | `lib/projects.ts`                      |
| Home page stats (counters)       | `lib/stats.ts`                         |
| Surgical phases                  | `lib/phases.ts`                        |
| "Now operating" status pill      | `lib/now.ts`                           |
| Latest news (until Step 5)       | `lib/mock-news.ts`                     |
| Upcoming events (until Step 5)   | `lib/mock-events.ts`                   |
| Glossary terms                   | `lib/glossary.ts`                      |

---

## Adding a new team member

1. Open `lib/team.ts`.
2. Add a new entry to the `team` array. Required fields:
   - `slug`: lowercase-with-dashes, e.g. `"jane-doe"`. This becomes their URL: `/team/jane-doe`.
   - `name`, `role`, `affiliation`, `bio`
   - `photo`: path like `"/team/jane-doe.jpg"` — file goes in `/public/team/`
   - `initials`: e.g. `"JD"` — used until the photo is added
   - `links`: any of `profile`, `email`, `github`, `linkedin`, `twitter`, `scholar`
   - `order`: where they appear in the list (lower = earlier)
   - `featured: true` if they should show on the home page preview
3. Save a square photo (recommend 600×600 minimum) to `/public/team/` matching the path in `photo`.
4. Until the photo is added, the card shows the person's initials on a gradient — no broken images.

### Example entry

```ts
{
  slug: "jane-doe",
  name: "Jane Doe, Ph.D.",
  role: "Research Fellow",
  affiliation: "Mayo Clinic",
  bio: "One paragraph bio about Jane.",
  photo: "/team/jane-doe.jpg",
  initials: "JD",
  links: {
    email: "doe.jane@mayo.edu",
    github: "https://github.com/janedoe",
  },
  featured: true,
  order: 8,
},
```

---

## Adding a collaborator

1. Open `lib/collaborators.ts`.
2. Add a new entry with `slug`, `name`, `shortName`, `description`, `logo`, `url`, `order`.
3. Save the logo (PNG or SVG, transparent background preferred) to `/public/logos/partners/` matching the path in `logo`.
4. Without a logo file, the card shows the institution's short name as a styled placeholder.

### Example entry

```ts
{
  slug: "stanford-aimlab",
  name: "Stanford AIM Lab",
  shortName: "AIM Lab",
  description: "Collaborative partner in AI for medical imaging.",
  logo: "/logos/partners/stanford-aimlab.png",
  url: "https://aim.stanford.edu",
  featured: true,
  order: 4,
},
```

---

## Adding a project

1. Open `lib/projects.ts`.
2. Add an entry with all required fields. The slug becomes its URL: `/projects/{slug}`.

The project automatically:
- Appears on the home page (if `featured: true`)
- Appears in the `/projects` index
- Gets its own detail page at `/projects/{slug}`
- Shows up in the surgical phase wheel under each of its `phases`
- Is linked from each `team` member's detail page

### Phases available

| Value             | Description                   |
| ----------------- | ----------------------------- |
| `"pre-operative"` | Planning before the OR        |
| `"intra-operative"` | Real-time during surgery   |
| `"post-operative"` | Recovery and monitoring      |
| `"validation"`    | External validation cohorts   |

### Status values

| Value         | Meaning                                 |
| ------------- | --------------------------------------- |
| `"concept"`   | Idea / early design stage               |
| `"development"` | Active development                    |
| `"validation"` | Undergoing validation study            |
| `"clinical"`  | In clinical trial                       |
| `"deployed"`  | Deployed to production                  |

---

## Updating the "Now operating" pill

Edit `lib/now.ts`:

```ts
export const now = {
  focus: "MOSI prospective validation",
  since: "2026-04",
};
```

The pill appears in the hero and links to `/now`.

---

## Updating home page stats

Edit `lib/stats.ts`. The animated counters on the home page pull from this file.

```ts
export const stats = [
  { value: 3097, suffix: "+", label: "Patients validated", sublabel: "Across MOSI cohort" },
  { value: 12, label: "Publications", sublabel: "Peer-reviewed journals" },
  ...
];
```

---

## Image asset guide

| Folder                       | What goes here                                | Recommended format       |
| ---------------------------- | --------------------------------------------- | ------------------------ |
| `/public/logos/`             | AIST official logos                           | PNG (2×) or SVG          |
| `/public/logos/partners/`    | Collaborator institution logos                | PNG transparent or SVG   |
| `/public/team/`              | Team member headshots                         | JPG, square, 600×600+    |
| `/public/projects/`          | Project screenshots, demo thumbnails          | PNG or JPG               |
| `/public/og/`                | OpenGraph share images (auto-generated)       | (handled by code)        |

All images should be optimized before commit (use [Squoosh](https://squoosh.app) or similar).
Use SVG whenever possible for crisp scaling across resolutions.

---

## Development workflow

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev          # → http://localhost:3000

# Type check
npm run typecheck

# Lint
npm run lint

# Production build
npm run build
```

After editing any data file (`lib/*.ts`), the dev server hot-reloads automatically.
No manual restarts needed.
