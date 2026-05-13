"use client";

import * as React from "react";
import Image from "next/image";
import type { Collaborator } from "@/lib/collaborators";

interface CollaboratorMarqueeProps {
  items: Collaborator[];
}

/**
 * Auto-sliding collaborator logo marquee.
 * Pure CSS keyframe animation for performance.
 * Duplicates the list for seamless looping.
 * Pauses on hover.
 */
export function CollaboratorMarquee({ items }: CollaboratorMarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0px, black 32px, black calc(100% - 32px), transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0px, black 32px, black calc(100% - 32px), transparent 100%)",
      }}
    >
      <div
        className="flex items-center gap-12 [animation:marquee_40s_linear_infinite] hover:[animation-play-state:paused]"
        style={{ width: "max-content" }}
      >
        {doubled.map((c, i) => (
          <MarqueeItem key={`${c.slug}-${i}`} collaborator={c} />
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

function MarqueeItem({ collaborator }: { collaborator: Collaborator }) {
  const [imgError, setImgError] = React.useState(false);
  const displayName = collaborator.shortName ?? collaborator.name;

  return (
    <a
      href={collaborator.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={collaborator.name}
      className="flex h-[64px] shrink-0 items-center justify-center opacity-60 transition-opacity hover:opacity-100"
    >
      {!imgError ? (
        <Image
          src={collaborator.logo}
          alt={collaborator.name}
          width={160}
          height={64}
          className="h-[64px] w-auto max-w-[200px] object-contain dark:brightness-125 dark:invert-[.15]"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="flex h-[64px] min-w-[140px] items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4">
          <span className="font-display text-sm font-semibold text-[var(--color-foreground)]">
            {displayName}
          </span>
        </div>
      )}
    </a>
  );
}
