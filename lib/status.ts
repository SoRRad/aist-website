/**
 * Class-variance-authority preset for status badges used on project pages
 * and the project pipeline. Status colors live in globals.css as CSS vars
 * so they recolor automatically in dark mode.
 */
import { cva, type VariantProps } from "class-variance-authority";

export const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium tracking-wide uppercase rounded-sm border",
  {
    variants: {
      status: {
        concept: "border-[var(--color-status-concept)] text-[var(--color-status-concept)] bg-[color-mix(in_oklab,var(--color-status-concept)_8%,transparent)]",
        development: "border-[var(--color-status-development)] text-[var(--color-status-development)] bg-[color-mix(in_oklab,var(--color-status-development)_10%,transparent)]",
        validation: "border-[var(--color-status-validation)] text-[var(--color-status-validation)] bg-[color-mix(in_oklab,var(--color-status-validation)_10%,transparent)]",
        clinical: "border-[var(--color-status-clinical)] text-[var(--color-status-clinical)] bg-[color-mix(in_oklab,var(--color-status-clinical)_10%,transparent)]",
        deployed: "border-[var(--color-status-deployed)] text-[var(--color-status-deployed)] bg-[color-mix(in_oklab,var(--color-status-deployed)_10%,transparent)]",
      },
    },
    defaultVariants: {
      status: "concept",
    },
  },
);

export type StatusBadgeVariants = VariantProps<typeof statusBadgeVariants>;

export const statusLabels: Record<NonNullable<StatusBadgeVariants["status"]>, string> = {
  concept: "Concept",
  development: "Development",
  validation: "Validation",
  clinical: "Clinical",
  deployed: "Deployed",
};
