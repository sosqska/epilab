"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SELECTOR = ".reveal, .unmask, .write-host, [data-draw='auto']";
const STAGGER_MS = 90;
const MAX_STAGGER = 5;

/**
 * Adds `.is-visible` to animated elements as they scroll into view (styles live in globals.css).
 * Elements entering together are staggered. `.reveal` is removed afterwards so the element's own
 * hover transitions take over again.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = [...document.querySelectorAll<HTMLElement>(SELECTOR)].filter((el) => !el.classList.contains("is-visible"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const settle = (el: HTMLElement, delay: number) => {
      if (!el.classList.contains("reveal")) return;
      window.setTimeout(() => {
        // Keep .is-visible: the same element may also be a .write-host or .unmask.
        el.classList.remove("reveal");
        el.style.transitionDelay = "";
      }, delay + 1200);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top || a.getBoundingClientRect().left - b.getBoundingClientRect().left);

        entering.forEach((el, i) => {
          const delay = Math.min(i, MAX_STAGGER) * STAGGER_MS;
          if (el.classList.contains("reveal")) el.style.transitionDelay = `${delay}ms`;
          el.classList.add("is-visible");
          observer.unobserve(el);
          settle(el, delay);
        });
      },
      // Threshold 0: decorative sprigs are often mostly clipped by their section and never reach a higher ratio.
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
