import type { Metadata } from "next";
import Link from "next/link";
import { upcomingEvents, pastEvents } from "@/lib/events";
import { JournalClubButtons } from "@/components/sections/journal-club-buttons";

export const metadata: Metadata = {
  title: "Events",
  description: "A-STAR lab events — journal clubs, seminars, and surgical AI talks.",
};

const FORMAT_LABELS: Record<string, string> = {
  "in-person": "In-person",
  virtual: "Virtual",
  hybrid: "Hybrid",
};

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-12">
        <p className="eyebrow mb-4">Lab calendar</p>
        <h1
          className="font-display text-balance text-5xl font-semibold tracking-tight"
          style={{ letterSpacing: "-0.03em" }}
        >
          Events.
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--color-muted-foreground)]">
          Journal clubs, seminars, and surgical AI talks. Open to invited researchers and collaborators.
        </p>
      </header>

      {/* Upcoming */}
      {upcomingEvents.length > 0 && (
        <section className="mb-16">
          <p className="eyebrow mb-6">Upcoming</p>
          <div className="flex flex-col gap-4">
            {upcomingEvents.map((event) => {
              const date = new Date(event.date + "T00:00:00");
              const formatted = date.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              });

              return (
                <div
                  key={event.slug}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6"
                >
                  <div className="mb-4 flex flex-wrap items-start gap-3">
                    <span className="rounded-sm border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
                      {event.type.replace(/-/g, " ")}
                    </span>
                    <span className="rounded-sm border border-[var(--color-border)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted-foreground)]">
                      {FORMAT_LABELS[event.format] ?? event.format}
                    </span>
                    {event.recurring && (
                      <span className="font-mono text-[10px] text-[var(--color-muted-foreground)]">
                        {event.recurrencePattern}
                      </span>
                    )}
                  </div>

                  <h2 className="font-display text-xl font-semibold tracking-tight">{event.title}</h2>
                  <p className="mt-1 font-mono text-sm font-medium text-[var(--color-foreground)]">{formatted}</p>
                  {event.time && event.time !== "TBD" && (
                    <p className="mt-0.5 font-mono text-xs text-[var(--color-muted-foreground)]">{event.time}</p>
                  )}
                  {event.location && (
                    <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">{event.location}</p>
                  )}
                  <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                    {event.description}
                  </p>

                  <div className="mt-6">
                    <JournalClubButtons event={event} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Past events */}
      <section>
        <p className="eyebrow mb-6">Past</p>
        {pastEvents.length === 0 ? (
          <p className="text-sm text-[var(--color-muted-foreground)]">No past events to display yet.</p>
        ) : (
          <details className="group">
            <summary className="cursor-pointer text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]">
              Show {pastEvents.length} past event{pastEvents.length > 1 ? "s" : ""}
            </summary>
            <div className="mt-4 flex flex-col gap-4">
              {pastEvents.map((event) => (
                <div
                  key={event.slug}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 opacity-70"
                >
                  <h3 className="font-display text-lg font-semibold">{event.title}</h3>
                  <p className="mt-1 font-mono text-xs text-[var(--color-muted-foreground)]">{event.date}</p>
                </div>
              ))}
            </div>
          </details>
        )}
      </section>

      <div className="mt-16 border-t border-[var(--color-border)] pt-8">
        <Link href="/" className="text-sm font-medium text-[var(--color-accent)] hover:underline">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
