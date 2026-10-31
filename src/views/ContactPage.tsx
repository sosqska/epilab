import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { contact } from "@/content/site";
import { getDictionary } from "@/i18n";
import { localePath, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/icons";
import { PageHero } from "@/components/sections/PageHero";
import { OpeningHours } from "@/components/sections/OpeningHours";
import { ContactForm } from "@/components/forms/ContactForm";

export const meta = (locale: Locale) => pageMetadata(locale, "contact", "/kontakt/");

function InfoRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-4 py-5">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blush text-rose-ink">{icon}</span>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted">{label}</p>
        <div className="mt-1 text-ink">{children}</div>
      </div>
    </li>
  );
}

export function ContactPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const c = t.contact;
  const lp = (path: string) => localePath(locale, path);
  const iconCls = "size-5";
  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} lead={c.hero.lead}>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href={lp("/rezerwacja")}>{t.common.bookVisit}</ButtonLink>
          <ButtonLink href={contact.instagram.href} external variant="outline" icon="none">
            <InstagramIcon className="size-[1.1rem]" />
            {t.common.writeDirect}
          </ButtonLink>
        </div>
      </PageHero>

      <Section className="pt-6 md:pt-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          <div className="space-y-8">
            <ul className="reveal divide-y divide-line rounded-[2rem] border border-line bg-white/60 px-6 md:px-8">
              <InfoRow icon={<MapPin className={iconCls} strokeWidth={1.25} aria-hidden />} label={c.details.address}>
                <address className="not-italic">
                  {contact.address.street}
                  <br />
                  {contact.address.city}
                </address>
                <a
                  href={contact.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm text-rose-ink underline-offset-4 hover:underline"
                >
                  {c.details.openMap}
                </a>
              </InfoRow>
              <InfoRow icon={<Phone className={iconCls} strokeWidth={1.25} aria-hidden />} label={c.details.phone}>
                <a href={contact.phone.href} className="hover:text-rose-ink">
                  {contact.phone.display}
                </a>
              </InfoRow>
              <InfoRow icon={<InstagramIcon className={iconCls} />} label={c.details.instagram}>
                <a href={contact.instagram.href} target="_blank" rel="noopener noreferrer" className="hover:text-rose-ink">
                  {contact.instagram.handle}
                </a>
              </InfoRow>
              <InfoRow icon={<Mail className={iconCls} strokeWidth={1.25} aria-hidden />} label={c.details.email}>
                <a href={contact.email.href} className="hover:text-rose-ink">
                  {contact.email.display}
                </a>
              </InfoRow>
              <InfoRow icon={<Clock className={iconCls} strokeWidth={1.25} aria-hidden />} label={c.details.hours}>
                <div className="pt-1 text-body">
                  <OpeningHours locale={locale} compact />
                </div>
                <p className="mt-2 text-xs text-muted">{t.footer.hoursNote}</p>
              </InfoRow>
            </ul>

            <div className="reveal overflow-hidden rounded-[2rem] border border-line bg-blush">
              <iframe
                src={contact.mapEmbedSrc}
                title={c.details.mapTitle}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-80 w-full grayscale-[35%] sepia-[15%]"
              />
            </div>

            <section aria-labelledby="directions-title" className="reveal rounded-[2rem] bg-cream p-7 md:p-8">
              <h2 id="directions-title" className="flex items-center gap-3 text-3xl">
                <Navigation className="size-5 text-rose-dark" strokeWidth={1.25} aria-hidden />
                {c.directions.title}
              </h2>
              <ul className="mt-4 space-y-2 text-[0.95rem] text-muted italic">
                {c.directions.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <section
            aria-labelledby="form-title"
            className="reveal self-start rounded-[2rem] border border-line bg-white/75 p-6 shadow-soft sm:p-10 lg:sticky lg:top-28"
          >
            <h2 id="form-title" className="text-4xl md:text-5xl">
              {c.form.title}
            </h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </section>
        </div>
      </Section>
    </>
  );
}
