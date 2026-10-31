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

export function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const hours = minutes / 60;
  return `${hours.toLocaleString("pl-PL")} godz.`;
}

export function formatPrice(price: number) {
  return `${price.toLocaleString("pl-PL")} zł`;
}

export function pricePerMinute(minutes: number, price: number) {
  return (price / minutes).toLocaleString("pl-PL", { maximumFractionDigits: 1 });
}
