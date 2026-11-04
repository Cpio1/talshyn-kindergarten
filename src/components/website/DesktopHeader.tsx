"use client";

import { navItems, site, type NavKey } from "@/data/site";
import { WhatsAppIcon } from "@/components/shared/Illustrations";
import { LangSwitch } from "@/components/shared/LangSwitch";
import { Logo } from "@/components/shared/Logo";
import { NavLink } from "@/components/shared/NavLink";
import { useLanguage } from "@/components/shared/Providers";

export function DesktopHeader({ scrolled, active }: { scrolled: boolean; active: NavKey }) {
  const { t } = useLanguage();
  return (
    <div
      className={`container-site flex items-center gap-5 transition-[height] duration-300 ${
        scrolled ? "h-[3.75rem]" : "h-[4.75rem]"
      }`}
    >
      <NavLink href="/" className="shrink-0 rounded-xl" ariaCurrent={false}>
        <span className="sr-only">{t.a11y.home}</span>
        <span aria-hidden="true">
          <Logo size={scrolled ? "sm" : "md"} />
        </span>
      </NavLink>

      <nav aria-label={t.a11y.mainNav} className="ml-auto">
        <ul className="flex items-center gap-0.5 xl:gap-1">
          {navItems.map((item) => {
            const isActive = item.key === active;
            return (
              <li key={item.key}>
                <NavLink
                  href={item.href}
                  ariaCurrent={isActive && (item.key === "about" || item.key === "home")}
                  className={`relative block whitespace-nowrap rounded-full px-2.5 py-2 text-[0.875rem] font-bold transition-colors xl:px-3 xl:text-[0.9375rem] ${
                    isActive ? "text-forest" : "text-ink/80 hover:bg-sand/80 hover:text-forest"
                  }`}
                >
                  {t.nav[item.key]}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-0.5 h-[3px] origin-center rounded-full bg-sun transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex items-center gap-2.5">
        <LangSwitch />
        <a
          href={site.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary min-h-10 px-3.5 text-[0.875rem] xl:px-4"
          aria-label={`${t.a11y.whatsapp} (${t.a11y.newTab})`}
        >
          <WhatsAppIcon className="h-4.5 w-4.5" />
          <span className="hidden xl:inline">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
