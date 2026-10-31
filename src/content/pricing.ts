import { defaultLocale, intlLocale, type Locale } from "@/i18n/config";

/** Prices in PLN, from the EPILAB price list ("Cennik"). Billing is per treatment time. */

export const trialSession = {
  minutes: 20,
  price: 0,
  electrodeFee: 20,
};

export const priceList = [
  { minutes: 10, price: 50 },
  { minutes: 30, price: 100 },
  { minutes: 60, price: 160 },
  { minutes: 90, price: 230 },
  { minutes: 120, price: 300 },
  { minutes: 150, price: 370 },
  { minutes: 180, price: 420 },
  { minutes: 240, price: 600 },
  { minutes: 300, price: 780 },
] as const;

/** Durations shown as cards in previews (the rest appear in the full table). */
export const featuredMinutes = [10, 30, 60, 90, 120] as const;

const units: Record<Locale, { min: string; hour: string }> = {
  pl: { min: "min", hour: "godz." },
  uk: { min: "хв", hour: "год." },
};

export function formatDuration(minutes: number, locale: Locale = defaultLocale) {
  const u = units[locale];
  if (minutes < 60) return `${minutes} ${u.min}`;
  return `${(minutes / 60).toLocaleString(intlLocale[locale])} ${u.hour}`;
}

export function formatPrice(price: number, locale: Locale = defaultLocale) {
  return `${price.toLocaleString(intlLocale[locale])} zł`;
}

export function pricePerMinute(minutes: number, price: number, locale: Locale = defaultLocale) {
  return (price / minutes).toLocaleString(intlLocale[locale], { maximumFractionDigits: 1 });
}
