import Image from "next/image";
import { contact, images, type ImageKey } from "@/content/site";
import { InstagramIcon } from "@/components/ui/icons";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

// Alt texts come from the dictionary (home.instagram.alts), in this order.
const tiles: Array<{ image: ImageKey; position?: string }> = [
  { image: "specialist", position: "50% 30%" },
  { image: "needlesWall" },
  { image: "razorVsElectrode" },
  { image: "electrodeDetail" },
  { image: "certificate" },
  { image: "needlesSterile" },
];

/** Static Instagram-style grid of studio photos, each linking to the profile. */
export function InstagramGrid({ locale }: { locale: Locale }) {
  const alts = getDictionary(locale).home.instagram.alts;
  return (
    <ul className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
      {tiles.map(({ image, position }, i) => (
        <li key={image} className="reveal">
          <a
            href={contact.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-square overflow-hidden rounded-xl bg-blush"
          >
            <Image
              src={images[image].src}
              alt={alts[i]}
              fill
              sizes="(min-width: 1024px) 16vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ objectPosition: position }}
            />
            <span className="absolute inset-0 flex items-center justify-center bg-rose-ink/0 text-white opacity-0 transition-all duration-500 group-hover:bg-rose-ink/35 group-hover:opacity-100 group-focus-visible:bg-rose-ink/35 group-focus-visible:opacity-100">
              <InstagramIcon className="size-7" />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
