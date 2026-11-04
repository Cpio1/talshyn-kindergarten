"use client";

import Image, { getImageProps } from "next/image";
import { preload } from "react-dom";
import { GardenScene } from "./Decor";
import { useLanguage, useMedia } from "./Providers";

/**
 * public/images/main-page.*, always shown whole: the box takes the photo's own proportions,
 * and rounding belongs to a mat around the photo, so no pixel is clipped. PNG/WebP files
 * may be transparent, so they get no mat. Without a photo, the drawn garden is shown.
 *
 * Both compositions contain this image, so instead of `priority` (which would preload
 * it for the hidden one too) the preload is scoped by `media` to the visible composition.
 */
export function HeroPhoto({ sizes, media, frame }: { sizes: string; media: string; frame: string }) {
  const { mainPage } = useMedia();
  const { t } = useLanguage();

  if (!mainPage) {
    return (
      <div className={`relative aspect-[3/2] overflow-hidden bg-white shadow-lift ${frame}`}>
        <GardenScene className="absolute inset-0 h-full w-full" />
      </div>
    );
  }

  const image = { src: mainPage.src, width: mainPage.width, height: mainPage.height, sizes };
  const { props } = getImageProps({ ...image, alt: "" });
  preload(props.src, {
    as: "image",
    imageSrcSet: props.srcSet,
    imageSizes: props.sizes,
    media,
    fetchPriority: "high",
  });

  const mayBeTransparent = /\.(png|webp)$/i.test(mainPage.src);
  return (
    <div className="group">
      <div className={`zoom-media ${mayBeTransparent ? "" : `bg-white shadow-lift ${frame}`}`}>
        <Image {...image} alt={t.hero.illustration} className="block h-auto w-full object-contain" />
      </div>
    </div>
  );
}
