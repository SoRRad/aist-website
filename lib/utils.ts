import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely. clsx handles conditional class joining,
 * tailwind-merge resolves conflicts (e.g. p-2 + p-4 -> p-4).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format an ISO date string for display in the UI.
 * Example: "2026-05-12" -> "May 12, 2026"
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format a date as a short string for cards and lists.
 * Example: "2026-05-12" -> "May 2026"
 */
export function formatDateShort(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}
