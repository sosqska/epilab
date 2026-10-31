import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export function CheckList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check className="mt-1.5 size-4 shrink-0 text-rose-dark" strokeWidth={1.75} aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
