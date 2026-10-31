import { Info } from "lucide-react";
import { formatDuration, formatPrice, priceList, pricePerMinute, trialSession } from "@/content/pricing";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Eyebrow, Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Sprig } from "@/components/ui/Botanical";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata = pageMetadata("pricing", "/cennik/");

const t = getDictionary();
const p = t.pricing;

const offers = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Cennik elektroepilacji — EPILAB Kielce",
  itemListElement: priceList.map(({ minutes, price }) => ({
    "@type": "Offer",
    name: `Elektroepilacja ${formatDuration(minutes)}`,
    price,
    priceCurrency: "PLN",
  })),
};

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offers) }} />
      <PageHero eyebrow={p.hero.eyebrow} title={p.hero.title} lead={p.hero.lead} />

      <Section labelledBy="price-title" className="pt-6 md:pt-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
          {/* Trial + notes */}
          <div className="space-y-8">
            <article className="reveal relative overflow-hidden rounded-[2rem] bg-rose-dark p-8 text-white shadow-lift md:p-10">
              <Sprig className="pointer-events-none absolute -right-4 -bottom-6 w-28 rotate-[20deg] text-white/25" />
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-white/80">{p.trial.eyebrow}</p>
              <h2 className="mt-3 text-4xl text-white md:text-5xl">{p.trial.title}</h2>
              <p className="mt-4 max-w-sm text-white/85">{p.trial.text}</p>
              <div className="mt-8 flex items-end gap-6">
                <div>
                  <p className="font-serif text-6xl leading-none">{trialSession.minutes}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/75">min</p>
                </div>
                <div className="pb-1">
                  <p className="font-serif text-3xl">{t.common.free}</p>
                  <p className="text-sm text-white/80">
                    {p.trial.fee} — {formatPrice(trialSession.electrodeFee)}
                  </p>
                </div>
              </div>
              <ButtonLink href="/rezerwacja/?usluga=trial" variant="light" className="mt-9">
                {t.common.book}
              </ButtonLink>
            </article>

            <aside className="reveal rounded-[2rem] border border-line bg-cream p-8">
              <h2 className="flex items-center gap-3 font-sans text-sm font-medium uppercase tracking-[0.2em] text-rose-ink">
                <Info className="size-4" strokeWidth={1.5} aria-hidden />
                {p.notes.title}
              </h2>
              <ul className="mt-5 space-y-3 text-[0.95rem]">
                {p.notes.items.map((note) => (
                  <li key={note} className="flex gap-3">
                    <span className="mt-2.5 size-1 shrink-0 rounded-full bg-rose-dark" aria-hidden />
                    {note}
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          {/* Price menu card, modelled on the studio's own "Cennik" */}
          <div className="reveal relative rounded-[2rem] border border-line bg-white/70 px-6 py-10 shadow-soft sm:px-12 md:py-14">
            <Sprig className="pointer-events-none absolute top-8 left-6 w-10 -rotate-12 text-rose/70 sm:left-10" />
            <Sprig className="pointer-events-none absolute top-8 right-6 w-10 scale-x-[-1] rotate-12 text-rose/70 sm:right-10" />
            <Eyebrow className="text-center">{p.table.eyebrow}</Eyebrow>
            <h2 id="price-title" className="mt-2 text-center font-script text-6xl font-normal text-rose-ink md:text-7xl">
              Cennik
            </h2>
            <ul className="mt-10" aria-label={p.table.title}>
              {priceList.map(({ minutes, price }) => (
                <li key={minutes} className="group flex items-center gap-4 py-3">
                  <span className="font-serif text-2xl whitespace-nowrap text-ink md:text-[1.7rem]">{formatDuration(minutes)}</span>
                  <span className="h-px flex-1 bg-line transition-colors duration-500 group-hover:bg-rose" aria-hidden />
                  <span className="text-right whitespace-nowrap">
                    <span className="font-serif text-2xl text-rose-ink md:text-[1.7rem]">{formatPrice(price)}</span>
                    <span className="block text-[0.7rem] tracking-wide text-muted">
                      ≈ {pricePerMinute(minutes, price)} {t.common.perMinute}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-10 text-center">
              <ButtonLink href="/rezerwacja">{t.common.bookVisit}</ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
