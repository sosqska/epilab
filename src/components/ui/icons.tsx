import type { SVGProps } from "react";
import {
  Award,
  Gift,
  Heart,
  Infinity as InfinityIcon,
  MapPin,
  ShieldCheck,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";

/** Icon names used in content dictionaries, so copy files stay free of component imports. */
const iconMap = {
  target: Target,
  shield: ShieldCheck,
  sparkles: Sparkles,
  infinity: InfinityIcon,
  pin: MapPin,
  award: Award,
  heart: Heart,
  gift: Gift,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;

export function ContentIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name as IconName] ?? Sparkles;
  return <Icon className={className} strokeWidth={1.25} aria-hidden />;
}

// Lucide no longer ships brand marks, so this one is drawn in the same thin-stroke style.
export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}
