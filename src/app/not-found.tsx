import { getDictionary } from "@/i18n";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { LocaleShell } from "@/components/layout/LocaleShell";

// Static hosting serves a single 404 page, so it is shown in the default language.
export default function NotFound() {
  const t = getDictionary("pl");
  return (
    <LocaleShell locale="pl">
      <PageHero eyebrow="404" title={t.notFound.title} lead={t.notFound.text}>
        <ButtonLink href="/" variant="outline">
          {t.notFound.back}
        </ButtonLink>
      </PageHero>
    </LocaleShell>
  );
}
