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
| Projects (metadata)              | `lib/projects.ts`                      |
| Project page content             | `content/projects/{slug}.ts`           |
| Publications                     | `lib/publications.ts`                  |
| **News items**                   | **`lib/news.ts`**                      |
| Events & Journal Club            | `lib/events.ts`                        |
| **Archive items**                | **`lib/archive.ts`**                   |
| Open positions / hiring          | `lib/openings.ts`                      |
| Home page stats (counters)       | `lib/stats.ts`                         |
| Surgical phases                  | `lib/phases.ts`                        |
| Glossary terms                   | `lib/glossary.ts`                      |

---

## Adding a new team member

1. Open `lib/team.ts`.
2. Add a new entry to the `team` array. Required fields:
   - `slug`: lowercase-with-dashes, e.g. `"jane-doe"`. This becomes their URL: `/team/jane-doe`.
   - `name`, `role`, `affiliation`, `bio`
   - `photo`: path like `"/team/jane-doe.jpg"` — file goes in `/public/team/`
   - `initials`: use period notation, e.g. `"J.D."` — shown on playing cards until photo loads
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
  initials: "J.D.",
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

---

## Adding a project

1. Open `lib/projects.ts` and add the project metadata entry (slug, name, status, phases, URLs, team, etc.).
2. Create `content/projects/{slug}.ts` with the scientific page content (see below).

The project automatically:
- Appears in the home page compact summary (if `featured: true`)
- Appears in the `/projects` index
- Gets its own detail page at `/projects/{slug}`
- Shows in the surgical phase wheel under each of its `phases`
- Links from each `team` member's detail page

### Updating project page content

Each project has a content file at `content/projects/{slug}.ts` that exports a content object with these fields:

```ts
export const myProjectContent = {
  problem: "What is broken clinically...",
  clinicalNeed: "Why this matters...",
  dataSources: "Where the data comes from...",
  methods: "Technical approach...",
  validationPlan: "How claims will be tested...",  // empty string = shows placeholder
  currentStatus: "What stage we're at...",
  modelCard: {
    intendedUse: "...",
    inputs: ["Input A", "Input B"],
    outputs: ["Output A", "Output B"],
    performanceMetrics: "...",
    datasetSize: "...",
    validationStatus: "...",
    limitations: "...",
    deploymentReadiness: "...",
  },
};
```

Any field set to an empty string `""` renders a "Content coming soon" placeholder card.
In development mode, placeholders show a note pointing to the content file.

### Phases available

| Value                   | Description                   |
| ----------------------- | ----------------------------- |
| `"risk-stratification"` | Pre-op risk assessment        |
| `"intra-op-intelligence"` | Real-time during surgery    |
| `"patient-journey"`     | Patient education and prep    |
| `"outcomes-validation"` | External validation cohorts   |

### Status values

| Value         | Meaning                                 |
| ------------- | --------------------------------------- |
| `"concept"`   | Idea / early design stage               |
| `"development"` | Active development                    |
| `"validation"` | Undergoing validation study            |
| `"clinical"`  | In clinical trial                       |
| `"deployed"`  | Deployed to production                  |

---

## Adding a glossary term

1. Open `lib/glossary.ts`.
2. Add a new entry to the `glossary` array:

```ts
{
  slug: "my-term",          // URL-safe identifier
  term: "My Term",          // Display name
  definition: "...",        // 1-2 sentence professional definition
  related: ["other-slug"],  // Optional cross-links to other terms
  category: "Clinical AI",  // Optional category badge
},
```

3. The term appears automatically on `/resources/glossary`, sorted alphabetically.

> **When to add**: add a term when a technical concept appears 3+ times across the site, or when a project page uses specialist vocabulary that a general academic audience might not know.

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

