import { Quote, Star } from "lucide-react";
import { reviews } from "@/content/reviews";
import { basePath } from "@/content/site";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

function Stars({ rating, label }: { rating: number; label: string }) {
  return (
    <div className="flex gap-0.5 text-rose-dark" role="img" aria-label={label.replace("{n}", String(rating))}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={cn("size-3.5", i < rating && "fill-current")} strokeWidth={1.25} aria-hidden />
      ))}
    </div>
  );
}

/** Real testimonials from content/reviews.ts, each linking to its source. Renders nothing while the list is empty. */
export function ReviewCards({ locale, limit, className }: { locale: Locale; limit?: number; className?: string }) {
  const r = getDictionary(locale).reviews;
  const items = limit ? reviews.slice(0, limit) : reviews;
  if (!items.length) return null;

  const linkCls = "text-rose-ink underline-offset-4 hover:underline";

  return (
    <ul className={cn("grid gap-5 md:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((review) => (
        <li
          key={`${review.author}-${review.text.slice(0, 24)}`}
          className="reveal flex flex-col rounded-card border border-line bg-white/75 p-7 shadow-soft transition-shadow duration-500 hover:shadow-lift"
        >
          <Quote className="size-6 text-rose" strokeWidth={1} aria-hidden />
          <blockquote className="mt-4 flex-1 font-serif text-xl leading-snug text-ink">{review.text}</blockquote>
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-4">
            <p className="text-sm text-ink">{review.author}</p>
            {review.rating && <Stars rating={review.rating} label={r.rating} />}
          </div>
          <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
            <span>{r.source[review.source]}</span>
            {review.url && (
              <a href={review.url} target="_blank" rel="noopener noreferrer" className={linkCls}>
                {r.viewSource} ↗
              </a>
            )}
            {review.screenshot && (
              <a href={`${basePath}/images/${review.screenshot}`} target="_blank" rel="noopener" className={linkCls}>
                {r.screenshot} ↗
              </a>
            )}
          </p>
        </li>
      ))}
    </ul>
  );
}
