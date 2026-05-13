import type React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Globe, GraduationCap, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { team } from "@/lib/team";
import { projects } from "@/lib/projects";
import { MemberAvatar } from "@/components/lab/member-avatar";
import { Breadcrumbs } from "@/components/site/breadcrumbs";

export function generateStaticParams() {
  return team.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = team.find((m) => m.slug === slug);
  if (!member) return { title: "Team member not found" };
  return {
    title: `${member.name} — ${member.role}`,
    description: member.bio,
  };
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = team.find((m) => m.slug === slug);

  if (!member) notFound();

  const memberProjects = projects.filter((p) => p.team.includes(member.slug));

  const linkItems = [
    member.links.profile && { href: member.links.profile, Icon: Globe, label: "Profile" },
    member.links.github && { href: member.links.github, Icon: Github, label: "GitHub" },
    member.links.linkedin && { href: member.links.linkedin, Icon: Linkedin, label: "LinkedIn" },
    member.links.twitter && { href: member.links.twitter, Icon: Twitter, label: "Twitter" },
    member.links.scholar && { href: member.links.scholar, Icon: GraduationCap, label: "Google Scholar" },
    member.links.email && { href: `mailto:${member.links.email}`, Icon: Mail, label: "Email" },
  ].filter(Boolean) as { href: string; Icon: React.ElementType; label: string }[];

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs />

      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-12">
        <MemberAvatar
          photo={member.photo}
          name={member.name}
          initials={member.initials}
          size="lg"
        />

        <div className="flex-1">
          <h1
            className="font-display text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            {member.name}
          </h1>
          <p className="mt-2 text-base font-medium text-[var(--color-accent)]">{member.role}</p>
          <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">{member.affiliation}</p>

          <p className="mt-6 text-pretty leading-relaxed text-[var(--color-muted-foreground)]">
            {member.bio}
          </p>

          {linkItems.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {linkItems.map(({ href, Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-muted)] px-3 py-1.5 text-xs font-medium text-[var(--color-muted-foreground)] transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--color-foreground)]"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {memberProjects.length > 0 && (
        <section className="mt-16">
          <p className="eyebrow mb-6">Featured projects</p>
          <div className="flex flex-col gap-4">
            {memberProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-6 py-4 transition-colors hover:border-[var(--color-accent)]/40"
              >
                <div>
                  <p className="font-semibold text-[var(--color-foreground)] group-hover:text-[var(--color-accent)]">
                    {project.name}
                  </p>
                  <p className="mt-0.5 text-sm text-[var(--color-muted-foreground)]">{project.tagline}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-[var(--color-muted-foreground)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)]" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-16">
        <Link
          href="/team"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] hover:underline"
        >
          ← All team members
        </Link>
      </div>
    </article>
  );
}
