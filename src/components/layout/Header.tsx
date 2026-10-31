"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { contact, routes } from "@/content/site";
import { getDictionary } from "@/i18n";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/icons";
import { Sprig } from "@/components/ui/Botanical";
import { Logo } from "./Logo";

const t = getDictionary();

function isActive(pathname: string, href: string) {
  const path = pathname.replace(/\/$/, "") || "/";
  return href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the mobile menu is open: lock page scroll, close on Escape, keep focus inside the panel.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>("a, button")].filter(
          Boolean,
        ) as HTMLElement[];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500",
          scrolled || open ? "border-b border-line/70 bg-ivory/90 shadow-[0_8px_30px_-24px_rgb(110_70_62/0.4)] backdrop-blur-md" : "border-b border-transparent bg-ivory",
        )}
      >
        <div className="mx-auto flex h-20 w-full max-w-[78rem] items-center justify-between gap-6 px-5 sm:px-8">
          <Logo label={t.nav.logoLabel} onClick={close} />
  
          <nav aria-label={t.nav.mainNav} className="hidden xl:block">
            <ul className="flex items-center gap-8">
              {routes.map(({ href, key }) => {
                const active = isActive(pathname, href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative py-2 text-[0.9rem] tracking-wide transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-rose-dark after:transition-transform after:duration-500 hover:text-rose-ink",
                        active ? "text-ink after:scale-x-100" : "text-body after:scale-x-0 hover:after:scale-x-100",
                      )}
                    >
                      {t.nav[key]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
  
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Wrapper handles visibility: ButtonLink's own inline-flex would override `hidden`. */}
            <div className="hidden md:block">
              <ButtonLink href="/rezerwacja" className="px-6 py-3">
                {t.nav.book}
              </ButtonLink>
            </div>
            <a
              href={contact.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hidden rounded-full p-1 text-rose-ink transition-colors hover:text-ink sm:block"
            >
              <InstagramIcon className="size-5" />
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-blush xl:hidden"
            >
              {open ? <X className="size-6" strokeWidth={1.25} /> : <Menu className="size-6" strokeWidth={1.25} />}
            </button>
          </div>
        </div>
      </header>

      {/* Kept outside <header>: its backdrop-filter would become the containing block for this fixed panel. */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto bg-ivory xl:hidden"
      >
        <div className="relative mx-auto flex min-h-full max-w-[78rem] flex-col px-5 pt-6 pb-10 sm:px-8">
          <Sprig className="pointer-events-none absolute right-6 bottom-28 w-24 rotate-12 text-blush-deep" />
          <nav aria-label={t.nav.mainNav}>
            <ul className="divide-y divide-line/80">
              {routes.map(({ href, key }, i) => {
                const active = isActive(pathname, href);
                return (
                  <li key={href} className="animate-rise" style={{ animationDelay: `${i * 40}ms` }}>
                    <Link
                      href={href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between py-4 font-serif text-3xl transition-colors",
                        active ? "text-rose-ink" : "text-ink hover:text-rose-ink",
                      )}
                    >
                      {t.nav[key]}
                      {active && <span className="size-1.5 rounded-full bg-rose-dark" aria-hidden />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-auto flex flex-col gap-4 pt-10">
            <ButtonLink href="/rezerwacja" className="w-full">
              {t.nav.book}
            </ButtonLink>
            <a
              href={contact.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-2 text-rose-ink"
            >
              <InstagramIcon className="size-5" />
              {contact.instagram.handle}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
