import Image from "next/image";
import { images, type ImageKey } from "@/content/site";
import { cn } from "@/lib/cn";

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
    // Above-the-fold (priority) photos settle in on load; the rest unmask as they scroll into view.
    <div className={cn("relative overflow-hidden rounded-photo bg-blush", !priority && "unmask", className)}>
      <Image
        src={images[image].src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          "object-cover transition-[scale] duration-[1.2s] ease-[var(--ease-soft)] hover:scale-[1.03]",
          priority && "animate-settle",
        )}
        style={{ objectPosition: position }}
      />
    </div>
  );
}

