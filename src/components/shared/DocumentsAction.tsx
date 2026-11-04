"use client";

import { ExternalLink, Hourglass } from "lucide-react";
import { site } from "@/data/site";
import { useLanguage } from "./Providers";

/** «Құжаттарды қарау» once `site.documentsUrl` is set; a calm "coming soon" state until then. */
export function DocumentsAction({ className = "" }: { className?: string }) {
  const { t } = useLanguage();
  if (site.documentsUrl) {
    return (
      <a href={site.documentsUrl} target="_blank" rel="noopener noreferrer" className={`btn btn-primary ${className}`}>
        {t.documents.view}
        <ExternalLink className="h-4 w-4" />
        <span className="sr-only"> ({t.a11y.newTab})</span>
      </a>
    );
  }
  return (
    <p
      className={`inline-flex min-h-[2.875rem] items-center justify-center gap-2 rounded-full bg-white px-5 text-[0.9375rem] font-bold text-ink-soft shadow-[inset_0_0_0_1.5px_var(--color-sand)] ${className}`}
    >
      <Hourglass className="h-4 w-4 text-sun" aria-hidden="true" />
      {t.documents.soon}
    </p>
  );
}
