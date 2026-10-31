/**
 * Polish is the only published language for now. To add Ukrainian or English:
 *  1. copy dictionaries/pl.ts to uk.ts / en.ts and translate (the Dictionary type keeps keys in sync),
 *  2. register it in ./index.ts,
 *  3. move src/app/* pages under src/app/[locale]/ with generateStaticParams() returning `locales`.
 */
export const locales = ["pl", "uk", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pl";
