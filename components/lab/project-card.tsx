import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { phases } from "@/lib/phases";
import type { Project } from "@/lib/projects";
import { StatusPipeline } from "@/components/lab/status-pipeline";
import { logos } from "@/lib/logos";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const projectPhases = phases.filter((p) =>
    project.phases.includes(p.id as (typeof project.phases)[number]),
  );

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40 hover:shadow-md"
    >
      <Image
        src={logos.markNeutral}
        alt=""
        aria-hidden="true"
        width={120}
        height={120}
        className="pointer-events-none absolute -right-4 -top-4 h-32 w-32 select-none opacity-[0.04]"
      />
      <div className="p-8">
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
        <h2
          className="font-display mt-4 text-4xl font-semibold leading-none tracking-tight sm:text-5xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          {project.name}
        </h2>
        <p className="mt-1 text-sm font-medium text-[var(--color-muted-foreground)]">
          {project.longName}
        </p>
        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-[var(--color-muted-foreground)]">
          {project.description}
        </p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] transition-colors group-hover:text-[var(--color-foreground)]">
          View project
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
