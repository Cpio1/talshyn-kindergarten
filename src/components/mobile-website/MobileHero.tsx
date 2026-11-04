"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Clock } from "lucide-react";
import { site } from "@/data/site";
import { Daisy, Leaf } from "@/components/shared/Decor";
import { HeroPhoto } from "@/components/shared/HeroPhoto";
import { heroStatIcons } from "@/components/shared/heroStats";
import { WhatsAppIcon } from "@/components/shared/Illustrations";
import { useLanguage } from "@/components/shared/Providers";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

export function MobileHero() {
  const { t } = useLanguage();
  return (
    <div className="relative overflow-hidden px-4 pb-10 pt-[5.25rem] sm:px-6">
      <div className="pointer-events-none absolute -right-20 -top-16 h-56 w-56 rounded-full bg-sun-wash/80" />

      <div className="relative mx-auto max-w-xl">
        <motion.p
          {...rise(0)}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/85 py-1 pl-1 pr-3 text-[0.78rem] font-bold text-forest shadow-soft"
        >
          <span className="grid h-6 w-6 place-items-center rounded-full bg-sun-wash">
            <Daisy className="h-4 w-4" />
          </span>
          {t.hero.badge}
        </motion.p>

        <motion.h1 {...rise(0.06)} className="mt-4 text-[clamp(1.85rem,1.2rem+3.2vw,2.4rem)] leading-[1.1]">
          {t.hero.title}
        </motion.h1>
        <motion.p {...rise(0.12)} className="mt-2 font-display text-[1.1rem] italic text-leaf">
          {t.hero.subtitle}
        </motion.p>

        {/* photo: shown whole, at its own proportions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mt-6"
        >
          <div className="blob-b absolute -bottom-2.5 -right-2 h-3/4 w-3/5 bg-leaf" />
          <div className="absolute -left-2 -top-3 h-14 w-14 rounded-full bg-sun" />
          <Leaf className="absolute -right-1 -top-5 h-8 w-8 rotate-45 text-leaf" />
          <div className="relative">
            <HeroPhoto
              sizes="(max-width: 767px) 92vw, 1px"
              media="(max-width: 767px)"
              frame="rounded-[1.25rem] p-1.5"
            />
          </div>
          <div className="relative ml-3 mt-2.5 flex w-fit items-center gap-2 rounded-xl bg-white px-2.5 py-1.5 shadow-lift">
            <Clock className="h-4 w-4 text-leaf" aria-hidden="true" />
            <span className="text-[0.8rem] font-extrabold text-forest">{site.hours.display}</span>
          </div>
        </motion.div>

        <motion.p {...rise(0.2)} className="mt-6 text-[0.975rem] leading-relaxed text-ink-soft">
          {t.hero.description}
        </motion.p>

        <motion.div {...rise(0.26)} className="mt-5 grid gap-2.5 min-[400px]:grid-cols-2">
          <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
            <WhatsAppIcon className="h-4.5 w-4.5" />
            {t.hero.contact}
            <span className="sr-only"> ({t.a11y.newTab})</span>
          </a>
          <Link href="/about" className="btn btn-ghost w-full">
            {t.hero.more}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.ul {...rise(0.32)} className="mt-6 grid grid-cols-2 gap-2">
          {t.hero.stats.map((stat, i) => {
            const Icon = heroStatIcons[i];
            return (
              <li
                key={i}
                className="flex min-h-12 items-center gap-2 rounded-2xl bg-white/80 px-2.5 py-2 text-[0.8125rem] font-bold leading-tight"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-leaf-wash">
                  <Icon className="h-4 w-4 text-forest" aria-hidden="true" />
                </span>
                {stat}
              </li>
            );
          })}
        </motion.ul>
      </div>
    </div>
  );
}
