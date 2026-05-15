"use client";

import { Search, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { type ArchiveCategory, type ArchiveAccess } from "@/lib/archive";

export type ArchiveFilterState = {
  query: string;
  category: ArchiveCategory | "all";
  access: ArchiveAccess | "all";
  year: string;
};

export const defaultArchiveFilters: ArchiveFilterState = {
  query: "",
  category: "all",
  access: "all",
  year: "all",
};

interface ArchiveFiltersProps {
  filters: ArchiveFilterState;
  setFilters: (f: ArchiveFilterState) => void;
  years: string[];
}

const CATEGORIES: Array<{ value: ArchiveCategory | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "presentation", label: "Presentations" },
  { value: "video", label: "Videos" },
  { value: "webinar", label: "Webinars" },
  { value: "journal-club", label: "Journal Club" },
  { value: "document", label: "Documents" },
];

const ACCESS_OPTIONS: Array<{ value: ArchiveAccess | "all"; label: string }> = [
  { value: "all", label: "All access" },
  { value: "public", label: "Public" },
  { value: "mayo-only", label: "Mayo employees" },
];

export function ArchiveFilters({ filters, setFilters, years }: ArchiveFiltersProps) {
  const hasActive =
    filters.query !== "" ||
    filters.category !== "all" ||
    filters.access !== "all" ||
    filters.year !== "all";

  const set = (partial: Partial<ArchiveFilterState>) =>
    setFilters({ ...filters, ...partial });

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted-foreground)]" />
        <input
          type="search"
          value={filters.query}
          onChange={(e) => set({ query: e.target.value })}
          placeholder="Search title, description, or people…"
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 placeholder:text-[var(--color-muted-foreground)]"
        />
      </div>

      {/* Chips row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {/* Category chips */}
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => set({ category: cat.value as ArchiveCategory | "all" })}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                filters.category === cat.value
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                  : "border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-foreground)]",
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <span className="hidden h-4 w-px bg-[var(--color-border)] sm:block" />

        {/* Access chips */}
        <div className="flex flex-wrap gap-1.5">
          {ACCESS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => set({ access: opt.value as ArchiveAccess | "all" })}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                filters.access === opt.value
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                  : "border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-foreground)]",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Year select */}
        {years.length > 0 && (
          <select
            value={filters.year}
            onChange={(e) => set({ year: e.target.value })}
            className="rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1 text-xs font-medium text-[var(--color-muted-foreground)] outline-none transition-colors focus:border-[var(--color-accent)]"
          >
            <option value="all">All years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        )}

        {/* Reset */}
        {hasActive && (
          <button
            onClick={() => setFilters(defaultArchiveFilters)}
            className="ml-auto inline-flex items-center gap-1.5 text-xs text-[var(--color-accent)] hover:underline"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        )}
      </div>
    </div>
  );
}
