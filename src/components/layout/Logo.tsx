import Link from "next/link";
import { Sprig } from "@/components/ui/Botanical";
import { cn } from "@/lib/cn";

export function Logo({ label, className, onClick }: { label: string; className?: string; onClick?: () => void }) {
  return (
    <Link href="/" aria-label={label} onClick={onClick} className={cn("group flex items-center gap-2.5", className)}>
      <Sprig className="w-6 -rotate-12 text-rose-dark transition-transform duration-500 group-hover:rotate-0" />
      <span className="flex flex-col items-center leading-none">
        <span className="font-serif text-[1.7rem] tracking-[0.34em] text-ink [margin-right:-0.34em]">EPILAB</span>
        <span className="mt-1.5 text-[0.52rem] uppercase tracking-[0.32em] text-muted">Elektroepilacja · Kielce</span>
      </span>
    </Link>
  );
}
