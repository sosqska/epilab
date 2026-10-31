import type { Metadata } from "next";
import { getDictionary } from "@/i18n";
import { absoluteUrl } from "@/content/site";

type PageKey = keyof ReturnType<typeof getDictionary>["meta"]["pages"];

export function pageMetadata(page: PageKey, path: string): Metadata {
  const { title, description } = getDictionary().meta.pages[page];
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: { title, description, url: absoluteUrl(path) },
  };
}
