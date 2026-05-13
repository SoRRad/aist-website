"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Twitter, Mail, Globe, GraduationCap } from "lucide-react";
import type { TeamMember } from "@/lib/team";
import { cn } from "@/lib/utils";

interface TeamCardProps {
  member: TeamMember;
  className?: string;
}

/**
 * Team member card.
 *
 * The <Link> wraps ONLY the photo + name + role area to avoid nested <a> tags.
 * Link icons sit as a sibling below the link region, outside the anchor.
 */
export function TeamCard({ member, className }: TeamCardProps) {
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);
  const showPhoto = imgLoaded && !imgError;

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40 hover:shadow-md",
        className,
      )}
    >
      {/* Clickable region: avatar + name/role — no nested anchors */}
      <Link href={`/team/${member.slug}`} className="group flex flex-col gap-4">
        {/* Avatar */}
        <div className="relative h-16 w-16 overflow-hidden rounded-full">
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-navy-800)] to-[var(--color-navy-600)] transition-opacity duration-300",
              showPhoto ? "opacity-0" : "opacity-100",
            )}
            aria-hidden={showPhoto}
          >
            <span className="font-display text-xl font-semibold text-[var(--color-ink-100)]">
              {member.initials}
            </span>
          </div>
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="64px"
            className={cn(
              "rounded-full object-cover transition-opacity duration-300",
              showPhoto ? "opacity-100" : "opacity-0",
            )}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <p className="font-semibold leading-snug text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-accent)]">
            {member.name}
          </p>
          <p className="mt-0.5 text-xs font-medium text-[var(--color-accent)]">{member.role}</p>
          <p className="mt-0.5 text-xs text-[var(--color-muted-foreground)]">{member.affiliation}</p>
        </div>
      </Link>

      {/* Link icons — sibling to the Link, never nested inside it */}
      <LinkIcons links={member.links} name={member.name} />
    </div>
  );
}

function LinkIcons({
  links,
  name,
}: {
  links: TeamMember["links"];
  name: string;
}) {
  const items = [
    links.profile && { href: links.profile, icon: Globe, label: `${name} profile` },
    links.github && { href: links.github, icon: Github, label: `${name} on GitHub` },
    links.linkedin && { href: links.linkedin, icon: Linkedin, label: `${name} on LinkedIn` },
    links.twitter && { href: links.twitter, icon: Twitter, label: `${name} on Twitter` },
    links.scholar && { href: links.scholar, icon: GraduationCap, label: `${name} on Google Scholar` },
    links.email && { href: `mailto:${links.email}`, icon: Mail, label: `Email ${name}` },
  ].filter(Boolean) as { href: string; icon: React.ElementType; label: string }[];

  if (items.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      {items.map(({ href, icon: Icon, label }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-accent)]"
        >
          <Icon className="h-3.5 w-3.5" />
        </a>
      ))}
    </div>
  );
}
