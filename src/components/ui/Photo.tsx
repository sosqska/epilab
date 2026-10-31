import Image from "next/image";
import { images, type ImageKey } from "@/content/site";
import { cn } from "@/lib/cn";
import { Sprig } from "./Botanical";

/** Editorial photo frame. The wrapper class sets the aspect ratio; the image covers it. */
export function Photo({
  image,
  alt,
  className,
  priority,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  position = "center",
}: {
  image: ImageKey;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  position?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-photo bg-blush", className)}>
      <Image
        src={images[image].src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-soft)] hover:scale-[1.03]"
        style={{ objectPosition: position }}
      />
    </div>
  );
}

/** Clearly marked slot for photography that has not been supplied yet. */
export function PhotoPlaceholder({ label, note, className }: { label: string; note: string; className?: string }) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-photo border border-dashed border-rose/60 bg-gradient-to-br from-blush to-cream p-6 text-center",
        className,
      )}
      role="img"
      aria-label={`${label} — ${note}`}
    >
      <Sprig className="w-9 text-rose" />
      <p className="font-serif text-xl text-ink">{label}</p>
      <p className="text-xs uppercase tracking-[0.2em] text-muted">{note}</p>
    </div>
  );
}
