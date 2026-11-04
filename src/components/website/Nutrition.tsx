"use client";

import { mealKeys } from "@/data/site";
import { Daisy, Leaf, SunRays } from "@/components/shared/Decor";
import { MealIcon } from "@/components/shared/Illustrations";
import { mealTints } from "@/components/shared/mealStyles";
import { Reveal, StaggerItem } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useLanguage } from "@/components/shared/Providers";

const areas = ["[grid-area:m1]", "[grid-area:m2]", "[grid-area:m3]", "[grid-area:m4]", "[grid-area:m5]"];
const sides = ["justify-self-end", "justify-self-start", "justify-self-end", "justify-self-start", "justify-self-center"];

/** Five meal cards arranged around a sun; only the sun's rays rotate. */
export function Nutrition() {
  const { t } = useLanguage();
  return (
    <div className="container-site relative py-14 lg:py-20">
      <SectionHeading eyebrow={t.nutrition.eyebrow} title={t.nutrition.title} text={t.nutrition.text} />

      <div className="mx-auto mt-10 grid max-w-[60rem] grid-cols-[1fr_auto_1fr] items-center gap-x-6 gap-y-4 [grid-template-areas:'m1_sun_m2''m3_sun_m4''._m5_.'] lg:gap-x-10">
        <Reveal className="relative grid h-56 w-56 place-items-center [grid-area:sun] lg:h-64 lg:w-64">
          <SunRays className="animate-spin-slow absolute inset-0 h-full w-full text-sun/60" />
          <div className="relative grid h-[68%] w-[68%] place-items-center rounded-full bg-sun text-center shadow-lift">
            <div>
              <p className="font-display text-[3.6rem] font-bold leading-none text-forest lg:text-[4.2rem]">5</p>
              <p className="mt-1 text-sm font-extrabold text-forest">{t.nutrition.centerLabel}</p>
            </div>
          </div>
          <Daisy className="absolute -right-1 top-3 h-10 w-10" />
          <Leaf className="absolute bottom-3 left-0 h-9 w-9 rotate-[200deg] text-leaf" />
        </Reveal>

        <ol role="list" className="contents">
          {mealKeys.map((key, i) => (
            <StaggerItem
              key={key}
              index={i}
              hoverLift={4}
              className={`${areas[i]} ${sides[i]} flex w-full max-w-[17.5rem] items-center gap-3.5 rounded-[1.75rem] bg-white p-3.5 pr-5 shadow-[0_6px_20px_-16px_rgb(52_92_73_/_0.6)] transition-shadow hover:shadow-lift ${
                i === 4 ? "mt-2" : ""
              }`}
            >
              <span className={`${mealTints[key]} blob-c grid h-14 w-14 shrink-0 place-items-center`}>
                <MealIcon name={key} className="h-9 w-9" />
              </span>
              <span>
                <span className="block text-xs font-extrabold tabular-nums text-ink-soft">{i + 1}</span>
                <span className="block font-display text-[1.2rem] font-semibold leading-tight text-ink">
                  {t.nutrition.meals[key]}
                </span>
              </span>
            </StaggerItem>
          ))}
        </ol>
      </div>
    </div>
  );
}
