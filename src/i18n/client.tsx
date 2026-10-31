"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { defaultLocale, type Locale } from "./config";
import { getDictionary } from "./index";

const LocaleContext = createContext<Locale>(defaultLocale);

/** Gives client components the current language (server components receive it as a prop). */
export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  // Keeps <html lang> right after client-side language switches (the inline script only runs on full loads).
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}

export function useDictionary() {
  return getDictionary(useLocale());
}
