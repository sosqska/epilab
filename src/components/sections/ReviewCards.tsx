import { Quote, Star } from "lucide-react";
import { reviews } from "@/content/reviews";
import { getDictionary } from "@/i18n";
import { cn } from "@/lib/cn";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-rose-dark" role="img" aria-label={`Ocena ${rating} na 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={cn("size-3.5", i < rating && "fill-current")} strokeWidth={1.25} aria-hidden />
      ))}
    </div>
  );
}

/**
 * Testimonials from content/reviews.ts. Entries without real text render as clearly marked placeholders,
 * and stars are only shown for verified reviews.
 */
export function ReviewCards({ limit, className }: { limit?: number; className?: string }) {
  const t = getDictionary();
  const items = limit ? reviews.slice(0, limit) : reviews;

  return (
    <ul className={cn("grid gap-5 md:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((review, i) => {
        const placeholder = !review.text;
        return (
          <li
            key={i}
            className={cn(
              "reveal flex flex-col rounded-card p-7 transition-shadow duration-500",
              placeholder ? "border border-dashed border-rose/50 bg-white/40" : "border border-line bg-white/75 shadow-soft hover:shadow-lift",
            )}
          >
            <Quote className="size-6 text-rose" strokeWidth={1} aria-hidden />
            {placeholder && (
              <span className="mt-4 w-fit rounded-full bg-blush px-3 py-1 text-[0.65rem] uppercase tracking-[0.16em] text-rose-ink">
                {t.reviews.placeholderBadge}
              </span>
            )}
            <blockquote className={cn("mt-4 flex-1 font-serif text-xl leading-snug", placeholder ? "text-muted italic" : "text-ink")}>
              {review.text ?? t.reviews.placeholderText}
            </blockquote>
            <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-4">
              <p className="text-sm text-ink">{review.author ?? t.reviews.placeholderName}</p>
              {review.verified && review.rating && <Stars rating={review.rating} />}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
