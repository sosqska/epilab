/**
 * Demo availability for the booking UI. Swap `getSlots` for a call to a real booking system
 * (it only needs to return "HH:MM" start times for a given day and duration).
 */

// [Example schedule — adjust to the studio's real hours.] Index = Date#getDay() (0 = Sunday).
export const schedule: Array<{ open: number; close: number } | null> = [
  null,
  { open: 9, close: 19 },
  { open: 9, close: 19 },
  { open: 9, close: 19 },
  { open: 9, close: 19 },
  { open: 9, close: 19 },
  { open: 9, close: 14 },
];

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

// Small deterministic hash so the same day always shows the same "booked" slots.
function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
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
    if (hash(`${iso}-${m}`) % 100 < 45) continue; // pretend ~45% of slots are taken
    slots.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
  }
  return slots;
}
