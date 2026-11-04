import type { Metadata, Viewport } from "next";
import { Nunito, Vollkorn } from "next/font/google";
import type { ReactNode } from "react";
import { FloatingWhatsApp } from "@/components/shared/FloatingWhatsApp";
import { Providers } from "@/components/shared/Providers";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { site } from "@/data/site";
import { dictionaries } from "@/data/translations";
import { getSiteMedia } from "@/lib/media";
import { siteUrl } from "@/lib/url";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-nunito",
  display: "swap",
});

const vollkorn = Vollkorn({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-vollkorn",
  display: "swap",
});

const kk = dictionaries.kk;
const media = getSiteMedia();

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: { default: kk.meta.homeTitle, template: "%s — Талшын" },
  description: kk.meta.description,
  applicationName: "Талшын",
  openGraph: {
    type: "website",
    siteName: "Талшын",
    title: kk.meta.homeTitle,
    description: kk.meta.description,
    locale: "kk_KZ",
    alternateLocale: ["ru_RU"],
    images: media.mainPage ? [{ url: media.mainPage, alt: kk.hero.illustration }] : undefined,
  },
  twitter: { card: media.mainPage ? "summary_large_image" : "summary" },
  formatDetection: { telephone: false },
  other: { "content-language": "kk, ru" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFF9ED",
};

/**
 * Hides the page for a returning Russian-language visitor until React swaps the
 * static Kazakh text, so they never see a flash of the wrong language.
 * It always un-hides after 2.5 s in case scripts fail.
 */
const langScript = `try{if(localStorage.getItem("talshyn-lang")==="ru"){var d=document.documentElement;d.setAttribute("data-lang-pending","");d.lang="ru";setTimeout(function(){d.removeAttribute("data-lang-pending")},2500)}}catch(e){}`;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Preschool",
  name: "«Талшын» бөбекжай-балабақшасы",
  legalName: site.officialName,
  telephone: site.phone.e164,
  url: siteUrl ?? undefined,
  sameAs: [site.instagram.url],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Сейітбеков көшесі, 43, Қарағайлы шағынауданы",
    addressLocality: "Алматы",
    addressRegion: "Наурызбай ауданы",
    addressCountry: "KZ",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.twoGis.lat, longitude: site.twoGis.lon },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: site.hours.opens,
    closes: site.hours.closes,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="kk" className={`${nunito.variable} ${vollkorn.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: langScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <Providers media={media}>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <FloatingWhatsApp />
        </Providers>
      </body>
    </html>
  );
}

