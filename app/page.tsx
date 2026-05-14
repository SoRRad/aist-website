"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FlaskConical, Users, BookOpen } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { Section } from "@/components/site/section";
import { ExploreMore } from "@/components/site/explore-more";
import { CircuitDivider } from "@/components/site/circuit-divider";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { ScalpelProgress } from "@/components/motion/scalpel-progress";
import { Magnetic } from "@/components/motion/magnetic";
import { ScrambleCounter } from "@/components/motion/scramble-counter";
import { PhaseWheel } from "@/components/lab/phase-wheel";
import { PlayingCard } from "@/components/lab/playing-card";
import { StatusPipeline } from "@/components/lab/status-pipeline";
import { CollaboratorMarquee } from "@/components/lab/collaborator-marquee";
import { GlossaryTerm } from "@/components/site/glossary-term";
import { CredibilityStrip } from "@/components/sections/credibility-strip";
import { siteConfig } from "@/lib/site-config";
import { stats } from "@/lib/stats";
import { mainTeam, collaboratorTeam } from "@/lib/team";
import { collaborators } from "@/lib/collaborators";
import { publications } from "@/lib/publications";
import { projects } from "@/lib/projects";
import { openings } from "@/lib/openings";
import { mockNews } from "@/lib/mock-news";
import { mockEvents } from "@/lib/mock-events";
import { formatDateShort } from "@/lib/utils";

export default function HomePage() {
  return (
    <>
      {/* Scalpel-and-sutures scroll progress — above everything */}
      <ScalpelProgress />

      <Hero />

      {/* 01 — Mission */}
      <Section code="01" label="Mission" id="mission">
        <MissionStatement />
      </Section>

      {/* Credibility strip — below mission, above numbers */}
      <CredibilityStrip />

      <CircuitDivider />

      {/* 02 — By the numbers */}
      <Section code="02" label="By the numbers" id="numbers">
        <NumbersStrip />
      </Section>

      <CircuitDivider />

      {/* 03 — Research & Projects */}
      <Section code="03" label="Research & Projects" id="research">
        <ResearchAndProjects />
      </Section>

      <CircuitDivider />

      {/* 04 — Team */}
      <Section code="04" label="Team" id="team">
        <TeamSection />
      </Section>

      <CircuitDivider />

      {/* 05 — From the lab */}
      <Section code="05" label="From the lab" id="news">
        <FromTheLab />
      </Section>

      <CircuitDivider />

      {/* 06 — Collaborators */}
      <Section code="06" label="Collaborators" id="collaborators">
        <CollaboratorsSection />
      </Section>

      {/* 07 — Join Us — full-bleed dark panel */}
      <div
        id="join"
        style={{ background: "var(--color-navy-1000)" }}
        className="mt-24"
      >
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <GetInvolvedStrip />
        </div>
      </div>
    </>
  );
}

