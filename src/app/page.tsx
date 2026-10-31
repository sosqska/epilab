import Link from "next/link";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import { contact, siteUrl, images } from "@/content/site";
import { priceList } from "@/content/pricing";
import { getDictionary } from "@/i18n";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { ScriptNote } from "@/components/ui/ScriptNote";
import { Flourish, Sprig } from "@/components/ui/Botanical";
import { CheckList } from "@/components/ui/CheckList";
import { ContentIcon, InstagramIcon } from "@/components/ui/icons";
import { PriceCards } from "@/components/sections/PriceCards";
import { ReviewCards } from "@/components/sections/ReviewCards";
import { InstagramGrid } from "@/components/sections/InstagramGrid";
import { OpeningHours } from "@/components/sections/OpeningHours";
import { Ticker } from "@/components/sections/Ticker";

const t = getDictionary();
const h = t.home;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "EPILAB — Elektroepilacja Kielce",
  description: t.meta.description,
  url: siteUrl,
  image: `${new URL(siteUrl).origin}${images.specialist.src}`,
  address: { "@type": "PostalAddress", addressLocality: "Kielce", addressCountry: "PL" },
  priceRange: `${priceList[0].price}–${priceList[priceList.length - 1].price} PLN`,
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blush via-cream to-ivory">
        <Container className="relative grid min-h-[min(46rem,calc(100svh-5rem))] items-center gap-10 py-14 lg:grid-cols-2 lg:py-0">
          <div className="relative z-10 lg:py-24 lg:pr-6">
            <Eyebrow className="animate-rise mb-6">{h.hero.eyebrow}</Eyebrow>
            {/* Each line rises out of its own mask; padding keeps descenders and the italic overhang inside it. */}
            <h1 className="text-[clamp(2.4rem,11vw,3.4rem)] leading-[1.02] sm:text-7xl lg:text-[5.4rem]">
              <span className="-mb-[0.12em] block overflow-hidden pr-[0.1em] pb-[0.12em]">
                <span className="animate-line-up block [animation-delay:120ms]">{h.hero.titleA}</span>
              </span>
              <span className="-mb-[0.12em] block overflow-hidden pr-[0.15em] pb-[0.12em]">
                <span className="animate-line-up block font-normal text-rose-dark italic [animation-delay:260ms]">{h.hero.titleB}</span>
              </span>
            </h1>
            <p className="animate-rise mt-7 max-w-lg text-lg [animation-delay:420ms]">{h.hero.lead}</p>
            <div className="animate-rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 [animation-delay:540ms]">
              <ButtonLink href="/rezerwacja">{t.common.book}</ButtonLink>
              <ButtonLink href="/uslugi" variant="ghost">
                {t.common.learnMore}
              </ButtonLink>
            </div>
            <Link
              href="/cennik"
              className="animate-rise mt-10 inline-flex items-center gap-3 rounded-full border border-line bg-white/70 py-2 pr-5 pl-2 text-sm backdrop-blur transition-colors [animation-delay:660ms] hover:border-rose"
            >
              <span className="rounded-full bg-blush px-3 py-1 text-xs font-medium tracking-wide text-rose-ink">20 min</span>
              <span>
                <span className="text-ink">{h.hero.trial}</span>
                <span className="text-muted"> · {h.hero.trialNote}</span>
              </span>
            </Link>
          </div>

          <div className="animate-rise relative -mx-5 h-[30rem] [animation-delay:200ms] sm:mx-0 sm:h-[36rem] lg:absolute lg:inset-y-12 lg:right-8 lg:left-[52%] lg:mx-0 lg:h-auto">
            <Photo
              image="specialist"
              alt={h.hero.imageAlt}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              position="50% 35%"
              className="h-full rounded-none sm:rounded-photo lg:rounded-[2rem]"
            />
            <ScriptNote className="absolute right-6 bottom-8 -rotate-[8deg] text-white drop-shadow-[0_2px_8px_rgb(0_0_0/0.35)] md:right-10 md:bottom-12 md:text-4xl">
              {h.hero.note}
            </ScriptNote>
          </div>
        </Container>
      </section>

      {/* Feature strip */}
      <section aria-label={h.hero.eyebrow} className="border-y border-line/70 bg-ivory">
        <Container>
          <ul className="grid grid-cols-2 gap-y-10 py-12 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-line">
            {h.features.map((f, i) => (
              <li
                key={f.title}
                className={`reveal group flex flex-col items-center px-4 text-center ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}
              >
                <span className="flex size-14 items-center justify-center rounded-full bg-blush text-rose-ink transition-transform duration-700 ease-[var(--ease-soft)] group-hover:-translate-y-1 group-hover:rotate-[8deg]">
                  <ContentIcon name={f.icon} className="size-6" />
                </span>
                <h2 className="mt-4 font-sans text-[0.95rem] font-medium tracking-wide text-ink">{f.title}</h2>
                <p className="mt-2 max-w-[15rem] text-sm text-muted">{f.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* What is electrolysis */}
      <Section labelledBy="intro-title" className="overflow-hidden">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="reveal relative">
            <Photo image="electrodeHold" alt={h.intro.imageAlt} className="aspect-[4/5] max-h-[38rem] w-full" />
            <ScriptNote className="absolute -right-2 -bottom-8 rotate-[-7deg] rounded-2xl bg-ivory/95 px-5 py-3 shadow-soft sm:-right-8">
              {h.intro.note}
            </ScriptNote>
          </div>
          <div className="relative">
            <Sprig className="pointer-events-none absolute -top-10 right-0 hidden w-24 rotate-12 text-blush-deep lg:block" />
            <SectionHeading id="intro-title" eyebrow={h.intro.eyebrow} title={h.intro.title} />
            <div className="reveal mt-6 space-y-4 text-lg">
              <p>{h.intro.p1}</p>
              <p className="border-l-2 border-rose/60 pl-5 font-serif text-2xl leading-snug text-ink italic">{h.intro.p2}</p>
            </div>
            <CheckList items={h.intro.points} className="reveal mt-8" />
            <div className="reveal mt-10">
              <ButtonLink href="/uslugi" variant="outline">
                {t.common.allServices}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* Pricing preview */}
      <Section tone="cream" labelledBy="pricing-title">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <SectionHeading id="pricing-title" eyebrow={h.pricing.eyebrow} title={h.pricing.title} />
          <div className="reveal space-y-6 lg:pb-2">
            <p className="text-lg">{h.pricing.text}</p>
            <ButtonLink href="/cennik" variant="outline">
              {t.common.fullPricing}
            </ButtonLink>
          </div>
        </div>
        <PriceCards />
      </Section>

      <Ticker words={h.ticker} />

      {/* Why EPILAB */}
      <Section labelledBy="why-title">
        <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <div>
            <SectionHeading id="why-title" eyebrow={h.why.eyebrow} title={h.why.title} />
            <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {h.why.items.map((item) => (
                <li key={item.title} className="reveal flex gap-5">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-line text-rose-ink">
                    <ContentIcon name={item.icon} className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-2xl">{item.title}</h3>
                    <p className="mt-1.5 text-[0.95rem]">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal relative mx-auto w-full max-w-md">
            <Photo image="razorVsElectrode" alt={h.why.imageAlt} className="aspect-[4/5]" position="50% 40%" />
            <div className="absolute -bottom-10 -left-4 max-w-[17rem] rounded-2xl bg-ivory/95 px-5 py-4 shadow-soft sm:-left-12">
              <ScriptNote className="text-xl md:text-2xl">{h.why.note}</ScriptNote>
              <Flourish className="mt-1 w-24 text-rose" />
            </div>
          </div>
        </div>
      </Section>

      {/* Reviews */}
      <Section tone="blush" labelledBy="reviews-title" className="bg-gradient-to-b from-blush to-cream">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="reviews-title" eyebrow={h.reviews.eyebrow} title={h.reviews.title} intro={h.reviews.text} />
          <ButtonLink href="/opinie" variant="outline" className="reveal self-start md:self-auto">
            {t.common.allReviews}
          </ButtonLink>
        </div>
        <ReviewCards limit={3} />
      </Section>

      {/* Instagram */}
      <Section labelledBy="instagram-title">
        <SectionHeading
          id="instagram-title"
          align="center"
          eyebrow={h.instagram.eyebrow}
          title={h.instagram.title}
          intro={h.instagram.text}
        />
        <div className="mt-12">
          <InstagramGrid />
        </div>
        <div className="mt-10 text-center">
          <a
            href={contact.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 text-rose-ink transition-colors hover:text-ink"
          >
            <InstagramIcon className="size-5" />
            <span className="border-b border-rose/50 pb-0.5">{contact.instagram.handle}</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} aria-hidden />
          </a>
        </div>
      </Section>

      {/* Contact & booking */}
      <section aria-labelledby="book-title" className="relative overflow-hidden bg-blush py-20 md:py-24">
        <Sprig className="pointer-events-none absolute -bottom-8 -left-8 w-40 rotate-[24deg] text-blush-deep" />
        <Container className="relative">
          <div className="grid gap-10 rounded-[2rem] border border-white/70 bg-ivory/80 p-8 shadow-soft backdrop-blur md:p-12 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-12">
            <div className="reveal">
              <Eyebrow className="mb-3">{h.contact.eyebrow}</Eyebrow>
              <h2 id="book-title" className="text-4xl md:text-5xl">
                {h.contact.title}
              </h2>
              <p className="mt-4">{h.contact.text}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/rezerwacja">{h.contact.bookOnline}</ButtonLink>
                <ButtonLink href={contact.instagram.href} external variant="outline" icon="none">
                  <InstagramIcon className="size-[1.1rem]" />
                  {t.common.writeDirect}
                </ButtonLink>
              </div>
            </div>
            <ul className="reveal space-y-5 lg:border-l lg:border-line lg:pl-10">
              <li className="flex gap-4">
                <MapPin className="mt-1 size-5 shrink-0 text-rose-dark" strokeWidth={1.25} aria-hidden />
                <div>
                  <p className="text-ink">{contact.address.street}</p>
                  <p className="text-sm">{contact.address.city}</p>
                  <Link href="/kontakt" className="mt-1 inline-block text-sm text-rose-ink underline-offset-4 hover:underline">
                    {t.contact.details.openMap}
                  </Link>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-1 size-5 shrink-0 text-rose-dark" strokeWidth={1.25} aria-hidden />
                <a href={contact.phone.href} className="text-ink hover:text-rose-ink">
                  {contact.phone.display}
                </a>
              </li>
              <li className="flex gap-4">
                <InstagramIcon className="mt-1 size-5 shrink-0 text-rose-dark" />
                <a href={contact.instagram.href} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-rose-ink">
                  {contact.instagram.handle}
                </a>
              </li>
            </ul>
            <div className="reveal lg:border-l lg:border-line lg:pl-10">
              <p className="mb-4 flex items-center gap-3 text-ink">
                <Clock className="size-5 text-rose-dark" strokeWidth={1.25} aria-hidden />
                {t.footer.hoursHeading}
              </p>
              <OpeningHours />
              <p className="mt-4 text-sm text-muted">{t.footer.hoursNote}</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
