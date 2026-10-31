import Image from "next/image";
import { contact, images, type ImageKey } from "@/content/site";
import { InstagramIcon } from "@/components/ui/icons";

const tiles: Array<{ image: ImageKey; alt: string; position?: string }> = [
  { image: "specialist", alt: "Specjalistka podczas zabiegu", position: "50% 30%" },
  { image: "needlesWall", alt: "Sterylne igły do elektroepilacji" },
  { image: "razorVsElectrode", alt: "Maszynka kontra elektroda" },
  { image: "electrodeDetail", alt: "Elektroda do elektroepilacji" },
  { image: "certificate", alt: "Certyfikat kursu elektroepilacji" },
  { image: "needlesSterile", alt: "Igły Ballet w sterylnych opakowaniach" },
];

/** Static Instagram-style grid of studio photos, each linking to the profile. */
export function InstagramGrid() {
  return (
    <ul className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
      {tiles.map(({ image, alt, position }) => (
        <li key={image} className="reveal">
          <a
            href={contact.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-square overflow-hidden rounded-xl bg-blush"
          >
            <Image
              src={images[image].src}
              alt={alt}
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
