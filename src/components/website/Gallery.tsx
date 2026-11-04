"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { GalleryEmpty } from "@/components/shared/GalleryEmpty";
import { Lightbox } from "@/components/shared/Lightbox";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useLanguage, useMedia } from "@/components/shared/Providers";

const INITIAL = 6;

/** Repeating six-tile mosaic on a 4-column grid; `dense` fills every gap. */
const mosaic = [
  "col-span-2 row-span-2 rounded-[2.25rem_0.9rem_2.25rem_2.25rem]",
  "rounded-[1.5rem]",
  "row-span-2 rounded-[0.9rem_2.25rem_2.25rem_2.25rem]",
  "rounded-[1.5rem_1.5rem_0.6rem_1.5rem]",
  "rounded-[1.5rem]",
  "col-span-3 rounded-[2.25rem_2.25rem_2.25rem_0.9rem]",
];

export function Gallery() {
  const { t } = useLanguage();
  const { gallery } = useMedia();
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  const visible = expanded ? gallery : gallery.slice(0, INITIAL);
  const simple = gallery.length < INITIAL;

  return (
    <div className="container-site py-14 lg:py-20">
      <SectionHeading eyebrow={t.nav.gallery} title={t.gallery.title} text={t.gallery.text} />

      {gallery.length === 0 ? (
        <div className="mt-10">
          <GalleryEmpty />
        </div>
      ) : (
        <>
          <ul
            className={`mt-10 grid gap-3.5 lg:gap-4 ${
              simple ? "grid-cols-3 auto-rows-[15rem]" : "grid-flow-dense grid-cols-4 auto-rows-[10.5rem] lg:auto-rows-[12rem]"
            }`}
          >
            {visible.map((src, i) => (
              <motion.li
                key={src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % INITIAL) * 0.06 }}
                className={`${simple ? "rounded-[1.75rem]" : mosaic[i % mosaic.length]} relative overflow-hidden bg-sand`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-label={t.gallery.open(i + 1)}
                  className="group absolute inset-0 h-full w-full cursor-zoom-in overflow-hidden rounded-[inherit]"
                >
                  <Image
                    src={src}
                    alt={t.gallery.photoAlt(i + 1)}
                    fill
                    sizes="(max-width: 767px) 1px, (min-width: 1280px) 600px, 50vw"
                    className="zoom-media object-cover"
                  />
                  <span className="absolute inset-0 bg-forest/0 transition-colors duration-300 group-hover:bg-forest/10" />
                </button>
              </motion.li>
            ))}
          </ul>

          {!expanded && gallery.length > INITIAL && (
            <div className="mt-8 text-center">
              <button type="button" onClick={() => setExpanded(true)} className="btn btn-sun">
                {t.gallery.more}
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          )}
          <Lightbox images={gallery} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
        </>
      )}
    </div>
  );
}
