"use client";

import { advantageStyles } from "@/components/shared/advantageIcons";
import { StaggerItem } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useLanguage } from "@/components/shared/Providers";

const shapes = [
  "rounded-[1.75rem_1.75rem_1.75rem_0.6rem]",
  "rounded-[1.75rem_0.6rem_1.75rem_1.75rem]",
  "rounded-[2.25rem]",
  "rounded-[0.6rem_1.75rem_1.75rem_1.75rem]",
  "rounded-[1.75rem_1.75rem_0.6rem_1.75rem]",
];

export function Advantages() {
  const { t } = useLanguage();
  return (
    <div className="container-site py-14 lg:py-16">
      <SectionHeading title={t.advantages.title} />
      <ul className="mt-9 grid grid-cols-3 gap-4 lg:grid-cols-5">
        {t.advantages.items.map((item, i) => {
          const { icon: Icon, tint, chip } = advantageStyles[i];
          return (
            <StaggerItem
              key={i}
              index={i}
              hoverLift={4}
              className={`${tint} ${shapes[i]} relative overflow-hidden p-5 transition-shadow hover:shadow-soft ${
                i === 3 ? "md:max-lg:col-start-1" : ""
              }`}
            >
              <span className={`grid h-11 w-11 place-items-center rounded-[40%_60%_55%_45%/50%_45%_55%_50%] ${chip}`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-[1.15rem] leading-snug">{item.title}</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">{item.text}</p>
              <span
                aria-hidden="true"
                className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-white/45"
              />
            </StaggerItem>
          );
        })}
      </ul>
    </div>
  );
}
