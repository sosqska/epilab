import Image from "next/image";
import Link from "next/link";
import { images } from "@/content/site";
import { cn } from "@/lib/cn";

/** Header: gold EL monogram + wordmark. Footer (`full`): the complete stacked logo. */
export function Logo({ label, className, onClick, full }: { label: string; className?: string; onClick?: () => void; full?: boolean }) {
  if (full)
    return (
      <Link href="/" aria-label={label} onClick={onClick} className={cn("block w-24", className)}>
        <Image src={images.logoFull.src} alt="" width={images.logoFull.width} height={images.logoFull.height} className="h-auto w-full" />
      </Link>
    );

  return (
    <Link href="/" aria-label={label} onClick={onClick} className={cn("group flex items-center gap-3", className)}>
      <Image
        src={images.logoMark.src}
        alt=""
        width={images.logoMark.width}
        height={images.logoMark.height}
        priority
        className="h-12 w-auto transition-transform duration-500 group-hover:-rotate-3"
      />
      <span className="flex flex-col items-center leading-none">
        <span className="font-serif text-[1.6rem] tracking-[0.34em] text-ink [margin-right:-0.34em]">EPILAB</span>
        <span className="mt-1.5 text-[0.5rem] uppercase tracking-[0.32em] text-muted">Elektroepilacja · Kielce</span>
      </span>
    </Link>
  );
}
