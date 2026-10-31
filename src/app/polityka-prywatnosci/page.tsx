import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";

export const metadata = { ...pageMetadata("privacy", "/polityka-prywatnosci/"), robots: { index: false } };

const p = getDictionary().privacy;

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="EPILAB" title={p.title} lead={p.intro} />
      <Section className="pt-4">
        <div className="mx-auto max-w-3xl divide-y divide-line">
          {p.sections.map((s, i) => (
            <section key={s.title} className="py-8">
              <h2 className="text-3xl">
                <span className="mr-3 font-serif text-rose italic">{i + 1}.</span>
                {s.title}
              </h2>
              <p className="mt-3 text-muted italic">{s.text}</p>
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
