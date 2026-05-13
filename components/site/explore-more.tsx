import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ExploreMoreProps {
  href: string;
  children: React.ReactNode;
}

/**
 * Consistent "explore more" arrow-link used at the bottom of every home-page
 * section that has a corresponding full subpage.
 */
export function ExploreMore({ href, children }: ExploreMoreProps) {
  return (
    <div className="mt-12 flex">
      <Link
        href={href}
        className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-foreground)]"
      >
        {children}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
