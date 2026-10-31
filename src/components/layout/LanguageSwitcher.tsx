"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDictionary } from "@/i18n/client";
import { localeLabels, localeNames, localePath, locales, splitLocale } from "@/i18n/config";
import { cn } from "@/lib/cn";

/** PL | UA toggle that keeps the visitor on the same page in the other language. */
export function LanguageSwitcher({ className, size = "sm" }: { className?: string; size?: "sm" | "lg" }) {
  const t = useDictionary();
  const { locale: current, path } = splitLocale(usePathname());

  return (
    <nav aria-label={t.nav.language} className={cn("relative flex rounded-full border border-line bg-white/60 p-0.5", className)}>
      {/* Sliding pill behind the active language */}
      <span
        aria-hidden
        className="absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-rose-dark transition-transform duration-500 ease-[var(--ease-soft)]"
        style={{ transform: `translateX(${locales.indexOf(current) * 100}%)` }}
      />
      {locales.map((l) => (
        <Link
          key={l}
          href={localePath(l, path)}
          hrefLang={l}
          lang={l}
          aria-current={l === current ? "true" : undefined}
          title={localeNames[l]}
          className={cn(
            "relative z-10 flex-1 rounded-full text-center font-medium tracking-wider transition-colors duration-300",
            size === "lg" ? "px-5 py-2 text-sm" : "px-2.5 py-1 text-xs",
            l === current ? "text-white" : "text-rose-ink hover:text-ink",
          )}
        >
          <span aria-hidden>{localeLabels[l]}</span>
          <span className="sr-only">{localeNames[l]}</span>
        </Link>
      ))}
    </nav>
  );
}
