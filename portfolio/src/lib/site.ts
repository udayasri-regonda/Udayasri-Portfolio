/**
 * Canonical site URL. Set NEXT_PUBLIC_SITE_URL in Vercel once you have a custom domain.
 * Falls back to Vercel's production URL, then localhost for local development.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
