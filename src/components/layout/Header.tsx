"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { contact, routes } from "@/content/site";
import { useDictionary, useLocale } from "@/i18n/client";
import { localePath, splitLocale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/icons";
import { Sprig } from "@/components/ui/Botanical";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

/** `routePath` is the locale-free router path, e.g. "/cennik/". */
function isActive(routePath: string, href: string) {
  const path = routePath.replace(/\/$/, "") || "/";
  return href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);
}

export function Header() {
  const t = useDictionary();
  const locale = useLocale();
  const { path: pathname } = splitLocale(usePathname());
  const lp = (p: string) => localePath(locale, p);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setShowFab(y > window.innerHeight * 0.8);
      // Reading-progress hairline, updated directly to avoid re-rendering on every scroll frame.
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
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
          <Logo label={t.nav.logoLabel} href={lp("/")} onClick={close} />
  
          <nav aria-label={t.nav.mainNav} className="hidden xl:block">
            <ul className="flex items-center gap-8">
              {routes.map(({ href, key }) => {
                const active = isActive(pathname, href);
                return (
                  <li key={href}>
                    <Link
                      href={lp(href)}
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
            <LanguageSwitcher className="hidden sm:flex" />
            {/* Wrapper handles visibility: ButtonLink's own inline-flex would override `hidden`. */}
            <div className="hidden md:block">
              <ButtonLink href={lp("/rezerwacja")} className="px-6 py-3">
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
              {/* Three hairlines that fold into an × */}
              <span className="relative block h-3.5 w-6" aria-hidden>
                <span
                  className={cn(
                    "absolute left-0 h-px w-6 bg-current transition-all duration-500 ease-[var(--ease-soft)]",
                    open ? "top-1/2 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute top-1/2 right-0 h-px bg-current transition-all duration-300",
                    open ? "w-0 opacity-0" : "w-4 opacity-100",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-px w-6 bg-current transition-all duration-500 ease-[var(--ease-soft)]",
                    open ? "top-1/2 -rotate-45" : "top-full",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
        <span
          ref={progressRef}
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-rose/60 to-rose-dark"
          aria-hidden
        />
      </header>

      {/* Kept outside <header>: its backdrop-filter would become the containing block for this fixed panel.
          The panel stays mounted so it can animate; `inert` removes it from focus and AT while closed. */}
      <div
        id="mobile-menu"
        ref={panelRef}
        inert={!open}
        className={cn(
          "fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto bg-ivory transition-[clip-path,visibility] duration-700 ease-[var(--ease-soft)] xl:hidden",
          open ? "visible [clip-path:inset(0_0_0_0)]" : "invisible [clip-path:inset(0_0_100%_0)]",
        )}
      >
        <div className="relative mx-auto flex min-h-full max-w-[78rem] flex-col px-5 pt-6 pb-10 sm:px-8">
          <Sprig drawn={open} className="pointer-events-none absolute right-6 bottom-28 w-24 rotate-12 text-blush-deep" />
          <div
            className={cn(
              "mb-2 flex items-center justify-between transition-opacity duration-700",
              open ? "opacity-100 delay-100" : "opacity-0",
            )}
          >
            <span className="text-xs tracking-[0.2em] text-muted uppercase">{t.nav.language}</span>
            <LanguageSwitcher size="lg" className="w-40" />
          </div>
          <nav aria-label={t.nav.mainNav}>
            <ul className="divide-y divide-line/80">
              {routes.map(({ href, key }, i) => {
                const active = isActive(pathname, href);
                return (
                  <li
                    key={href}
                    className={cn(
                      "transition-[opacity,transform] duration-700 ease-[var(--ease-soft)]",
                      open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
                    )}
                    style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
                  >
                    <Link
                      href={lp(href)}
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
          <div
            className={cn(
              "mt-auto flex flex-col gap-4 pt-10 transition-[opacity,transform] duration-700 ease-[var(--ease-soft)]",
              open ? "translate-y-0 opacity-100 delay-500" : "translate-y-4 opacity-0",
            )}
          >
            <ButtonLink href={lp("/rezerwacja")} className="w-full">
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

      {/* Floating booking button on phones, slides in once the hero is scrolled past */}
      {!isActive(pathname, "/rezerwacja") && (
        <div
          className={cn(
            "fixed right-4 bottom-4 z-30 transition-all duration-700 ease-[var(--ease-soft)] md:hidden",
            showFab && !open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0",
          )}
          inert={!showFab || open}
        >
          <ButtonLink href={lp("/rezerwacja")} className="shadow-lift">
            {t.nav.book}
          </ButtonLink>
        </div>
      )}
    </>
  );
}
