import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { contact, credit, routes, site } from "@/content/site";
import { getDictionary } from "@/i18n";
import { localePath, type Locale } from "@/i18n/config";
import { Container } from "@/components/ui/Container";
import { ScriptNote } from "@/components/ui/ScriptNote";
import { FacebookIcon, InstagramIcon } from "@/components/ui/icons";
import { Logo } from "./Logo";
import { OpeningHours } from "@/components/sections/OpeningHours";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const lp = (path: string) => localePath(locale, path);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-cream">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr] lg:gap-10">
        <div className="space-y-5">
          <Logo label={t.nav.logoLabel} href={lp("/")} full />
          <p className="max-w-xs text-sm">{t.footer.about}</p>
          <div className="flex gap-3">
            <a
              href={contact.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex size-10 items-center justify-center rounded-full border border-line text-rose-ink transition-colors hover:border-rose-dark hover:bg-white"
            >
              <InstagramIcon className="size-[1.1rem]" />
            </a>
            <a
              href={contact.facebook.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex size-10 items-center justify-center rounded-full border border-line text-rose-ink transition-colors hover:border-rose-dark hover:bg-white"
            >
              <FacebookIcon className="size-[1.1rem]" />
            </a>
          </div>
        </div>

        <nav aria-label={t.footer.navHeading}>
          <h2 className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.22em] text-rose-ink">{t.footer.navHeading}</h2>
          <ul className="space-y-2 text-sm">
            {routes.map(({ href, key }) => (
              <li key={href}>
                <Link href={lp(href)} className="transition-colors hover:text-rose-ink">
                  {t.nav[key]}
                </Link>
              </li>
            ))}
            <li>
              <Link href={lp("/rezerwacja")} className="transition-colors hover:text-rose-ink">
                {t.common.bookVisit}
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.22em] text-rose-ink">{t.footer.contactHeading}</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-rose-dark" strokeWidth={1.5} aria-hidden />
              <address className="not-italic">
                {contact.address.street}
                <br />
                {contact.address.city}
              </address>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-rose-dark" strokeWidth={1.5} aria-hidden />
              <a href={contact.phone.href} className="hover:text-rose-ink">
                {contact.phone.display}
              </a>
            </li>
            <li className="flex gap-3">
              <InstagramIcon className="mt-0.5 size-4 shrink-0 text-rose-dark" />
              <a href={contact.instagram.href} target="_blank" rel="noopener noreferrer" className="hover:text-rose-ink">
                {contact.instagram.handle}
              </a>
            </li>
          </ul>
        </div>

        <div className="relative">
          <h2 className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.22em] text-rose-ink">{t.footer.hoursHeading}</h2>
          <OpeningHours locale={locale} compact />
          <p className="mt-3 text-xs text-muted">{t.footer.hoursNote}</p>
          <ScriptNote className="mt-6 -rotate-6 text-xl md:text-2xl">{t.footer.signature}</ScriptNote>
        </div>
      </Container>

      <div className="border-t border-line/80">
        <Container className="flex flex-col gap-3 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {t.footer.rights}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <Link href={lp("/polityka-prywatnosci")} className="hover:text-rose-ink">
              {t.footer.privacy}
            </Link>
            <a
              href={credit.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 transition-colors hover:text-rose-ink"
            >
              {t.footer.madeBy}
              <span className="font-medium tracking-wide text-ink transition-colors group-hover:text-rose-ink">{credit.name}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
                ↗
              </span>
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
