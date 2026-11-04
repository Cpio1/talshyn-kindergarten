"use client";

import { ChevronRight } from "lucide-react";
import { NavLink } from "./NavLink";
import { useLanguage } from "./Providers";

export function Breadcrumbs({ current }: { current: string }) {
  const { t } = useLanguage();
  return (
    <nav aria-label={t.a11y.breadcrumbs}>
      <ol className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] font-bold md:text-sm">
        <li>
          <NavLink href="/" className="text-leaf underline-offset-4 hover:underline">
            {t.nav.home}
          </NavLink>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-3.5 w-3.5 text-ink-soft/60" />
        </li>
        <li aria-current="page" className="text-ink-soft">
          {current}
        </li>
      </ol>
    </nav>
  );
}
