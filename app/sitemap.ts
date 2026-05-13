import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { allNav } from "@/lib/navigation";
import { projects } from "@/lib/projects";
import { team } from "@/lib/team";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = allNav.map(({ href }) => ({
    url: `${base}${href}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: href === "/" ? 1.0 : 0.5,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map(({ slug }) => ({
    url: `${base}/projects/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const teamRoutes: MetadataRoute.Sitemap = team.map(({ slug }) => ({
    url: `${base}/team/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes, ...teamRoutes];
}
