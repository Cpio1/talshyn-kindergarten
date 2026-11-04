"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GardenScene } from "./Decor";
import { useLanguage, useMedia } from "./Providers";

/**
 * Shows public/images/main-page2 as a video (mp4/webm) or a photo, whichever exists.
 * The video only gets its sources once it is actually on screen, so a copy inside a
 * hidden (desktop or mobile) composition never downloads anything.
 */
export function AboutMedia({ className = "", sizes }: { className?: string; sizes: string }) {
  const { aboutMedia } = useMedia();
  const { t } = useLanguage();

  if (!aboutMedia) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <GardenScene className="absolute inset-0 h-full w-full" />
        <p className="absolute inset-x-3 bottom-3 rounded-full bg-milk/90 px-3 py-1.5 text-center text-xs font-bold text-ink-soft">
          {t.media.placeholder}
        </p>
      </div>
    );
  }

  if (aboutMedia.kind === "image") {
    return (
      <div className={`group relative overflow-hidden ${className}`}>
        <Image src={aboutMedia.src} alt={t.media.photoLabel} fill sizes={sizes} className="zoom-media object-cover" />
      </div>
    );
  }

  return <AboutVideo className={className} sources={aboutMedia.sources} poster={aboutMedia.poster} />;
}

function AboutVideo({
  className,
  sources,
  poster,
}: {
  className: string;
  sources: { src: string; type: string }[];
  poster: string | null;
}) {
  const { t } = useLanguage();
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (entry.isIntersecting) {
          setActive(true);
          if (video && !reduce && !userPaused.current) video.play().catch(() => {});
        } else if (video && !video.paused) {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // When sources first attach, start playback unless the visitor prefers reduced motion.
  useEffect(() => {
    const video = videoRef.current;
    if (!active || !video) return;
    video.load();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) video.play().catch(() => {});
  }, [active]);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  }

  return (
    <div ref={wrapRef} className={`relative overflow-hidden bg-sand ${className}`}>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster ?? undefined}
        aria-label={t.media.videoLabel}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {active && sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? t.a11y.pause : t.a11y.play}
        className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-milk/90 text-forest shadow-soft backdrop-blur transition-transform hover:scale-105"
      >
        {playing ? <Pause className="h-4.5 w-4.5" /> : <Play className="ml-0.5 h-4.5 w-4.5" />}
      </button>
    </div>
  );
}
