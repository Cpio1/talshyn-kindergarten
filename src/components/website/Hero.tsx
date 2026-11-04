"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Clock } from "lucide-react";
import { site } from "@/data/site";
import { Daisy, Leaf, SoftLine, WillowBranch } from "@/components/shared/Decor";
import { HeroPhoto } from "@/components/shared/HeroPhoto";
import { heroStatIcons } from "@/components/shared/heroStats";
import { WhatsAppIcon } from "@/components/shared/Illustrations";
import { useLanguage } from "@/components/shared/Providers";

const EASE = [0.22, 0.8, 0.28, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
});

export function Hero() {
  const { t } = useLanguage();
  return (
    <div className="relative overflow-hidden pb-14 pt-[7.25rem] lg:pb-20 lg:pt-[8.25rem]">
      {/* soft background washes */}
      <div className="blob-a pointer-events-none absolute -left-40 top-24 h-[26rem] w-[26rem] bg-leaf-wash/70" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-[30rem] w-[30rem] rounded-full bg-sun-wash/70" />

      <div className="container-site relative grid items-center gap-10 md:grid-cols-[1.08fr_0.92fr] lg:gap-14">
        <div className="relative z-[1]">
          <motion.p
            {...rise(0)}
            className="inline-flex items-center gap-2 rounded-full bg-white/80 py-1.5 pl-1.5 pr-4 text-[0.875rem] font-bold text-forest shadow-soft"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-sun-wash">
              <Daisy className="h-5 w-5" petal="#FFFFFF" />
            </span>
            {t.hero.badge}
          </motion.p>

          <motion.h1
            {...rise(0.08)}
            className="mt-5 text-[clamp(2.3rem,1.1rem+2.9vw,3.55rem)] leading-[1.06]"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="relative mt-4 inline-block font-display text-[clamp(1.2rem,0.9rem+0.8vw,1.5rem)] italic text-leaf"
          >
            {t.hero.subtitle}
            <SoftLine className="absolute -bottom-2 left-0 h-2.5 w-2/3 text-sun" />
          </motion.p>

          <motion.p {...rise(0.24)} className="mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed text-ink-soft">
            {t.hero.description}
          </motion.p>

          <motion.div {...rise(0.32)} className="mt-7 flex flex-wrap gap-3">
            <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <WhatsAppIcon className="h-5 w-5" />
              {t.hero.contact}
              <span className="sr-only"> ({t.a11y.newTab})</span>
            </a>
            <Link href="/about" className="btn btn-ghost">
              {t.hero.more}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.ul {...rise(0.4)} className="mt-9 grid max-w-[36rem] grid-cols-2 gap-2.5 lg:grid-cols-4">
            {t.hero.stats.map((stat, i) => {
              const Icon = heroStatIcons[i];
              return (
                <li
                  key={i}
                  className="flex items-center gap-2 rounded-2xl bg-white/75 px-3 py-2.5 text-[0.875rem] font-bold leading-tight text-ink shadow-[0_4px_14px_-10px_rgb(52_92_73_/_0.5)]"
                >
                  <Icon className="h-4.5 w-4.5 shrink-0 text-leaf" aria-hidden="true" />
                  {stat}
                </li>
              );
            })}
          </motion.ul>
        </div>

        {/* photo composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          className="relative mx-auto w-full max-w-[30rem]"
        >
          <div className="blob-b absolute -bottom-5 -left-6 h-[68%] w-[70%] bg-leaf" />
          <div className="absolute -right-4 -top-5 h-28 w-28 rounded-full bg-sun lg:h-32 lg:w-32" />
          <WillowBranch className="animate-sway absolute -left-12 -top-14 z-[2] h-48 w-28 origin-top text-forest lg:-left-16 lg:h-56 lg:w-32" />

          <div className="blob-a group relative z-[1] aspect-[5/5.6] max-h-[34rem] overflow-hidden bg-sand shadow-lift ring-[6px] ring-milk">
            <HeroPhoto sizes="(max-width: 767px) 1px, (min-width: 1280px) 480px, 42vw" media="(min-width: 768px)" />
          </div>

          <Daisy className="absolute -right-3 bottom-16 z-[2] h-12 w-12 drop-shadow-sm" />
          <Leaf className="absolute -bottom-4 right-16 z-[2] h-10 w-10 -rotate-12 text-sun" />

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
            className="absolute -left-5 bottom-10 z-[3] flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-lift lg:-left-10"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-sun-wash text-forest">
              <Clock className="h-4.5 w-4.5" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block text-xs font-bold text-ink-soft">{t.hero.workDays}</span>
              <span className="block font-display text-[1.05rem] font-bold text-forest">{site.hours.display}</span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
