import Link from "next/link";
import { ArrowUpRight, Stethoscope, Code2, GraduationCap, FlaskConical, Globe, Users2, BookMarked } from "lucide-react";
import { openings } from "@/lib/openings";
import { Button } from "@/components/ui/button";
import { formatDateShort } from "@/lib/utils";

export const metadata = { title: "Join AIST" };

const profiles = [
  {
    icon: Stethoscope,
    title: "Surgeons & Clinicians",
    description:
      "Residents and fellows with a passion for applying AI to clinical problems. You bring the domain knowledge; we build around it.",
  },
  {
    icon: Code2,
    title: "Engineers & Data Scientists",
    description:
      "ML engineers, computer vision researchers, and full-stack developers who want their work to matter in the OR.",
  },
  {
    icon: GraduationCap,
    title: "Students & Visitors",
    description:
      "Undergraduate, graduate, and visiting researchers are welcome. We take mentorship seriously.",
  },
];

const whyAist = [
  {
    icon: FlaskConical,
    title: "Translational research at Mayo",
    description: "Work on problems that move directly from algorithm to operating room — within one of the world's highest-volume surgical centres.",
  },
  {
    icon: Globe,
    title: "Multimodal surgical AI",
    description: "Build on rich data: 4K robotic video, pre-operative imaging, lab values, and outcomes — not toy datasets.",
  },
  {
    icon: Users2,
    title: "Mentorship from clinical and AI leaders",
    description: "Our team spans surgeons, PhDs, and engineers. You will be mentored across both the clinical and technical dimensions of your work.",
  },
  {
    icon: BookMarked,
    title: "Publish, deploy, and validate",
    description: "We don't stop at a preprint. Projects are validated prospectively and deployed in real workflows before we call them done.",
  },
];

export default function JoinPage() {
  const activeOpenings = openings;

  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="mb-16 max-w-2xl">
        <p className="eyebrow mb-4">Join AIST</p>
        <h1
          className="font-display text-balance text-5xl font-semibold tracking-tight sm:text-6xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          Build AI that earns the OR.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted-foreground)]">
          We recruit exceptional researchers and engineers who believe surgical AI should be
          validated, explainable, and clinically led — not just technically impressive.
        </p>
      </div>

      {/* Why AIST */}
      <div className="mb-20">
        <p className="eyebrow mb-6">Why AIST</p>
        <div className="grid gap-5 sm:grid-cols-2">
          {whyAist.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-muted)]">
                <Icon className="h-4 w-4 text-[var(--color-accent)]" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-[var(--color-foreground)]">{title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Open positions */}
      <div className="mb-20">
        <p className="eyebrow mb-6">Open positions</p>
        <div className="flex flex-col gap-4">
          {activeOpenings.map((opening) => (
            <div
              key={opening.slug}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-colors hover:border-[var(--color-accent)]/40"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="mb-2 inline-block rounded-sm border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
                    {opening.type}
                  </span>
                  <h2 className="font-display mt-2 text-xl font-semibold text-[var(--color-foreground)]">
                    {opening.title}
                  </h2>
                  <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                    {opening.location}
                    <span className="mx-2 opacity-40">·</span>
                    Posted {formatDateShort(opening.postedAt)}
                  </p>
                  <p className="mt-4 max-w-xl text-pretty leading-relaxed text-[var(--color-muted-foreground)]">
                    {opening.summary}
                  </p>
                </div>
                <Button asChild variant="accent">
                  <a href={opening.applyUrl} target="_blank" rel="noopener noreferrer">
                    Apply on Mayo Careers
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What we look for */}
      <div className="mb-20">
        <p className="eyebrow mb-6">What we look for</p>
        <div className="grid gap-6 sm:grid-cols-3">
          {profiles.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
              <Icon className="mb-4 h-5 w-5 text-[var(--color-accent)]" />
              <h3 className="mb-2 font-semibold text-[var(--color-foreground)]">{title}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* General interest */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] p-8">
        <p className="eyebrow mb-3">General interest</p>
        <p className="mb-6 text-pretty leading-relaxed text-[var(--color-muted-foreground)]">
          Don&apos;t see an open position that fits? We still want to hear from you.
          Send a brief note about your background and what you&apos;re hoping to work on.
        </p>
        <Button asChild variant="outline">
          <Link href="/contact?inquiry=position">Get in touch →</Link>
        </Button>
      </div>
    </section>
  );
}
