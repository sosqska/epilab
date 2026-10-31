/**
 * Polish lives at the site root (/cennik/), every other language under its own prefix (/uk/cennik/).
 * To add a language: create dictionaries/<code>.ts typed as Dictionary, register it in ./index.ts,
 * add it here, and add an app/<code>/ folder mirroring app/uk/.
 */
export const locales = ["pl", "uk"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pl";

/** Short labels for the language switcher ("UA" is what Ukrainian visitors look for). */
export const localeLabels: Record<Locale, string> = { pl: "PL", uk: "UA" };
export const localeNames: Record<Locale, string> = { pl: "Polski", uk: "Українська" };
export const intlLocale: Record<Locale, string> = { pl: "pl-PL", uk: "uk-UA" };
export const ogLocale: Record<Locale, string> = { pl: "pl_PL", uk: "uk_UA" };

/** "/cennik" → "/uk/cennik" for non-default locales. Keeps any hash or query. */
export function localePath(locale: Locale, path: string) {
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Splits a router pathname (without basePath) into its locale and the locale-free path. */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const match = locales.find((l) => l !== defaultLocale && (pathname === `/${l}` || pathname.startsWith(`/${l}/`)));
  if (!match) return { locale: defaultLocale, path: pathname || "/" };
  return { locale: match, path: pathname.slice(match.length + 1) || "/" };
}
