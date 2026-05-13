import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-32 sm:px-6 lg:px-8">
      <p className="eyebrow mb-4">404</p>
      <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-6xl" style={{ letterSpacing: "-0.03em" }}>
        Project not found.
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted-foreground)]">
        This project doesn&apos;t exist yet, or the URL may have changed.
      </p>
      <div className="mt-12 flex gap-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] hover:underline"
        >
          ← All projects
        </Link>
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]">
          Back home
        </Link>
      </div>
    </section>
  );
}
