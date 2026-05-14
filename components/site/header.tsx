"use client";

import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { primaryNav } from "@/lib/navigation";
import { phases } from "@/lib/phases";
import { projects } from "@/lib/projects";
import { logos } from "@/lib/logos";
import { Logo } from "@/components/site/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandPalette } from "@/components/site/command-palette";
import { MobileNav } from "@/components/site/mobile-nav";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Main header */}
      <div
        className={cn(
          "w-full transition-all duration-300",
          scrolled
            ? "border-b border-[var(--color-border)] bg-[var(--color-background)]/85 backdrop-blur-md"
            : "border-b border-transparent bg-[var(--color-background)]/0",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo — horizontal lockup on md+, mark-only on mobile */}
          <Link href="/" aria-label="AIST home" className="shrink-0">
            {/* Desktop: horizontal lockup */}
            <Logo variant="horizontal" priority width={160} height={40} className="hidden sm:block h-9 w-auto" />
            {/* Mobile: mark only */}
            <Image
              src={logos.markNeutral}
              alt="AIST"
              width={36}
              height={36}
              priority
              className="block h-9 w-auto sm:hidden"
            />
          </Link>

          {/* Primary nav */}
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {primaryNav.map((item) => {
              const active = isActive(item.href);
              const isProjects = item.href === "/projects";
              const isResearch = item.href === "/research";

              if (isProjects) return <ProjectsDropdown key={item.href} active={active} />;
              if (isResearch) return <ResearchDropdown key={item.href} active={active} />;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-[var(--color-foreground)]"
                      : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]",
                  )}
                >
                  {item.title}
                  {active && (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute inset-x-2 -bottom-[1px] h-0.5 rounded-full bg-[var(--color-accent)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <CommandPalette />
            <ThemeToggle />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── Shared dropdown wrapper ─────────────────────────────────────────────── */

function NavDropdown({
  label,
  href,
  active,
  children,
}: {
  label: string;
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={href}
        className={cn(
          "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
          active
            ? "text-[var(--color-foreground)]"
            : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]",
        )}
      >
        {label}
        {active && (
          <motion.span
            layoutId="nav-active-indicator"
            className="absolute inset-x-2 -bottom-[1px] h-0.5 rounded-full bg-[var(--color-accent)]"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-full z-50 mt-1 w-72 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] shadow-xl shadow-black/10"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Projects dropdown ───────────────────────────────────────────────────── */

function ProjectsDropdown({ active }: { active: boolean }) {
  const featured = projects.filter((p) => p.featured);
  return (
    <NavDropdown label="Projects" href="/projects" active={active}>
      <div className="p-2">
        {featured.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-[var(--color-muted)]"
          >
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-card)]">
              <Image src={logos.markNeutral} alt="" width={16} height={16} className="h-4 w-4 opacity-70" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[var(--color-foreground)]">{project.name}</p>
              <p className="mt-0.5 truncate text-xs text-[var(--color-muted-foreground)]">{project.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="border-t border-[var(--color-border)] px-3 py-2">
        <Link href="/projects" className="text-xs font-medium text-[var(--color-accent)] hover:underline">
          View all projects →
        </Link>
      </div>
    </NavDropdown>
  );
}

/* ── Research dropdown ───────────────────────────────────────────────────── */

function ResearchDropdown({ active }: { active: boolean }) {
  return (
    <NavDropdown label="Research" href="/research" active={active}>
      <div className="p-2">
        {phases.map((phase) => (
          <Link
            key={phase.id}
            href={`/research#${phase.id}`}
            className="group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-[var(--color-muted)]"
          >
            <span className="mt-0.5 shrink-0 font-mono text-[10px] font-semibold tracking-wider text-[var(--color-accent)]">
              {phase.code}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[var(--color-foreground)]">{phase.title}</p>
              <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-[var(--color-muted-foreground)]">
                {phase.description.slice(0, 80)}…
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="border-t border-[var(--color-border)] px-3 py-2">
        <Link href="/research" className="text-xs font-medium text-[var(--color-accent)] hover:underline">
          View research focus →
        </Link>
      </div>
    </NavDropdown>
  );
}
