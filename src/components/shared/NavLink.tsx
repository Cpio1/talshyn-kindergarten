"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

/** Scrolls the home page to a section (or to the top) and keeps the URL in sync. */
export function scrollToTarget(hash: string | null) {
  if (!hash) {
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
    window.history.replaceState(null, "", "/");
    return true;
  }
  const el = document.getElementById(hash);
  if (!el) return false;
  el.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
  window.history.replaceState(null, "", `/#${hash}`);
  return true;
}

/**
 * A link to "/", "/about" or a "/#section" anchor that works from every page:
 * on the home page anchors scroll smoothly in place; elsewhere it is a normal
 * Next.js navigation and the browser lands on the section.
 */
export function NavLink({
  href,
  className,
  children,
  onNavigate,
  ariaCurrent,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
  ariaCurrent?: boolean;
}) {
  const pathname = usePathname();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const isHomeTarget = href === "/" || href.startsWith("/#");
    onNavigate?.();
    if (pathname !== "/" || !isHomeTarget) return;

    e.preventDefault();
    const hash = href.startsWith("/#") ? href.slice(2) : null;
    // Wait two frames so a closing mobile menu releases the scroll lock first.
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToTarget(hash)));
  }

  return (
    <Link href={href} className={className} onClick={handleClick} aria-current={ariaCurrent ? "page" : undefined}>
      {children}
    </Link>
  );
}
