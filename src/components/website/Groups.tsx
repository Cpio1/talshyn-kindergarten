"use client";

import { MessageCircle } from "lucide-react";
import { site } from "@/data/site";
import { Leaf } from "@/components/shared/Decor";
import { groupStyles } from "@/components/shared/groupStyles";
import { GroupArt } from "@/components/shared/Illustrations";
import { Reveal, StaggerItem } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useLanguage } from "@/components/shared/Providers";

export function Groups() {
  const { t } = useLanguage();
  return (
    <div className="container-site relative py-14 lg:py-20">
      <Leaf className="pointer-events-none absolute right-6 top-12 h-12 w-12 rotate-45 text-sun/70" />
      <SectionHeading eyebrow={t.nav.groups} title={t.groups.title} text={t.groups.text} />

      <ul className="mt-10 grid grid-cols-3 gap-5 lg:gap-6">
        {t.groups.items.map((g, i) => {
          const s = groupStyles[i];
          return (
            <StaggerItem
              key={g.name}
              index={i}
              step={0.1}
              hoverLift={6}
              className={`${s.card} ${s.shape} group relative overflow-hidden px-6 pb-7 pt-6 text-center transition-shadow hover:shadow-lift ${
                i === 1 ? "lg:translate-y-4" : ""
              }`}
            >
              <span aria-hidden="true" className={`${s.blob} absolute -right-10 -top-10 h-36 w-36`} />
              <span
                className={`${s.art} blob-b relative mx-auto grid h-24 w-24 place-items-center shadow-soft transition-transform duration-500 group-hover:rotate-6`}
              >
                <GroupArt index={i} className="h-14 w-14" />
              </span>
              <h3 className="relative mt-5 text-[1.5rem]">{g.name}</h3>
              <p className="relative mx-auto mt-2 max-w-[17rem] text-[0.95rem] leading-relaxed text-ink-soft">{g.text}</p>
            </StaggerItem>
          );
        })}
      </ul>

      <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-center">
        <p className="font-semibold text-ink-soft">{t.groups.note}</p>
        <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost min-h-10 text-sm">
          <MessageCircle className="h-4 w-4" />
          {t.groups.ask}
          <span className="sr-only"> ({t.a11y.newTab})</span>
        </a>
      </Reveal>
    </div>
  );
}
