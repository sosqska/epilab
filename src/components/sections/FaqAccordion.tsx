"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

type Item = { id: string; q: string; a: readonly string[] };

export function FaqAccordion({ items, expandAll, collapseAll }: { items: readonly Item[]; expandAll: string; collapseAll: string }) {
  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set([items[0]?.id]));

  // Deep links such as /faq/#przeciwwskazania open (and reveal) the matching answer.
  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!items.some((item) => item.id === id)) return;
      setOpen((prev) => new Set(prev).add(id));
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [items]);

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const allOpen = open.size === items.length;

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(items.map((i) => i.id)))}
          className="text-sm text-rose-ink underline-offset-4 hover:underline"
        >
          {allOpen ? collapseAll : expandAll}
        </button>
      </div>
      <ul className="divide-y divide-line border-y border-line">
        {items.map((item) => {
          const isOpen = open.has(item.id);
          return (
            <li key={item.id} id={item.id} className="scroll-mt-28">
              <h3 className="font-sans text-base">
                <button
                  type="button"
                  id={`${item.id}-q`}
                  aria-expanded={isOpen}
                  aria-controls={`${item.id}-a`}
                  onClick={() => toggle(item.id)}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span
                    className={cn(
                      "font-serif text-2xl leading-snug transition-colors md:text-[1.75rem]",
                      isOpen ? "text-rose-ink" : "text-ink group-hover:text-rose-ink",
                    )}
                  >
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500",
                      isOpen ? "rotate-45 border-rose-dark bg-rose-dark text-white" : "border-line text-rose-ink group-hover:border-rose",
                    )}
                    aria-hidden
                  >
                    <Plus className="size-4" strokeWidth={1.5} />
                  </span>
                </button>
              </h3>
              <div
                id={`${item.id}-a`}
                role="region"
                aria-labelledby={`${item.id}-q`}
                inert={!isOpen}
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-soft)]",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <div className="max-w-3xl space-y-3 pr-12 pb-7">
                    {item.a.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
