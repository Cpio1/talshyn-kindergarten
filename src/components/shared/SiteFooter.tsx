"use client";

import { Clock, MapPin, Phone } from "lucide-react";
import { navItems, site } from "@/data/site";
import { Daisy, Wave } from "./Decor";
import { InstagramIcon, WhatsAppIcon } from "./Illustrations";
import { Logo } from "./Logo";
import { NavLink } from "./NavLink";
import { useLanguage } from "./Providers";

export function SiteFooter() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const contactRows = [
    { icon: Phone, label: site.phone.display, href: site.phone.href },
    { icon: InstagramIcon, label: site.instagram.handle, href: site.instagram.url, external: true },
    { icon: MapPin, label: t.contacts.address },
    { icon: Clock, label: t.contacts.hours },
  ];

  return (
    <footer className="on-dark relative mt-4 text-white md:mt-6">
      <Wave className="h-8 text-forest md:h-12" />
      <div className="relative overflow-hidden bg-forest pb-24 pt-6 md:pb-10 md:pt-8">
        <Daisy className="pointer-events-none absolute bottom-10 left-[46%] hidden h-16 w-16 opacity-[0.08] md:block" />

        <div className="container-site relative">
          <div className="grid gap-8 md:grid-cols-[1.3fr_0.8fr_1.4fr] md:gap-10">
            <div className="max-w-sm">
              <Logo tone="dark" size="md" />
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/80">{t.footer.description}</p>
              <div className="mt-5 flex gap-2.5">
                <a
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp (${t.a11y.newTab})`}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/12 transition-colors hover:bg-sun hover:text-ink"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                </a>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram (${t.a11y.newTab})`}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/12 transition-colors hover:bg-sun hover:text-ink"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              </div>
            </div>

            <nav aria-label={t.footer.sections}>
              <h2 className="font-sans text-sm font-extrabold tracking-wide text-sun">{t.footer.sections}</h2>
              <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 md:grid-cols-1">
                {navItems.map((item) => (
                  <li key={item.key}>
                    <NavLink
                      href={item.href}
                      className="inline-block py-0.5 text-[0.9375rem] text-white/85 transition-colors hover:text-sun"
                    >
                      {t.nav[item.key]}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="font-sans text-sm font-extrabold tracking-wide text-sun">{t.footer.contacts}</h2>
              <ul className="mt-3 grid gap-2.5">
                {contactRows.map(({ icon: Icon, label, href, external }) => (
                  <li key={label} className="flex gap-2.5 text-[0.9375rem] leading-snug text-white/85">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-sun" aria-hidden="true" />
                    {href ? (
                      <a
                        href={href}
                        className="transition-colors hover:text-sun"
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {label}
                      </a>
                    ) : (
                      <span>{label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-1.5 border-t border-white/15 pt-5 text-[0.8125rem] text-white/65 md:flex-row md:items-center md:justify-between">
            <p>{site.officialName}</p>
            <p>
              © <span suppressHydrationWarning>{year}</span> «Талшын». {t.footer.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
