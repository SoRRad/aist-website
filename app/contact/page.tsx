import { Suspense } from "react";
import type { Metadata } from "next";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach out to AIST for research collaboration, clinical partnerships, or general inquiries.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-12">
        <p className="eyebrow mb-4">Get in touch</p>
        <h1
          className="font-display text-balance text-5xl font-semibold tracking-tight"
          style={{ letterSpacing: "-0.03em" }}
        >
          Contact AIST.
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-[var(--color-muted-foreground)]">
          Research collaborations, clinical partnerships, media inquiries, and position interest welcome.
        </p>
      </header>

      <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-[var(--color-muted)]" />}>
        <ContactForm />
      </Suspense>

      {/* Other ways to reach */}
      <div className="mt-16 space-y-8 border-t border-[var(--color-border)] pt-12">
        <div>
          <p className="eyebrow mb-3">Email</p>
          <a
            href="mailto:shahriarirad.reza@mayo.edu"
            className="text-base font-medium text-[var(--color-accent)] hover:underline"
          >
            shahriarirad.reza@mayo.edu
          </a>
          <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
            General inquiries. Response within 3–5 business days.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-3">Press inquiries</p>
          <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
            For urgent press or media requests, select{" "}
            <span className="font-medium text-[var(--color-foreground)]">Press / media</span>{" "}
            in the form above and include your publication and deadline.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-3">Institutional home</p>
          <address className="not-italic text-sm leading-relaxed text-[var(--color-muted-foreground)]">
            Surgery Innovation Lab
            <br />
            Mayo Clinic
            <br />
            200 First Street SW, Rochester, MN 55905
          </address>
        </div>
      </div>
    </div>
  );
}
