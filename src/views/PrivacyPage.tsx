import { contact, site } from "@/content/site";
import { getDictionary } from "@/i18n";
import { type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";

export const meta = (locale: Locale) => ({ ...pageMetadata(locale, "privacy", "/polityka-prywatnosci/"), robots: { index: false } });

const fields: Record<string, string> = {
  owner: site.owner,
  address: `${contact.address.street}, ${contact.address.city}`,
  email: contact.email.display,
  phone: contact.phone.display,
  instagram: contact.instagram.handle,
};

const fill = (text: string) => text.replace(/\{(\w+)\}/g, (match, key: string) => fields[key] ?? match);

export function PrivacyPage({ locale }: { locale: Locale }) {
  const p = getDictionary(locale).privacy;
  return (
    <>
      <PageHero eyebrow="EPILAB" title={p.title} lead={p.intro} />
      <Section className="pt-4">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-muted">{p.updated}</p>
          <div className="mt-2 divide-y divide-line">
            {p.sections.map((s, i) => (
              <section key={s.title} className="py-8">
                <h2 className="text-3xl">
                  <span className="mr-3 font-serif text-rose italic">{i + 1}.</span>
                  {s.title}
                </h2>
                <div className="mt-3 space-y-3">
                  {s.body?.map((text) => <p key={text}>{fill(text)}</p>)}
                  {s.list && (
                    <ul className="list-disc space-y-1.5 pl-5 marker:text-rose">
                      {s.list.map((item) => (
                        <li key={item}>{fill(item)}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
