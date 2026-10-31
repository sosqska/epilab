import Image from "next/image";
import { images } from "@/content/site";
import { getDictionary } from "@/i18n";
import { type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/metadata";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { Photo, PhotoPlaceholder } from "@/components/ui/Photo";
import { ScriptNote } from "@/components/ui/ScriptNote";
import { Sprig } from "@/components/ui/Botanical";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { site } from "@/content/site";

export const meta = (locale: Locale) => pageMetadata(locale, "about", "/o-nas/");

export function AboutPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const a = t.about;
  return (
    <>
      <PageHero
        eyebrow={a.hero.eyebrow}
        title={a.hero.title}
        lead={a.hero.lead}
        image="electrodeDetail"
        imageAlt={a.specialist.imageAlt}
        note={a.hero.note}
      />

      {/* Philosophy */}
      <Section labelledBy="philosophy-title">
        <SectionHeading id="philosophy-title" align="center" eyebrow={a.philosophy.eyebrow} title={a.philosophy.title} />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-3">
          {a.philosophy.values.map((v, i) => (
            <li key={v.title} className="reveal bg-ivory p-8 md:p-10">
              <span className="font-serif text-5xl text-rose italic">0{i + 1}</span>
              <h3 className="mt-4 text-3xl">{v.title}</h3>
              <p className="mt-3">{v.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Specialist */}
      <Section tone="cream" labelledBy="specialist-title" className="overflow-hidden">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div className="reveal relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -top-5 -left-5 h-full w-full rounded-photo border border-rose/40" aria-hidden />
            <Photo image="specialist" alt={a.specialist.imageAlt} position="50% 30%" className="aspect-[4/5]" />
          </div>
          <div className="relative">
            <Eyebrow className="reveal mb-4">{a.specialist.eyebrow}</Eyebrow>
            <h2 id="specialist-title" className="reveal text-5xl md:text-6xl">
              {site.specialist}
            </h2>
            <p className="reveal mt-2 text-sm uppercase tracking-[0.2em] text-muted">{a.specialist.role}</p>
            <div className="reveal mt-8 space-y-4 text-lg">
              <p>{a.specialist.p1}</p>
              <p className="text-muted italic">{a.specialist.p2}</p>
            </div>
            <ScriptNote decorative className="reveal mt-8 -rotate-3 text-4xl md:text-5xl">
              {a.specialist.signature}
            </ScriptNote>
          </div>
        </div>
      </Section>

      {/* Qualifications */}
      <Section labelledBy="qual-title">
        <div className="grid items-start gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <SectionHeading id="qual-title" eyebrow={a.qualifications.eyebrow} title={a.qualifications.title} />
            <ul className="mt-10 divide-y divide-line border-y border-line">
              {a.qualifications.items.map((q, i) => (
                <li key={q.title} className="reveal grid grid-cols-[3rem_1fr] gap-4 py-6">
                  <span className="font-serif text-2xl text-rose italic">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-2xl">{q.title}</h3>
                    <p className="mt-1">{q.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <figure className="reveal relative mx-auto w-full max-w-sm rotate-[1.5deg] rounded-photo bg-white p-3 shadow-lift">
            <div className="relative aspect-[2/3] overflow-hidden rounded-2xl">
              <Image
                src={images.certificate.src}
                alt={a.qualifications.imageAlt}
                fill
                sizes="(min-width: 1024px) 24rem, 90vw"
                className="object-cover"
              />
            </div>
          </figure>
        </div>
      </Section>

      {/* Studio */}
      <Section tone="blush" labelledBy="studio-title">
        <SectionHeading id="studio-title" eyebrow={a.studio.eyebrow} title={a.studio.title} intro={a.studio.text} />
        <div className="mt-12 grid gap-4 md:grid-cols-[1.4fr_1fr] md:grid-rows-2">
          {a.studio.placeholders.map((label, i) => (
            <PhotoPlaceholder
              key={label}
              label={label}
              note={t.common.photoSoon}
              className={i === 0 ? "reveal min-h-72 md:row-span-2 md:min-h-[30rem]" : "reveal min-h-56"}
            />
          ))}
        </div>
      </Section>

      {/* Hygiene */}
      <Section labelledBy="hygiene-title" className="overflow-hidden">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="reveal relative grid grid-cols-2 gap-4 self-start">
            <Photo image="needlesWall" alt={a.hygiene.imageAlt} className="aspect-[3/4]" />
            <Photo image="needlesSterile" alt={a.hygiene.imageAlt2} className="mt-12 aspect-[3/4]" />
            <Sprig className="pointer-events-none absolute -bottom-12 left-1/2 w-20 -translate-x-1/2 rotate-90 text-blush-deep" />
          </div>
          <div>
            <SectionHeading id="hygiene-title" eyebrow={a.hygiene.eyebrow} title={a.hygiene.title} intro={a.hygiene.text} />
            <dl className="mt-10 grid gap-8 sm:grid-cols-2">
              {a.hygiene.items.map((item) => (
                <div key={item.title} className="reveal border-t border-rose/40 pt-5">
                  <dt className="font-serif text-2xl text-ink">{item.title}</dt>
                  <dd className="mt-2 text-[0.95rem]">{item.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* Individual approach */}
      <Section tone="cream" labelledBy="approach-title">
        <SectionHeading id="approach-title" align="center" eyebrow={a.approach.eyebrow} title={a.approach.title} />
        <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          <span className="absolute top-6 right-[12%] left-[12%] hidden h-px bg-rose/40 md:block" aria-hidden />
          {a.approach.steps.map((step, i) => (
            <li key={step.title} className="reveal relative text-center">
              <span className="relative mx-auto flex size-12 items-center justify-center rounded-full border border-rose/50 bg-ivory font-serif text-xl text-rose-ink">
                {i + 1}
              </span>
              <h3 className="mt-5 text-2xl">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-[0.95rem]">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBanner locale={locale} />
    </>
  );
}