/* ── 00. Hero ────────────────────────────────────────────────────────────── */

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const taglineOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section ref={heroRef} className="relative isolate min-h-[90vh] overflow-hidden">
      {/* Grid backdrop */}
      <div className="absolute inset-0 -z-10 bg-grid opacity-50" aria-hidden="true" />
      {/* Radial wash */}
      <div
        className="absolute left-1/2 top-0 -z-10 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/15"
        aria-hidden="true"
      />

      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 pb-32 pt-20 text-center sm:px-6 sm:pt-28 lg:px-8">
        {/* Logo lockup — scroll-driven scale */}
        <motion.div style={{ scale: logoScale }} className="relative mt-4 flex justify-center">
          {/* Radial glow ring */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-[0.08] blur-[80px] dark:opacity-[0.14]"
            style={{ background: "radial-gradient(ellipse at center, #1e88e5 0%, transparent 70%)" }}
            aria-hidden="true"
          />
          <Logo
            variant="stacked"
            animated
            priority
            sizes="(max-width: 640px) 280px, 420px"
            className="max-w-[420px] [filter:drop-shadow(0_8px_32px_rgba(30,136,229,0.15))] dark:[filter:drop-shadow(0_8px_32px_rgba(30,136,229,0.22))]"
          />
        </motion.div>

        {/* Tagline */}
        <motion.h1
          className="font-display mt-10 text-balance font-semibold leading-[0.95]"
          style={{ opacity: taglineOpacity, fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}
        >
          {siteConfig.tagline}
        </motion.h1>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-8 max-w-2xl text-pretty text-base leading-relaxed text-[var(--color-muted-foreground)] sm:text-lg">
            AIST advances artificial intelligence across the full surgical journey —
            from{" "}<GlossaryTerm term="Pre-operative" /> risk stratification through{" "}
            patient education and rigorous external{" "}<GlossaryTerm term="Validation cohort" />.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <Magnetic>
              <Button asChild variant="accent" size="lg">
                <a href="#research" onClick={(e) => { e.preventDefault(); document.getElementById("research")?.scrollIntoView({ behavior: "smooth" }); }}>
                  Explore our research
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild variant="outline" size="lg">
                <a href="#team" onClick={(e) => { e.preventDefault(); document.getElementById("team")?.scrollIntoView({ behavior: "smooth" }); }}>
                  Meet the team
                </a>
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 01. Mission ─────────────────────────────────────────────────────────── */

function MissionStatement() {
  return (
    <Reveal showMark>
      <p className="eyebrow mb-6">Our mission</p>
      <p
        className="font-display max-w-4xl text-balance font-semibold leading-[1.05]"
        style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}
      >
        AIST advances artificial intelligence across the full surgical journey —
        from risk stratification through patient education and rigorous validation.
      </p>
    </Reveal>
  );
}

/* ── 02. By the numbers ──────────────────────────────────────────────────── */

function NumbersStrip() {
  return (
    <>
      <Reveal>
        <p className="eyebrow mb-8">By the numbers</p>
      </Reveal>
      <Reveal stagger className="grid gap-px overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-3">
        {stats.map((stat) => (
          <RevealItem key={stat.label} className="bg-[var(--color-card)] p-8">
            <div
              className="font-display font-semibold"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              <ScrambleCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="mt-2 text-sm font-semibold text-[var(--color-foreground)]">{stat.label}</p>
            {stat.sublabel && (
              <p className="mt-0.5 text-xs text-[var(--color-muted-foreground)]">{stat.sublabel}</p>
            )}
          </RevealItem>
        ))}
      </Reveal>
    </>
  );
}

/* ── 03. Research & Projects ─────────────────────────────────────────────── */

function ResearchAndProjects() {
  return (
    <>
      <Reveal showMark>
        <p className="eyebrow mb-4">Research & projects</p>
        <h2
          className="font-display mb-4 max-w-xl text-balance text-3xl font-semibold tracking-tight lg:text-4xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          Intelligence across the surgical journey.
        </h2>
        <p className="mb-12 max-w-2xl text-pretty text-base leading-relaxed text-[var(--color-muted-foreground)]">
          AIST maps AI research to the four phases of surgical care — each phase
          grounded in clinical problems that matter to surgeons and patients.
        </p>
      </Reveal>

      {/* Phase wheel + detail */}
      <PhaseWheel />

      {/* Compact project summary — 2-up cards */}
      <div className="mt-16 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="group flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-colors hover:border-[var(--color-accent)]/40"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  {project.name}
                </h3>
                <p className="mt-0.5 text-xs text-[var(--color-muted-foreground)]">{project.longName}</p>
              </div>
              <StatusPipeline status={project.status} compact />
            </div>
            <p className="flex-1 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
              {project.tagline}
            </p>
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-foreground)]"
            >
              Open project
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        ))}
      </div>

      <ExploreMore href="/projects">See all projects in depth</ExploreMore>
    </>
  );
}

/* ── 04. Team ────────────────────────────────────────────────────────────── */

