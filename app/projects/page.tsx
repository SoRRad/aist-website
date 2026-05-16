import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/lab/project-card";

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
          Active project portfolio.
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--color-muted-foreground)]">
          Focused project pages for AIST systems moving through design, validation, deployment, and clinical evaluation.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
