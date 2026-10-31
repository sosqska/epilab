import { defaultLocale, type Locale } from "./config";
import { pl, type Dictionary } from "./dictionaries/pl";

const dictionaries: Partial<Record<Locale, Dictionary>> = { pl };

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale] ?? pl;
}

export type { Dictionary, Locale };
