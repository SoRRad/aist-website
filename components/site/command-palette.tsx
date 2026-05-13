"use client";

import * as React from "react";
import Fuse from "fuse.js";
import { useRouter, usePathname } from "next/navigation";
import { Search, Clock, Compass, FlaskConical, Users, FileText, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { allNav } from "@/lib/navigation";
import { projects } from "@/lib/projects";
import { team } from "@/lib/team";
import { publications } from "@/lib/publications";
import { logos } from "@/lib/logos";
import { cn } from "@/lib/utils";
import Image from "next/image";

/* ── Types ── */

type ResultKind = "page" | "project" | "team" | "publication";

interface SearchResult {
  id: string;
  kind: ResultKind;
  title: string;
  subtitle?: string;
  href: string;
  meta?: Record<string, string>;
}

/* ── Search corpus ── */

const corpus: SearchResult[] = [
  ...allNav.map((n) => ({
    id: `page-${n.href}`,
    kind: "page" as ResultKind,
    title: n.title,
    subtitle: n.href,
    href: n.href,
  })),
  ...projects.map((p) => ({
    id: `project-${p.slug}`,
    kind: "project" as ResultKind,
    title: p.name,
    subtitle: p.tagline,
    href: `/projects/${p.slug}`,
    meta: { status: p.status, long: p.longName },
  })),
  ...team.map((m) => ({
    id: `team-${m.slug}`,
    kind: "team" as ResultKind,
    title: m.name,
    subtitle: m.role,
    href: `/team/${m.slug}`,
    meta: { affiliation: m.affiliation },
  })),
  ...publications.map((p) => ({
    id: `pub-${p.slug}`,
    kind: "publication" as ResultKind,
    title: p.title,
    subtitle: `${p.venue} · ${p.year}`,
    href: p.url,
    meta: { year: String(p.year) },
  })),
];

const fuse = new Fuse(corpus, {
  keys: ["title", "subtitle", "meta.long", "meta.affiliation"],
  threshold: 0.35,
  includeScore: true,
});

/* ── Category filter shortcuts ── */
const FILTER_SHORTCUTS: Record<string, ResultKind> = {
  "/team": "team",
  "/project": "project",
  "/pub": "publication",
  "/page": "page",
};

/* ── localStorage helpers ── */
const RECENT_KEY = "aist:recent";
const MAX_RECENT = 5;

function safeGetRecent(): string[] {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]") as string[]; }
  catch { return []; }
}
function safeSetRecent(list: string[]) {
  try { localStorage.setItem(RECENT_KEY, JSON.stringify(list)); }
  catch { /* private mode */ }
}

/* ── Group config ── */

const GROUP_META: Record<ResultKind, { label: string; Icon: React.ElementType }> = {
  page: { label: "Pages", Icon: Compass },
  project: { label: "Projects", Icon: FlaskConical },
  team: { label: "Team", Icon: Users },
  publication: { label: "Publications", Icon: FileText },
};

/* ── Component ── */

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [recent, setRecent] = React.useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  /* Record visit */
  React.useEffect(() => {
    const prev = safeGetRecent();
    safeSetRecent([pathname, ...prev.filter((p) => p !== pathname)].slice(0, MAX_RECENT));
  }, [pathname]);

  /* Load recent on open */
  React.useEffect(() => {
    if (open) {
      setRecent(safeGetRecent().filter((p) => p !== pathname));
      setQuery("");
      setActiveId(null);
    }
  }, [open, pathname]);

  /* Keyboard shortcut */
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen((o) => !o); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    if (href.startsWith("http")) window.open(href, "_blank", "noopener noreferrer");
    else router.push(href);
  };

  /* Category filter */
  const filterKind = Object.entries(FILTER_SHORTCUTS).find(([prefix]) =>
    query.toLowerCase().startsWith(prefix),
  )?.[1] as ResultKind | undefined;
  const searchQuery = filterKind
    ? query.slice(query.indexOf(" ") + 1).trim()
    : query.trim();

  /* Results */
  const results: SearchResult[] = React.useMemo(() => {
    if (!searchQuery) return corpus.filter((r) => !filterKind || r.kind === filterKind).slice(0, 20);
    const raw = fuse.search(searchQuery).map((r) => r.item);
    return filterKind ? raw.filter((r) => r.kind === filterKind) : raw;
  }, [searchQuery, filterKind]);

  /* Grouped results */
  const grouped = React.useMemo(() => {
    const map = new Map<ResultKind, SearchResult[]>();
    results.forEach((r) => {
      if (!map.has(r.kind)) map.set(r.kind, []);
      map.get(r.kind)!.push(r);
    });
    return map;
  }, [results]);

  /* Recent nav items */
  const recentItems = recent
    .map((href) => corpus.find((c) => c.href === href))
    .filter(Boolean) as SearchResult[];

  /* Active item for preview */
  const activeItem = activeId ? corpus.find((c) => c.id === activeId) : null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Search the site"
        className="group hidden h-9 items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-muted)] px-3 text-xs text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-muted)]/80 sm:inline-flex"
      >
        <Search className="h-3.5 w-3.5" />
        <span>Search</span>
        <kbd className="ml-2 inline-flex items-center gap-0.5 rounded border border-[var(--color-border)] bg-[var(--color-background)] px-1.5 py-0.5 font-mono text-[10px] font-medium">
          <span className="text-base leading-none">⌘</span>K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl gap-0 overflow-hidden p-0" hideClose>
          <VisuallyHidden asChild><DialogTitle>Site search</DialogTitle></VisuallyHidden>

          {/* Search input */}
          <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4">
            <Search className="h-4 w-4 shrink-0 text-[var(--color-muted-foreground)]" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages, projects, people, papers…"
              className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--color-muted-foreground)]"
            />
            {filterKind && (
              <span className="rounded-sm border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-2 py-0.5 font-mono text-[10px] uppercase text-[var(--color-accent)]">
                {GROUP_META[filterKind].label}
              </span>
            )}
          </div>

          <div className="flex" style={{ height: 360 }}>
            {/* Results list — 60% width */}
            <div className="flex-[3] overflow-y-auto border-r border-[var(--color-border)] p-2">
              {/* Empty state */}
              {!query && recentItems.length === 0 && (
                <EmptyState onChipClick={setQuery} />
              )}

              {/* Recently visited */}
              {!query && recentItems.length > 0 && (
                <ResultGroup
                  label="Recently visited"
                  Icon={Clock}
                  items={recentItems}
                  activeId={activeId}
                  onHover={setActiveId}
                  onSelect={go}
                />
              )}

              {/* Grouped results */}
              {(["page", "project", "team", "publication"] as ResultKind[]).map((kind) => {
                const items = grouped.get(kind);
                if (!items?.length) return null;
                const { label, Icon } = GROUP_META[kind];
                return (
                  <ResultGroup
                    key={kind}
                    label={label}
                    Icon={Icon}
                    items={items}
                    activeId={activeId}
                    onHover={setActiveId}
                    onSelect={go}
                  />
                );
              })}

              {query && results.length === 0 && (
                <p className="p-6 text-center text-sm text-[var(--color-muted-foreground)]">No results found.</p>
              )}
            </div>

            {/* Preview pane — 40% width, hidden on mobile */}
            <div className="hidden flex-[2] flex-col items-center justify-center p-6 md:flex">
              <PreviewPane item={activeItem} />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-[var(--color-border)] px-3 py-2 text-[10px] text-[var(--color-muted-foreground)]">
            <span>
              <kbd className="font-mono">↑↓</kbd> navigate ·{" "}
              <kbd className="font-mono">↵</kbd> open ·{" "}
              <kbd className="font-mono">esc</kbd> close ·{" "}
              <kbd className="font-mono">⌘K</kbd> toggle
            </span>
            <span className="font-mono">AIST</span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ── Result group ── */

