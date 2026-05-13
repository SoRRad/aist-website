"use client";

import * as React from "react";
import Image from "next/image";
import type { Collaborator } from "@/lib/collaborators";
import { cn } from "@/lib/utils";

interface CollaboratorCardProps {
  collaborator: Collaborator;
  className?: string;
}

/**
 * Collaborator institution card.
 *
 * Shows the institution logo. Falls back to a styled card with the short name
 * if the logo file is missing or fails to load.
 *
 * The whole card links to the collaborator's URL.
 */
export function CollaboratorCard({ collaborator, className }: CollaboratorCardProps) {
  const [imgError, setImgError] = React.useState(false);

  const displayName = collaborator.shortName ?? collaborator.name;

  return (
    <a
      href={collaborator.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={collaborator.name}
      className={cn(
        "group flex flex-col items-center justify-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 text-center transition-all duration-200 hover:scale-[1.02] hover:border-[var(--color-accent)]/40 hover:shadow-md",
        className,
      )}
    >
      {!imgError ? (
        <Image
          src={collaborator.logo}
          alt={collaborator.name}
          width={140}
          height={48}
          className="h-12 w-auto object-contain opacity-70 transition-opacity group-hover:opacity-100 dark:brightness-[1.15] dark:opacity-60 dark:group-hover:opacity-90"
          onError={() => setImgError(true)}
        />
      ) : (
        /* Logo placeholder */
        <div className="flex flex-col items-center gap-1">
          <span className="font-display text-base font-semibold leading-tight text-[var(--color-foreground)]">
            {displayName}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-muted-foreground)]">
            Logo placeholder
          </span>
        </div>
      )}

      <p className="text-xs leading-relaxed text-[var(--color-muted-foreground)]">
        {collaborator.description}
      </p>
    </a>
  );
}
