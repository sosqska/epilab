import type { MetadataRoute } from "next";
import { absoluteUrl, routes } from "@/content/site";
import { localePath, locales } from "@/i18n/config";
import { languageAlternates } from "@/lib/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...routes.map((r) => (r.href === "/" ? "/" : `${r.href}/`)), "/rezerwacja/"];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      // trailing slash like the real page URLs (/uk/), otherwise Google sees a redirect instead of a page
      url: absoluteUrl(localePath(locale, path)).replace(/([^/])$/, "$1/"),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
