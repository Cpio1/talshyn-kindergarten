"use client";

import { advantageStyles } from "@/components/shared/advantageIcons";
import { StaggerItem } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useLanguage } from "@/components/shared/Providers";

export function MobileAdvantages() {
  const { t } = useLanguage();
  return (
    <div className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-xl">
        <SectionHeading compact title={t.advantages.title} />
        <ul className="mt-6 grid grid-cols-2 gap-2.5">
          {t.advantages.items.map((item, i) => {
            const { icon: Icon, tint, chip } = advantageStyles[i];
            const wide = i === t.advantages.items.length - 1;
            return (
              <StaggerItem
                key={i}
                index={i}
                y={12}
                step={0.05}
                className={`${tint} rounded-[1.4rem] p-3.5 ${wide ? "col-span-2 flex items-center gap-3" : ""}`}
              >
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${chip}`}>
                  <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <div className={wide ? "" : "mt-2.5"}>
                  <h3 className="text-[1rem] leading-snug">{item.title}</h3>
                  <p className="mt-1 text-[0.8125rem] leading-snug text-ink-soft">{item.text}</p>
                </div>
              </StaggerItem>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
