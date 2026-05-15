import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Github, ChevronDown, Mail } from "lucide-react";
// ArrowUpRight kept for liveUrl/github CTAs in header
import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { team } from "@/lib/team";
import { collaborators } from "@/lib/collaborators";
import { phases } from "@/lib/phases";
import { publications } from "@/lib/publications";
import { getNewsByProject } from "@/lib/news";
import { NewsCard } from "@/components/news/news-card";
import { StatusPipeline } from "@/components/lab/status-pipeline";
import { PlayingCard } from "@/components/lab/playing-card";
import { CollaboratorCard } from "@/components/lab/collaborator-card";
import { ContentPlaceholder } from "@/components/lab/content-placeholder";
import { PublicationCard } from "@/components/publications/publication-card";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Button } from "@/components/ui/button";
import { mosiContent } from "@/content/projects/mosi";
import { sirisContent } from "@/content/projects/siris";

/* map slug → content object */
const contentMap: Record<string, typeof mosiContent> = {
  mosi: mosiContent,
  siris: sirisContent,
};

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

  const content = contentMap[slug];
  const projectPhases = phases.filter((p) =>
    project.phases.includes(p.id as (typeof project.phases)[number]),
  );
  const projectTeam = team.filter((m) => project.team.includes(m.slug));
  const projectCollaborators = collaborators.filter((c) =>
    project.collaborators.includes(c.slug),
  );
  const relatedPubs = publications.filter((p) => p.projects.includes(slug));
  const projectNews = getNewsByProject(slug);

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs />

      {/* ── 1. Header ── */}
      <header className="mb-12 mt-6">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <StatusPipeline status={project.status} />
          {projectPhases.map((p) => (
            <span
              key={p.id}
              className="rounded-sm border border-[var(--color-border)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted-foreground)]"
            >
              {p.code} / {p.title}
            </span>
          ))}
          {project.lastUpdated && (
            <span className="font-mono text-[10px] text-[var(--color-muted-foreground)]">
              Updated {project.lastUpdated}
            </span>
          )}
        </div>

        <h1
          className="font-display text-balance text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          {project.name}
        </h1>
        <p className="mt-3 text-xl font-medium text-[var(--color-muted-foreground)]">
          {project.longName}
        </p>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--color-muted-foreground)]">
          {project.tagline}
        </p>

        {/* ── 2. CTAs ── */}
        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveUrl && (
            <Button asChild variant="accent" size="lg">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Visit the live tool
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button asChild variant="outline" size="lg">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </Button>
          )}
          <Button asChild variant="outline" size="lg">
            <Link href={`/contact?inquiry=research-collaboration&project=${slug}`}>
              <Mail className="h-4 w-4" />
              Cite this project
            </Link>
          </Button>
        </div>
      </header>

      <hr className="border-[var(--color-border)]" />

      {/* ── Scientific content sections ── */}
      <div className="mt-12 space-y-12">

        {/* ── 3. The Problem ── */}
        <ScientificSection eyebrow="The Problem" title="What is broken clinically?">
          {content?.problem
            ? <Prose>{content.problem}</Prose>
            : <ContentPlaceholder section="The Problem" slug={slug} />
          }
        </ScientificSection>

        {/* ── 4. Clinical Need ── */}
        <ScientificSection eyebrow="Clinical Need" title="Why this matters in surgery">
          {content?.clinicalNeed
            ? <Prose>{content.clinicalNeed}</Prose>
            : <ContentPlaceholder section="Clinical Need" slug={slug} />
          }
        </ScientificSection>

        {/* ── 5. Data Sources ── */}
        <ScientificSection eyebrow="Data Sources" title="Where the data comes from">
          {content?.dataSources
            ? <Prose>{content.dataSources}</Prose>
            : <ContentPlaceholder section="Data Sources" slug={slug} />
          }
        </ScientificSection>

        {/* ── 6. Methods / Approach ── */}
        <ScientificSection eyebrow="Methods" title="Technical approach">
          {content?.methods
            ? <Prose>{content.methods}</Prose>
            : <ContentPlaceholder section="Methods / Approach" slug={slug} />
          }
        </ScientificSection>

        {/* ── 7. Validation Plan ── */}
        <ScientificSection eyebrow="Validation Plan" title="How the claims will be tested">
          {content?.validationPlan
            ? <Prose>{content.validationPlan}</Prose>
            : <ContentPlaceholder section="Validation Plan" slug={slug} />
          }
        </ScientificSection>

        {/* ── 8. Current Status ── */}
        <ScientificSection eyebrow="Current Status" title="What stage we're at">
          {content?.currentStatus
            ? <Prose>{content.currentStatus}</Prose>
            : <ContentPlaceholder section="Current Status" slug={slug} />
          }
        </ScientificSection>

        {/* ── 9. Model Card ── */}
        {content?.modelCard && (
          <ModelCardSection modelCard={content.modelCard} />
        )}

        {/* ── 10. Team ── */}
        {projectTeam.length > 0 && (
          <ScientificSection eyebrow="Team" title="People behind this project">
            <div className="flex flex-wrap justify-start gap-4">
              {projectTeam.map((member, i) => (
                <div key={member.slug} className="w-[calc(50%-8px)] max-w-[180px] sm:w-[160px]">
                  <PlayingCard member={member} index={i} />
                </div>
              ))}
            </div>
          </ScientificSection>
        )}

        {/* ── 11. Collaborators ── */}
        {projectCollaborators.length > 0 && (
          <ScientificSection eyebrow="Collaborating Institutions" title="Partners on this project">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projectCollaborators.map((c) => (
                <CollaboratorCard key={c.slug} collaborator={c} />
              ))}
            </div>
          </ScientificSection>
        )}

        {/* ── 12. Related Publications ── */}
        {relatedPubs.length > 0 && (
          <ScientificSection eyebrow="Related Publications" title="Research outputs">
            <div className="space-y-4">
              {relatedPubs.map((pub) => (
                <PublicationCard key={pub.slug} publication={pub} />
              ))}
            </div>
            <div className="mt-4">
              <Link
                href={`/publications?project=${slug}`}
                className="text-sm font-medium text-[var(--color-accent)] hover:underline"
              >
                View all publications →
              </Link>
            </div>
          </ScientificSection>
        )}

        {/* ── 13. Featured in news ── */}
        {projectNews.length > 0 && (
          <ScientificSection eyebrow="Featured in news" title="Coverage and mentions">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projectNews.slice(0, 3).map((item) => (
                <NewsCard key={item.slug} item={item} />
              ))}
            </div>
          </ScientificSection>
        )}

        {/* ── 14. Get Involved ── */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <p className="eyebrow mb-2">Get involved</p>
          <p className="mb-4 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
            Interested in collaborating on {project.name}? We welcome clinical partnerships, dataset contributions, and research collaboration.
          </p>
          <Button asChild variant="accent">
            <Link href={`/contact?inquiry=research-collaboration&project=${slug}`}>
              Reach out →
            </Link>
          </Button>
        </div>
      </div>

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

/* ── Shared layout wrappers ── */

function ScientificSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="eyebrow mb-2">{eyebrow}</p>
      <h2 className="mb-4 font-display text-xl font-semibold tracking-tight" style={{ letterSpacing: "-0.02em" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Prose({ children }: { children: string }) {
  return (
    <p className="max-w-3xl text-pretty text-base leading-relaxed text-[var(--color-muted-foreground)]">
      {children}
    </p>
  );
}

/* ── Model Card ── */

function ModelCardSection({ modelCard }: { modelCard: NonNullable<typeof mosiContent>["modelCard"] }) {
  return (
    <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]">
      <summary className="flex cursor-pointer items-center justify-between px-6 py-4 marker:content-none">
        <div>
          <p className="eyebrow mb-0.5">Model Card</p>
          <p className="text-sm font-medium text-[var(--color-foreground)]">Intended use, performance, and limitations</p>
        </div>
        <ChevronDown className="h-4 w-4 shrink-0 text-[var(--color-muted-foreground)] transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-t border-[var(--color-border)] px-6 py-6">
        <dl className="grid gap-6 sm:grid-cols-2">
          <ModelCardRow label="Intended Use" value={modelCard.intendedUse} />
          <ModelCardRow label="Validation Status" value={modelCard.validationStatus} />
          <ModelCardRow label="Dataset Size" value={modelCard.datasetSize} />
          <ModelCardRow label="Deployment Readiness" value={modelCard.deploymentReadiness} />
          <div className="sm:col-span-2">
            <ModelCardRow label="Performance Metrics" value={modelCard.performanceMetrics} />
          </div>
          <div>
            <dt className="eyebrow mb-1.5">Inputs</dt>
            <ul className="space-y-1">
              {modelCard.inputs.map((i) => (
                <li key={i} className="flex items-start gap-1.5 text-sm text-[var(--color-muted-foreground)]">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <dt className="eyebrow mb-1.5">Outputs</dt>
            <ul className="space-y-1">
              {modelCard.outputs.map((o) => (
                <li key={o} className="flex items-start gap-1.5 text-sm text-[var(--color-muted-foreground)]">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div className="sm:col-span-2">
            <ModelCardRow label="Limitations" value={modelCard.limitations} />
          </div>
        </dl>
      </div>
    </details>
  );
}

function ModelCardRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="eyebrow mb-1">{label}</dt>
      <dd className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">{value}</dd>
    </div>
  );
}
