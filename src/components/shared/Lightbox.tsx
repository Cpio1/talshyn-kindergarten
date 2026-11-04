"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useMounted } from "./hooks";
import { useLanguage } from "./Providers";

/** Full-screen photo viewer: arrows, Escape, ←/→ keys, swipe, locked page scroll. */
export function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: string[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const { t } = useLanguage();
  const open = index !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const total = images.length;
  const mounted = useMounted();

  const go = (step: number) => {
    if (index === null) return;
    onIndex((index + step + total) % total);
  };

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      root.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button"));
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={t.gallery.title}
          className="fixed inset-0 z-[60] flex flex-col bg-[#14241c]/[0.98] text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          }}
        >
          <div className="flex items-center justify-between px-4 py-3 md:px-6">
            <p className="text-sm font-bold tabular-nums text-white/80" aria-live="polite">
              {t.gallery.counter(index + 1, total)}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t.gallery.close}
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative min-h-0 flex-1" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={images[index]}
                className="pointer-events-none absolute inset-x-3 inset-y-2 md:inset-x-20"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={images[index]}
                  alt={t.gallery.photoAlt(index + 1)}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={t.gallery.prev}
                  className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/12 backdrop-blur transition-colors hover:bg-white/25 md:left-5 md:h-12 md:w-12"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={t.gallery.next}
                  className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/12 backdrop-blur transition-colors hover:bg-white/25 md:right-5 md:h-12 md:w-12"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
          <div className="h-6 shrink-0 md:h-8" />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
