"use client";

import Image from "next/image";
import { site } from "@/data/site";
import { Daisy } from "./Decor";
import { useLanguage, useMedia } from "./Providers";

/**
 * Uses public/images/logo.(png|webp|jpg) when present, at its real proportions
 * and without any backing plate. Falls back to a typographic «Талшын» mark.
 */
export function Logo({ size = "md", tone = "light" }: { size?: "sm" | "md" | "lg"; tone?: "light" | "dark" }) {
  const { logo } = useMedia();
  const { t } = useLanguage();
  const height = size === "sm" ? 38 : size === "lg" ? 60 : 46;
  const dark = tone === "dark";

  const wordmark = (
    <span className="flex min-w-0 flex-col leading-none">
      <span
        className={`font-display font-bold tracking-tight ${dark ? "text-white" : "text-forest"}`}
        style={{ fontSize: height * 0.5 }}
      >
        Талшын
      </span>
      <span
        className={`mt-1 font-bold ${dark ? "text-white/70" : "text-ink-soft"}`}
        style={{ fontSize: Math.max(10.5, height * 0.24) }}
      >
        {t.brand.tagline}
      </span>
    </span>
  );

  if (logo) {
    const width = Math.round((logo.width / logo.height) * height);
    return (
      <span className="flex items-center gap-2.5">
        <Image
          src={logo.src}
          alt={site.logoHasText ? "Талшын" : ""}
          width={width}
          height={height}
          priority
          className="h-auto shrink-0 object-contain"
          style={{ height, width }}
        />
        {!site.logoHasText && wordmark}
      </span>
    );
  }

  return (
    <span className="flex items-center gap-2.5">
      <span
        className={`grid shrink-0 place-items-center rounded-[42%_58%_52%_48%/52%_44%_56%_48%] ${dark ? "bg-white/12" : "bg-forest"}`}
        style={{ width: height, height }}
      >
        <Daisy className="h-[70%] w-[70%]" petal="#FFF9ED" heart="#E8B85E" />
      </span>
      {wordmark}
    </span>
  );
}
