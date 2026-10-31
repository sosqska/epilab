import { getDictionary } from "@/i18n";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";

const t = getDictionary();

export default function NotFound() {
  return (
    <PageHero eyebrow="404" title={t.notFound.title} lead={t.notFound.text}>
      <ButtonLink href="/" variant="outline">
        {t.notFound.back}
      </ButtonLink>
    </PageHero>
  );
}
