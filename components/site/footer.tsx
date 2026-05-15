import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { footerNav } from "@/lib/navigation";
import { logos } from "@/lib/logos";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-[var(--color-border)]">
      {/* Decorative circuit-tree */}
      <div className="relative overflow-hidden">
        <svg
          viewBox="0 0 800 120"
          fill="none"
          className="absolute right-0 top-0 h-full w-1/2 opacity-[0.07]"
          aria-hidden="true"
        >
          <g stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round">
            <line x1="600" y1="0" x2="600" y2="120" />
            <line x1="600" y1="20" x2="650" y2="20" /><circle cx="660" cy="20" r="3" fill="var(--color-accent)" />
            <line x1="600" y1="38" x2="670" y2="38" /><circle cx="680" cy="38" r="3" fill="var(--color-accent)" />
            <line x1="600" y1="56" x2="690" y2="56" /><circle cx="700" cy="56" r="3" fill="var(--color-accent)" />
            <line x1="600" y1="74" x2="680" y2="74" /><circle cx="690" cy="74" r="3" fill="var(--color-accent)" />
            <line x1="600" y1="92" x2="660" y2="92" /><circle cx="670" cy="92" r="3" fill="var(--color-accent)" />
            <line x1="600" y1="108" x2="640" y2="108" /><circle cx="650" cy="108" r="3" fill="var(--color-accent)" />
          </g>
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-5">
          <div className="col-span-2">
            {/* Mark + wordmark */}
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image src={logos.markNeutral} alt="AIST logo mark" width={32} height={32} className="h-8 w-8" />
              <span className="font-display text-[1.5rem] tracking-tight">AIST</span>
            </Link>

            <p className="mt-4 max-w-sm font-display text-xl font-semibold leading-tight text-[var(--color-foreground)]" style={{ letterSpacing: "-0.03em" }}>
              {siteConfig.tagline}
            </p>

            <div className="mt-6 flex items-center gap-3">
              {siteConfig.social.github && (
                <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer"
                  className="text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </a>
              )}
              {siteConfig.social.linkedin && (
                <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer"
                  className="text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {siteConfig.social.twitter && (
                <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer"
                  className="text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]" aria-label="Twitter / X">
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {siteConfig.social.email && (
                <a href={`mailto:${siteConfig.social.email}`}
                  className="text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]" aria-label="Email">
                  <Mail className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          <FooterColumn title="Research" items={footerNav.research} />
          <FooterColumn title="Lab" items={footerNav.lab} />
          <FooterColumn title="Connect" items={footerNav.connect} />
        </div>

        <div className="mt-16 border-t border-[var(--color-border)] pt-8">
          <div className="flex flex-col items-start justify-between gap-4 text-xs text-[var(--color-muted-foreground)] sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} AIST Lab.</p>
            <p className="font-mono">{siteConfig.name} v0.1 — built with intent.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: { title: string; href: string }[] }) {
  return (
    <div>
      <h3 className="eyebrow mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-sm text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
