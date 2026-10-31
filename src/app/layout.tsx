import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Marck_Script } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { siteUrl } from "@/content/site";
import { getDictionary } from "@/i18n";
import "./globals.css";

// All three families cover latin-ext (Polish) and cyrillic (future Ukrainian version).
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

const t = getDictionary();

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: { default: t.meta.siteTitle, template: t.meta.titleTemplate },
  description: t.meta.description,
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: "EPILAB",
    title: t.meta.siteTitle,
    description: t.meta.description,
  },
  alternates: { canonical: `${siteUrl}/` },
};

export const viewport: Viewport = {
  themeColor: "#fbf7f3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={`${serif.variable} ${sans.variable} ${script.variable} antialiased`} suppressHydrationWarning>
      <body className="flex min-h-svh flex-col">
        {/* Enables scroll-reveal starting states only when JS runs (see globals.css). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-ink px-5 py-3 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          {t.nav.skipToContent}
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
