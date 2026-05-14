"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { projects } from "@/lib/projects";
import { phases } from "@/lib/phases";
import { StatusPipeline } from "@/components/lab/status-pipeline";
import { logos } from "@/lib/logos";

/**
 * Featured project cards for MOSI and SIRIS.
 *
 * Each card shows: project name, tagline, phase tags, status badge, and a
 * placeholder visual with the AIST mark. Becomes a micro-demo in Step 4.
 */
export function FeaturedProjects() {
  return (
    <div className="flex flex-col gap-6">
      {projects.map((project) => {
        const projectPhases = phases.filter((p) => project.phases.includes(p.id as typeof project.phases[number]));
        return (
          <motion.div
            key={project.slug}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] transition-colors hover:border-[var(--color-accent)]/40"
          >
            {/* Decorative background mark at very low opacity */}
            <Image
              src={logos.markNeutral}
              alt=""
              aria-hidden="true"
              width={120}
              height={120}
              className="pointer-events-none absolute -right-4 -top-4 h-32 w-32 select-none opacity-[0.04]"
            />

            <div className="flex flex-col gap-8 p-8 lg:flex-row lg:items-center">
              {/* Left: text */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusPipeline status={project.status} />
                  {projectPhases.map((p) => (
                    <span
                      key={p.id}
                      className="rounded-sm border border-[var(--color-border)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted-foreground)]"
                    >
                      {p.code} / {p.title}
                    </span>
                  ))}
                </div>

                <div>
                  <h3
                    className="font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-none tracking-tight"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    {project.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[var(--color-muted-foreground)]">
                    {project.longName}
                  </p>
                </div>

                <p className="max-w-lg text-pretty leading-relaxed text-[var(--color-muted-foreground)]">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-foreground)]"
                  >
                    Open project
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
                  >
                    Live tool ↗
                  </a>
                </div>
              </div>

              {/* Right: placeholder visual — becomes a micro-demo in Step 4 */}
              <div className="flex min-h-[180px] min-w-[240px] items-center justify-center rounded-lg border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-muted)] to-[var(--color-card)] lg:min-w-[280px]">
                <Image
                  src={logos.markNeutral}
                  alt=""
                  aria-hidden="true"
                  width={56}
                  height={56}
                  className="opacity-10"
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
