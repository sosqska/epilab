import type { Metadata } from "next";
import { getDictionary } from "@/i18n";
import { localePath, locales, ogLocale, type Locale } from "@/i18n/config";
import { absoluteUrl } from "@/content/site";

type PageKey = keyof ReturnType<typeof getDictionary>["meta"]["pages"];

/** hreflang alternates for a locale-free path such as "/cennik/". */
export function languageAlternates(path: string) {
  return {
    ...Object.fromEntries(locales.map((l) => [l, absoluteUrl(localePath(l, path))])),
    "x-default": absoluteUrl(path),
  };
}

export function pageMetadata(locale: Locale, page: PageKey, path: string): Metadata {
  const { title, description } = getDictionary(locale).meta.pages[page];
  const url = absoluteUrl(localePath(locale, path));
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: { title, description, url, locale: ogLocale[locale] },
  };
}
