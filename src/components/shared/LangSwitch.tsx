"use client";

import type { Lang } from "@/data/translations";
import { useLanguage } from "./Providers";

const options: { lang: Lang; label: string; full: string }[] = [
  { lang: "kk", label: "ҚАЗ", full: "Қазақша" },
  { lang: "ru", label: "РУС", full: "Русский" },
];

export function LangSwitch({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const { lang, setLang, t } = useLanguage();
  const dark = tone === "dark";
  return (
    <div
      role="group"
      aria-label={t.a11y.language}
      className={`inline-flex shrink-0 items-center rounded-full p-1 ${dark ? "bg-white/12" : "bg-sand"} ${className}`}
    >
      {options.map((o) => {
        const active = o.lang === lang;
        return (
          <button
            key={o.lang}
            type="button"
            lang={o.lang}
            aria-pressed={active}
            aria-label={o.full}
            onClick={() => setLang(o.lang)}
            className={`min-h-8 min-w-11 rounded-full px-2.5 text-[0.8125rem] font-extrabold tracking-wide transition-colors ${
              active
                ? dark
                  ? "bg-sun text-ink"
                  : "bg-forest text-white shadow-sm"
                : dark
                  ? "text-white/85 hover:text-white"
                  : "text-forest hover:bg-white/70"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
