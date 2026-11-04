import type { Metadata } from "next";
import { AboutPage } from "@/components/website/AboutPage";
import { MobileAboutPage } from "@/components/mobile-website/MobileAboutPage";
import { dictionaries } from "@/data/translations";
import { siteUrl } from "@/lib/url";

const kk = dictionaries.kk;

export const metadata: Metadata = {
  title: kk.meta.aboutTitle,
  description: kk.about.paragraphs[0],
  openGraph: { title: `${kk.meta.aboutTitle} — Талшын`, description: kk.about.paragraphs[0], locale: "kk_KZ" },
  alternates: siteUrl ? { canonical: "/about" } : undefined,
};

export default function About() {
  return (
    <>
      <div className="hidden md:block">
        <AboutPage />
      </div>
      <div className="md:hidden">
        <MobileAboutPage />
      </div>
    </>
  );
}
