"use client";

import { FolderOpen } from "lucide-react";
import { DocumentsAction } from "@/components/shared/DocumentsAction";
import { Reveal } from "@/components/shared/Reveal";
import { useLanguage } from "@/components/shared/Providers";

export function MobileDocuments() {
  const { t } = useLanguage();
  return (
    <div className="px-4 py-8 sm:px-6">
      <Reveal y={12} className="relative mx-auto max-w-xl overflow-hidden rounded-[2rem_2rem_2rem_0.9rem] bg-leaf-wash p-5">
        <span aria-hidden="true" className="blob-a absolute -right-10 -top-10 h-28 w-28 bg-leaf/15" />
        <div className="relative flex items-center gap-3.5">
          <span className="blob-b grid h-14 w-14 shrink-0 place-items-center bg-white">
            <FolderOpen className="h-7 w-7 text-forest" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <h2 className="text-[1.6rem]">{t.documents.title}</h2>
        </div>
        <p className="relative mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{t.documents.text}</p>
        <DocumentsAction className="relative mt-4 w-full" />
      </Reveal>
    </div>
  );
}
