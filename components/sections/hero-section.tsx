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
      {/* Nebula wash — blue radial gradient, light touch in light mode, vivid in dark */}
      <div
        className="animate-nebula absolute left-1/2 top-0 -z-10 h-[700px] w-[1100px] rounded-full opacity-10 dark:opacity-20"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, #3b82f6 0%, #6366f1 45%, transparent 70%)",
          transform: "translate(-50%, -25%)",
          filter: "blur(48px)",
        }}
        aria-hidden="true"
      />
      {/* Secondary nebula — offset for depth */}
      <div
        className="absolute left-[30%] top-[20%] -z-10 h-[400px] w-[600px] rounded-full opacity-5 dark:opacity-10"
        style={{
          background: "radial-gradient(ellipse at center, #1e88e5 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />
      {/* Grid backdrop */}
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" aria-hidden="true" />

      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 pb-32 pt-20 text-center sm:px-6 sm:pt-28 lg:px-8">
        {/* Logo lockup — scroll-driven scale */}
        <motion.div style={{ scale: logoScale }} className="relative mt-4 flex justify-center">
          {/* Glow ring — dark mode only */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 hidden rounded-full dark:block"
            style={{
              background: "radial-gradient(ellipse at center, rgba(30,136,229,0.25) 0%, rgba(99,102,241,0.1) 40%, transparent 70%)",
              filter: "blur(60px)",
              transform: "scale(1.5)",
            }}
            aria-hidden="true"
          />
          <Logo
            variant="stacked"
            animated
            priority
            sizes="(max-width: 640px) 240px, 360px"
            className="max-w-[360px]"
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
            A-STAR advances artificial intelligence across the full surgical journey —
            from{" "}<GlossaryTerm term="Pre-operative" /> risk stratification through{" "}
            intraoperative guidance, patient education, and rigorous external{" "}
            <GlossaryTerm term="Validation cohort" />.
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
