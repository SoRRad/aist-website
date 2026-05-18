import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, FileText, Video, Presentation, Lock, Globe, Users } from "lucide-react";
import {
  archiveItems,
  ARCHIVE_CATEGORY_LABELS,
  ARCHIVE_ACCESS_LABELS,
  type ArchiveItem,
} from "@/lib/archive";
import { Section } from "@/components/site/section";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = { title: "Resources" };

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  presentation: Presentation,
  video: Video,
  webinar: Video,
  "journal-club": Users,
  document: FileText,
};

const ACCESS_ICONS = {
  public: Globe,
  "mayo-only": Lock,
  restricted: Lock,
} as const;

const ACCESS_STYLES = {
  public: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "mayo-only": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  restricted: "bg-[var(--color-muted)] text-[var(--color-muted-foreground)]",
} as const;

function ArchiveCard({ item }: { item: ArchiveItem }) {
  const CategoryIcon = CATEGORY_ICONS[item.category] ?? FileText;
  const AccessIcon = ACCESS_ICONS[item.access];
  const d = new Date(item.date + "T00:00:00");
  const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const hasLink = item.fileUrl || item.videoUrl || item.externalReference;

  return (
    <div className="group flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent)]/10">
          <CategoryIcon className="h-4 w-4 text-[var(--color-accent)]" />
        </div>
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide ${ACCESS_STYLES[item.access]}`}>
          <AccessIcon className="h-2.5 w-2.5" />
          {ARCHIVE_ACCESS_LABELS[item.access]}
        </span>
      </div>

      <h3 className="mb-2 font-display text-sm font-semibold leading-snug tracking-tight text-[var(--color-foreground)] group-hover:text-[var(--color-accent)] transition-colors">
        {item.title}
      </h3>

      <p className="mb-4 flex-1 text-xs leading-relaxed text-[var(--color-muted-foreground)] line-clamp-3">
        {item.description}
      </p>

      <div className="mt-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 text-xs text-[var(--color-muted-foreground)]">
          <span className="font-mono">{ARCHIVE_CATEGORY_LABELS[item.category]}</span>
          <span>{dateStr}</span>
          {item.duration && <span>{item.duration}</span>}
        </div>

        {hasLink && item.access === "public" && (
          <a
            href={item.externalReference ?? item.fileUrl ?? item.videoUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 shrink-0"
          >
            View
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
        {!hasLink || item.access !== "public" ? (
          <span className="text-xs text-[var(--color-muted-foreground)]">
            {item.access === "mayo-only" ? "Mayo employees only" : item.access === "restricted" ? "Coming soon" : ""}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-background)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Reveal>
            <p className="eyebrow mb-4">Resources</p>
            <h1 className="font-display text-balance font-semibold" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
              Presentations, recordings &amp; materials
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-[var(--color-muted-foreground)]">
              Conference posters, lecture recordings, journal club archives, and research materials from the A-STAR lab.
              Datasets, code releases, and an interactive glossary are in development.
            </p>
          </Reveal>
        </div>
      </div>

      <Section code="" label="" id="archive">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {archiveItems.map((item) => (
            <Reveal key={item.slug} delay={0.04}>
              <ArchiveCard item={item} />
            </Reveal>
          ))}
        </div>

        {/* Coming soon strip */}
        <Reveal delay={0.1}>
          <div className="mt-16 rounded-xl border border-dashed border-[var(--color-border)] p-8 text-center">
            <p className="font-display text-lg font-semibold text-[var(--color-foreground)]">More coming soon</p>
            <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
              Datasets, code releases, a surgical AI glossary, and embedded demos are planned for future releases.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] hover:underline"
            >
              Request a resource →
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
