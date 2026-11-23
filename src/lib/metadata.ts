import type { Metadata } from "next";
import { getDictionary } from "@/i18n";
import { localePath, locales, ogLocale, type Locale } from "@/i18n/config";
import { absoluteUrl } from "@/content/site";

type PageKey = keyof ReturnType<typeof getDictionary>["meta"]["pages"];

/**
 * Link preview image (Telegram, Facebook, Instagram, WhatsApp): square logo on the site's background.
 * Square + twitter card "summary" makes messengers show it as a small thumbnail next to the text,
 * instead of a big photo under it. A page's own openGraph replaces the layout's one entirely,
 * so every page must include these images itself.
 */
export const shareImages = [{ url: "/og-logo.png", width: 600, height: 600, alt: "EPILAB" }];
export const shareTwitter = { card: "summary" as const, images: ["/og-logo.png"] };

/** hreflang alternates for a locale-free path such as "/cennik/". */
export function languageAlternates(path: string) {
  return {
    // trailing slash like the real page URLs (/uk/) — no redirects for search engines
    ...Object.fromEntries(locales.map((l) => [l, absoluteUrl(localePath(l, path)).replace(/([^/])$/, "$1/")])),
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
    openGraph: { title, description, url, locale: ogLocale[locale], images: shareImages },
    twitter: { ...shareTwitter, title, description },
  };
}
