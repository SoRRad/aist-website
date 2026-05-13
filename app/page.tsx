import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { siteConfig } from "@/lib/site-config";

/**
 * Home page — Step 1 scaffold.
 *
 * This is intentionally a minimal but visually grounded landing. Step 2 will
 * replace this with the full hero, surgical-phase wheel, featured project,
 * news strip, and animated counters.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <RoadmapStrip />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Soft grid backdrop */}
      <div
        className="absolute inset-0 -z-10 bg-grid opacity-50"
        aria-hidden="true"
      />
      {/* Radial wash */}
      <div
        className="absolute left-1/2 top-0 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/15"
        aria-hidden="true"
      />

      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 pb-24 pt-24 text-center sm:px-6 sm:pt-32 lg:px-8">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ekg rounded-full bg-coral-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-coral-500" />
          </span>
          <span className="font-mono uppercase tracking-wider text-[var(--color-muted-foreground)]">
            AIST · {siteConfig.fullName}
          </span>
        </div>

        {/* Big logo, animated on first load */}
        <div className="mt-12 flex justify-center">
          <Logo animated className="h-28 w-28 sm:h-32 sm:w-32" />
        </div>

        {/* Tagline as the editorial hero — Instrument Serif */}
        <h1 className="font-display mt-10 text-balance text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] tracking-tight">
          {siteConfig.tagline}
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-pretty text-base leading-relaxed text-[var(--color-muted-foreground)] sm:text-lg">
          AIST is a research lab at {siteConfig.institution.name} advancing
          artificial intelligence across the full surgical journey — from
          pre-operative planning through intra-operative guidance, post-operative
          recovery, and rigorous external validation.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild variant="accent" size="lg">
            <Link href="/projects">
              Explore our projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/research">Read the research focus</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/**
 * A transparent "build progress" strip that doubles as scaffolding feedback
 * during Step 1. It will be replaced by the surgical phase wheel + featured
 * project + news strip in Step 2.
 */
function RoadmapStrip() {
  const phases = [
    { code: "01", title: "Pre-operative", note: "Planning, segmentation, 3D reconstruction" },
    { code: "02", title: "Intra-operative", note: "Anatomy recognition, Go/No-Go zones, gesture maps" },
    { code: "03", title: "Post-operative", note: "Outcome prediction, recovery, patient education" },
    { code: "04", title: "Validation", note: "External testing and deployment" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="hairline mb-16" />
      <div className="flex items-end justify-between">
        <div>
          <p className="eyebrow">The surgical journey</p>
          <h2 className="mt-3 max-w-xl text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Four phases. One continuous arc of intelligent care.
          </h2>
        </div>
        <Link
          href="/research"
          className="hidden text-sm font-medium text-[var(--color-accent)] hover:underline sm:inline-flex sm:items-center sm:gap-1"
        >
          See research focus <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-4">
        {phases.map((phase) => (
          <li
            key={phase.code}
            className="group relative bg-[var(--color-card)] p-6 transition-colors hover:bg-[var(--color-muted)]"
          >
            <div className="font-mono text-xs text-[var(--color-muted-foreground)]">
              PHASE / {phase.code}
            </div>
            <div className="font-display mt-4 text-2xl tracking-tight">
              {phase.title}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
              {phase.note}
            </p>
            <div className="mt-6 h-px w-8 bg-[var(--color-accent)] transition-all duration-500 group-hover:w-16" />
          </li>
        ))}
      </ul>
    </section>
  );
}