function TeamSection() {
  return (
    <>
      <Reveal>
        <p className="eyebrow mb-4">The team</p>
        <h2
          className="font-display mb-4 max-w-xl text-balance text-3xl font-semibold tracking-tight lg:text-4xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          The people behind AIST.
        </h2>
      </Reveal>

      {/* Core team — centered flex-wrap */}
      <div className="mt-10">
        <p className="eyebrow mb-6 text-[var(--color-muted-foreground)]">Core team</p>
        <div className="flex flex-wrap justify-center gap-6">
          {mainTeam.map((member, i) => (
            <div key={member.slug} className="w-[calc(50%-12px)] max-w-[200px] sm:w-[calc(33.33%-16px)] lg:w-[calc(20%-20px)]">
              <PlayingCard member={member} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* Collaborators — centered flex-wrap */}
      {collaboratorTeam.length > 0 && (
        <div className="mt-14">
          <p className="eyebrow mb-6 text-[var(--color-muted-foreground)]">Collaborators</p>
          <div className="flex flex-wrap justify-center gap-6">
            {collaboratorTeam.map((member, i) => (
              <div key={member.slug} className="w-[calc(50%-12px)] max-w-[200px] sm:w-[calc(33.33%-16px)] lg:w-[calc(25%-18px)]">
                <PlayingCard member={member} index={mainTeam.length + i} />
              </div>
            ))}
          </div>
        </div>
      )}

      <ExploreMore href="/team">Meet the full team</ExploreMore>
    </>
  );
}

/* ── 05. From the lab ────────────────────────────────────────────────────── */

function FromTheLab() {
  const featuredPubs = publications.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <Reveal>
        <p className="eyebrow mb-8">From the lab</p>
      </Reveal>
      <div className="grid gap-12 lg:grid-cols-3">
        {/* News */}
        <div>
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
            Latest news
          </h3>
          <ul className="space-y-6">
            {mockNews.map((item) => (
              <li key={item.href} className="group">
                <time className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted-foreground)]">
                  {formatDateShort(item.date)}
                </time>
                <h4 className="mt-1.5 text-base font-medium leading-snug text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-accent)]">
                  {item.title}
                </h4>
                <Link href={item.href} className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-accent)] hover:underline">
                  Read more <ArrowRight className="h-3 w-3" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Events */}
        <div>
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
            Upcoming events
          </h3>
          <ul className="space-y-6">
            {mockEvents.map((item) => (
              <li key={item.href} className="group">
                <time className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
                  {formatDateShort(item.date)}
                </time>
                <h4 className="mt-1.5 text-base font-medium leading-snug text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-accent)]">
                  {item.title}
                </h4>
                <Link href={item.href} className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-accent)] hover:underline">
                  Details <ArrowRight className="h-3 w-3" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent publications */}
        <div>
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
            Recent publications
          </h3>
          <ul className="space-y-6">
            {featuredPubs.map((pub) => (
              <li key={pub.slug} className="group">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted-foreground)]">
                  {pub.venue} · {pub.year}
                </p>
                <h4 className="mt-1.5 text-sm font-medium leading-snug text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-accent)] line-clamp-3">
                  {pub.title}
                </h4>
                <a
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-accent)] hover:underline"
                >
                  View paper <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            ))}
          </ul>
          <ExploreMore href="/publications">All publications</ExploreMore>
        </div>
      </div>
    </>
  );
}

/* ── 06. Collaborators ───────────────────────────────────────────────────── */

function CollaboratorsSection() {
  const sorted = [...collaborators].sort((a, b) => a.order - b.order);
  return (
    <>
      <Reveal showMark>
        <p className="eyebrow mb-8">Collaborating institutions</p>
      </Reveal>
      <CollaboratorMarquee items={sorted} />
    </>
  );
}

/* ── 07. Join Us ─────────────────────────────────────────────────────────── */

const ctaCards = [
  {
    icon: Users,
    title: "Join the lab",
    pitch: "We recruit exceptional fellows, engineers, and visiting scholars.",
    href: "/join",
    cta: "Apply now",
  },
  {
    icon: FlaskConical,
    title: "Collaborate",
    pitch: "Clinical partnerships, industry collaboration, and multi-site research.",
    href: "/contact",
    cta: "Get in touch",
  },
  {
    icon: BookOpen,
    title: "Read our research",
    pitch: "Browse publications, preprints, and technical reports from AIST.",
    href: "/publications",
    cta: "Explore research",
  },
];

function GetInvolvedStrip() {
  const active = openings[0];

  return (
    <>
      <Reveal>
        <p className="eyebrow mb-4 text-[var(--color-accent)]">Get involved</p>
        <h2
          className="font-display mb-4 max-w-lg text-balance font-semibold text-[var(--color-ink-100)]"
          style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", letterSpacing: "-0.03em" }}
        >
          The surgical AI frontier needs more builders.
        </h2>
        {/* Active opening callout */}
        {active && (
          <a
            href={active.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-12 inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-4 py-1.5 text-sm font-medium text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)]/15"
          >
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ekg rounded-full bg-[var(--color-accent)] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            </span>
            We&apos;re hiring · {active.title} →
          </a>
        )}
      </Reveal>

      <Reveal stagger className="grid gap-6 sm:grid-cols-3">
        {ctaCards.map((card) => (
          <RevealItem key={card.title}>
            <div className="group flex h-full flex-col rounded-xl border border-[var(--color-navy-700)] bg-[var(--color-navy-900)] p-6 transition-colors hover:border-[var(--color-accent)]/40">
              <card.icon className="mb-4 h-6 w-6 text-[var(--color-accent)]" aria-hidden="true" />
              <h3 className="mb-2 text-base font-semibold text-[var(--color-ink-100)]">{card.title}</h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-[var(--color-ink-400)]">{card.pitch}</p>
              <Magnetic>
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-ink-100)]"
                >
                  {card.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Magnetic>
            </div>
          </RevealItem>
        ))}
      </Reveal>
    </>
  );
}
