/**
 * Form delivery. The site is fully static, so there is no server or database here.
 *
 * - With NEXT_PUBLIC_CONTACT_ENDPOINT / NEXT_PUBLIC_BOOKING_ENDPOINT set (e.g. Formspree, a Make/Zapier webhook,
 *   or a booking system's API), payloads are POSTed there as JSON.
 * - Without them the contact form opens the visitor's mail app with a ready message (mailto:), and booking requests are sent as an Instagram DM
 *   (the text is copied and the chat opened — Instagram does not allow prefilling messages from a website).
 */

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
};

export type BookingPayload = {
  service: string;
  durationMinutes: number;
  priceLabel: string;
  areas: string[];
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  name: string;
  phone: string;
  email: string;
  notes: string;
  firstVisit: boolean;
};

const contactEndpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
const bookingEndpoint = process.env.NEXT_PUBLIC_BOOKING_ENDPOINT;

export const contactViaEmail = !contactEndpoint;
export const bookingViaInstagram = !bookingEndpoint;

async function post(url: string, body: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
}

async function simulate() {
  await new Promise((resolve) => setTimeout(resolve, 1100));
  if (typeof navigator !== "undefined" && !navigator.onLine) throw new Error("offline");
}

export function sendContactMessage(payload: ContactPayload) {
  if (!contactEndpoint) throw new Error("No contact endpoint — use contactViaEmail");
  return post(contactEndpoint, payload);
}

export function submitBooking(payload: BookingPayload) {
  return bookingEndpoint ? post(bookingEndpoint, payload) : simulate();
}
