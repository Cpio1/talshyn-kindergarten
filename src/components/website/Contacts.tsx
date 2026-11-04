"use client";

import { Phone } from "lucide-react";
import { site } from "@/data/site";
import { contactRows } from "@/components/shared/contactInfo";
import { Daisy, Leaf } from "@/components/shared/Decor";
import { InstagramIcon, WhatsAppIcon } from "@/components/shared/Illustrations";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TwoGisMap } from "@/components/shared/TwoGisMap";
import { useLanguage } from "@/components/shared/Providers";

export function Contacts() {
  const { t } = useLanguage();
  return (
    <div className="container-site relative pb-8 pt-14 lg:pb-10 lg:pt-20">
      <SectionHeading eyebrow={t.nav.contacts} title={t.contacts.title} text={t.contacts.text} />

      <div className="mt-10 grid gap-6 md:grid-cols-[0.9fr_1.1fr] lg:gap-8">
        <Reveal className="relative overflow-hidden rounded-[2.25rem_2.25rem_2.25rem_0.9rem] bg-white p-6 shadow-soft lg:p-8">
          <Daisy className="absolute -right-4 -top-4 h-16 w-16 opacity-70" petal="#F3E9D7" />
          <dl className="relative grid gap-4">
            {contactRows(t).map(({ icon: Icon, label, value, href, external }) => (
              <div key={label} className="flex gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[40%_60%_55%_45%/50%_45%_55%_50%] bg-leaf-wash text-forest">
                  <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <dt className="text-xs font-extrabold text-ink-soft">{label}</dt>
                  <dd className="mt-0.5 font-semibold leading-snug text-ink">
                    {href ? (
                      <a
                        href={href}
                        className="underline decoration-sun decoration-2 underline-offset-4 hover:text-forest"
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
          <div className="relative mt-7 flex flex-wrap gap-2.5">
            <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary min-h-11 text-sm">
              <WhatsAppIcon className="h-4.5 w-4.5" />
              {t.contacts.whatsapp}
            </a>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost min-h-11 text-sm">
              <InstagramIcon className="h-4.5 w-4.5" />
              {t.contacts.instagram}
            </a>
            <a href={site.phone.href} className="btn btn-ghost min-h-11 text-sm">
              <Phone className="h-4 w-4" />
              {t.contacts.call}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative min-h-[26rem]">
          <Leaf className="absolute -right-4 -top-5 z-[2] h-12 w-12 rotate-12 text-sun" />
          <TwoGisMap
            when="(min-width: 768px)"
            className="h-full min-h-[26rem] rounded-[0.9rem_2.25rem_2.25rem_2.25rem] shadow-soft ring-[6px] ring-white"
          />
        </Reveal>
      </div>

      <Reveal className="relative mt-10 overflow-hidden rounded-[2.5rem] bg-forest px-8 py-8 text-white lg:px-12">
        <span aria-hidden="true" className="blob-b absolute -left-10 -top-14 h-40 w-40 bg-leaf/50" />
        <Daisy className="absolute -bottom-4 right-[30%] h-14 w-14 opacity-20" />
        <div className="on-dark relative flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="font-display text-[1.6rem] font-semibold leading-tight text-white">{t.contacts.text}</p>
            <p className="mt-1 text-white/75">{t.contacts.hours}</p>
          </div>
          <a
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sun min-h-13 px-7 text-base"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {t.contacts.writeUs}
            <span className="sr-only"> ({t.a11y.newTab})</span>
          </a>
        </div>
      </Reveal>
    </div>
  );
}
