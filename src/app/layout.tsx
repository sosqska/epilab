import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Marck_Script } from "next/font/google";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { siteUrl } from "@/content/site";
import { getDictionary } from "@/i18n";
import { defaultLocale, ogLocale } from "@/i18n/config";
import "./globals.css";

// All three families cover latin-ext (Polish) and cyrillic (Ukrainian).
const serif = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const sans = Jost({
  variable: "--font-jost",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500"],
});

const script = Marck_Script({
  variable: "--font-marck",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: "400",
});

const t = getDictionary(defaultLocale);

// Polish defaults; app/uk/layout.tsx overrides them for the Ukrainian pages.
export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: { default: t.meta.siteTitle, template: t.meta.titleTemplate },
  description: t.meta.description,
  openGraph: {
    type: "website",
    locale: ogLocale.pl,
    siteName: "EPILAB",
    title: t.meta.siteTitle,
    description: t.meta.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf7f3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={defaultLocale} className={`${serif.variable} ${sans.variable} ${script.variable} antialiased`} suppressHydrationWarning>
      <body>
        {/* Enables scroll-reveal starting states only when JS runs (see globals.css). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
