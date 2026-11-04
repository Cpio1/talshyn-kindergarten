"use client";

import { classKeys } from "@/data/site";
import { classStyles } from "@/components/shared/classStyles";
import { Wave } from "@/components/shared/Decor";
import { ClassIcon } from "@/components/shared/Illustrations";
import { StaggerItem } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useLanguage } from "@/components/shared/Providers";

/** Two columns × three rows of upright tiles; every description is shown in full. */
export function MobileClasses() {
  const { t } = useLanguage();
  return (
    <div>
      <Wave className="h-7 text-sand" />
      <div className="bg-sand px-4 py-9 sm:px-6">
        <div className="mx-auto max-w-xl">
          <SectionHeading compact eyebrow={t.classes.eyebrow} title={t.classes.title} text={t.classes.text} />
          <ul className="mt-6 grid grid-cols-2 gap-2.5">
            {classKeys.map((key, i) => {
              const s = classStyles[key];
              const item = t.classes.items[key];
              return (
                <StaggerItem key={key} index={i} y={12} step={0.05} className={`${s.card} ${s.shape} p-3`}>
                  <div className="flex items-center justify-between">
                    <span className={`${s.icon} blob-a grid h-12 w-12 place-items-center`}>
                      <ClassIcon name={key} className="h-8 w-8" />
                    </span>
                    <span aria-hidden="true" className="text-[0.7rem] font-extrabold tabular-nums text-ink-soft/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-2.5 break-words text-[1.02rem] leading-tight">{item.name}</h3>
                  <p className="mt-1 text-[0.78rem] leading-snug text-ink-soft">{item.text}</p>
                </StaggerItem>
              );
            })}
          </ul>
        </div>
      </div>
      <Wave flip className="h-7 text-sand" />
    </div>
  );
}
