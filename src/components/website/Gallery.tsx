"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { GalleryEmpty } from "@/components/shared/GalleryEmpty";
import { justifiedRows, type GalleryRow } from "@/components/shared/galleryLayout";
import { Lightbox } from "@/components/shared/Lightbox";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useLanguage, useMedia } from "@/components/shared/Providers";

const INITIAL = 6;
const ROW_TARGET = 3.6;
const CONTENT_WIDTH = 1136;

const corners = [
  "rounded-[2.25rem_0.9rem_2.25rem_2.25rem]",
  "rounded-[1.5rem]",
  "rounded-[0.9rem_2.25rem_2.25rem_2.25rem]",
  "rounded-[1.5rem_1.5rem_0.6rem_1.5rem]",
  "rounded-[1.5rem]",
  "rounded-[2.25rem_2.25rem_2.25rem_0.9rem]",
];

export function Gallery() {
  const { t } = useLanguage();
  const { gallery } = useMedia();
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // The first six are laid out on their own, so they do not move when the rest appear.
  const rows: GalleryRow[] = [
    ...justifiedRows(gallery.slice(0, INITIAL), ROW_TARGET),
    ...(expanded ? justifiedRows(gallery.slice(INITIAL), ROW_TARGET, INITIAL) : []),
  ];

  function showMore() {
    setExpanded(true);
    // The button disappears, so keyboard focus moves to the first new photo.
    requestAnimationFrame(() => {
      listRef.current?.querySelectorAll("button")[INITIAL]?.focus({ preventScroll: true });
    });
  }

  return (
    <div className="container-site py-14 lg:py-20">
      <SectionHeading eyebrow={t.nav.gallery} title={t.gallery.title} text={t.gallery.text} />

      {gallery.length === 0 ? (
        <div className="mt-10">
          <GalleryEmpty />
        </div>
      ) : (
        <>
          <div ref={listRef} className="mt-10 grid gap-3.5 lg:gap-4">
            {rows.map((row) => (
              <ul
                key={row.tiles[0].index}
                className="mx-auto flex w-full gap-3.5 lg:gap-4"
                style={{ maxWidth: `${row.ratioSum * 30}rem` }}
              >
                {row.tiles.map(({ image, index, ratio }, position) => {
                  const share = ratio / row.ratioSum;
                  return (
                    <motion.li
                      key={image.src}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.5, delay: position * 0.07 }}
                      className={`${corners[index % corners.length]} relative min-w-0 overflow-hidden bg-sand`}
                      style={{ flex: `${ratio} 1 0%`, aspectRatio: ratio }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpen(index)}
                        aria-label={t.gallery.open(index + 1)}
                        className="group absolute inset-0 h-full w-full cursor-zoom-in overflow-hidden rounded-[inherit]"
                      >
                        <Image
                          src={image.src}
                          alt={t.gallery.photoAlt(index + 1)}
                          fill
                          sizes={`(max-width: 767px) 1px, (min-width: 1200px) ${Math.round(CONTENT_WIDTH * share)}px, ${Math.round(share * 100)}vw`}
                          className="zoom-media object-cover"
                        />
                        <span className="absolute inset-0 bg-forest/0 transition-colors duration-300 group-hover:bg-forest/10" />
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            ))}
          </div>

          {!expanded && gallery.length > INITIAL && (
            <div className="mt-8 text-center">
              <button type="button" onClick={showMore} className="btn btn-sun">
                {t.gallery.more}
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          )}
          <Lightbox images={gallery.map((image) => image.src)} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
        </>
      )}
    </div>
  );
}
