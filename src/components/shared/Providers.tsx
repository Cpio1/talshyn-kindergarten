"use client";

import { MotionConfig } from "motion/react";
import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { dictionaries, type Dictionary, type Lang } from "@/data/translations";
import type { SiteMedia } from "@/lib/media";

export const LANG_STORAGE_KEY = "talshyn-lang";

/* ---------- language ---------- */

const listeners = new Set<() => void>();
let memoryLang: Lang | null = null;

function readLang(): Lang {
  if (memoryLang) return memoryLang;
  try {
    return window.localStorage.getItem(LANG_STORAGE_KEY) === "ru" ? "ru" : "kk";
  } catch {
    return "kk";
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

type LanguageValue = { lang: Lang; t: Dictionary; setLang: (lang: Lang) => void };

const LanguageContext = createContext<LanguageValue | null>(null);

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside <Providers>");
  return value;
}

/* ---------- media discovered on the server ---------- */

const MediaContext = createContext<SiteMedia | null>(null);

export function useMedia() {
  const value = useContext(MediaContext);
  if (!value) throw new Error("useMedia must be used inside <Providers>");
  return value;
}

export function Providers({ media, children }: { media: SiteMedia; children: ReactNode }) {
  // Static HTML is always Kazakh (the default); the stored choice is applied right after hydration.
  const lang = useSyncExternalStore<Lang>(subscribe, readLang, () => "kk");
  const pathname = usePathname();

  const setLang = useCallback((next: Lang) => {
    memoryLang = next;
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      /* private mode: the choice still holds for this visit via memoryLang */
    }
    listeners.forEach((listener) => listener());
  }, []);

  const value = useMemo(() => ({ lang, t: dictionaries[lang], setLang }), [lang, setLang]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.removeAttribute("data-lang-pending");
    const { meta } = dictionaries[lang];
    const title = pathname === "/about" ? `${meta.aboutTitle} — Талшын` : meta.homeTitle;
    const apply = () => {
      if (document.title !== title) document.title = title;
    };
    apply();
    // Next.js writes the static (Kazakh) metadata title after hydration and on navigation.
    const observer = new MutationObserver(apply);
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [lang, pathname]);

  return (
    <LanguageContext.Provider value={value}>
      <MediaContext.Provider value={media}>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </MediaContext.Provider>
    </LanguageContext.Provider>
  );
}
