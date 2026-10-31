import { Star } from "lucide-react";
import { contact } from "@/content/site";
import { getDictionary } from "@/i18n";
import { type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ScriptNote } from "@/components/ui/ScriptNote";
import { PageHero } from "@/components/sections/PageHero";
import { ReviewCards } from "@/components/sections/ReviewCards";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const meta = (locale: Locale) => pageMetadata(locale, "reviews", "/opinie/");

export function ReviewsPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const r = t.reviews;
  return (
    <>
      <PageHero eyebrow={r.hero.eyebrow} title={r.hero.title} lead={r.hero.lead} />

      <Section className="pt-6 md:pt-10">
        <ReviewCards locale={locale} />

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Google reviews: replace this block with the widget/API once the Google Business profile is connected. */}
          <section
            aria-labelledby="google-title"
            className="reveal flex flex-col justify-between gap-6 rounded-[2rem] border border-dashed border-rose/50 bg-cream p-8 md:p-10"
          >
            <div>
              <div className="flex gap-1 text-rose/60" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-5" strokeWidth={1.25} />
                ))}
              </div>
              <h2 id="google-title" className="mt-4 text-4xl">
                {r.google.title}
              </h2>
              <p className="mt-3 max-w-lg">{r.google.text}</p>
            </div>
            <p className="text-sm text-muted italic">{r.google.todo}</p>
          </section>

          <section aria-labelledby="leave-title" className="reveal relative overflow-hidden rounded-[2rem] bg-blush p-8 md:p-10">
            <h2 id="leave-title" className="text-4xl">
              {r.leave.title}
            </h2>
            <p className="mt-3">{r.leave.text}</p>
            <ButtonLink href={contact.instagram.href} external variant="outline" className="mt-7 bg-ivory/60">
              {r.leave.button}
            </ButtonLink>
            <ScriptNote className="absolute right-6 bottom-5 hidden -rotate-6 text-xl sm:block">{r.leave.note}</ScriptNote>
          </section>
        </div>
      </Section>

      <CtaBanner locale={locale} />
    </>
  );
}
