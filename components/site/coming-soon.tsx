import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ComingSoonProps {
  title: string;
  step: string;
  description: string;
}

export function ComingSoon({ title, step, description }: ComingSoonProps) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-32 sm:px-6 lg:px-8">
      <p className="eyebrow">{step}</p>
      <h1 className="font-display mt-4 text-balance text-5xl tracking-tight sm:text-6xl">
        {title}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted-foreground)]">
        {description}
      </p>
      <div className="mt-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
      </div>
    </section>
  );
}
