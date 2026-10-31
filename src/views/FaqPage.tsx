import { Phone } from "lucide-react";
import { contact } from "@/content/site";
import { getDictionary } from "@/i18n";
import { localePath, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/icons";
import { Sprig } from "@/components/ui/Botanical";
import { PageHero } from "@/components/sections/PageHero";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const meta = (locale: Locale) => pageMetadata(locale, "faq", "/faq/");

export function FaqPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const f = t.faq;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: f.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a.join(" ") },
    })),
  };
  const lp = (path: string) => localePath(locale, path);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHero eyebrow={f.hero.eyebrow} title={f.hero.title} lead={f.hero.lead} />

      <Section className="pt-6 md:pt-10">
        <div className="grid gap-12 lg:grid-cols-[18rem_1fr] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav aria-label={f.hero.title} className="hidden lg:block">
              <ol className="space-y-2.5 border-l border-line">
                {f.items.map((item, i) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="-ml-px block border-l border-transparent pl-5 text-sm leading-snug text-muted transition-colors hover:border-rose-dark hover:text-ink"
                    >
                      <span className="mr-2 font-serif text-rose italic">{String(i + 1).padStart(2, "0")}</span>
                      {item.q}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="relative mt-10 overflow-hidden rounded-card bg-blush p-7">
              <Sprig className="pointer-events-none absolute -right-3 -bottom-4 w-16 rotate-12 text-blush-deep" />
              <h2 className="text-3xl">{f.askTitle}</h2>
              <p className="mt-2 text-sm">{f.askText}</p>
              <div className="mt-5 flex flex-col gap-2 text-sm">
                <a
                  href={contact.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-rose-ink hover:text-ink"
                >
                  <InstagramIcon className="size-4" /> {t.common.writeDirect}
                </a>
                <a href={contact.phone.href} className="inline-flex items-center gap-2 text-rose-ink hover:text-ink">
                  <Phone className="size-4" strokeWidth={1.5} aria-hidden /> {contact.phone.display}
                </a>
              </div>
              <ButtonLink href={lp("/kontakt")} variant="outline" className="relative mt-6 bg-ivory/60">
                {t.common.contactUs}
              </ButtonLink>
            </div>
          </aside>

          <FaqAccordion items={f.items} expandAll={f.expandAll} collapseAll={f.collapseAll} />
        </div>
      </Section>

      <CtaBanner locale={locale} />
    </>
  );
}
