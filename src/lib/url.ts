/**
 * Public origin of the site, without a trailing slash.
 * Set NEXT_PUBLIC_SITE_URL once the domain is connected; on Vercel the production
 * URL is used as a fallback. While neither is known, canonical links are omitted.
 */
function resolve(): string | null {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;
  return null;
}

export const siteUrl = resolve();
