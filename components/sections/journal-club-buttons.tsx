"use client";

import Link from "next/link";
import { Calendar, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadIcs } from "@/lib/calendar";
import type { LabEvent } from "@/lib/events";

export function JournalClubButtons({ event }: { event: LabEvent }) {
  const rsvpHref = event.rsvpEmail
    ? `mailto:${event.rsvpEmail}?subject=${encodeURIComponent("AIST Lab Journal Club RSVP")}`
    : `/contact?inquiry=journal-club&event=${event.slug}`;

  return (
    <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
      <Button
        variant="outline"
        onClick={() => downloadIcs(event)}
        className="gap-2 border-[var(--color-ink-600)] text-[var(--color-ink-100)] hover:border-[var(--color-ink-400)] hover:bg-[var(--color-navy-700)]"
      >
        <Calendar className="h-4 w-4" />
        Add to calendar
      </Button>
      {event.rsvpRequired && (
        <Button asChild variant="accent">
          {event.rsvpEmail ? (
            <a href={rsvpHref}>
              <UserPlus className="h-4 w-4" />
              Request to join
            </a>
          ) : (
            <Link href={rsvpHref}>
              <UserPlus className="h-4 w-4" />
              Request to join
            </Link>
          )}
        </Button>
      )}
    </div>
  );
}
