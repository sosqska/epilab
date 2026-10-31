import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight, CalendarDays } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "light" | "ghost";
type Adornment = "calendar" | "arrow" | "none";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full whitespace-nowrap text-[0.95rem] font-medium tracking-wide transition-all duration-300 ease-[var(--ease-soft)] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // The ::before streak sweeps across on hover, like light catching satin.
  primary:
    "relative overflow-hidden bg-rose-dark px-7 py-3.5 text-white shadow-soft hover:-translate-y-0.5 hover:bg-rose-ink hover:shadow-lift active:translate-y-0 active:scale-[0.98] before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-1/3 before:-translate-x-[150%] before:-skew-x-12 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-transform before:duration-[900ms] before:ease-[var(--ease-soft)] hover:before:translate-x-[400%]",
  outline: "border border-rose-dark/45 px-7 py-3.5 text-rose-ink hover:border-rose-dark hover:bg-white/60",
  light: "bg-white/85 px-7 py-3.5 text-rose-ink shadow-soft backdrop-blur hover:-translate-y-0.5 hover:bg-white",
  ghost: "px-1 py-2 text-ink hover:text-rose-ink",
};

function Adorned({ icon, children }: { icon: Adornment; children: ReactNode }) {
  return (
    <>
      {icon === "calendar" && <CalendarDays className="size-[1.1rem]" strokeWidth={1.5} aria-hidden />}
      {children}
      {icon === "arrow" && (
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} aria-hidden />
      )}
    </>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon = variant === "primary" ? "calendar" : "arrow",
  className,
  external,
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: Adornment;
  className?: string;
  external?: boolean;
  onClick?: () => void;
}) {
  const cls = cn(base, variants[variant], className);
  const content = <Adorned icon={icon}>{children}</Adorned>;
  if (external)
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {content}
      </a>
    );
  return (
    <Link href={href} className={cls} onClick={onClick}>
      {content}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
