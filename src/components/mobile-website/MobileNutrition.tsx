"use client";

import { mealKeys } from "@/data/site";
import { SunRays } from "@/components/shared/Decor";
import { MealIcon } from "@/components/shared/Illustrations";
import { mealTints } from "@/components/shared/mealStyles";
import { StaggerItem } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useLanguage } from "@/components/shared/Providers";

export function MobileNutrition() {
  const { t } = useLanguage();
  return (
    <div className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-xl">
        <div className="flex items-start gap-3">
          <div className="relative grid h-20 w-20 shrink-0 place-items-center">
            <SunRays className="animate-spin-slow absolute inset-0 text-sun/60" />
            <span className="relative grid h-12 w-12 place-items-center rounded-full bg-sun font-display text-2xl font-bold text-forest">
              5
            </span>
          </div>
          <SectionHeading compact align="left" eyebrow={t.nutrition.eyebrow} title={t.nutrition.title} />
        </div>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{t.nutrition.text}</p>

        <ol className="mt-5 grid grid-cols-2 gap-2">
          {mealKeys.map((key, i) => (
            <StaggerItem
              key={key}
              index={i}
              y={10}
              step={0.05}
              className={`flex items-center gap-2.5 rounded-2xl bg-white p-2.5 ${i === 4 ? "col-span-2" : ""}`}
            >
              <span className={`${mealTints[key]} grid h-11 w-11 shrink-0 place-items-center rounded-xl`}>
                <MealIcon name={key} className="h-7 w-7" />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.7rem] font-extrabold text-ink-soft">{i + 1}</span>
                <span className="block text-[0.9rem] font-bold leading-tight">{t.nutrition.meals[key]}</span>
              </span>
            </StaggerItem>
          ))}
        </ol>
      </div>
    </div>
  );
}
