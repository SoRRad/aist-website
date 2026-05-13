import type { ProjectStatus } from "@/lib/projects";

const STAGES: { key: ProjectStatus; label: string }[] = [
  { key: "concept", label: "Concept" },
  { key: "development", label: "Dev" },
  { key: "validation", label: "Validation" },
  { key: "clinical", label: "Clinical" },
  { key: "deployed", label: "Deployed" },
];

const STAGE_ORDER: Record<ProjectStatus, number> = {
  concept: 0,
  development: 1,
  validation: 2,
  clinical: 3,
  deployed: 4,
};

interface StatusPipelineProps {
  status: ProjectStatus;
  /** compact hides labels, shows only dots */
  compact?: boolean;
}

/**
 * Horizontal pipeline graphic replacing the colored pill status badge.
 * Filled dots up to and including current status; outlined dots after.
 */
export function StatusPipeline({ status, compact = false }: StatusPipelineProps) {
  const currentOrder = STAGE_ORDER[status];

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        {STAGES.map(({ key }, i) => {
          const filled = STAGE_ORDER[key] <= currentOrder;
          const isCurrent = key === status;
          return (
            <div key={key} className="flex items-center gap-1">
              <div
                className={`h-2 w-2 rounded-full transition-colors ${
                  filled
                    ? "bg-[var(--color-accent)]"
                    : "border border-[var(--color-border)] bg-transparent"
                } ${isCurrent ? "ring-1 ring-[var(--color-accent)] ring-offset-1" : ""}`}
                title={key}
              />
              {i < STAGES.length - 1 && (
                <div
                  className={`h-px w-3 ${filled && STAGE_ORDER[STAGES[i + 1].key] <= currentOrder ? "bg-[var(--color-accent)]" : "bg-[var(--color-border)]"}`}
                />
              )}
            </div>
          );
        })}
      </div>
      {!compact && (
        <p className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-muted-foreground)]">
          Status · {status}
        </p>
      )}
    </div>
  );
}
