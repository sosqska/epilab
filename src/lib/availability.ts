/**
 * Bookable start times within opening hours. They are preferences, not live availability: the studio
 * confirms the slot when replying. Swap `getSlots` for a booking system's API to show real availability
 * (it only needs to return "HH:MM" start times for a given day and duration).
 */

// Matches contact.hours (daily 09:00–20:00). Index = Date#getDay() (0 = Sunday); null = closed.
export const schedule: Array<{ open: number; close: number } | null> = Array.from({ length: 7 }, () => ({ open: 9, close: 20 }));

export const bookingWindowDays = 60;
const slotStep = 30;

export function toISODate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function fromISODate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getSlots(iso: string, durationMinutes: number, now = new Date()): string[] {
  const day = fromISODate(iso);
  const today = startOfToday();
  const last = new Date(today);
  last.setDate(last.getDate() + bookingWindowDays);
  if (day < today || day > last) return [];

  const hours = schedule[day.getDay()];
  if (!hours) return [];

  const slots: string[] = [];
  for (let m = hours.open * 60; m + durationMinutes <= hours.close * 60; m += slotStep) {
    const slotTime = new Date(day);
    slotTime.setMinutes(m);
    if (slotTime.getTime() < now.getTime() + 2 * 60 * 60 * 1000) continue; // at least 2 h notice
    slots.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
  }
  return slots;
}

/** First day within the booking window that has at least one slot for this duration. */
export function firstAvailableDate(durationMinutes: number): Date | null {
  const day = startOfToday();
  for (let i = 0; i <= bookingWindowDays; i++) {
    if (getSlots(toISODate(day), durationMinutes).length > 0) return day;
    day.setDate(day.getDate() + 1);
  }
  return null;
}
