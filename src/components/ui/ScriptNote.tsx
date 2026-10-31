import { cn } from "@/lib/cn";

/** Handwritten accent text, as on the reference design. Decorative by default, so hidden from assistive tech. */
export function ScriptNote({ children, className, decorative = true }: { children: string; className?: string; decorative?: boolean }) {
  return (
    <p
      className={cn("font-script whitespace-pre-line text-2xl leading-snug text-rose-dark md:text-[1.7rem]", className)}
      aria-hidden={decorative || undefined}
    >
      {children}
      <span className="ml-1.5 text-lg">♡</span>
    </p>
  );
}
