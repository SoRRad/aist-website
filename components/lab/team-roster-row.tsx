"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe, Github, Linkedin, Mail, Twitter, ArrowRight } from "lucide-react";
import type { TeamMember } from "@/lib/team";
import { logos } from "@/lib/logos";
import { cn } from "@/lib/utils";

interface TeamRosterRowProps {
  member: TeamMember;
  index: number;
  variant: "main" | "collaborator";
}

export function TeamRosterRow({ member, index, variant }: TeamRosterRowProps) {
  const [imgError, setImgError] = React.useState(false);

  const photoSize = variant === "main"
    ? { w: 240, h: 320, wClass: "w-[240px]", hClass: "h-[320px]" }
    : { w: 180, h: 240, wClass: "w-[180px]", hClass: "h-[240px]" };

  const isEven = index % 2 === 0;

  const linkItems = [
    member.links.profile && { href: member.links.profile, Icon: Globe, label: "Profile" },
    member.links.github && { href: member.links.github, Icon: Github, label: "GitHub" },
    member.links.linkedin && { href: member.links.linkedin, Icon: Linkedin, label: "LinkedIn" },
    member.links.twitter && { href: member.links.twitter, Icon: Twitter, label: "Twitter" },
    member.links.email && { href: `mailto:${member.links.email}`, Icon: Mail, label: "Email" },
  ].filter(Boolean) as { href: string; Icon: React.ElementType; label: string }[];

  return (
    <div
      className={cn(
        "group flex flex-col gap-6 py-10 sm:flex-row sm:items-start sm:gap-10 lg:gap-12",
        isEven ? "bg-[var(--color-background)]" : "bg-[var(--color-card)]",
      )}
    >
      {/* Photo */}
      <div className={cn("shrink-0 self-start", "mx-auto sm:mx-0", photoSize.wClass)}>
        {member.isOpenPosition ? (
          <div
            className={cn(
              "relative flex items-center justify-center rounded-xl border-2 border-dashed border-[var(--color-accent)]/40 bg-[var(--color-muted)]",
              photoSize.wClass,
              photoSize.hClass,
            )}
          >
            <div className="text-center">
              <span
                className="font-display font-bold text-[var(--color-accent)]/30"
                style={{ fontSize: "clamp(3rem, 8vw, 5rem)" }}
              >
                ?
              </span>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted-foreground)]">
                Coming soon
              </p>
            </div>
          </div>
        ) : (
          <div
            className={cn(
              "relative overflow-hidden rounded-xl",
              photoSize.wClass,
              photoSize.hClass,
            )}
          >
            {/* Initials fallback */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--color-navy-800)] to-[var(--color-navy-900)] transition-opacity duration-300",
                !imgError ? "opacity-0" : "opacity-100",
              )}
            >
              <span
                className="font-display font-semibold text-[var(--color-ink-100)] opacity-60"
                style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
              >
                {member.initials}
              </span>
            </div>

            {/* Photo */}
            <Image
              src={member.photo}
              alt={member.name}
              fill
              sizes={`(max-width: 640px) 80vw, ${photoSize.w}px`}
              className={cn(
                "object-cover object-top transition-all duration-300 group-hover:scale-[1.02]",
                imgError ? "opacity-0" : "opacity-100",
              )}
              onError={() => {
                console.warn(`[AIST] Team photo not found: ${member.photo}`);
                setImgError(true);
              }}
            />

            {/* AIST corner badge */}
            <div className="pointer-events-none absolute right-2 top-2 rounded-md bg-[var(--color-navy-900)]/70 p-1 backdrop-blur-sm">
              <Image src={logos.markNeutral} alt="" width={16} height={16} className="h-4 w-4 opacity-70" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        {/* Role eyebrow */}
        <p className="eyebrow mb-2 flex flex-wrap items-center gap-2 text-[var(--color-accent)]">
          {String(index).padStart(2, "0")} / {member.role}
          {member.isOpenPosition && (
            <span className="rounded-sm border border-[var(--color-coral-400)]/40 bg-[var(--color-coral-400)]/10 px-1.5 py-0.5 font-mono text-[9px] tracking-widest text-[var(--color-coral-400)]">
              OPEN POSITION
            </span>
          )}
        </p>

        {/* Name */}
        <Link href={member.isOpenPosition ? "/join" : `/team/${member.slug}`}>
          <h3
            className="font-display text-balance font-semibold tracking-tight text-[var(--color-foreground)] transition-colors hover:text-[var(--color-accent)]"
            style={{
              fontSize: variant === "main" ? "clamp(1.5rem, 3vw, 2.25rem)" : "clamp(1.25rem, 2.5vw, 1.75rem)",
              letterSpacing: "-0.03em",
            }}
          >
            {member.name}
          </h3>
        </Link>

        {/* Affiliation */}
        <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-[var(--color-muted-foreground)]">
          {member.affiliation}
        </p>

        {/* Accent hairline */}
        <div className="my-4 h-[2px] w-8 rounded-full bg-[var(--color-accent)]" />

        {/* Bio */}
        <p className="text-pretty text-sm leading-relaxed text-[var(--color-muted-foreground)] sm:text-base">
          {member.bio}
        </p>

        {member.isOpenPosition ? (
          /* Open position CTA */
          <div className="mt-5 rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-4">
            <p className="mb-3 text-sm font-semibold text-[var(--color-foreground)]">
              We&apos;re hiring
            </p>
            <a
              href={member.openPositionUrl ?? "/join"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Apply on Mayo Careers <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        ) : (
          <>
            {/* Research focus — main variant only */}
            {variant === "main" && member.researchFocus && member.researchFocus.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-foreground)]">
                  Research focus
                </p>
                <ul className="space-y-1">
                  {member.researchFocus.map((focus) => (
                    <li key={focus} className="flex items-start gap-2 text-sm text-[var(--color-muted-foreground)]">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                      {focus}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Link chips */}
            {linkItems.length > 0 && (
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {linkItems.map(({ href, Icon, label }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-medium text-[var(--color-muted-foreground)] transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--color-foreground)]"
                  >
                    <Icon className="h-3 w-3" />
                    {label}
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
