import Link from "next/link";
import { FileText, Hospital, Video, CheckCircle2, Ambulance } from "lucide-react";

const badges = [
  {
    icon: FileText,
    title: "Peer-reviewed work",
    description: "Published in SOARD and Surgical Endoscopy",
    href: "/publications",
  },
  {
    icon: Hospital,
    title: "IRB-approved studies",
    description: "Institutional ethics oversight on all patient data",
    href: null,
  },
  {
    icon: Video,
    title: "Surgical video AI",
    description: "Phase recognition and anatomy segmentation in the OR",
    href: null,
  },
  {
    icon: CheckCircle2,
    title: "External validation",
    description: "Prospective cohort validation across institutions",
    href: null,
  },
  {
    icon: Ambulance,
    title: "Clinical translation",
    description: "Tools deployed in active clinical workflows",
    href: null,
  },
];

export function CredibilityStrip() {
  return (
    <div className="w-full border-y border-[var(--color-border)] bg-[var(--color-navy-900)]/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-x divide-[var(--color-border)] sm:grid-cols-5">
          {badges.map((badge, i) => {
            const Icon = badge.icon;
            const inner = (
              <div className={`flex flex-col items-center gap-2 px-4 py-5 text-center ${i < 4 ? "sm:border-r-0" : ""}`}>
                <Icon className="h-4 w-4 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-foreground)]">
                  {badge.title}
                </span>
                <span className="hidden text-[10px] leading-relaxed text-[var(--color-muted-foreground)] sm:block">
                  {badge.description}
                </span>
              </div>
            );

            if (badge.href) {
              return (
                <Link
                  key={badge.title}
                  href={badge.href}
                  className="transition-colors hover:bg-[var(--color-accent)]/5"
                >
                  {inner}
                </Link>
              );
            }
            return (
              <div key={badge.title} className="border-r border-[var(--color-border)] last:border-r-0">
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
