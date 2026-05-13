/**
 * Single source of truth for site-wide configuration.
 * Edit this file to update the lab name, tagline, navigation, and social links.
 */

export const siteConfig = {
  name: "AIST",
  fullName: "Artificial Intelligence & Surgical Technology",
  tagline: "Intelligence at every phase of surgical care.",
  description:
    "AIST is a research lab advancing artificial intelligence across the full surgical journey — pre-operative planning, intra-operative guidance, post-operative recovery, and external validation of surgical AI.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/og/og-default.png",
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
