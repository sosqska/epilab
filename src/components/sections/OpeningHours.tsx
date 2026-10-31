import { contact } from "@/content/site";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

export function OpeningHours({ locale, compact }: { locale: Locale; compact?: boolean }) {
  const t = getDictionary(locale);
  return (
    <dl className={cn("grid grid-cols-[auto_1fr] gap-x-6", compact ? "gap-y-1.5 text-sm" : "gap-y-2.5")}>
      {contact.hours.map(({ days, time }) => (
        <div key={days} className="contents">
          <dt>{t.common.days[days]}</dt>
          <dd className="text-right text-ink">{time === "closed" ? t.common.closed : time}</dd>
        </div>
      ))}
    </dl>
  );
}
