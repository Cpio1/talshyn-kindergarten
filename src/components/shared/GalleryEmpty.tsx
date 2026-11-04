"use client";

import { site } from "@/data/site";
import { Daisy } from "./Decor";
import { InstagramIcon } from "./Illustrations";
import { useLanguage } from "./Providers";

/** Shown while public/images has no image1, image2, … files. */
export function GalleryEmpty() {
  const { t } = useLanguage();
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center rounded-[2rem] bg-white/80 px-6 py-8 text-center">
      <Daisy className="h-12 w-12" petal="#F3E9D7" />
      <p className="mt-3 font-semibold text-ink-soft">{t.gallery.empty}</p>
      <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-4 min-h-10 text-sm">
        <InstagramIcon className="h-4.5 w-4.5" />
        {site.instagram.handle}
        <span className="sr-only"> ({t.a11y.newTab})</span>
      </a>
    </div>
  );
}
