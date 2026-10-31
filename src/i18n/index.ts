import type { Locale } from "./config";
import { pl, type Dictionary } from "./dictionaries/pl";
import { uk } from "./dictionaries/uk";

const dictionaries: Record<Locale, Dictionary> = { pl, uk };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary, Locale };
