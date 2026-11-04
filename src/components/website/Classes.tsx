"use client";

import { classKeys } from "@/data/site";
import { classStyles } from "@/components/shared/classStyles";
import { Daisy, Leaf, Wave } from "@/components/shared/Decor";
import { ClassIcon } from "@/components/shared/Illustrations";
import { StaggerItem } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useLanguage } from "@/components/shared/Providers";

export function Classes() {
  const { t } = useLanguage();
  return (
    <div className="relative">
      <Wave className="h-10 text-sand lg:h-14" />
      <div className="relative overflow-hidden bg-sand py-12 lg:py-16">
        <Daisy className="animate-spin-slow pointer-events-none absolute -left-8 top-16 h-24 w-24 opacity-60" />
        <Leaf className="pointer-events-none absolute -right-4 bottom-24 h-20 w-20 -rotate-12 text-leaf/25" />

        <div className="container-site relative">
          <SectionHeading eyebrow={t.classes.eyebrow} title={t.classes.title} text={t.classes.text} />

          <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-5">
            {classKeys.map((key, i) => {
              const s = classStyles[key];
              const item = t.classes.items[key];
              return (
                <StaggerItem
                  key={key}
                  index={i}
                  hoverLift={5}
                  className={`${s.card} ${s.shape} group relative flex gap-4 p-5 shadow-[0_6px_20px_-16px_rgb(52_92_73_/_0.6)] transition-shadow hover:shadow-lift lg:p-6`}
                >
                  <span
                    className={`${s.icon} blob-a grid h-16 w-16 shrink-0 place-items-center transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105`}
                  >
                    <ClassIcon name={key} className="h-10 w-10" />
                  </span>
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 text-xs font-extrabold tabular-nums text-ink-soft">
                      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 text-[1.3rem]">{item.name}</h3>
                    <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-soft">{item.text}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </ul>
        </div>
      </div>
      <Wave flip className="h-10 text-sand lg:h-14" />
    </div>
  );
}
