import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LocaleShell } from "@/components/layout/LocaleShell";
import { getDictionary } from "@/i18n";
import { ogLocale } from "@/i18n/config";

const t = getDictionary("uk");

export const metadata: Metadata = {
  title: { default: t.meta.siteTitle, template: t.meta.titleTemplate },
  description: t.meta.description,
  openGraph: {
    type: "website",
    locale: ogLocale.uk,
    siteName: "EPILAB",
    title: t.meta.siteTitle,
    description: t.meta.description,
  },
};

export default function UkrainianLayout({ children }: { children: ReactNode }) {
  return <LocaleShell locale="uk">{children}</LocaleShell>;
}
