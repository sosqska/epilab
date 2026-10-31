import type { ReactNode } from "react";
import { getDictionary } from "@/i18n";
import { LocaleProvider } from "@/i18n/client";
import { defaultLocale, type Locale } from "@/i18n/config";
import { Header } from "./Header";
import { Footer } from "./Footer";

/** Everything around a page that depends on the language: header, footer, skip link and `lang`. */
export function LocaleShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = getDictionary(locale);
  return (
    <LocaleProvider locale={locale}>
      {/* The root <html lang> is Polish; switch it for other languages before paint. */}
      {locale !== defaultLocale && (
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang=${JSON.stringify(locale)}` }} />
      )}
      <div lang={locale} className="flex min-h-svh flex-col">
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
        <Footer locale={locale} />
      </div>
    </LocaleProvider>
  );
}
