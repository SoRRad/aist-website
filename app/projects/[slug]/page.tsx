import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { team } from "@/lib/team";
import { collaborators } from "@/lib/collaborators";
import { phases } from "@/lib/phases";
import { statusBadgeVariants, statusLabels } from "@/lib/status";
import { TeamCard } from "@/components/lab/team-card";
import { CollaboratorCard } from "@/components/lab/collaborator-card";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.name} — ${project.longName}`,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  const projectPhases = phases.filter((p) =>
    project.phases.includes(p.id as typeof project.phases[number]),
  );
  const projectTeam = team.filter((m) => project.team.includes(m.slug));
  const projectCollaborators = collaborators.filter((c) =>
    project.collaborators.includes(c.slug),
  );

  return (
    <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs />

      {/* Header */}
      <header className="mb-12 max-w-3xl">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className={cn(statusBadgeVariants({ status: project.status }))}>
            {statusLabels[project.status]}
          </span>
          {projectPhases.map((p) => (
            <span
              key={p.id}
              className="rounded-sm border border-[var(--color-border)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted-foreground)]"
            >
              {p.code} / {p.title}
            </span>
          ))}
        </div>

        <h1
          className="font-display text-balance text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          {project.name}
        </h1>
        <p className="mt-2 text-lg font-medium text-[var(--color-muted-foreground)]">
          {project.longName}
        </p>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--color-muted-foreground)]">
          {project.tagline}
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="accent" size="lg">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Visit the live tool
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
          {project.githubUrl && (
            <Button asChild variant="outline" size="lg">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </Button>
          )}
        </div>
      </header>

      <hr className="border-[var(--color-border)]" />

      {/* Description */}
      <section className="my-12 max-w-3xl">
        <p className="eyebrow mb-4">About</p>
        <p className="text-pretty text-lg leading-relaxed text-[var(--color-muted-foreground)]">
          {project.description}
        </p>
      </section>

      {/* Team */}
      {projectTeam.length > 0 && (
        <section className="my-12">
          <p className="eyebrow mb-6">Team</p>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {projectTeam.map((member) => (
              <TeamCard key={member.slug} member={member} />
            ))}
          </div>
        </section>
      )}

      {/* Collaborators */}
      {projectCollaborators.length > 0 && (
        <section className="my-12">
          <p className="eyebrow mb-6">Collaborating institutions</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projectCollaborators.map((c) => (
              <CollaboratorCard key={c.slug} collaborator={c} />
            ))}
          </div>
        </section>
      )}

      {/* TODO Step 4: embedded iframe demo + approach + results + roadmap */}

      <div className="mt-16">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] hover:underline"
        >
          ← All projects
        </Link>
      </div>
    </article>
  );
}
