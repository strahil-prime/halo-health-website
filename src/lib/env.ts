/**
 * Public, build-time configuration. Only NEXT_PUBLIC_* values belong here:
 * this site holds no secrets and no health data.
 */
export const env = {
  /** Base URL of the Halo Health platform app (sign-up, HSA questionnaire). */
  platformUrl:
    process.env.NEXT_PUBLIC_PLATFORM_URL ?? 'https://app.halohealth.example',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
} as const;

/** Build a link into the platform app. All CTAs must go through this. */
export function platformLink(path = '/') {
  return new URL(path, env.platformUrl).toString();
}
