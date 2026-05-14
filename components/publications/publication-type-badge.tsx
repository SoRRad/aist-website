import { cn } from "@/lib/utils";
import type { PublicationType } from "@/lib/publications";

const TYPE_STYLES: Record<PublicationType, string> = {
  "original-research": "border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
  "review": "border-blue-300/40 bg-blue-300/10 text-blue-300",
  "systematic-review": "border-blue-400/40 bg-blue-400/10 text-blue-400",
  "meta-analysis": "border-blue-500/40 bg-blue-500/10 text-blue-500",
  "case-report": "border-[var(--color-muted-foreground)]/40 bg-[var(--color-muted)]/50 text-[var(--color-muted-foreground)]",
  "editorial": "border-[var(--color-muted-foreground)]/40 bg-[var(--color-muted)]/50 text-[var(--color-muted-foreground)]",
  "letter": "border-[var(--color-muted-foreground)]/40 bg-[var(--color-muted)]/50 text-[var(--color-muted-foreground)]",
  "conference-abstract": "border-[var(--color-muted-foreground)]/40 bg-[var(--color-muted)]/50 text-[var(--color-muted-foreground)]",
  "technical-report": "border-[var(--color-muted-foreground)]/40 bg-[var(--color-muted)]/50 text-[var(--color-muted-foreground)]",
  "preprint": "border-orange-400/40 bg-orange-400/10 text-orange-400",
};

const TYPE_LABELS: Record<PublicationType, string> = {
  "original-research": "Original Research",
  "review": "Review",
  "systematic-review": "Systematic Review",
  "meta-analysis": "Meta-analysis",
  "case-report": "Case Report",
  "editorial": "Editorial",
  "letter": "Letter",
  "conference-abstract": "Conference",
  "technical-report": "Technical Report",
  "preprint": "Preprint",
};

interface PublicationTypeBadgeProps {
  type: PublicationType;
  className?: string;
}

export function PublicationTypeBadge({ type, className }: PublicationTypeBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest",
        TYPE_STYLES[type],
        className,
      )}
    >
      {TYPE_LABELS[type]}
    </span>
  );
}