All images should be optimized before commit (use [Squoosh](https://squoosh.app) or similar).
Logo PNGs above 200KB should be converted to WebP for ~70% size reduction.

---

## Adding a publication

1. Open `lib/publications.ts`.
2. Add a new entry with `slug`, `title`, `authors`, `venue`, `year`, `date`, `url`, `projects`, `team`, `order`.
3. Set `featured: true` to show on the home page "Recent publications" strip.
4. Add the project slug to the `projects` array — the publication then appears on that project's detail page under "Related Publications".

## Adding an open position

1. Open `lib/openings.ts`.
2. Add an entry with `slug`, `title`, `type`, `location`, `summary`, `applyUrl`, `postedAt`.
3. The position appears on `/join`. The home page "Join Us" section surfaces the most recent opening.

## Home page section order

The canonical section order as of Step 5:

| Code | ID               | Label              |
| ---- | ---------------- | ------------------ |
| 01   | `#mission`       | Mission            |
| —    | (after mission)  | Credibility strip  |
| 02   | `#numbers`       | By the numbers     |
| 03   | `#research`      | Research & Projects|
| 04   | `#team`          | Team               |
| 05   | `#news`          | From the lab       |
| 06   | `#collaborators` | Collaborators      |
| 07   | `#join`          | Join Us            |

**Do not reorder sections without updating nav anchor links in `lib/navigation.ts`.**

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

After editing any data file (`lib/*.ts`) or content file (`content/projects/*.ts`), the dev server hot-reloads automatically.

---

## Events & Journal Club

### Adding a new event

Edit `lib/events.ts` and add an entry to the `events` array:

```ts
{
  slug: "aist-journal-club-jun-2026",
  title: "AIST Journal Club — June 2026",
  series: "AIST Journal Club",
  type: "journal-club",         // journal-club | seminar | conference | workshop | talk
  format: "hybrid",             // in-person | virtual | hybrid
  date: "2026-06-17",           // ISO date
  time: "12:00 PM CST",
  location: "Mayo Clinic, Rochester, MN — and virtual",
  description: "...",
  status: "upcoming",           // upcoming | past | tbd
  rsvpRequired: true,
  recurring: true,
  recurrencePattern: "Recurring · Monthly",
  featured: true,
},
```

The home page callout shows when at least one event has `status: "upcoming"` and `slug === "aist-journal-club-may-2026"` (or update the slug in `app/page.tsx`).

To show the most recent upcoming event, update the slug in `app/page.tsx`:
```ts
const nextEvent = events.find((e) => e.slug === "aist-journal-club-jun-2026");
```

### Marking past events
Change `status: "upcoming"` to `status: "past"`. Past events collapse into a `<details>` block on the events page.

---

## Publications

### Author list format
Use **"LastName F"** format (last name + first initial, no period): `"Shahriarirad R"`, `"Ghanem OM"`.
AMA/APA/BibTeX formatters in `lib/publication-utils.ts` handle punctuation automatically.

### Adding a publication

```ts
{
  slug: "my-paper-2026",
  title: "Full paper title",
  authors: ["LastName F", "Surname G"],
  venue: "Journal Name",
  year: 2026,
  date: "2026-01-01",
  type: "original-research",    // see PublicationType in lib/publications.ts
  status: "published",          // published | accepted | in-press | preprint | submitted
  url: "https://...",
  doi: "10.1234/...",           // optional
  projects: ["mosi"],           // links to project detail page
  team: ["reza-shahriarirad"],  // slug of team members
  themes: ["bariatric-surgery", "clinical-decision-support"],
  tags: ["MOSI", "Decision Support"],
  featured: true,               // shows on home page "From the lab" strip
  order: 4,
},
```

### Filtering
- `themes` drives the "Theme" filter on the publications page
- `projects` drives the "Project" filter and links the publication to the project detail page
- `featured: true` shows in the home page recent publications strip
- `selected: true` marks it for a "Selected works" view (future feature)

---

## Adding a news item

News items drive the `/news` page, the home page "From the lab" section,
and bidirectional mentions on team and project pages.

### Step-by-step

1. Open `lib/news.ts`.
2. Add a new entry to the `news` array. Required fields:

```ts
{
  slug: "my-news-item-2026",         // URL-safe identifier, e.g. "sages-2026"
  title: "Full headline here",
  date: "2026-05-01",                // ISO date — determines sort order
  category: "conference",           // conference | publication | award | press | lab-update | newsletter
  image: "/news/my-news-item.jpg",  // optional — path to image in /public/news/
  imageAlt: "Brief alt text",       // optional alt text for the image
  excerpt: "1-2 sentence summary shown on cards and in previews.",
  body: `Full article text here. Use double newlines to separate paragraphs.

This is a second paragraph. Markdown headings/lists are not parsed — plain text only.`,
  people: ["simon-laplante"],       // team slugs mentioned (drives 'Recent mentions' on team pages)
  projects: ["mosi"],               // project slugs (drives 'Featured in news' on project pages)
  publications: [],                 // publication slugs referenced
  externalLink: "",                 // if set, 'Read more' opens this URL; if empty, body renders inline
  featured: false,                  // true = appears as hero on news page
},
```

3. If you have an image, save it to `/public/news/{filename}.jpg`.
   - Recommended: 1600×900 (16:9 aspect), JPEG, under 200KB.
   - If the image is missing, the card shows a styled gradient placeholder.

4. The `allNews` export in `lib/news.ts` automatically sorts by date descending.
   The home page shows the 3 most recent items.

### The news hero

Only one item can be `featured: true` at a time. If multiple items are marked featured,
the first one (most recent by date) is used. The featured item becomes the full-width hero
on the `/news` page.

### Category reference

| Value | Label | Colour |
| ----- | ----- | ------ |
| `conference` | Conference | Accent blue |
| `publication` | Publication | Blue-300 |
| `award` | Award | Yellow |
| `press` | Press | Purple |
| `lab-update` | Lab Update | Emerald |
| `newsletter` | Newsletter | Muted |

### Image sizes

Save to `/public/news/`. Recommended dimensions: **1600×900 (16:9)**, JPEG, under 200KB.
Use [Squoosh](https://squoosh.app) to compress. The `/public/news/README.md` lists all
expected filenames.

### Adding hyperlinks to a news article body

Use standard Markdown link syntax inside the `body` string:

```ts
body: `...The AIST Lab presented [Mayo Obesity Staging Index](https://www.soard.org/article/...) at ASMBS...`,
```

Only `https://` and `http://` links are rendered — other patterns are left as plain text.

### Adding structured related links (sidebar)

To add links that appear in the article sidebar, add `relatedLinks` to the news item:

```ts
relatedLinks: [
  { label: "Published abstract — SOARD", url: "https://www.soard.org/..." },
  { label: "Conference program", url: "https://..." },
],
```

---

## Adding an archive item

Archive items can be presentations, videos, webinars, journal club recordings, or documents.

### Step-by-step

1. Open `lib/archive.ts`.
2. Add a new entry to the `archiveItems` array:

```ts
{
  slug: "my-presentation-2026",
  title: "Title of the presentation",
  date: "2026-06-01",
  category: "presentation",   // presentation | video | webinar | journal-club | document
  description: "1–2 sentence description.",
  fileUrl: "/archive/documents/my-presentation.pdf",  // if file available
  videoUrl: "",                                         // OR video URL
  people: ["simon-laplante"],  // team slugs
  projects: ["mosi"],          // project slugs
  publications: [],
  news: ["asmbs-2026"],        // news slugs — creates "Related materials" link on detail pages
  access: "public",            // public | mayo-only | restricted
},
```

3. If a file: place the PDF/PPTX/etc. in `public/archive/documents/`.
4. If a thumbnail: place a 800×450 JPEG in `public/archive/thumbnails/`.

### Access levels

| Value | Behavior |
| ----- | -------- |
| `public` | File/video link shown directly |
| `mayo-only` | Shows "Mayo employees — contact for access" button linking to `/contact` |
| `restricted` | Card visible in archive but no direct file/video link |

---

## Open position team placeholders

When a role is open but unfilled, you can add a placeholder to the team roster:

```ts
{
  slug: "my-role-open",
  name: "Role Title",
  role: "Engineer",
  affiliation: "Mayo Clinic — AIST Lab",
  bio: "We are actively recruiting...",
  photo: "",
  initials: "?",
  isOpenPosition: true,
  openPositionUrl: "https://jobs.mayoclinic.org/...",
  featured: true,
  order: 9,
},
```

The roster row shows a dashed placeholder and a "Apply on Mayo Careers" CTA instead of the
standard bio/research-focus section. The playing card on the home page routes to `/join`.

To tie the opening to the position in `lib/openings.ts`, add `teamSlug: "my-role-open"` to the matching opening entry.
