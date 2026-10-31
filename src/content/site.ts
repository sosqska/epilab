/**
 * Business data shared by every language version.
 *
 * Values in [square brackets] are placeholders — replace them with real data
 * before going live. Everything else comes from materials provided by EPILAB
 * (price list, certificates, photos).
 */

/** Sub-path the site is served from, e.g. "/epilab" on GitHub Pages. Empty on its own domain. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Public URL of the site root, including basePath, without a trailing slash. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export function absoluteUrl(path: string) {
  return `${siteUrl}${path}`;
}

/** Studio that built the site — credited in the footer. */
export const credit = { name: "KeyBroski", href: "https://sosqska.github.io/neon-pulse-portfolio/" };

export const site = {
  name: "EPILAB",
  tagline: "Elektroepilacja Kielce",
  city: "Kielce",
  specialist: "Anastasiia Soloviova",
};

export const contact = {
  phone: { display: "+48 [numer telefonu]", href: "tel:+48000000000" },
  email: { display: "[adres e-mail]", href: "mailto:[adres-e-mail]" },
  instagram: {
    handle: "@epilab.as",
    href: "https://www.instagram.com/epilab.as/",
    // Opens the direct-message thread (app on phones, instagram.com/direct on desktop).
    dm: "https://ig.me/m/epilab.as",
  },
  facebook: { handle: "[profil Facebook]", href: "https://www.facebook.com/" },
  address: {
    street: "ul. [adres studia]",
    city: "[kod pocztowy] Kielce",
  },
  // Any Google Maps "share → embed" URL works here. No API key required.
  mapEmbedSrc: "https://www.google.com/maps?q=Kielce&z=13&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Kielce",
  hours: [
    { days: "mon-fri", time: "[godziny]" },
    { days: "sat", time: "[godziny]" },
    { days: "sun", time: "closed" },
  ],
} as const;

export const images = {
  specialist: { src: `${basePath}/images/specialist.webp`, width: 960, height: 1280 },
  certificate: { src: `${basePath}/images/certificate.webp`, width: 852, height: 1280 },
  needlesWall: { src: `${basePath}/images/needles-wall.webp`, width: 852, height: 1280 },
  needlesSterile: { src: `${basePath}/images/needles-sterile.webp`, width: 852, height: 1280 },
  electrodeHold: { src: `${basePath}/images/electrode-hold.webp`, width: 852, height: 1280 },
  electrodeDetail: { src: `${basePath}/images/electrode-detail.webp`, width: 852, height: 1280 },
  razorVsElectrode: { src: `${basePath}/images/razor-vs-electrode.webp`, width: 720, height: 1130 },
  logoMark: { src: `${basePath}/images/logo-mark.png`, width: 240, height: 232 },
  logoFull: { src: `${basePath}/images/logo-full.png`, width: 360, height: 442 },
  monogram: { src: `${basePath}/images/logo-monogram.webp`, width: 600, height: 600 },
} as const;

export type ImageKey = keyof typeof images;

export const routes = [
  { href: "/", key: "home" },
  { href: "/o-nas", key: "about" },
  { href: "/uslugi", key: "services" },
  { href: "/cennik", key: "pricing" },
  { href: "/faq", key: "faq" },
  { href: "/opinie", key: "reviews" },
  { href: "/kontakt", key: "contact" },
] as const;

export type RouteKey = (typeof routes)[number]["key"];
