import type { Metadata } from "next";
import Link from "next/link";
import { glossary, getGlossaryByLetter } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "Glossary",
  description: "Definitions of surgical AI terms used across AIST research and projects.",
};

export default function GlossaryPage() {
  const byLetter = getGlossaryByLetter();
  const letters = [...byLetter.keys()];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-12">
        <p className="eyebrow mb-4">Resources</p>
        <h1
          className="font-display text-balance text-5xl font-semibold tracking-tight"
          style={{ letterSpacing: "-0.03em" }}
        >
          Glossary.
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--color-muted-foreground)]">
          Definitions of key terms in surgical AI, clinical research methodology, and AIST projects.
          {" "}{glossary.length} terms across {byLetter.size} letters.
        </p>
      </header>

      {/* Alphabet jump nav */}
      <nav aria-label="Jump to letter" className="mb-10 flex flex-wrap gap-2">
        {letters.map((letter) => (
          <a
            key={letter}
            href={`#letter-${letter}`}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--color-border)] font-mono text-xs font-semibold text-[var(--color-muted-foreground)] transition-colors hover:border-[var(--color-accent)]/50 hover:text-[var(--color-foreground)]"
          >
            {letter}
          </a>
        ))}
      </nav>

      {/* Terms grouped by letter */}
      <div className="space-y-12">
        {letters.map((letter) => {
          const entries = byLetter.get(letter)!;
          return (
            <section key={letter} id={`letter-${letter}`}>
              <div className="mb-6 flex items-center gap-4">
                <h2 className="font-display text-3xl font-semibold text-[var(--color-accent)]" style={{ letterSpacing: "-0.03em" }}>
                  {letter}
                </h2>
                <div className="h-px flex-1 bg-[var(--color-border)]" />
              </div>
              <div className="space-y-4">
                {entries.map((entry) => (
                  <div
                    key={entry.slug}
                    id={`term-${entry.slug}`}
                    className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-6 py-5"
                  >
                    <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
                      <h3 className="font-display text-lg font-semibold tracking-tight" style={{ letterSpacing: "-0.02em" }}>
                        {entry.term}
                      </h3>
                      {entry.category && (
                        <span className="rounded-sm border border-[var(--color-border)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted-foreground)]">
                          {entry.category}
                        </span>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                      {entry.definition}
                    </p>
                    {entry.related && entry.related.length > 0 && (
                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted-foreground)]">Related:</span>
                        {entry.related.map((slug) => {
                          const rel = glossary.find((g) => g.slug === slug);
                          return rel ? (
                            <a
                              key={slug}
                              href={`#term-${slug}`}
                              className="rounded-full border border-[var(--color-border)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-muted-foreground)] transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--color-foreground)]"
                            >
                              {rel.term}
                            </a>
                          ) : null;
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="mt-16 border-t border-[var(--color-border)] pt-8 text-center">
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Missing a term?{" "}
          <Link href="/contact" className="font-medium text-[var(--color-accent)] hover:underline">
            Suggest an addition →
          </Link>
        </p>
      </div>
    </div>
  );
}
