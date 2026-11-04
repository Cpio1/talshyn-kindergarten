"use client";

import Image from "next/image";
import { GardenScene } from "./Decor";
import { useLanguage, useMedia } from "./Providers";

/** public/images/main-page.*, or the drawn garden while no photo has been added. */
export function HeroPhoto({ sizes, priority = false }: { sizes: string; priority?: boolean }) {
  const { mainPage } = useMedia();
  const { t } = useLanguage();
  if (!mainPage) return <GardenScene className="absolute inset-0 h-full w-full" />;
  return (
    <Image
      src={mainPage}
      alt={t.hero.illustration}
      fill
      // Eager rather than `priority`: a preload tag would fire for the hidden composition too.
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      sizes={sizes}
      className="zoom-media object-cover"
    />
  );
}
