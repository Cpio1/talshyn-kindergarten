"use client";

import { MessageCircle } from "lucide-react";
import { site } from "@/data/site";
import { groupStyles } from "@/components/shared/groupStyles";
import { GroupArt } from "@/components/shared/Illustrations";
import { StaggerItem } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useLanguage } from "@/components/shared/Providers";

/** Stacked rows that alternate sides, instead of the desktop's three columns. */
export function MobileGroups() {
  const { t } = useLanguage();
  return (
    <div className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-xl">
        <SectionHeading compact eyebrow={t.nav.groups} title={t.groups.title} text={t.groups.text} />
        <ul className="mt-6 grid gap-3">
          {t.groups.items.map((g, i) => {
            const s = groupStyles[i];
            const flip = i % 2 === 1;
            return (
              <StaggerItem
                key={g.name}
                index={i}
                y={12}
                className={`${s.card} ${s.shape} relative flex items-center gap-3.5 overflow-hidden p-3.5 ${
                  flip ? "flex-row-reverse text-right" : ""
                }`}
              >
                <span aria-hidden="true" className={`${s.blob} absolute h-24 w-24 ${flip ? "-left-8" : "-right-8"} -top-8`} />
                <span className={`${s.art} blob-b relative grid h-16 w-16 shrink-0 place-items-center shadow-soft`}>
                  <GroupArt index={i} className="h-10 w-10" />
                </span>
                <div className="relative min-w-0">
                  <h3 className="text-[1.2rem]">{g.name}</h3>
                  <p className="mt-0.5 text-[0.85rem] leading-snug text-ink-soft">{g.text}</p>
                </div>
              </StaggerItem>
            );
          })}
        </ul>
        <div className="mt-5 rounded-2xl bg-white/70 p-3.5 text-center">
          <p className="text-[0.875rem] font-semibold text-ink-soft">{t.groups.note}</p>
          <a
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost mt-2.5 min-h-10 w-full text-sm"
          >
            <MessageCircle className="h-4 w-4" />
            {t.groups.ask}
            <span className="sr-only"> ({t.a11y.newTab})</span>
          </a>
        </div>
      </div>
    </div>
  );
}
