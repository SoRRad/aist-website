"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger children with a delay between each element */
  stagger?: boolean;
  /** Delay before the animation starts (seconds) */
  delay?: number;
  /** Show the AIST mark watermark in the top-right corner (section eyebrow treatment) */
  showMark?: boolean;
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/**
 * Fade + lift reveal when scrolled into view.
 * Use stagger=true to animate children sequentially — pass direct child elements.
 */
export function Reveal({ children, className, stagger = false, delay = 0, showMark = false }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  const mark = showMark ? (
    <Image
      src="/logos/aist-mark.png"
      alt=""
      aria-hidden="true"
      width={24}
      height={24}
      className="pointer-events-none absolute right-0 top-0 hidden h-6 w-6 select-none opacity-20 sm:block"
    />
  ) : null;

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        className={showMark ? `relative ${className ?? ""}` : className}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {mark}
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={showMark ? `relative ${className ?? ""}` : className}
      variants={itemVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {mark}
      {children}
    </motion.div>
  );
}

/**
 * Wrapper for individual staggered child items inside <Reveal stagger>.
 */
export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={itemVariants}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
