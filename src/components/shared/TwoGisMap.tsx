"use client";

import { MapPin, MousePointerClick } from "lucide-react";
import { useState } from "react";
import { twoGisFirmUrl, twoGisWidgetUrl } from "@/data/site";
import { useMediaQuery } from "./hooks";
import { useLanguage } from "./Providers";

/**
 * The free 2GIS «firms on map» widget showing the kindergarten's own 2GIS card.
 * `when` keeps the iframe out of the composition that is hidden, and on touch
 * screens the map loads on tap so it does not hijack page scrolling.
 */
export function TwoGisMap({ when, tapToLoad = false, className = "" }: { when: string; tapToLoad?: boolean; className?: string }) {
  const { t, lang } = useLanguage();
  const visible = useMediaQuery(when);
  const [activated, setActivated] = useState(!tapToLoad);

  return (
    <div className={`relative overflow-hidden bg-leaf-wash ${className}`}>
      {/* simple drawn map backdrop, visible until (or instead of) the widget */}
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 300">
        <rect width="400" height="300" fill="#E2EDDF" />
        <path d="M-10 210C80 180 150 230 230 196s120-60 180-40" stroke="#FFF9ED" strokeWidth="16" fill="none" />
        <path d="M120-10c20 90 0 170 30 320M300-10c-30 110 10 200-20 320" stroke="#FFF9ED" strokeWidth="10" fill="none" />
        <circle cx="70" cy="70" r="34" fill="#C9DCC4" />
        <circle cx="340" cy="250" r="44" fill="#C9DCC4" />
      </svg>

      {visible && activated && (
        <iframe
          title={t.contacts.map.title}
          src={twoGisWidgetUrl()}
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}

      {!activated && (
        <button
          type="button"
          onClick={() => setActivated(true)}
          className="absolute inset-0 grid place-items-center p-4 text-center"
        >
          <span className="flex flex-col items-center gap-2">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-forest text-white shadow-lift">
              <MapPin className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-sm font-bold text-forest shadow-soft">
              <MousePointerClick className="h-4 w-4" aria-hidden="true" />
              {t.contacts.map.activate}
            </span>
          </span>
        </button>
      )}

      <a
        href={twoGisFirmUrl(lang)}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 left-3 z-[1] inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm font-extrabold text-forest shadow-lift transition-colors hover:bg-sun-wash"
      >
        <MapPin className="h-4 w-4" aria-hidden="true" />
        {t.contacts.map.open}
        <span className="sr-only"> ({t.a11y.newTab})</span>
      </a>
    </div>
  );
}
