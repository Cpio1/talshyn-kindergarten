"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { AboutMedia } from "@/components/shared/AboutMedia";
import { Daisy, Leaf, WillowBranch } from "@/components/shared/Decor";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useLanguage } from "@/components/shared/Providers";

export function AboutTeaser() {
  const { t } = useLanguage();
  return (
    <div className="container-site grid items-center gap-12 py-14 md:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:py-20">
      <Reveal className="relative mx-auto w-full max-w-[26rem]">
        <div className="blob-c absolute -right-5 -top-5 h-[60%] w-[55%] bg-sun-wash" />
        <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-leaf" />
        <AboutMedia
          sizes="(max-width: 767px) 1px, 440px"
          className="relative aspect-[4/4.4] rounded-[46%_54%_42%_58%/38%_40%_60%_62%] shadow-lift ring-[6px] ring-milk"
        />
        <Daisy className="absolute -left-3 top-10 h-11 w-11" />
        <WillowBranch className="animate-sway absolute -right-10 bottom-4 h-36 w-20 origin-top text-leaf/70" />
      </Reveal>

      <div>
        <SectionHeading align="left" eyebrow={t.aboutTeaser.eyebrow} title={t.aboutTeaser.title} text={t.aboutTeaser.text} />
        <Reveal delay={0.1}>
          <ul className="mt-6 grid gap-2.5">
            {[t.hero.stats[2], t.groups.text, t.classes.text].map((line, i) => (
              <li key={i} className="flex gap-3 text-[0.975rem] leading-snug text-ink">
                <span className="mt-0.5 grid h-5.5 w-5.5 shrink-0 place-items-center rounded-full bg-leaf-wash">
                  <Check className="h-3.5 w-3.5 text-forest" aria-hidden="true" />
                </span>
                {line}
              </li>
            ))}
          </ul>
          <Link href="/about" className="btn btn-primary mt-8">
            {t.aboutTeaser.button}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
        <Leaf className="mt-6 hidden h-8 w-8 rotate-[200deg] text-sun lg:block" />
      </div>
    </div>
  );
}
