"use client";

import { Phone } from "lucide-react";
import { site } from "@/data/site";
import { contactRows } from "@/components/shared/contactInfo";
import { InstagramIcon, WhatsAppIcon } from "@/components/shared/Illustrations";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TwoGisMap } from "@/components/shared/TwoGisMap";
import { useLanguage } from "@/components/shared/Providers";

export function MobileContacts() {
  const { t } = useLanguage();
  return (
    <div className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-xl">
        <SectionHeading compact eyebrow={t.nav.contacts} title={t.contacts.title} text={t.contacts.text} />

        <Reveal y={12} className="mt-6 rounded-[1.75rem] bg-white p-4 shadow-soft">
          <dl className="grid gap-3.5">
            {contactRows(t).map(({ icon: Icon, label, value, href, external }) => (
              <div key={label} className="flex gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-leaf-wash text-forest">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <dt className="text-[0.72rem] font-extrabold text-ink-soft">{label}</dt>
                  <dd className="break-words text-[0.9rem] font-semibold leading-snug">
                    {href ? (
                      <a
                        href={href}
                        className="underline decoration-sun decoration-2 underline-offset-4"
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <a href={site.phone.href} className="btn btn-ghost min-h-11 whitespace-nowrap px-2 text-sm">
              <Phone className="h-4 w-4" />
              {t.contacts.call}
            </a>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost min-h-11 whitespace-nowrap px-2 text-sm">
              <InstagramIcon className="h-4 w-4" />
              {t.contacts.instagram}
            </a>
          </div>
        </Reveal>

        <TwoGisMap
          when="(max-width: 767px)"
          tapToLoad
          className="mt-4 h-[17rem] rounded-[1.75rem] shadow-soft ring-4 ring-white"
        />

        <a
          href={site.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-5 min-h-13 w-full text-base"
        >
          <WhatsAppIcon className="h-5 w-5" />
          {t.contacts.writeUs}
          <span className="sr-only"> ({t.a11y.newTab})</span>
        </a>
      </div>
    </div>
  );
}
