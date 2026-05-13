"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Github, Linkedin, Mail, Globe } from "lucide-react";
import type { TeamMember } from "@/lib/team";
import { logos } from "@/lib/logos";
import { cn } from "@/lib/utils";

/* Deterministic rest rotations based on card index — stable across re-renders */
const REST_ROTATIONS = [-1.8, 0.9, -1.2, 0.6, -0.4, 1.6, -0.9, 0.3, -1.5, 1.1];

interface PlayingCardProps {
  member: TeamMember;
  index: number;
  className?: string;
}

/**
 * Team member playing card.
 *
 * Portrait aspect ratio (5:7). Card has a subtle rest rotation for a
 * "hand of cards" feel. Hover straightens the card, lifts it, and adds an
 * accent-blue glow. Click navigates to /team/[slug].
 *
 * Photo / initials strategy: initials are always rendered; photo fades in on
 * successful load. Error state keeps the initials visible — no broken images.
 */
export function PlayingCard({ member, index, className }: PlayingCardProps) {
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);
  const showPhoto = imgLoaded && !imgError;
  const restRotation = REST_ROTATIONS[index % REST_ROTATIONS.length];

  const linkItems = [
    member.links.profile && { href: member.links.profile, icon: Globe, label: "Profile" },
    member.links.github && { href: member.links.github, icon: Github, label: "GitHub" },
    member.links.linkedin && { href: member.links.linkedin, icon: Linkedin, label: "LinkedIn" },
    member.links.email && { href: `mailto:${member.links.email}`, icon: Mail, label: "Email" },
  ].filter(Boolean) as { href: string; icon: React.ElementType; label: string }[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, rotate: restRotation }}
      whileInView={{ opacity: 1, y: 0, rotate: restRotation }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        rotate: 0,
        y: -12,
        boxShadow: "0 0 0 2px var(--color-accent), 0 20px 40px rgba(30,136,229,0.2)",
      }}
      whileFocus={{ rotate: 0, y: -12 }}
      className={cn("relative mx-auto w-full max-w-[200px] cursor-pointer", className)}
      style={{ aspectRatio: "5/7" }}
    >
      <Link
        href={`/team/${member.slug}`}
        className="flex h-full w-full flex-col rounded-xl border border-[var(--color-navy-700)] bg-[var(--color-card)] p-3 focus:outline-none dark:border-[var(--color-navy-700)]"
        aria-label={`${member.name} — ${member.role}`}
      >
        {/* Outer hairline inset bezel */}
        <div className="pointer-events-none absolute inset-[4px] rounded-[10px] border border-[var(--color-border)] opacity-40" aria-hidden="true" />

        {/* Top-left corner pip */}
        <div className="flex shrink-0 flex-col items-start gap-0.5 px-1 pt-1">
          <Image src={logos.markNeutral} alt="" width={14} height={14} className="h-3.5 w-3.5 opacity-60" />
          <span className="font-display text-[15px] font-semibold leading-none text-[var(--color-accent)]">
            {member.name.charAt(0)}
          </span>
        </div>

        {/* Photo / initials — occupies middle ~60% */}
        <div className="relative mx-auto mt-2 w-full flex-1 overflow-hidden rounded-lg" style={{ maxHeight: "60%" }}>
          {/* Initials fallback */}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-navy-800)] to-[var(--color-navy-900)] transition-opacity duration-300",
              showPhoto ? "opacity-0" : "opacity-100",
            )}
          >
            <span
              className="font-display font-semibold text-[var(--color-ink-100)] opacity-60"
              style={{ fontSize: "clamp(2rem, 6vw, 3rem)" }}
            >
              {member.initials}
            </span>
          </div>
          {/* Photo */}
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="200px"
            className={cn(
              "rounded-lg object-cover object-top transition-opacity duration-300",
              showPhoto ? "opacity-100" : "opacity-0",
            )}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        </div>

        {/* Bottom info strip */}
        <div className="shrink-0 px-1 pb-1 pt-2">
          <p className="truncate font-display text-[13px] font-semibold leading-snug tracking-tight text-[var(--color-foreground)]">
            {member.name.split(",")[0]}
          </p>
          <p className="mt-0.5 truncate font-mono text-[9px] font-medium uppercase tracking-widest text-[var(--color-accent)]">
            {member.role}
          </p>
          <p className="mt-0.5 truncate text-[10px] text-[var(--color-muted-foreground)]">
            {member.affiliation}
          </p>

          {/* Link icons row */}
          {linkItems.length > 0 && (
            <div className="mt-1.5 flex items-center gap-1.5">
              {linkItems.map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  onClick={(e) => e.stopPropagation()}
                  className="text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-accent)]"
                >
                  <Icon className="h-3 w-3" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Bottom-right corner pip (rotated 180°) */}
        <div className="pointer-events-none absolute bottom-3 right-3 flex flex-col items-end gap-0.5 opacity-30" aria-hidden="true">
          <span className="font-display text-[15px] font-semibold leading-none text-[var(--color-accent)]" style={{ transform: "rotate(180deg)" }}>
            {member.name.charAt(0)}
          </span>
          <Image src={logos.markNeutral} alt="" width={14} height={14} className="h-3.5 w-3.5" style={{ transform: "rotate(180deg)" }} />
        </div>
      </Link>
    </motion.div>
  );
}
