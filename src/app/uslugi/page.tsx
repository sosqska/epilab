import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { CheckList } from "@/components/ui/CheckList";
import { ScriptNote } from "@/components/ui/ScriptNote";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata = pageMetadata("services", "/uslugi/");

const t = getDictionary();
const s = t.services;

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow={s.hero.eyebrow} title={s.hero.title} lead={s.hero.lead}>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <ButtonLink href="/rezerwacja">{t.common.book}</ButtonLink>
          <ButtonLink href="#obszary" variant="ghost">
            {s.areas.eyebrow}
          </ButtonLink>
        </div>
      </PageHero>

      {/* How it works */}
      <Section labelledBy="how-title" className="pt-10 md:pt-14">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="reveal relative mx-auto w-full max-w-md lg:max-w-none">
            <Photo image="electrodeHold" alt={s.hero.imageAlt} className="aspect-[4/5]" />
          </div>
          <div>
            <SectionHeading id="how-title" eyebrow={s.about.eyebrow} title={s.about.title} />
            <div className="reveal mt-6 space-y-4 text-lg">
              <p>{s.about.p1}</p>
              <p>{s.about.p2}</p>
            </div>
            <h3 className="reveal mt-12 font-sans text-xs font-medium uppercase tracking-[0.24em] text-rose-ink">{s.steps.eyebrow}</h3>
            <ol className="mt-5 space-y-0">
              {s.steps.items.map((step, i) => (
                <li key={step.title} className="reveal relative grid grid-cols-[2.75rem_1fr] gap-4 pb-7 last:pb-0">
                  {i < s.steps.items.length - 1 && <span className="absolute top-11 bottom-1 left-[1.375rem] w-px bg-line" aria-hidden />}
                  <span className="flex size-11 items-center justify-center rounded-full bg-blush font-serif text-lg text-rose-ink">
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <p className="font-serif text-2xl text-ink">{step.title}</p>
                    <p className="mt-1 text-[0.95rem]">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* Treatment areas */}
      <Section tone="cream" id="obszary" labelledBy="areas-title" className="scroll-mt-20">
        <SectionHeading id="areas-title" eyebrow={s.areas.eyebrow} title={s.areas.title} intro={s.areas.text} />
        <div className="mt-14 space-y-14">
          {s.areas.groups.map((group) => (
            <div key={group.title}>
              <div className="reveal mb-6 flex items-center gap-5">
                <h3 className="text-3xl italic">{group.title}</h3>
                <span className="h-px flex-1 bg-line" aria-hidden />
                <span className="text-xs uppercase tracking-[0.2em] text-muted">{group.items.length}</span>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((area) => (
                  <li
                    key={area.title}
                    className="reveal group relative overflow-hidden rounded-card border border-line bg-ivory/80 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-rose/50 hover:bg-white hover:shadow-lift"
                  >
                    <span
                      className="absolute -top-10 -right-10 size-28 rounded-full bg-blush transition-transform duration-700 group-hover:scale-125"
                      aria-hidden
                    />
                    <h4 className="relative text-[1.65rem]">{area.title}</h4>
                    <p className="relative mt-2 text-[0.95rem]">{area.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Benefits */}
      <section aria-labelledby="benefits-title" className="bg-ink py-20 text-white/80 md:py-24">
        <Container>
          <div className="reveal max-w-2xl">
            <p className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.24em] text-rose">{s.benefits.eyebrow}</p>
            <h2 id="benefits-title" className="text-4xl text-white md:text-5xl">
              {s.benefits.title}
            </h2>
          </div>
          <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            {s.benefits.items.map((b, i) => (
              <li key={b.title} className="reveal border-t border-white/20 pt-6">
                <span className="font-serif text-lg text-rose italic">0{i + 1}</span>
                <h3 className="mt-2 text-2xl text-white">{b.title}</h3>
                <p className="mt-2 text-[0.95rem]">{b.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Who it's for */}
      <Section labelledBy="for-title" className="overflow-hidden">
        <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <SectionHeading id="for-title" eyebrow={s.suitability.eyebrow} title={s.suitability.title} />
            <CheckList items={s.suitability.items} className="reveal mt-8 text-lg" />
            <div className="reveal mt-10 rounded-card border border-line bg-cream p-6">
              <p>{s.suitability.note}</p>
              <Link
                href="/faq/#przeciwwskazania"
                className="group mt-3 inline-flex items-center gap-2 font-medium text-rose-ink underline-offset-4 hover:underline"
              >
                {s.suitability.faqLink}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} aria-hidden />
              </Link>
            </div>
          </div>
          <div className="reveal relative mx-auto w-full max-w-sm">
            <Photo image="razorVsElectrode" alt={s.suitability.imageAlt} className="aspect-[3/4]" />
            <ScriptNote className="absolute -bottom-8 -left-6 -rotate-6 rounded-2xl bg-ivory/95 px-5 py-3 shadow-soft">
              {t.home.intro.note}
            </ScriptNote>
          </div>
        </div>
      </Section>

      <CtaBanner title={s.cta.title} text={s.cta.text} />
    </>
  );
}
