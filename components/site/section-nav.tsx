"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionNavItem {
  id: string;
  label: string;
}

interface SectionNavProps {
  items: SectionNavItem[];
}

/**
 * Horizontal secondary nav that pins below the main header on scroll.
 * Clicking an item smooth-scrolls to the corresponding section.
 * Active section detected via IntersectionObserver.
 * On mobile: horizontal-scroll strip.
 */
export function SectionNav({ items }: SectionNavProps) {
  const [activeId, setActiveId] = React.useState<string>(items[0]?.id ?? "");
  const [pinned, setPinned] = React.useState(false);

  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  React.useEffect(() => {
    const onScroll = () => setPinned(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={cn(
        "sticky top-[calc(var(--header-height,88px))] z-30 w-full border-b border-[var(--color-border)] bg-[var(--color-background)]/90 backdrop-blur-md transition-shadow duration-300",
        pinned && "shadow-sm",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map(({ id, label }) => {
            const active = activeId === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={cn(
                  "shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                  active
                    ? "border-[var(--color-accent)] text-[var(--color-foreground)]"
                    : "border-transparent text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
