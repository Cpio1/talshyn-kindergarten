"use client";

import { ExternalLink } from "lucide-react";
import { site } from "@/data/site";
import { useLanguage } from "./Providers";

/** Opens the Google Drive folder with the kindergarten's documents in a new tab. */
export function DocumentsAction({ className = "" }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <a href={site.documentsUrl} target="_blank" rel="noopener noreferrer" className={`btn btn-primary ${className}`}>
      {t.documents.view}
      <ExternalLink className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only"> ({t.a11y.newTab})</span>
    </a>
  );
}
