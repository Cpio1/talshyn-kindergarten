"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { navItems, site, type NavKey } from "@/data/site";
import { Daisy, Leaf } from "@/components/shared/Decor";
import { WhatsAppIcon } from "@/components/shared/Illustrations";
import { LangSwitch } from "@/components/shared/LangSwitch";
import { Logo } from "@/components/shared/Logo";
import { NavLink } from "@/components/shared/NavLink";
import { useMounted } from "@/components/shared/hooks";
import { useLanguage } from "@/components/shared/Providers";

export function MobileHeader({ scrolled, active }: { scrolled: boolean; active: NavKey }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock page scroll, close on Escape, keep focus inside while open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>("a, button");
        const list = [toggleRef.current, ...Array.from(focusables)].filter(Boolean) as HTMLElement[];
        const first = list[0];
        const last = list[list.length - 1];
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
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close if the viewport grows into the desktop layout.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const mounted = useMounted();

  const close = () => setOpen(false);

  return (
    <>
      <div
        className={`relative z-[2] mx-auto flex max-w-3xl items-center gap-2 px-4 transition-[height] duration-300 sm:px-6 ${
          scrolled || open ? "h-14" : "h-16"
        }`}
      >
        <NavLink href="/" className="mr-auto min-w-0 rounded-xl" onNavigate={close}>
          <span className="sr-only">{t.a11y.home}</span>
          <span aria-hidden="true">
            <Logo size="sm" />
          </span>
        </NavLink>
        <LangSwitch />
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest text-white"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mounted &&
        createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            id="mobile-menu"
            ref={panelRef}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[45] overflow-y-auto overscroll-contain bg-milk px-4 pb-8 pt-18 sm:px-6 lg:hidden"
          >
            <Leaf className="pointer-events-none absolute -right-6 top-24 h-28 w-28 rotate-12 text-leaf-wash" />
            <Daisy className="pointer-events-none absolute bottom-24 left-[-18px] h-20 w-20 opacity-70" petal="#F3E9D7" />

            <nav aria-label={t.a11y.mainNav} className="relative mx-auto max-w-3xl">
              <ul className="grid gap-1.5">
                {navItems.map((item, i) => {
                  const isActive = item.key === active;
                  return (
                    <motion.li
                      key={item.key}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i + 0.05, duration: 0.25 }}
                    >
                      <NavLink
                        href={item.href}
                        onNavigate={close}
                        ariaCurrent={isActive && (item.key === "about" || item.key === "home")}
                        className={`flex items-center justify-between rounded-2xl px-4 py-3 font-display text-[1.3rem] font-semibold transition-colors ${
                          isActive ? "bg-forest text-white" : "bg-white/70 text-ink active:bg-sand"
                        }`}
                      >
                        {t.nav[item.key]}
                        <span
                          aria-hidden="true"
                          className={`h-2 w-2 rounded-full ${isActive ? "bg-sun" : "bg-leaf/30"}`}
                        />
                      </NavLink>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                <a
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  onClick={close}
                >
                  <WhatsAppIcon className="h-4.5 w-4.5" />
                  WhatsApp
                </a>
                <a href={site.phone.href} className="btn btn-ghost whitespace-nowrap px-2 text-sm" onClick={close}>
                  <Phone className="h-4 w-4" />
                  {t.contacts.call}
                </a>
              </div>
              <p className="mt-4 text-center text-sm font-semibold text-ink-soft">
                {t.contacts.hours}
              </p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
