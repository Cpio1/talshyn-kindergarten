import type { Metadata } from "next";
import { Responsive } from "@/components/shared/Responsive";
import { AboutTeaser } from "@/components/website/AboutTeaser";
import { Advantages } from "@/components/website/Advantages";
import { Classes } from "@/components/website/Classes";
import { Contacts } from "@/components/website/Contacts";
import { Documents } from "@/components/website/Documents";
import { Gallery } from "@/components/website/Gallery";
import { Groups } from "@/components/website/Groups";
import { Hero } from "@/components/website/Hero";
import { Nutrition } from "@/components/website/Nutrition";
import { MobileAboutTeaser } from "@/components/mobile-website/MobileAboutTeaser";
import { MobileAdvantages } from "@/components/mobile-website/MobileAdvantages";
import { MobileClasses } from "@/components/mobile-website/MobileClasses";
import { MobileContacts } from "@/components/mobile-website/MobileContacts";
import { MobileDocuments } from "@/components/mobile-website/MobileDocuments";
import { MobileGallery } from "@/components/mobile-website/MobileGallery";
import { MobileGroups } from "@/components/mobile-website/MobileGroups";
import { MobileHero } from "@/components/mobile-website/MobileHero";
import { MobileNutrition } from "@/components/mobile-website/MobileNutrition";
import { siteUrl } from "@/lib/url";

export const metadata: Metadata = {
  alternates: siteUrl ? { canonical: "/" } : undefined,
};

export default function HomePage() {
  return (
    <>
      <Responsive desktop={<Hero />} mobile={<MobileHero />} />
      <Responsive desktop={<Advantages />} mobile={<MobileAdvantages />} />
      <Responsive id="about-preview" className="bg-white/50" desktop={<AboutTeaser />} mobile={<MobileAboutTeaser />} />
      <Responsive id="groups" desktop={<Groups />} mobile={<MobileGroups />} />
      <Responsive id="classes" desktop={<Classes />} mobile={<MobileClasses />} />
      <Responsive id="nutrition" desktop={<Nutrition />} mobile={<MobileNutrition />} />
      <Responsive id="gallery" className="bg-white/50" desktop={<Gallery />} mobile={<MobileGallery />} />
      <Responsive id="documents" desktop={<Documents />} mobile={<MobileDocuments />} />
      <Responsive id="contacts" desktop={<Contacts />} mobile={<MobileContacts />} />
    </>
  );
}
