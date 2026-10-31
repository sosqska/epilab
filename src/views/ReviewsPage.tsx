import { contact } from "@/content/site";
import { reviews } from "@/content/reviews";
import { getDictionary } from "@/i18n";
import { type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ScriptNote } from "@/components/ui/ScriptNote";
import { InstagramIcon } from "@/components/ui/icons";
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

        <div className={reviews.length ? "mt-16 grid gap-6 lg:grid-cols-[1.4fr_1fr]" : "grid gap-6 lg:grid-cols-[1.4fr_1fr]"}>
          <section
            aria-labelledby="instagram-title"
            className="reveal flex flex-col justify-between gap-6 rounded-[2rem] border border-line bg-cream p-8 md:p-10"
          >
            <div>
              <InstagramIcon className="size-7 text-rose-dark" />
              <h2 id="instagram-title" className="mt-4 text-4xl">
                {r.empty.title}
              </h2>
              <p className="mt-3 max-w-lg">{r.empty.text}</p>
            </div>
            <ButtonLink href={contact.instagram.href} external className="self-start">
              {r.empty.button} {contact.instagram.handle}
            </ButtonLink>
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
