import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { publications } from "@/lib/publications";
import { projects } from "@/lib/projects";
import { phases } from "@/lib/phases";
import { PublicationDashboard } from "@/components/publications/publication-dashboard";
import { ProjectCard } from "@/components/lab/project-card";

export const metadata = {
  title: "Research & Projects",
  description: "A-STAR publications, active projects, and surgical AI focus areas.",
};

export default function ResearchPage() {
  return (
    <>
      <Suspense fallback={<div className="py-32 text-center text-[var(--color-muted-foreground)]">Loading...</div>}>
        <PublicationDashboard
          publications={publications}
          eyebrow="Research portfolio"
          title="Research & Projects"
          description="Explore A-STAR publications first, then follow the active systems and surgical AI directions that organize the lab's work."
          exportBaseName="astar-research-publications"
        />
      </Suspense>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-4">Active projects</p>
            <h2
              className="font-display text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              Systems moving toward clinical use.
            </h2>
            <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-[var(--color-muted-foreground)]">
              Project pages connect the evidence base above to the decision support, education, and validation tools currently under development.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-foreground)]"
          >
            View project index
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="flex flex-col gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="eyebrow mb-4">Surgical AI focus areas</p>
          <h2
            className="font-display text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            A full surgical journey map.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {phases.map((phase) => {
            const phaseProjects = projects.filter((project) => phase.projects.includes(project.slug));

            return (
              <article
                key={phase.id}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
                      {phase.code}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                      {phase.title}
                    </h3>
                  </div>
                  <span className="rounded-sm border border-[var(--color-border)] px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted-foreground)]">
                    {phaseProjects.length} project{phaseProjects.length === 1 ? "" : "s"}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                  {phase.description}
                </p>
                {phaseProjects.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {phaseProjects.map((project) => (
                      <Link
                        key={project.slug}
                        href={`/projects/${project.slug}`}
                        className="rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)]/20"
                      >
                        {project.name}
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
