import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Rss } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { footerNav } from "@/lib/navigation";
import { Logo } from "@/components/site/logo";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Logo className="h-9 w-9" />
              <span className="font-display text-2xl tracking-tight">AIST</span>
            </Link>
            <p className="mt-4 max-w-sm font-display text-xl leading-tight tracking-tight text-[var(--color-foreground)]">
              Where the scalpel meets the algorithm.
            </p>
            <address className="mt-6 not-italic text-sm text-[var(--color-muted-foreground)]">
              {siteConfig.institution.department}
              <br />
              {siteConfig.institution.name}
              <br />
              {siteConfig.institution.address}
            </address>

            <div className="mt-6 flex items-center gap-3">
              {siteConfig.social.github && (
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {siteConfig.social.linkedin && (
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {siteConfig.social.twitter && (
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
                  aria-label="Twitter / X"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {siteConfig.social.email && (
                <a
                  href={`mailto:${siteConfig.social.email}`}
                  className="text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              )}
              <Link
                href="/rss.xml"
                className="text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
                aria-label="RSS"
              >
                <Rss className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <FooterColumn title="Research" items={footerNav.research} />
          <FooterColumn title="Lab" items={footerNav.lab} />
          <FooterColumn title="Connect" items={footerNav.connect} />
        </div>

        <div className="mt-16 border-t border-[var(--color-border)] pt-8">
          <div className="flex flex-col items-start justify-between gap-4 text-xs text-[var(--color-muted-foreground)] sm:flex-row sm:items-center">
            <p>
              © {new Date().getFullYear()} AIST Lab.
              <span className="mx-2">·</span>
              Affiliated with {siteConfig.institution.name}.
            </p>
            <p className="font-mono">
              {siteConfig.name} v0.1 — built with intent.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { title: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="eyebrow mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
