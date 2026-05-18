/**
 * Single source of truth for site-wide configuration.
 * Edit this file to update the lab name, tagline, navigation, and social links.
 */

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const siteConfig = {
  name: "A-STAR",
  fullName: "AI in Surgical Technology & Augmentation Research",
  tagline: "Augmenting the surgeon. Advancing the science.",
  description:
    "A-STAR is a research lab advancing artificial intelligence across the full surgical journey — pre-operative planning, intra-operative guidance, post-operative recovery, and external validation of surgical AI systems.",
  url: siteUrl,
  ogImage: "/opengraph-image",
  institution: {
    name: "Mayo Clinic",
    department: "Surgery Innovation",
    address: "200 First Street SW, Rochester, MN 55905",
  },
  social: {
    github: "https://github.com/SoRRad",
    linkedin: "",
    twitter: "",
    email: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
