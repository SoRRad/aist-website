import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { allNews } from "@/lib/news";
import { team } from "@/lib/team";
import { projects } from "@/lib/projects";
import { publications } from "@/lib/publications";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { CategoryPill } from "@/components/news/category-pill";
import { NewsBody } from "@/components/news/news-body";
import { NewsGallery } from "@/components/news/news-gallery";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  return allNews.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = allNews.find((n) => n.slug === slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      images: item.image ? [{ url: item.image }] : [],
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = allNews.find((n) => n.slug === slug);
  if (!item) notFound();

  const peopleInArticle = team.filter((t) => item.people.includes(t.slug));
  const projectsInArticle = projects.filter((p) => item.projects.includes(p.slug));
  const pubsInArticle = publications.filter((p) => item.publications.includes(p.slug));
  const galleryImages = item.images && item.images.length > 1 ? item.images.slice(1) : [];

  const hasSidebar =
    peopleInArticle.length > 0 ||
    projectsInArticle.length > 0 ||
    pubsInArticle.length > 0 ||
    (item.relatedLinks && item.relatedLinks.length > 0) ||
    !!item.externalLink;

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs />

      {/* Article header */}
      <header className="mt-4 mb-10">
        <div className="flex flex-wrap items-center gap-3">
          <CategoryPill category={item.category} />
          <time
            dateTime={item.date}
            className="font-mono text-xs text-[var(--color-muted-foreground)]"
          >
            {formatDate(item.date)}
          </time>
        </div>
        <h1
          className="font-display mt-5 text-balance font-semibold leading-[1.05]"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}
        >
          {item.title}
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--color-muted-foreground)]">
          {item.excerpt}
        </p>
      </header>

      {/* Hero image */}
      {item.image && (
        <figure className="relative mb-10 aspect-[16/9] overflow-hidden rounded-xl bg-[var(--color-muted)]">
          <Image
            src={item.image}
            alt={item.imageAlt ?? item.title}
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover"
            priority
          />
          {item.imageAlt && (
            <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3 text-sm text-white/90">
              {item.imageAlt}
            </figcaption>
          )}
        </figure>
      )}

      {/* Main content grid */}
      <div className={hasSidebar ? "grid gap-10 lg:grid-cols-[1fr_256px]" : ""}>
        {/* Body */}
        <div>
          <NewsBody body={item.body} />
          {galleryImages.length > 0 && (
            <section className="mt-10">
              <p className="eyebrow mb-4">Gallery</p>
              <NewsGallery images={galleryImages} />
            </section>
          )}
        </div>

        {/* Sidebar */}
        {hasSidebar && (
          <aside className="lg:sticky lg:top-16 lg:self-start space-y-6">
            {peopleInArticle.length > 0 && (
              <SidebarSection title="Mentioned">
                <ul className="space-y-2">
                  {peopleInArticle.map((m) => (
                    <li key={m.slug}>
                      <Link
                        href={`/team/${m.slug}`}
                        className="text-sm font-medium text-[var(--color-foreground)] hover:text-[var(--color-accent)] transition-colors"
                      >
                        {m.name.split(",")[0]}
                      </Link>
                      <p className="text-xs text-[var(--color-muted-foreground)]">{m.role}</p>
                    </li>
                  ))}
                </ul>
              </SidebarSection>
            )}

            {projectsInArticle.length > 0 && (
              <SidebarSection title="Related projects">
                <ul className="space-y-2">
                  {projectsInArticle.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/projects/${p.slug}`}
                        className="text-sm font-medium text-[var(--color-accent)] hover:underline"
                      >
                        {p.name}
                      </Link>
                      <p className="text-xs text-[var(--color-muted-foreground)] line-clamp-1">{p.tagline}</p>
                    </li>
                  ))}
                </ul>
              </SidebarSection>
            )}

            {pubsInArticle.length > 0 && (
              <SidebarSection title="Related publications">
                <ul className="space-y-3">
                  {pubsInArticle.map((p) => (
                    <li key={p.slug}>
                      {p.url ? (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-start gap-1 text-sm font-medium text-[var(--color-foreground)] hover:text-[var(--color-accent)] transition-colors"
                        >
                          <span className="line-clamp-2">{p.title}</span>
                          <ArrowUpRight className="mt-0.5 h-3 w-3 shrink-0 opacity-60" />
                        </a>
                      ) : (
                        <p className="text-sm text-[var(--color-foreground)] line-clamp-2">{p.title}</p>
                      )}
                      <p className="mt-0.5 text-xs text-[var(--color-muted-foreground)]">
                        {p.venue} · {p.year}
                      </p>
                    </li>
                  ))}
                </ul>
              </SidebarSection>
            )}

            {item.relatedLinks && item.relatedLinks.length > 0 && (
              <SidebarSection title="Links">
                <ul className="space-y-2">
                  {item.relatedLinks.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] hover:underline"
                      >
                        <ExternalLink className="h-3 w-3 shrink-0" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </SidebarSection>
            )}

            {item.externalLink && (
              <a
                href={item.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] hover:underline"
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
                Read external source
              </a>
            )}
          </aside>
        )}
      </div>

      {/* Back link */}
      <div className="mt-16 border-t border-[var(--color-border)] pt-8">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to news
        </Link>
      </div>
    </article>
  );
}

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="eyebrow mb-3">{title}</p>
      {children}
    </section>
  );
}
