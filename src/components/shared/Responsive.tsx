import type { ReactNode } from "react";

/**
 * Renders a section's two separate compositions: `website` from 768 px up
 * (tablet sizes are handled inside it) and `mobile-website` below that.
 * The anchor id sits on the single wrapping <section>, so ids stay unique, and
 * CSS does the switching, so server and client HTML always match.
 */
export function Responsive({
  id,
  className,
  desktop,
  mobile,
}: {
  id?: string;
  className?: string;
  desktop: ReactNode;
  mobile: ReactNode;
}) {
  return (
    <section id={id} className={className}>
      <div className="hidden md:block">{desktop}</div>
      <div className="md:hidden">{mobile}</div>
    </section>
  );
}
