import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { phases } from "@/lib/phases";
import { StatusPipeline } from "@/components/lab/status-pipeline";
import { logos } from "@/lib/logos";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12">
        <p className="eyebrow mb-4">Active projects</p>
        <h1
          className="font-display max-w-2xl text-balance text-5xl font-semibold tracking-tight sm:text-6xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          Built for the clinical frontier.
        </h1>
      </div>

      <div className="flex flex-col gap-6">
        {projects.map((project) => {
          const projectPhases = phases.filter((p) =>
            project.phases.includes(p.id as typeof project.phases[number]),
          );
          return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40 hover:shadow-md"
            >
              {/* Background mark */}
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
        })}
      </div>
    </section>
  );
}
