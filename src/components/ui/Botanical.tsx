import { cn } from "@/lib/cn";

const leaf = "M0 0C4-6 12-9 19-8C15-2 7 1 0 0Z";

// [y on stem, side, rotation] — hand-tuned for an airy, asymmetric sprig.
const leaves: Array<[number, 1 | -1, number]> = [
  [104, 1, -28],
  [94, -1, -32],
  [82, 1, -38],
  [70, -1, -36],
  [58, 1, -44],
  [46, -1, -42],
  [35, 1, -52],
  [25, -1, -50],
];

/** Fine line-art sprig used as a quiet decorative accent (inherits text colour). */
export function Sprig({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 124"
      fill="none"
      stroke="currentColor"
      strokeWidth={0.9}
      strokeLinecap="round"
      className={cn("h-auto", className)}
      aria-hidden
    >
      <path d="M33 122C31 96 29 64 33 10" />
      {leaves.map(([y, side, rot]) => {
        const x = 31.5 + (122 - y) * 0.012 * side;
        return <path key={y} d={leaf} transform={`translate(${x} ${y}) scale(${side} 1) rotate(${rot})`} />;
      })}
      <path d="M33 10C32 7 33 4 35 2" />
      <circle cx="35.5" cy="1.8" r="1.2" />
    </svg>
  );
}

/** Thin line flourish under handwritten notes. */
export function Flourish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 16" fill="none" stroke="currentColor" strokeWidth={0.9} strokeLinecap="round" className={className} aria-hidden>
      <path d="M2 10C30 2 60 14 92 7C100 5 108 5 118 8" />
    </svg>
  );
}
