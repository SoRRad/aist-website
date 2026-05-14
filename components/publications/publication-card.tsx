"use client";

import * as React from "react";
import Link from "next/link";
import { ExternalLink, Quote } from "lucide-react";
import { PublicationTypeBadge } from "./publication-type-badge";
import { CitationDropdown } from "./citation-dropdown";
import type { Publication } from "@/lib/publications";

interface PublicationCardProps {
  publication: Publication;
  onFilterTheme?: (theme: string) => void;
  onFilterProject?: (project: string) => void;
}

export function PublicationCard({
  publication,
  onFilterTheme,
  onFilterProject,
}: PublicationCardProps) {
  const [citationOpen, setCitationOpen] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  // Close citation on outside click
  React.useEffect(() => {
    if (!citationOpen) return;
    const onClick = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setCitationOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [citationOpen]);

  return (
    <article
      ref={cardRef}
      className="relative group rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-colors hover:border-[var(--color-accent)]/40 sm:grid sm:grid-cols-[72px_1fr] sm:gap-5"
    >
      {/* Year + type column */}
      <div className="mb-3 flex items-start gap-3 sm:mb-0 sm:flex-col sm:items-center sm:gap-2 sm:pt-0.5">
        <span
          className="font-display text-2xl font-semibold text-[var(--color-accent)]"
          style={{ letterSpacing: "-0.03em" }}
        >
          {publication.year}
        </span>
        <PublicationTypeBadge type={publication.type} />
      </div>

      {/* Content column */}
      <div className="min-w-0">
        {/* Title */}
        {publication.url ? (
          <a
            href={publication.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-base font-semibold leading-snug text-[var(--color-foreground)] transition-colors hover:text-[var(--color-accent)]"
          >
            {publication.title}
          </a>
        ) : (
          <p className="font-display text-base font-semibold leading-snug text-[var(--color-foreground)]">
            {publication.title}
          </p>
        )}

        {/* Authors */}
        <p className="mt-1.5 text-sm text-[var(--color-muted-foreground)]">
          {publication.authors.join(", ")}
        </p>

        {/* Venue */}
        <p className="mt-0.5 text-sm italic text-[var(--color-muted-foreground)]">
          {publication.venue} · {publication.year}
        </p>

        {/* Tags */}
        {(publication.projects.length > 0 || publication.tags.length > 0) && (
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            {publication.projects.map((slug) => (
              <button
                key={slug}
                onClick={() => onFilterProject?.(slug)}
                className="rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)]/20"
              >
                {slug.toUpperCase()}
              </button>
            ))}
            {publication.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--color-border)] px-2 py-0.5 font-mono text-[10px] text-[var(--color-muted-foreground)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {publication.url && (
            <a
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-foreground)]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View paper
            </a>
          )}
          {publication.doi && (
            <a
              href={`https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
            >
              DOI
            </a>
          )}
          <div className="relative">
            <button
              onClick={() => setCitationOpen((o) => !o)}
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
            >
              <Quote className="h-3.5 w-3.5" />
              Cite
            </button>
            {citationOpen && (
              <CitationDropdown
                publication={publication}
                onClose={() => setCitationOpen(false)}
              />
            )}
          </div>
          {publication.pdfUrl && (
            <a
              href={publication.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
            >
              PDF
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
