"use client";

import Link from "next/link";
import { ArrowUpRight, Linkedin } from "lucide-react";
import { CategoryPill } from "./category-pill";
import { NewsGallery } from "./news-gallery";
import { NewsImage } from "./news-image";
import { getNewsPrimaryImage, type NewsItem } from "@/lib/news";
import { team } from "@/lib/team";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

interface NewsHeroProps {
  item: NewsItem;
}

export function NewsHero({ item }: NewsHeroProps) {
  const primaryImage = getNewsPrimaryImage(item);
  const date = new Date(item.date + "T00:00:00");
  const formatted = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const mentionedPeople = team.filter((m) => item.people.includes(m.slug));
  const mentionedProjects = projects.filter((p) => item.projects.includes(p.slug));

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    `${siteConfig.url}/news#${item.slug}`,
  )}`;

  return (
    <article
      id={item.slug}
      className="mb-12 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]"
    >
      {/* Hero image */}
      <div className="relative aspect-[16/7] w-full overflow-hidden">
        <NewsImage
          src={primaryImage?.src}
          alt={primaryImage?.alt}
          category={item.category}
          date={item.date}
          priority
          sizes="100vw"
          className="transition-transform duration-700 hover:scale-[1.01]"
        />
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8 lg:p-10">
        {/* Meta row */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <CategoryPill category={item.category} />
          <time className="font-mono text-xs text-[var(--color-muted-foreground)]">{formatted}</time>
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
            className="ml-auto text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-accent)]"
          >
            <Linkedin className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Headline */}
        <h2
          className="font-display mb-4 text-balance font-semibold leading-[1.1]"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", letterSpacing: "-0.03em" }}
        >
          {item.title}
        </h2>

        {/* Excerpt */}
        <p className="mb-6 max-w-3xl text-pretty text-base leading-relaxed text-[var(--color-muted-foreground)] sm:text-lg">
          {item.excerpt}
        </p>

        {/* Tags row */}
        {(mentionedPeople.length > 0 || mentionedProjects.length > 0) && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {mentionedPeople.map((m) => (
              <Link
                key={m.slug}
                href={`/team/${m.slug}`}
                className="rounded-full border border-[var(--color-border)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-muted-foreground)] transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--color-foreground)]"
              >
                {m.name.split(",")[0]}
              </Link>
            ))}
            {mentionedProjects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)]/20"
              >
                {p.name}
              </Link>
            ))}
          </div>
        )}

        {/* External link CTA */}
        {item.externalLink && (
          <a
            href={item.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-foreground)]"
          >
            Read more <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        )}

        {/* Inline body — only shown when no externalLink */}
        {!item.externalLink && (
          <details className="group mt-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-foreground)] list-none [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">Read the full story ↓</span>
              <span className="hidden group-open:inline">Collapse ↑</span>
            </summary>
            <div className="mt-4 space-y-3 border-t border-[var(--color-border)] pt-4">
              {item.body.split("\n\n").filter(Boolean).map((para, i) => (
                <p key={i} className="text-pretty text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                  {para.trim()}
                </p>
              ))}
              <NewsGallery item={item} />
            </div>
          </details>
        )}
      </div>
    </article>
  );
}
