import { getDictionary } from "@/i18n";
import { type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { BookingFlow } from "@/components/booking/BookingFlow";

export const meta = (locale: Locale) => pageMetadata(locale, "booking", "/rezerwacja/");

export function BookingPage({ locale }: { locale: Locale }) {
  const b = getDictionary(locale).booking;
  return (
    <>
      <PageHero eyebrow={b.hero.eyebrow} title={b.hero.title} lead={b.hero.lead} />
      <Section className="pt-4 md:pt-8">
        <BookingFlow />
      </Section>
    </>
  );
}
