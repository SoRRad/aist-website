import { ComingSoon } from "@/components/site/coming-soon";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <ComingSoon
        title="About A-STAR"
        step="Coming in Step 5"
        description="Our mission, philosophy, and why surgical AI matters — the full story of how A-STAR came to be and where we're going."
      />
      {/* Institutional home — preserved here after footer cleanup */}
      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8">
        <p className="eyebrow mb-3">Institutional home</p>
        <address className="not-italic text-sm leading-relaxed text-[var(--color-muted-foreground)]">
          {siteConfig.institution.department}
          <br />
          {siteConfig.institution.name}
          <br />
          {siteConfig.institution.address}
        </address>
      </section>
    </>
  );
}
