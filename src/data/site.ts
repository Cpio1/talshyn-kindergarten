/**
 * Single source of truth for the kindergarten's confirmed facts and links.
 * Change a value here and it updates everywhere on the site.
 */
export const site = {
  officialName: "ТОО «Частный детский сад-ясли Талшын»",
  phone: {
    display: "+7 771 571 55 51",
    href: "tel:+77715715551",
    /** E.164, used by structured data. */
    e164: "+77715715551",
  },
  whatsappUrl: "https://wa.me/77715715551",
  instagram: {
    url: "https://www.instagram.com/talshyn_balabakshasi/",
    handle: "@talshyn_balabakshasi",
  },
  hours: {
    opens: "07:45",
    closes: "18:15",
    display: "07:45–18:15",
  },
  /**
   * Google Drive folder with the documents.
   * While it is `null`, the Documents section shows «Жақында қолжетімді болады».
   */
  documentsUrl: null as string | null,
  /**
   * Set to true if public/images/logo.* already contains the word «Талшын»,
   * so the header does not repeat the name next to it.
   */
  logoHasText: false,
  /** The organization's own card in 2GIS (matches «улица Сейитбекова, 43»). */
  twoGis: {
    city: "almaty",
    firmId: "70000001032478601",
    lat: 43.18111,
    lon: 76.845581,
  },
} as const;

export function twoGisFirmUrl(lang: "kk" | "ru") {
  const prefix = lang === "kk" ? "/kk" : "";
  return `https://2gis.kz${prefix}/${site.twoGis.city}/firm/${site.twoGis.firmId}`;
}

export function twoGisWidgetUrl() {
  const { firmId, city, lat, lon } = site.twoGis;
  const options = { pos: { lat, lon, zoom: 16 }, opt: { city }, org: firmId };
  return `https://widgets.2gis.com/widget?type=firmsonmap&options=${encodeURIComponent(JSON.stringify(options))}`;
}

/** Order of the seven main menu items. Labels live in the translations. */
export const navItems = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "groups", href: "/#groups" },
  { key: "classes", href: "/#classes" },
  { key: "gallery", href: "/#gallery" },
  { key: "documents", href: "/#documents" },
  { key: "contacts", href: "/#contacts" },
] as const;

export type NavKey = (typeof navItems)[number]["key"];

export const classKeys = ["chess", "music", "dance", "speech", "karate", "robotics"] as const;
export type ClassKey = (typeof classKeys)[number];

export const mealKeys = ["breakfast", "snack", "lunch", "afternoon", "dinner"] as const;
export type MealKey = (typeof mealKeys)[number];
