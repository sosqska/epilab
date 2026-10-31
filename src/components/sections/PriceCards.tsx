import { featuredMinutes, formatDuration, formatPrice, priceList, trialSession } from "@/content/pricing";
import { getDictionary } from "@/i18n";
import { cn } from "@/lib/cn";

/** Duration-based price cards: the free trial first, then the most popular durations. */
export function PriceCards({ className }: { className?: string }) {
  const t = getDictionary();
  const featured = priceList.filter((p) => (featuredMinutes as readonly number[]).includes(p.minutes));

  return (
    <ul className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6", className)}>
      <li className="reveal relative flex flex-col items-center justify-between rounded-card border border-rose/50 bg-white/80 px-3 py-6 text-center shadow-soft">
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-rose-ink">{t.home.pricing.trialLabel}</span>
        <span className="mt-3 font-serif text-4xl text-ink">{trialSession.minutes}</span>
        <span className="text-xs uppercase tracking-[0.18em] text-muted">min</span>
        <span className="mt-4 h-px w-8 bg-line" aria-hidden />
        <span className="mt-4 font-medium text-rose-ink">{t.common.free}</span>
        <span className="mt-1 text-[0.7rem] leading-tight text-muted">
          + {formatPrice(trialSession.electrodeFee)} {t.common.electrodeFee}
        </span>
      </li>
      {featured.map(({ minutes, price }) => {
        const [value, unit] = formatDuration(minutes).split(" ");
        return (
          <li
            key={minutes}
            className="reveal group flex flex-col items-center justify-between rounded-card border border-line bg-white/60 px-3 py-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-rose/60 hover:bg-white hover:shadow-lift"
          >
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted">{t.booking.service.regular}</span>
            <span className="mt-3 font-serif text-4xl text-ink">{value}</span>
            <span className="text-xs uppercase tracking-[0.18em] text-muted">{unit}</span>
            <span className="mt-4 h-px w-8 bg-line transition-all duration-500 group-hover:w-12 group-hover:bg-rose" aria-hidden />
            <span className="mt-4 font-serif text-2xl text-rose-ink">{formatPrice(price)}</span>
          </li>
        );
      })}
    </ul>
  );
}
