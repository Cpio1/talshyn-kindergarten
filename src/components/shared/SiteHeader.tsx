"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems, type NavKey } from "@/data/site";
import { DesktopHeader } from "@/components/website/DesktopHeader";
import { MobileHeader } from "@/components/mobile-website/MobileHeader";
import { useLanguage } from "./Providers";

const SECTION_KEYS = navItems.filter((i) => i.href.startsWith("/#")).map((i) => i.key);

/** Which menu item matches what is on screen: the route, or the section being read. */
function useActiveKey(): NavKey {
  const pathname = usePathname();
  const [section, setSection] = useState<NavKey | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;
    const els = SECTION_KEYS.map((k) => document.getElementById(k)).filter(Boolean) as HTMLElement[];
    const visible = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting));
        const current = SECTION_KEYS.find((k) => visible.get(k));
        setSection((current as NavKey) ?? null);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  if (pathname === "/about") return "about";
  return pathname === "/" ? (section ?? "home") : "home";
}

export function SiteHeader() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveKey();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[100] focus:rounded-full focus:bg-forest focus:px-4 focus:py-2 focus:font-bold focus:text-white"
      >
        {t.a11y.skip}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled
            ? "bg-milk/85 shadow-[0_6px_24px_-16px_rgb(52_92_73_/_0.45)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="hidden lg:block">
          <DesktopHeader scrolled={scrolled} active={active} />
        </div>
        <div className="lg:hidden">
          <MobileHeader scrolled={scrolled} active={active} />
        </div>
      </header>
    </>
  );
}
