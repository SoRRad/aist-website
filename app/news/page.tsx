import type { Metadata } from "next";
import Link from "next/link";
import { allNews, featuredNews } from "@/lib/news";
import { upcomingEvents } from "@/lib/events";
import { NewsHero } from "@/components/news/news-hero";
import { NewsGridClient } from "@/components/news/news-grid-client";
import { UpcomingStrip } from "@/components/news/upcoming-strip";

export const metadata: Metadata = {
  title: "News",
  description:
    "Conference presentations, publications, lab updates, and upcoming events from A-STAR and our collaborators.",
};

export default function NewsPage() {
  const rest = allNews.filter((n) => n.slug !== featuredNews.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Page header */}
      <header className="mb-10">
        <p className="eyebrow mb-4">News · Updates · Events</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h1
            className="font-display text-balance text-5xl font-semibold tracking-tight sm:text-6xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            From the lab.
          </h1>
          <Link
            href="/contact?inquiry=newsletter"
            className="shrink-0 self-start rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--color-foreground)] sm:self-auto"
          >
            Get notified →
          </Link>
        </div>
        <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--color-muted-foreground)]">
          Conference presentations, publications, lab updates, and upcoming events from A-STAR and our collaborators.
        </p>
      </header>

      {/* Featured hero item */}
      <NewsHero item={featuredNews} />

      {/* Grid: remaining items with category filters */}
      {rest.length > 0 && (
        <section>
          <NewsGridClient items={rest} total={rest.length} />
        </section>
      )}

      {/* Upcoming events strip */}
      <UpcomingStrip events={upcomingEvents} />
    </div>
  );
}
