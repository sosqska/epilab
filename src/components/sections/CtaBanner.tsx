import { getDictionary } from "@/i18n";
import { contact } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Sprig } from "@/components/ui/Botanical";
import { ScriptNote } from "@/components/ui/ScriptNote";
import { Eyebrow } from "@/components/ui/Section";

/** Closing booking band, reused at the bottom of most pages. */
export function CtaBanner({ title, text }: { title?: string; text?: string }) {
  const t = getDictionary();
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-blush">
      <Sprig className="pointer-events-none absolute -bottom-6 -left-6 w-32 rotate-[20deg] text-blush-deep md:w-44" />
      <Sprig className="pointer-events-none absolute -top-8 -right-4 w-28 rotate-[200deg] text-blush-deep md:w-40" />
      <Container className="relative grid items-center gap-8 py-16 md:py-20 lg:grid-cols-[1fr_1.4fr_auto] lg:gap-12">
        <ScriptNote className="hidden -rotate-6 lg:block">{t.cta.note}</ScriptNote>
        <div className="reveal text-center lg:text-left">
          <Eyebrow className="mb-3">{t.cta.eyebrow}</Eyebrow>
          <h2 id="cta-title" className="text-4xl md:text-5xl">
            {title ?? t.cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl lg:mx-0">{text ?? t.cta.text}</p>
        </div>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:flex-col">
          <ButtonLink href="/rezerwacja">{t.common.bookVisit}</ButtonLink>
          <ButtonLink href={contact.instagram.href} external variant="ghost" icon="arrow">
            {t.common.writeDirect}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
