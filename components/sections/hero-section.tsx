"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { GlossaryTerm } from "@/components/site/glossary-term";
import { siteConfig } from "@/lib/site-config";

export function HeroSection() {
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
          <div
            className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-0 blur-[80px] dark:opacity-[0.14]"
            style={{ background: "radial-gradient(ellipse at center, #1e88e5 0%, transparent 70%)" }}
            aria-hidden="true"
          />
          <Logo
            variant="stacked"
            animated
            priority
            sizes="(max-width: 640px) 280px, 420px"
            className="max-w-[420px] dark:[filter:drop-shadow(0_8px_32px_rgba(30,136,229,0.22))]"
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
                <Link href="/team">
                  Meet the team
                </Link>
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
