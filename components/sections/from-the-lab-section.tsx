"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { ExploreMore } from "@/components/site/explore-more";
import { CategoryPill } from "@/components/news/category-pill";
import { NewsImage } from "@/components/news/news-image";
import type { NewsItem } from "@/lib/news";

interface FromTheLabSectionProps {
  newsItems: NewsItem[];
}

export function FromTheLabSection({ newsItems }: FromTheLabSectionProps) {
  return (
    <>
      <Reveal>
        <p className="eyebrow mb-8">From the lab</p>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-3">
        {newsItems.map((item) => {
          const date = new Date(item.date + "T00:00:00");
          const formatted = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          return (
            <Link
              key={item.slug}
              href={`/news/${item.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40 hover:shadow-md"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <NewsImage
                  src={item.image}
                  alt={item.imageAlt}
                  category={item.category}
                  date={item.date}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 flex items-center gap-2">
                  <CategoryPill category={item.category} />
                  <time className="font-mono text-[10px] text-[var(--color-muted-foreground)]">{formatted}</time>
                </div>
                <h3 className="mb-2 font-display text-sm font-semibold leading-snug tracking-tight text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-accent)] line-clamp-2">
                  {item.title}
                </h3>
                <p className="flex-1 line-clamp-2 text-xs leading-relaxed text-[var(--color-muted-foreground)]">
                  {item.excerpt}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <ExploreMore href="/news">See all news and events →</ExploreMore>
    </>
  );
}
