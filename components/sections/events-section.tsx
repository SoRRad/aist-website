"use client";

import { Calendar, MapPin, Video, Users, ArrowRight, Mail } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ExploreMore } from "@/components/site/explore-more";
import type { LabEvent } from "@/lib/events";

const EVENT_TYPE_LABELS: Record<string, string> = {
  "journal-club": "Journal Club",
  seminar: "Seminar",
  conference: "Conference",
  workshop: "Workshop",
  talk: "Talk",
};

const FORMAT_ICONS = {
  "in-person": MapPin,
  virtual: Video,
  hybrid: Users,
} as const;

function formatEventDate(date: string, endDate?: string) {
  const d = new Date(date + "T00:00:00");
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
  if (!endDate) return d.toLocaleDateString("en-US", opts);
  const e = new Date(endDate + "T00:00:00");
  if (d.getMonth() === e.getMonth() && d.getFullYear() === e.getFullYear()) {
    return `${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}–${e.toLocaleDateString("en-US", { day: "numeric", year: "numeric" })}`;
  }
  return `${d.toLocaleDateString("en-US", opts)} – ${e.toLocaleDateString("en-US", opts)}`;
}

interface EventCardProps {
  event: LabEvent;
}

function EventCard({ event }: EventCardProps) {
  const FormatIcon = FORMAT_ICONS[event.format];
  const d = new Date(event.date + "T00:00:00");
  const month = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const day = d.getDate();

  return (
    <div className="group flex gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40 hover:shadow-md">
      {/* Date callout */}
      <div className="flex w-14 shrink-0 flex-col items-center justify-start rounded-lg bg-[var(--color-accent)]/10 py-3 text-center">
        <span className="font-mono text-[10px] font-semibold tracking-widest text-[var(--color-accent)]">{month}</span>
        <span className="font-display text-2xl font-bold leading-none text-[var(--color-foreground)]">{day}</span>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        {/* Badges */}
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-muted)] px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
            {EVENT_TYPE_LABELS[event.type] ?? event.type}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-[var(--color-muted-foreground)]">
            <FormatIcon className="h-3 w-3" />
            {event.format}
          </span>
        </div>

        <h3 className="mb-1.5 font-display text-sm font-semibold leading-snug tracking-tight text-[var(--color-foreground)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">
          {event.title}
        </h3>

        <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-[var(--color-muted-foreground)]">
          {event.description}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--color-muted-foreground)]">
          {event.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3 shrink-0" />
              {event.location}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3 shrink-0" />
            {formatEventDate(event.date, event.endDate)}
            {event.time && event.time !== "TBD" ? ` · ${event.time}` : ""}
          </span>
        </div>

        {event.rsvpRequired && event.rsvpEmail && (
          <a
            href={`mailto:${event.rsvpEmail}?subject=RSVP: ${encodeURIComponent(event.title)}`}
            className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
            onClick={(e) => e.stopPropagation()}
          >
            <Mail className="h-3 w-3" />
            RSVP
          </a>
        )}
        {!event.rsvpRequired && event.externalUrl && (
          <a
            href={event.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-foreground)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            onClick={(e) => e.stopPropagation()}
          >
            Learn more
            <ArrowRight className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  );
}

interface EventsSectionProps {
  events: LabEvent[];
}

export function EventsSection({ events }: EventsSectionProps) {
  if (events.length === 0) return null;

  return (
    <>
      <Reveal>
        <p className="eyebrow mb-8">Upcoming events</p>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2">
        {events.map((event) => (
          <Reveal key={event.slug} delay={0.05}>
            <EventCard event={event} />
          </Reveal>
        ))}
      </div>

      <ExploreMore href="/events">See all events →</ExploreMore>
    </>
  );
}
