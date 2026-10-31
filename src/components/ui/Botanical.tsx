import type { CSSProperties } from "react";
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

const order = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * Fine line-art sprig used as a quiet decorative accent (inherits text colour).
 * It draws itself when scrolled into view; pass `drawn` to control that manually (e.g. inside the mobile menu).
 */
export function Sprig({ className, drawn, sway }: { className?: string; drawn?: boolean; sway?: boolean }) {
  const manual = drawn !== undefined;
  return (
    <svg
      viewBox="0 0 64 124"
      fill="none"
      stroke="currentColor"
      strokeWidth={0.9}
      strokeLinecap="round"
      className={cn("h-auto", sway && "animate-sway", manual && drawn && "is-visible", className)}
      data-draw={manual ? "manual" : "auto"}
      aria-hidden
    >
      <path pathLength={1} style={order(0)} d="M33 122C31 96 29 64 33 10" />
      {leaves.map(([y, side, rot], i) => {
        const x = 31.5 + (122 - y) * 0.012 * side;
        return (
          <path
            key={y}
            pathLength={1}
            style={order(i + 1)}
            d={leaf}
            transform={`translate(${x} ${y}) scale(${side} 1) rotate(${rot})`}
          />
        );
      })}
      <path pathLength={1} style={order(9)} d="M33 10C32 7 33 4 35 2" />
      <circle pathLength={1} style={order(10)} cx="35.5" cy="1.8" r="1.2" />
    </svg>
  );
}

/** Thin line flourish under handwritten notes. */
export function Flourish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={0.9}
      strokeLinecap="round"
      className={className}
      data-draw="auto"
      aria-hidden
    >
      <path pathLength={1} style={order(4)} d="M2 10C30 2 60 14 92 7C100 5 108 5 118 8" />
    </svg>
  );
}
