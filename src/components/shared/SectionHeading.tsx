"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Leaf } from "./Decor";

const EASE = [0.22, 0.8, 0.28, 1] as const;

/** Eyebrow + title + lead text, sliding up as it enters. Never uppercases Kazakh text. */
export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
  compact = false,
  as: Tag = "h2",
  children,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "center" | "left";
  compact?: boolean;
  as?: "h1" | "h2";
  children?: ReactNode;
}) {
  const center = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: compact ? 14 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`${center ? "mx-auto text-center" : ""} ${compact ? "max-w-[34rem]" : "max-w-[44rem]"}`}
    >
      {eyebrow && (
        <p
          className={`mb-3 inline-flex items-center gap-1.5 rounded-full bg-leaf-wash px-3 py-1 font-extrabold text-forest ${
            compact ? "text-xs" : "text-[0.8125rem]"
          }`}
        >
          <Leaf className="h-3.5 w-3.5 text-leaf" />
          {eyebrow}
        </p>
      )}
      <Tag
        className={
          compact ? "text-[1.6rem] leading-[1.15]" : "text-[clamp(1.85rem,1.2rem+1.6vw,2.6rem)]"
        }
      >
        {title}
      </Tag>
      {text && (
        <p
          className={`text-ink-soft ${center ? "mx-auto" : ""} ${
            compact ? "mt-2.5 text-[0.9375rem] leading-relaxed" : "mt-3.5 max-w-[38rem] text-[1.0625rem]"
          }`}
        >
          {text}
        </p>
      )}
      {children}
    </motion.div>
  );
}
