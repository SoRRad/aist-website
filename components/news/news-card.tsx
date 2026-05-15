"use client";

import { ArrowUpRight, Linkedin } from "lucide-react";
import { CategoryPill } from "./category-pill";
import { NewsGallery } from "./news-gallery";
import { NewsImage } from "./news-image";
import { getNewsPrimaryImage, type NewsItem } from "@/lib/news";
import { siteConfig } from "@/lib/site-config";

interface NewsCardProps {
  item: NewsItem;
  size?: "large" | "small";
}

export function NewsCard({ item, size = "small" }: NewsCardProps) {
  const primaryImage = getNewsPrimaryImage(item);
  const date = new Date(item.date + "T00:00:00");
  const formatted = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    `${siteConfig.url}/news#${item.slug}`,
  )}`;

  const cardContent = (
    <article
      id={item.slug}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] transition-all hover:border-[var(--color-accent)]/40 hover:shadow-md"
    >
      {/* Image */}
      <div className={`relative w-full overflow-hidden ${size === "large" ? "aspect-[16/9]" : "aspect-[16/9]"}`}>
        <NewsImage
          src={primaryImage?.src}
          alt={primaryImage?.alt}
          category={item.category}
          date={item.date}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Meta */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <CategoryPill category={item.category} />
          <time className="font-mono text-[10px] text-[var(--color-muted-foreground)]">{formatted}</time>
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
            onClick={(e) => e.stopPropagation()}
            className="ml-auto shrink-0 text-[var(--color-muted-foreground)]/40 transition-colors hover:text-[var(--color-accent)]"
          >
            <Linkedin className="h-3 w-3" />
          </a>
        </div>

        {/* Headline */}
        <h3
          className={`font-display mb-2 text-balance font-semibold tracking-tight text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-accent)] ${
            size === "large" ? "text-xl sm:text-2xl" : "text-base"
          }`}
          style={{ letterSpacing: "-0.02em" }}
        >
          {item.title}
        </h3>

        {/* Excerpt */}
        <p className="mb-4 flex-1 line-clamp-2 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
          {item.excerpt}
        </p>

        {/* Inline body or external link */}
        {item.externalLink ? (
          <a
            href={item.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-[var(--color-accent)]"
            onClick={(e) => e.stopPropagation()}
          >
            Read more <ArrowUpRight className="h-3 w-3" />
          </a>
        ) : null}
      </div>
    </article>
  );

  if (item.externalLink) {
    return cardContent;
  }

  return (
    <details className="group/details">
      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        {cardContent}
      </summary>
      <div className="mt-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] px-5 py-4 space-y-3">
        {item.body.split("\n\n").filter(Boolean).map((para, i) => (
          <p key={i} className="text-pretty text-sm leading-relaxed text-[var(--color-muted-foreground)]">
            {para.trim()}
          </p>
        ))}
        <NewsGallery item={item} />
      </div>
    </details>
  );
}
