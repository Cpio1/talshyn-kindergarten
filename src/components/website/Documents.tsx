"use client";

import { FolderOpen } from "lucide-react";
import { Leaf } from "@/components/shared/Decor";
import { DocumentsAction } from "@/components/shared/DocumentsAction";
import { Reveal } from "@/components/shared/Reveal";
import { useLanguage } from "@/components/shared/Providers";

export function Documents() {
  const { t } = useLanguage();
  return (
    <div className="container-site py-10 lg:py-14">
      <Reveal className="relative mx-auto flex max-w-[56rem] items-center gap-8 overflow-hidden rounded-[2.5rem_2.5rem_2.5rem_1rem] bg-leaf-wash px-10 py-9">
        <span aria-hidden="true" className="blob-a absolute -right-14 -top-16 h-48 w-48 bg-leaf/15" />
        <Leaf className="absolute bottom-4 right-[38%] h-8 w-8 rotate-[160deg] text-leaf/40" />
        <span className="blob-b relative grid h-24 w-24 shrink-0 place-items-center bg-white shadow-soft">
          <FolderOpen className="h-11 w-11 text-forest" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <div className="relative min-w-0 flex-1">
          <h2 className="text-[2rem]">{t.documents.title}</h2>
          <p className="mt-1.5 text-ink-soft">{t.documents.text}</p>
        </div>
        <DocumentsAction className="relative shrink-0" />
      </Reveal>
    </div>
  );
}
