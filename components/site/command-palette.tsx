"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Fuse from "fuse.js";
import { useRouter, usePathname } from "next/navigation";
import { Search, Clock, Compass, FlaskConical, Users, FileText, Newspaper, Library, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { allNav } from "@/lib/navigation";
import { projects } from "@/lib/projects";
import { team } from "@/lib/team";
import { publications } from "@/lib/publications";
import { allNews } from "@/lib/news";
import { archiveItems } from "@/lib/archive";
import { logos } from "@/lib/logos";
import { cn } from "@/lib/utils";
import Image from "next/image";

/* ── Types ── */

type ResultKind = "page" | "project" | "team" | "publication" | "news" | "archive";

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
    href: m.isOpenPosition ? "/join" : `/team/${m.slug}`,
    meta: { affiliation: m.affiliation },
  })),
  ...publications
    .filter((p) => p.url)
    .map((p) => ({
      id: `pub-${p.slug}`,
      kind: "publication" as ResultKind,
      title: p.title,
      subtitle: `${p.venue} · ${p.year}`,
      href: p.url as string,
      meta: { year: String(p.year) },
    })),
  ...allNews.map((n) => ({
    id: `news-${n.slug}`,
    kind: "news" as ResultKind,
    title: n.title,
    subtitle: n.excerpt.slice(0, 80),
    href: `/news/${n.slug}`,
    meta: { category: n.category, date: n.date },
  })),
  ...archiveItems.map((a) => ({
    id: `archive-${a.slug}`,
    kind: "archive" as ResultKind,
    title: a.title,
    subtitle: a.description.slice(0, 80),
    href: "/archive",
    meta: { category: a.category, date: a.date },
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
  "/news": "news",
  "/archive": "archive",
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
  news: { label: "News", Icon: Newspaper },
  archive: { label: "Archive", Icon: Library },
};

/* ── Component ── */

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  const [recent, setRecent] = React.useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => setMounted(true), []);

  /* Record visit */
  React.useEffect(() => {
    const prev = safeGetRecent();
    safeSetRecent([pathname, ...prev.filter((p) => p !== pathname)].slice(0, MAX_RECENT));
  }, [pathname]);

  /* Load recent on open + focus input */
  React.useEffect(() => {
    if (open) {
      setRecent(safeGetRecent().filter((p) => p !== pathname));
      setQuery("");
      setExpandedId(null);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open, pathname]);

  /* Keyboard shortcuts */
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === "Escape") setOpen(false);
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

  return (
    <>
      {/* Trigger button */}
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

      {/* Drawer — portalled to document.body to escape header stacking context */}
      {mounted && createPortal(
        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[250] bg-black/40 backdrop-blur-sm"
                onClick={() => setOpen(false)}
                aria-hidden="true"
              />

              {/* Drawer panel */}
              <motion.div
                role="dialog"
                aria-label="Site search"
                aria-modal="true"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 340, damping: 32 }}
                className="fixed right-0 top-0 z-[260] flex h-full w-full flex-col border-l border-[var(--color-border)] bg-[var(--color-background)] shadow-2xl sm:w-[480px]"
              >
              {/* Header — logo + search input */}
              <div className="flex shrink-0 items-center gap-3 border-b border-[var(--color-border)] px-4">
                <Image src={logos.markNeutral} alt="AIST" width={20} height={20} className="h-5 w-5 shrink-0 opacity-60" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pages, projects, people, papers…"
                  className="h-14 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--color-muted-foreground)]"
                />
                {filterKind && (
                  <span className="rounded-sm border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-2 py-0.5 font-mono text-[10px] uppercase text-[var(--color-accent)]">
                    {GROUP_META[filterKind].label}
                  </span>
                )}
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close search"
                  className="shrink-0 rounded-md p-1.5 text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Results body — scrollable */}
              <div className="flex-1 overflow-y-auto p-2">
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
                    expandedId={expandedId}
                    onToggle={(id) => setExpandedId(expandedId === id ? null : id)}
                    onSelect={go}
                  />
                )}

                {/* Grouped results */}
                {(["page", "project", "team", "publication", "news"] as ResultKind[]).map((kind) => {
                  const items = grouped.get(kind);
                  if (!items?.length) return null;
                  const { label, Icon } = GROUP_META[kind];
                  return (
                    <ResultGroup
                      key={kind}
                      label={label}
                      Icon={Icon}
                      items={items}
                      expandedId={expandedId}
                      onToggle={(id) => setExpandedId(expandedId === id ? null : id)}
                      onSelect={go}
                    />
                  );
                })}

                {query && results.length === 0 && (
                  <p className="p-6 text-center text-sm text-[var(--color-muted-foreground)]">No results found.</p>
                )}
              </div>

              {/* Footer — keyboard hints */}
              <div className="shrink-0 border-t border-[var(--color-border)] px-4 py-2.5 text-[10px] text-[var(--color-muted-foreground)]">
                <span className="font-mono">esc</span> close ·{" "}
                <span className="font-mono">⌘K</span> toggle ·{" "}
                <span className="opacity-50">/team /project /pub /page /news to filter</span>
              </div>
            </motion.div>
          </>
        )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

/* ── Result group ── */

function ResultGroup({
  label,
  Icon,
  items,
  expandedId,
  onToggle,
  onSelect,
}: {
  label: string;
  Icon: React.ElementType;
  items: SearchResult[];
  expandedId: string | null;
  onToggle: (id: string) => void;
  onSelect: (href: string) => void;
}) {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-1.5 px-2 py-1.5">
        <Icon className="h-3 w-3 text-[var(--color-muted-foreground)]" />
        <span className="eyebrow text-[9px]">{label}</span>
      </div>
      {items.map((item) => {
        const isExpanded = expandedId === item.id;
        return (
          <div key={item.id}>
            <button
              onMouseEnter={() => onToggle(item.id)}
              onClick={() => onSelect(item.href)}
              className={cn(
                "flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors",
                isExpanded
                  ? "bg-[var(--color-muted)]"
                  : "hover:bg-[var(--color-muted)]",
              )}
            >
              <span className="flex-1 truncate text-sm text-[var(--color-foreground)]">{item.title}</span>
              <ArrowRight className={cn("h-3.5 w-3.5 shrink-0 text-[var(--color-accent)] transition-opacity", isExpanded ? "opacity-100" : "opacity-30")} />
            </button>

            {/* Inline expansion on hover — shows subtitle + meta */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="overflow-hidden"
                >
                  <div className="mx-3 mb-2 rounded-md border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2.5">
                    {item.subtitle && (
                      <p className="text-xs leading-relaxed text-[var(--color-muted-foreground)]">{item.subtitle}</p>
                    )}
                    {item.meta && Object.entries(item.meta).filter(([k]) => k !== "long").map(([k, v]) => (
                      <p key={k} className="mt-1 font-mono text-[10px] text-[var(--color-muted-foreground)]">
                        {k}: {v}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
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
