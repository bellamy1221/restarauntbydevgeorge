/**
 * Resolves the canonical site URL for metadata, sitemap, and JSON-LD.
 * Prefer NEXT_PUBLIC_SITE_URL; on Vercel fall back to the deployment host.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (explicit) return explicit;

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim().replace(
    /\/$/,
    "",
  );
  if (production) {
    return production.startsWith("http") ? production : `https://${production}`;
  }

  const preview = process.env.VERCEL_URL?.trim().replace(/\/$/, "");
  if (preview) {
    return preview.startsWith("http") ? preview : `https://${preview}`;
  }

  return "http://localhost:3000";
}
