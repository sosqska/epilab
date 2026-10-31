import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

const tones = {
  ivory: "bg-ivory",
  cream: "bg-cream",
  blush: "bg-blush",
} as const;

export type Tone = keyof typeof tones;

export function Section({
  children,
  tone = "ivory",
  className,
  containerClassName,
  id,
  labelledBy,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn(tones[tone], "relative py-20 md:py-28", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-[0.72rem] font-medium uppercase tracking-[0.24em] text-rose-ink", className)}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("reveal max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      <h2 id={id} className="text-4xl md:text-5xl">
        {title}
      </h2>
      {intro && <div className="mt-5 text-base md:text-lg">{intro}</div>}
    </div>
  );
}
