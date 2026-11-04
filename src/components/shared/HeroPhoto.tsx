"use client";

import Image, { getImageProps } from "next/image";
import { preload } from "react-dom";
import { GardenScene } from "./Decor";
import { useLanguage, useMedia } from "./Providers";

/**
 * public/images/main-page.*, or the drawn garden while no photo has been added.
 * Both compositions contain this image, so instead of `priority` (which would preload
 * it for the hidden one too) the preload is scoped by `media` to the visible composition.
 */
export function HeroPhoto({ sizes, media }: { sizes: string; media: string }) {
  const { mainPage } = useMedia();
  const { t } = useLanguage();
  if (!mainPage) return <GardenScene className="absolute inset-0 h-full w-full" />;

  const { props } = getImageProps({ src: mainPage, alt: "", fill: true, sizes });
  preload(props.src, {
    as: "image",
    imageSrcSet: props.srcSet,
    imageSizes: props.sizes,
    media,
    fetchPriority: "high",
  });

  return (
    <Image
      src={mainPage}
      alt={t.hero.illustration}
      fill
      sizes={sizes}
      // The gate photo is wide and its «TALSHYN» sign sits to the right: keep the sign in frame.
      className="zoom-media object-cover object-right"
    />
  );
}
