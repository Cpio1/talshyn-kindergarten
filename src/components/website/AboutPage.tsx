"use client";

import { ArrowRight } from "lucide-react";
import { mealKeys, site } from "@/data/site";
import { AboutMedia } from "@/components/shared/AboutMedia";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Daisy, Leaf, SunRays, WillowBranch } from "@/components/shared/Decor";
import { MealIcon, WhatsAppIcon } from "@/components/shared/Illustrations";
import { mealTints } from "@/components/shared/mealStyles";
import { NavLink } from "@/components/shared/NavLink";
import { Reveal, StaggerItem } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useLanguage } from "@/components/shared/Providers";
import { valueStyles } from "@/components/shared/valueIcons";
import { motion } from "motion/react";

const EASE = [0.22, 0.8, 0.28, 1] as const;

export function AboutPage() {
  const { t } = useLanguage();
  const a = t.about;
  return (
    <>
      {/* intro */}
      <section className="relative overflow-hidden pb-14 pt-[7.5rem] lg:pt-[8.5rem]">
        <div className="pointer-events-none absolute -right-28 -top-28 h-[28rem] w-[28rem] rounded-full bg-sun-wash/70" />
        <div className="blob-a pointer-events-none absolute -left-32 bottom-0 h-72 w-72 bg-leaf-wash/70" />
        <div className="container-site relative grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Breadcrumbs current={t.nav.about} />
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mt-5 text-[clamp(2.2rem,1.1rem+2.6vw,3.3rem)] leading-[1.08]"
            >
              {a.title}
            </motion.h1>
            {a.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 + i * 0.08, ease: EASE }}
                className={`${i === 0 ? "mt-6 text-[1.125rem] text-ink" : "mt-4 text-ink-soft"} max-w-[36rem] leading-relaxed`}
              >
                {p}
              </motion.p>
            ))}
          </div>
          <Reveal className="relative mx-auto w-full max-w-[30rem]">
            <div className="blob-b absolute -bottom-5 -right-5 h-[65%] w-[65%] bg-leaf" />
            <div className="absolute -left-5 -top-5 h-24 w-24 rounded-full bg-sun" />
            <AboutMedia
              sizes="(max-width: 767px) 1px, 480px"
              className="relative aspect-[5/5.2] rounded-[42%_58%_48%_52%/46%_40%_60%_54%] shadow-lift ring-[6px] ring-milk"
            />
            <WillowBranch className="animate-sway absolute -right-10 -top-12 h-44 w-24 origin-top text-forest" />
            <Daisy className="absolute -left-3 bottom-12 h-11 w-11" />
          </Reveal>
        </div>
      </section>

      {/* values */}
      <section className="container-site py-12 lg:py-16">
        <SectionHeading title={a.valuesTitle} />
        <ul className="mt-9 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {a.values.map((v, i) => {
            const s = valueStyles[i];
            return (
              <StaggerItem
                key={v.title}
                index={i}
                hoverLift={5}
                className={`${s.tint} ${s.shape} p-6 shadow-[0_6px_20px_-16px_rgb(52_92_73_/_0.6)] transition-shadow hover:shadow-soft`}
              >
                <span className={`${s.chip} blob-a grid h-12 w-12 place-items-center`}>
                  <s.icon className="h-5.5 w-5.5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-[1.25rem]">{v.title}</h3>
                <p className="mt-2 text-[0.925rem] leading-relaxed text-ink-soft">{v.text}</p>
              </StaggerItem>
            );
          })}
        </ul>
      </section>

      {/* facts */}
      <section className="container-site py-6 lg:py-10" aria-label={a.factsTitle}>
        <Reveal className="on-dark relative overflow-hidden rounded-[2.75rem_2.75rem_2.75rem_1rem] bg-forest px-8 py-10 text-white lg:px-12">
          <SunRays className="animate-spin-slow absolute -right-16 -top-16 h-56 w-56 text-sun/15" />
          <Leaf className="absolute bottom-4 left-[42%] h-10 w-10 rotate-[140deg] text-white/10" />
          <h2 className="relative text-[1.75rem] text-white">{a.factsTitle}</h2>
          <dl className="relative mt-7 grid grid-cols-3 gap-6 lg:grid-cols-[1fr_1fr_1.25fr_1fr_1.7fr]">
            {a.facts.map((f) => (
              <div key={f.label} className="border-l-2 border-sun/60 pl-4">
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="block whitespace-nowrap font-display text-[clamp(1.5rem,1rem+1.2vw,2.2rem)] font-bold leading-none text-sun">
                    {f.value}
                  </span>
                  <span className="mt-2 block text-[0.9375rem] font-semibold text-white/80">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* nutrition */}
      <section className="container-site py-12 lg:py-16">
        <div className="grid items-center gap-8 md:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <SectionHeading align="left" eyebrow={t.nutrition.eyebrow} title={a.nutritionTitle} text={a.nutritionText} />
          <ol className="flex flex-wrap gap-3">
            {mealKeys.map((key, i) => (
              <StaggerItem
                key={key}
                index={i}
                className="flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-5 shadow-[0_6px_20px_-16px_rgb(52_92_73_/_0.6)]"
              >
                <span className={`${mealTints[key]} grid h-11 w-11 place-items-center rounded-full`}>
                  <MealIcon name={key} className="h-7 w-7" />
                </span>
                <span className="font-bold">
                  <span className="mr-1.5 text-ink-soft">{i + 1}.</span>
                  {t.nutrition.meals[key]}
                </span>
              </StaggerItem>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="container-site pb-6 pt-4">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-sun-wash px-10 py-10 text-center">
          <span aria-hidden="true" className="blob-c absolute -left-12 -top-12 h-40 w-40 bg-sun/30" />
          <Daisy className="absolute -bottom-3 right-12 h-16 w-16" />
          <h2 className="relative text-[2rem]">{a.ctaTitle}</h2>
          <p className="relative mx-auto mt-2 max-w-md text-ink-soft">{a.ctaText}</p>
          <div className="relative mt-6 flex flex-wrap justify-center gap-3">
            <NavLink href="/#contacts" className="btn btn-primary">
              {a.cta}
              <ArrowRight className="h-4 w-4" />
            </NavLink>
            <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <WhatsAppIcon className="h-4.5 w-4.5" />
              WhatsApp
              <span className="sr-only"> ({t.a11y.newTab})</span>
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
