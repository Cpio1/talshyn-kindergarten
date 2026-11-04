"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AboutMedia } from "@/components/shared/AboutMedia";
import { Daisy } from "@/components/shared/Decor";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useLanguage } from "@/components/shared/Providers";

export function MobileAboutTeaser() {
  const { t } = useLanguage();
  return (
    <div className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-xl">
        <SectionHeading compact align="left" eyebrow={t.aboutTeaser.eyebrow} title={t.aboutTeaser.title} text={t.aboutTeaser.text} />
        <Reveal className="relative mt-6" y={14}>
          <div className="absolute -right-2 -top-2 h-16 w-16 rounded-full bg-sun" />
          <AboutMedia
            sizes="(max-width: 767px) 92vw, 1px"
            className="relative aspect-[16/11] rounded-[1.6rem_2.4rem_1.6rem_2.4rem] shadow-soft ring-4 ring-milk"
          />
          <Daisy className="absolute -bottom-3 left-4 h-9 w-9" />
        </Reveal>
        <Link href="/about" className="btn btn-primary mt-7 w-full">
          {t.aboutTeaser.button}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