function ResultGroup({
  label,
  Icon,
  items,
  activeId,
  onHover,
  onSelect,
}: {
  label: string;
  Icon: React.ElementType;
  items: SearchResult[];
  activeId: string | null;
  onHover: (id: string) => void;
  onSelect: (href: string) => void;
}) {
  return (
    <div className="mb-2">
      <div className="flex items-center gap-1.5 px-2 py-1.5">
        <Icon className="h-3 w-3 text-[var(--color-muted-foreground)]" />
        <span className="eyebrow text-[9px]">{label}</span>
      </div>
      {items.map((item) => (
        <button
          key={item.id}
          onMouseEnter={() => onHover(item.id)}
          onClick={() => onSelect(item.href)}
          className={cn(
            "flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors",
            activeId === item.id
              ? "bg-[var(--color-muted)] text-[var(--color-foreground)]"
              : "text-[var(--color-foreground)] hover:bg-[var(--color-muted)]",
          )}
        >
          <span className="flex-1 truncate">{item.title}</span>
          {item.subtitle && (
            <span className="shrink-0 truncate text-xs text-[var(--color-muted-foreground)]" style={{ maxWidth: 120 }}>
              {item.subtitle}
            </span>
          )}
          <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-40" />
        </button>
      ))}
    </div>
  );
}

/* ── Preview pane ── */

function PreviewPane({ item }: { item: SearchResult | null | undefined }) {
  if (!item) {
    return (
      <div className="flex flex-col items-center gap-3 text-center opacity-30">
        <Image src={logos.markNeutral} alt="" width={40} height={40} className="h-10 w-10" />
        <p className="text-xs text-[var(--color-muted-foreground)]">Hover a result to preview</p>
      </div>
    );
  }

  const { Icon } = GROUP_META[item.kind];

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-[var(--color-accent)]" />
        <span className="eyebrow text-[9px] text-[var(--color-accent)]">{GROUP_META[item.kind].label}</span>
      </div>
      <p className="font-display text-base font-semibold leading-tight text-[var(--color-foreground)]">
        {item.title}
      </p>
      {item.subtitle && (
        <p className="text-xs leading-relaxed text-[var(--color-muted-foreground)]">{item.subtitle}</p>
      )}
      {item.meta && Object.entries(item.meta).map(([k, v]) => (
        <p key={k} className="font-mono text-[10px] text-[var(--color-muted-foreground)]">
          {k}: {v}
        </p>
      ))}
    </div>
  );
}

/* ── Empty state ── */

const EXAMPLE_CHIPS = ["MOSI", "Reza", "Bariatric", "SIRIS", "Validation"];

function EmptyState({ onChipClick }: { onChipClick: (q: string) => void }) {
  return (
    <div className="flex flex-col items-center gap-4 p-6 text-center">
      <Image src={logos.markNeutral} alt="" width={36} height={36} className="h-9 w-9 opacity-20" />
      <p className="text-sm text-[var(--color-muted-foreground)]">
        Search pages, projects, people, papers…
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {EXAMPLE_CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => onChipClick(chip)}
            className="rounded-full border border-[var(--color-border)] bg-[var(--color-muted)] px-3 py-1 font-mono text-[11px] text-[var(--color-muted-foreground)] transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--color-foreground)]"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
