"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, ChevronDown, ChevronUp, RotateCcw, Download } from "lucide-react";
import { publications } from "@/lib/publications";
import type { Publication, PublicationType, PublicationTheme, PublicationStatus } from "@/lib/publications";
import {
  filterPublications,
  getPublicationMetrics,
  defaultFilters,
  toBibTeX,
  toCSVRow,
  CSV_HEADER,
  downloadTextFile,
  type PublicationFilterState,
} from "@/lib/publication-utils";
import { PublicationCard } from "@/components/publications/publication-card";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

/* ── Inner page (needs useSearchParams) ── */

function PublicationsPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = React.useState<PublicationFilterState>(() => ({
    ...defaultFilters,
    project: searchParams.get("project") ?? "all",
    theme: searchParams.get("theme") ?? "all",
  }));
  const [filtersOpen, setFiltersOpen] = React.useState(false);

  const setFilter = (key: keyof PublicationFilterState, value: string) => {
    setFilters((f) => ({ ...f, [key]: value }));
  };

  const resetFilters = () => setFilters(defaultFilters);

  const filtered = filterPublications(publications, filters);
  const metrics = getPublicationMetrics(publications);

  const hasActiveFilters = Object.entries(filters).some(
    ([k, v]) => k !== "query" && v !== "all" && v !== "",
  ) || filters.query !== "";

  const years = [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a);
  const projectSlugs = [...new Set(publications.flatMap((p) => p.projects))].filter(Boolean);
  const allThemes = [...new Set(publications.flatMap((p) => p.themes))].sort();
  const allTypes = [...new Set(publications.map((p) => p.type))].sort();
  const allStatuses = [...new Set(publications.map((p) => p.status))].sort();

  const exportCSV = () => {
    const rows = [CSV_HEADER, ...filtered.map(toCSVRow)].join("\n");
    downloadTextFile(rows, "aist-publications.csv", "text/csv");
  };

  const exportBibtex = () => {
    const bib = filtered.map((p) => toBibTeX(p)).join("\n\n");
    downloadTextFile(bib, "aist-publications.bib", "text/plain");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-10">
        <p className="eyebrow mb-4">Research output</p>
        <h1
          className="font-display text-balance text-5xl font-semibold tracking-tight sm:text-6xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          Publications.
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--color-muted-foreground)]">
          Research outputs from the AIST ecosystem — original research, systematic reviews, and technical reports.
        </p>
      </header>

      {/* Metrics bar */}
      <div className="mb-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-4">
        <MetricCell value={metrics.total} label="Total" />
        <MetricCell value={metrics.featured} label="Featured" />
        <MetricCell value={metrics.projectLinked} label="Project-linked" />
        <MetricCell value={metrics.uniqueVenues} label="Journals" />
      </div>

      {/* Search bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted-foreground)]" />
        <input
          type="search"
          value={filters.query}
          onChange={(e) => setFilter("query", e.target.value)}
          placeholder="Search title, author, journal, project, DOI, or keyword…"
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 placeholder:text-[var(--color-muted-foreground)]"
        />
      </div>

      {/* Quick filter chips */}
      <div className="mb-8 flex flex-wrap gap-2">
        {[
          { label: "All", action: resetFilters, active: !hasActiveFilters },
          { label: "MOSI", action: () => setFilter("project", "mosi"), active: filters.project === "mosi" },
          { label: "SIRIS", action: () => setFilter("project", "siris"), active: filters.project === "siris" },
          { label: "Bariatric", action: () => setFilter("theme", "bariatric-surgery"), active: filters.theme === "bariatric-surgery" },
          { label: "Patient Education", action: () => setFilter("theme", "patient-education"), active: filters.theme === "patient-education" },
        ].map((chip) => (
          <button
            key={chip.label}
            onClick={chip.action}
            className={cn(
              "rounded-full border px-3 py-1 text-sm font-medium transition-colors",
              chip.active
                ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                : "border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-foreground)]",
            )}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Main content: filters sidebar + results */}
      <div className="gap-8 lg:grid lg:grid-cols-[260px_1fr]">
        {/* Filters sidebar / accordion */}
        <aside>
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <button
              onClick={() => setFiltersOpen((o) => !o)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-foreground)]"
            >
              Filters {filtersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {hasActiveFilters && (
              <button onClick={resetFilters} className="text-xs text-[var(--color-accent)] hover:underline">
                Reset
              </button>
            )}
          </div>

          <div className={cn("space-y-6", !filtersOpen && "hidden lg:block")}>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="hidden items-center gap-1.5 text-sm text-[var(--color-accent)] hover:underline lg:inline-flex"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset filters
              </button>
            )}

            <FilterGroup
              title="Project"
              value={filters.project}
              onChange={(v) => setFilter("project", v)}
              options={[
                { value: "all", label: "All" },
                ...projectSlugs.map((s) => ({ value: s, label: s.toUpperCase() })),
                { value: "unlinked", label: "Unlinked" },
              ]}
            />

            <FilterGroup
              title="Type"
              value={filters.type}
              onChange={(v) => setFilter("type", v)}
              options={[
                { value: "all", label: "All" },
                ...allTypes.map((t) => ({
                  value: t,
                  label: t.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
                })),
              ]}
            />

            <FilterGroup
              title="Theme"
              value={filters.theme}
              onChange={(v) => setFilter("theme", v)}
              options={[
                { value: "all", label: "All" },
                ...allThemes.map((t) => ({
                  value: t,
                  label: t.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
                })),
              ]}
            />

            <FilterGroup
              title="Year"
              value={filters.year}
              onChange={(v) => setFilter("year", v)}
              options={[
                { value: "all", label: "All" },
                ...years.map((y) => ({ value: String(y), label: String(y) })),
              ]}
            />

            <FilterGroup
              title="Status"
              value={filters.status}
              onChange={(v) => setFilter("status", v)}
              options={[
                { value: "all", label: "All" },
                ...allStatuses.map((s) => ({
                  value: s,
                  label: s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
                })),
              ]}
            />
          </div>
        </aside>

        {/* Results */}
        <div>
          {/* Result count + export */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-[var(--color-muted-foreground)]">
              {filtered.length} publication{filtered.length !== 1 ? "s" : ""}
              {hasActiveFilters && (
                <button onClick={resetFilters} className="ml-2 text-[var(--color-accent)] hover:underline">
                  Reset filters
                </button>
              )}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={exportCSV}
                className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] px-2.5 py-1.5 text-xs font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
              >
                <Download className="h-3.5 w-3.5" /> CSV
              </button>
              <button
                onClick={exportBibtex}
                className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] px-2.5 py-1.5 text-xs font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
              >
                <Download className="h-3.5 w-3.5" /> BibTeX
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <p className="text-[var(--color-muted-foreground)]">
                No publications match the current filters.
              </p>
              <button
                onClick={resetFilters}
                className="rounded-md border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-accent)] hover:border-[var(--color-accent)]/40"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filtered.map((pub) => (
                <PublicationCard
                  key={pub.slug}
                  publication={pub}
                  onFilterTheme={(t) => setFilter("theme", t)}
                  onFilterProject={(p) => setFilter("project", p)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Helpers ── */

function MetricCell({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-[var(--color-card)] p-5 text-center">
      <div
        className="font-display font-semibold text-[var(--color-accent)]"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", letterSpacing: "-0.03em" }}
      >
        {value}
      </div>
      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted-foreground)]">
        {label}
      </p>
    </div>
  );
}

function FilterGroup({
  title,
  value,
  onChange,
  options,
}: {
  title: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <p className="eyebrow mb-2">{title}</p>
      <div className="space-y-1">
        {options.map((opt) => (
          <label key={opt.value} className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name={`filter-${title}`}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="h-3.5 w-3.5 accent-[var(--color-accent)]"
            />
            <span
              className={cn(
                "text-sm transition-colors",
                value === opt.value
                  ? "font-medium text-[var(--color-accent)]"
                  : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]",
              )}
            >
              {opt.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

/* ── Page export ── */

export default function PublicationsPage() {
  return (
    <Suspense fallback={<div className="py-32 text-center text-[var(--color-muted-foreground)]">Loading…</div>}>
      <PublicationsPageInner />
    </Suspense>
  );
}
