"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 0.8, 0.28, 1] as const;

/** Fade + slide-up as an element enters the viewport. Plays once. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      data-reveal
    >
      {children}
    </motion.div>
  );
}

/** Same as Reveal for a list of siblings: `index` staggers the entrance. */
export function StaggerItem({
  children,
  className,
  index,
  y = 24,
  step = 0.07,
  hoverLift = 0,
}: {
  children: ReactNode;
  className?: string;
  index: number;
  y?: number;
  step?: number;
  hoverLift?: number;
}) {
  return (
    <motion.li
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={hoverLift ? { y: -hoverLift } : undefined}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * step, ease: EASE }}
      data-reveal
    >
      {children}
    </motion.li>
  );
}
