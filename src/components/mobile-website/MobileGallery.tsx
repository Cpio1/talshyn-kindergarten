"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { GalleryEmpty } from "@/components/shared/GalleryEmpty";
import { pairedRows } from "@/components/shared/galleryLayout";
import { Lightbox } from "@/components/shared/Lightbox";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useLanguage, useMedia } from "@/components/shared/Providers";

const INITIAL = 4;

/** Two compact columns. Tiles keep each photo's own proportions; swipe works in the lightbox. */
export function MobileGallery() {
  const { t } = useLanguage();
  const { gallery } = useMedia();
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const rows = pairedRows(expanded ? gallery : gallery.slice(0, INITIAL));

  function showMore() {
    setExpanded(true);
    requestAnimationFrame(() => {
      listRef.current?.querySelectorAll("button")[INITIAL]?.focus({ preventScroll: true });
    });
  }

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
            <div ref={listRef} className="mt-6 grid gap-2">
              {rows.map((row) => (
                <ul key={row.tiles[0].index} className="flex gap-2">
                  {row.tiles.map(({ image, index, ratio }, position) => (
                    <motion.li
                      key={image.src}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.4, delay: position * 0.05 }}
                      className="relative min-w-0 overflow-hidden rounded-[1.25rem] bg-sand"
                      style={{ flex: `${ratio} 1 0%`, aspectRatio: ratio }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpen(index)}
                        aria-label={t.gallery.open(index + 1)}
                        className="absolute inset-0 h-full w-full rounded-[inherit]"
                      >
                        <Image
                          src={image.src}
                          alt={t.gallery.photoAlt(index + 1)}
                          fill
                          sizes={`(max-width: 767px) ${Math.round((ratio / row.ratioSum) * 92)}vw, 1px`}
                          className="object-cover"
                        />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              ))}
            </div>
            {!expanded && gallery.length > INITIAL && (
              <button type="button" onClick={showMore} className="btn btn-sun mt-5 w-full">
                {t.gallery.more}
                <ChevronDown className="h-4 w-4" />
              </button>
            )}
            <Lightbox images={gallery.map((image) => image.src)} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
          </>
        )}
      </div>
    </div>
  );
}
