"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ExploreMore } from "@/components/site/explore-more";
import { PhaseWheel } from "@/components/lab/phase-wheel";
import { StatusPipeline } from "@/components/lab/status-pipeline";
import type { Project } from "@/lib/projects";

interface ResearchProjectsClientProps {
  projects: Project[];
}

export function ResearchProjectsClient({ projects }: ResearchProjectsClientProps) {
  return (
    <>
      <Reveal showMark>
        <p className="eyebrow mb-4">Research & projects</p>
        <h2
          className="font-display mb-4 max-w-xl text-balance text-3xl font-semibold tracking-tight lg:text-4xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          Intelligence across the surgical journey.
        </h2>
        <p className="mb-12 max-w-2xl text-pretty text-base leading-relaxed text-[var(--color-muted-foreground)]">
          AIST maps AI research to the four phases of surgical care — each phase
          grounded in clinical problems that matter to surgeons and patients.
        </p>
      </Reveal>

      <PhaseWheel />

      {/* Compact project summary — 2-up cards */}
      <div className="mt-16 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="group flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-colors hover:border-[var(--color-accent)]/40"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  {project.name}
                </h3>
                <p className="mt-0.5 text-xs text-[var(--color-muted-foreground)]">{project.longName}</p>
              </div>
              <StatusPipeline status={project.status} compact />
            </div>
            <p className="flex-1 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
              {project.tagline}
            </p>
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-foreground)]"
            >
              Open project
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        ))}
      </div>

      <ExploreMore href="/research">Explore research and projects</ExploreMore>
    </>
  );
}
