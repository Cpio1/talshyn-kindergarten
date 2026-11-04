"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { mealKeys, site } from "@/data/site";
import { AboutMedia } from "@/components/shared/AboutMedia";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Daisy } from "@/components/shared/Decor";
import { MealIcon, WhatsAppIcon } from "@/components/shared/Illustrations";
import { mealTints } from "@/components/shared/mealStyles";
import { NavLink } from "@/components/shared/NavLink";
import { Reveal, StaggerItem } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useLanguage } from "@/components/shared/Providers";
import { valueStyles } from "@/components/shared/valueIcons";

export function MobileAboutPage() {
  const { t } = useLanguage();
  const a = t.about;
  return (
    <div className="px-4 sm:px-6">
      <div className="mx-auto max-w-xl">
        {/* intro */}
        <section className="relative pb-8 pt-[5.25rem]">
          <Breadcrumbs current={t.nav.about} />
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-[clamp(1.85rem,1.2rem+3vw,2.3rem)]"
          >
            {a.title}
          </motion.h1>
          <div className="relative mt-5">
            <div className="absolute -right-2 -top-3 h-14 w-14 rounded-full bg-sun" />
            <AboutMedia
              sizes="(max-width: 767px) 92vw, 1px"
              className="relative aspect-[16/11] rounded-[2rem_2rem_2rem_0.9rem] shadow-lift ring-4 ring-milk"
            />
            <Daisy className="absolute -bottom-3 left-4 h-9 w-9" />
          </div>
          <p className="mt-7 text-[1rem] leading-relaxed text-ink">{a.paragraphs[0]}</p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{a.paragraphs[1]}</p>
        </section>

        {/* facts: right under the intro on phones */}
        <section aria-label={a.factsTitle} className="pb-8">
          <Reveal y={12} className="on-dark rounded-[1.75rem] bg-forest p-4 text-white">
            <h2 className="text-[1.3rem] text-white">{a.factsTitle}</h2>
            <dl className="mt-3.5 grid grid-cols-2 gap-2">
              {a.facts.map((f, i) => (
                <div
                  key={f.label}
                  className={`rounded-2xl bg-white/10 px-3 py-2.5 ${i === a.facts.length - 1 ? "col-span-2" : ""}`}
                >
                  <dt className="sr-only">{f.label}</dt>
                  <dd>
                    <span className="block font-display text-[1.45rem] font-bold leading-none text-sun">{f.value}</span>
                    <span className="mt-1 block text-[0.8rem] font-semibold text-white/80">{f.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* values */}
        <section className="pb-8">
          <SectionHeading compact title={a.valuesTitle} />
          <ul className="mt-5 grid gap-2.5">
            {a.values.map((v, i) => {
              const s = valueStyles[i];
              return (
                <StaggerItem key={v.title} index={i} y={12} step={0.05} className={`${s.tint} flex gap-3 rounded-[1.4rem] p-3.5`}>
                  <span className={`${s.chip} grid h-10 w-10 shrink-0 place-items-center rounded-xl`}>
                    <s.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-[1.05rem]">{v.title}</h3>
                    <p className="mt-0.5 text-[0.85rem] leading-snug text-ink-soft">{v.text}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </ul>
        </section>

        {/* nutrition */}
        <section className="pb-8">
          <SectionHeading compact align="left" eyebrow={t.nutrition.eyebrow} title={a.nutritionTitle} text={a.nutritionText} />
          <ol className="mt-4 grid grid-cols-2 gap-2">
            {mealKeys.map((key, i) => (
              <li key={key} className={`flex items-center gap-2 rounded-2xl bg-white p-2 ${i === 4 ? "col-span-2" : ""}`}>
                <span className={`${mealTints[key]} grid h-9 w-9 shrink-0 place-items-center rounded-xl`}>
                  <MealIcon name={key} className="h-6 w-6" />
                </span>
                <span className="text-[0.875rem] font-bold leading-tight">{t.nutrition.meals[key]}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* CTA */}
        <section className="pb-4">
          <Reveal y={12} className="relative overflow-hidden rounded-[1.75rem] bg-sun-wash p-5 text-center">
            <h2 className="text-[1.5rem]">{a.ctaTitle}</h2>
            <p className="mt-1.5 text-[0.9375rem] text-ink-soft">{a.ctaText}</p>
            <div className="mt-4 grid gap-2">
              <NavLink href="/#contacts" className="btn btn-primary w-full">
                {a.cta}
                <ArrowRight className="h-4 w-4" />
              </NavLink>
              <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost w-full">
                <WhatsAppIcon className="h-4.5 w-4.5" />
                WhatsApp
                <span className="sr-only"> ({t.a11y.newTab})</span>
              </a>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
