import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { BookingFlow } from "@/components/booking/BookingFlow";

export const metadata = pageMetadata("booking", "/rezerwacja/");

const b = getDictionary().booking;

export default function BookingPage() {
  return (
    <>
      <PageHero eyebrow={b.hero.eyebrow} title={b.hero.title} lead={b.hero.lead} />
      <Section className="pt-4 md:pt-8">
        <BookingFlow />
      </Section>
    </>
  );
}
