"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { GalleryEmpty } from "@/components/shared/GalleryEmpty";
import { Lightbox } from "@/components/shared/Lightbox";
import { StaggerItem } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useLanguage, useMedia } from "@/components/shared/Providers";

const INITIAL = 4;

/** Wide tiles alternating with pairs of squares. Swipe works in the lightbox. */
export function MobileGallery() {
  const { t } = useLanguage();
  const { gallery } = useMedia();
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const visible = expanded ? gallery : gallery.slice(0, INITIAL);

  return (
    <div className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-xl">
        <SectionHeading compact eyebrow={t.nav.gallery} title={t.gallery.title} text={t.gallery.text} />
        {gallery.length === 0 ? (
          <div className="mt-6">
            <GalleryEmpty />
          </div>
        ) : (
          <>
            <ul className="mt-6 grid grid-cols-2 gap-2">
              {visible.map((src, i) => {
                // every third tile is wide; a lone square at the end is widened too, so no gaps
                const lead = i % 3 === 0 || (i === visible.length - 1 && i % 3 === 1);
                return (
                  <StaggerItem
                    key={src}
                    index={i % INITIAL}
                    y={10}
                    step={0.05}
                    className={`relative overflow-hidden bg-sand ${
                      lead ? "col-span-2 aspect-[16/10] rounded-[1.6rem]" : "aspect-square rounded-[1.25rem]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(i)}
                      aria-label={t.gallery.open(i + 1)}
                      className="absolute inset-0 h-full w-full rounded-[inherit]"
                    >
                      <Image
                        src={src}
                        alt={t.gallery.photoAlt(i + 1)}
                        fill
                        sizes={lead ? "(max-width: 767px) 92vw, 1px" : "(max-width: 767px) 46vw, 1px"}
                        className="object-cover"
                      />
                    </button>
                  </StaggerItem>
                );
              })}
            </ul>
            {!expanded && gallery.length > INITIAL && (
              <button type="button" onClick={() => setExpanded(true)} className="btn btn-sun mt-5 w-full">
                {t.gallery.more}
                <ChevronDown className="h-4 w-4" />
              </button>
            )}
            <Lightbox images={gallery} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
          </>
        )}
      </div>
    </div>
  );
}
