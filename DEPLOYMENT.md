# AIST Website — Deployment Guide

## Pre-deployment checklist

### Content
- [ ] All team photos in `/public/team/{slug}.jpg`
- [ ] All partner logos in `/public/logos/partners/{slug}.png`
- [ ] Real author lists on all publications in `lib/publications.ts`
- [ ] Project content files have text for: Problem, Clinical Need, Methods, Validation Plan, Current Status
- [ ] Glossary definitions reviewed and refined (15 seeded terms)
- [ ] Hero horizontal-light logo exported: `/public/logos/aist_logo_png/aist-full-horizontal-light-transparent.png`

### Configuration
- [ ] `NEXT_PUBLIC_SITE_URL` set to production URL in Vercel env
- [ ] `RESEND_API_KEY` set in Vercel env (see Email setup below)
- [ ] `CONTACT_TO_EMAIL` set in Vercel env — email to receive contact form submissions
- [ ] Update `siteConfig.social.email` in `lib/site-config.ts` with real email
- [ ] Update `siteConfig.social.linkedin` if a lab account is created

### Email service (Resend)
1. Sign up at https://resend.com (free tier: 3,000 emails/month, 100/day)
2. Verify your domain — go to Resend dashboard → Domains → Add Domain
3. Add the DNS records (SPF, DKIM, DMARC) Resend provides to your DNS provider
4. Wait 5–15 minutes for DNS propagation, then click "Verify"
5. In Resend → API Keys → Create API Key → name it `aist-website-production`, scope `Sending access`
6. Copy the key (starts with `re_`) — shown only once
7. Add `RESEND_API_KEY = re_...` to Vercel env vars (Production + Preview)
8. Add `CONTACT_TO_EMAIL = your.email@mayo.edu` to Vercel env vars

### Wiring up the contact API
After Resend is configured, update `app/api/contact/route.ts`:

```ts
import { Resend } from "resend";
// npm install resend

const resend = new Resend(process.env.RESEND_API_KEY);

// Replace the console.log with:
await resend.emails.send({
  from: "AIST Website <noreply@aist-lab.org>",
  to: [process.env.CONTACT_TO_EMAIL!],
  subject: `[AIST Contact] ${data.inquiryType}: ${data.name}`,
  text: [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Institution: ${data.institution ?? "N/A"}`,
    `Inquiry type: ${data.inquiryType}`,
    `Message:\n${data.message}`,
  ].join("\n"),
});
```

### SEO
- [ ] Verify `/opengraph-image` returns a 1200×630 PNG
- [ ] Verify `/projects/mosi/opengraph-image` returns correctly
- [ ] Submit sitemap: `https://yourdomain.com/sitemap.xml`
- [ ] Check `/robots.txt` is accessible

### Performance audit
- [ ] Run Lighthouse (Chrome → DevTools → Lighthouse)
- [ ] Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95

### Content (step 9 additions)
- [ ] Archive thumbnails added for items in `content/archive/` (800×450 JPEG in `public/archive/thumbnails/`)
- [ ] Mayo-only archive items (`access: "mayo-only"`) correctly flag so no direct link is shown
- [ ] News detail pages render: `/news/asmbs-2026`, `/news/madani-visit-2025`, etc.
- [ ] `/projects` shows the merged Research & Projects content; `/research` redirects to `/projects`
- [ ] AI Engineer open position links to the correct Mayo Careers URL

### Manual test pass
- [ ] Every page in both light and dark mode
- [ ] Contact form submits; email arrives at `CONTACT_TO_EMAIL`
- [ ] Journal Club "Add to calendar" downloads an `.ics` file
- [ ] Publication filters work; CSV and BibTeX export download correctly
- [ ] Cmd+K search drawer works at any scroll position
- [ ] Scalpel scroll bar appears and animates on every page
- [ ] Mobile (375px) — header, search drawer, playing cards, marquee
- [ ] `/archive` renders with category/access filters
- [ ] Clicking a news card on `/news` navigates to `/news/[slug]` detail page
- [ ] ASMBS news detail shows SOARD hyperlink in body and in sidebar "Links" section
- [ ] Team page shows AI Engineer with dashed placeholder and "Apply" CTA

---

## Vercel deployment

1. Push to GitHub `main` branch
2. Import at https://vercel.com/new
3. Framework auto-detected as Next.js
4. Add all environment variables (see Configuration section)
5. Deploy
6. Add custom domain: Vercel Project Settings → Domains
7. DNS: point CNAME / A record per Vercel's instructions

---

## Post-deployment

- [ ] Test live site in incognito (no cached state)
- [ ] Share URL with team members for sanity check
- [ ] Set up Plausible analytics if desired: add `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` env var
- [ ] Submit to Mayo Clinic web team for institutional indexing
- [ ] Schedule content review cycle (every 2 weeks recommended)

---

## Troubleshooting

**Contact form shows "development mode" message after deploy:**
→ `RESEND_API_KEY` not set in Vercel env. Add it and redeploy.

**OG images don't work:**
→ `NEXT_PUBLIC_SITE_URL` not set or set to localhost. Set to `https://yourdomain.com`.

**Team photos show initials instead of photos:**
→ Photo file missing at the path in `lib/team.ts`. Drop photo at `/public/team/{slug}.jpg`.

**Partner logos show text fallback:**
→ Logo file missing at the path in `lib/collaborators.ts`. Drop logo at `/public/logos/partners/{slug}.png`.
