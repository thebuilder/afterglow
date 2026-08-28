"use client";

import { useEffect, useState } from "react";

import type { TocEntry } from "@/lib/toc";
import { cn } from "@/lib/utils";

/**
 * The headings of the page, with the one you are level with lit.
 *
 * The observer watches a band across the top of the viewport rather than the
 * whole of it, so the active entry is the heading you have most recently
 * reached rather than whichever section happens to be tallest. The last
 * heading in the band wins, because scrolling down should move the mark down.
 */
export function Toc({
  className,
  entries,
}: {
  className?: string;
  entries: TocEntry[];
}) {
  const [active, setActive] = useState<string | undefined>(entries[0]?.id);

  useEffect(() => {
    const headings = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((node): node is HTMLElement => node !== null);

    if (headings.length === 0) {
      return;
    }

    const seen = new Set<string>();

    const observer = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          if (record.isIntersecting) {
            seen.add(record.target.id);
          } else {
            seen.delete(record.target.id);
          }
        }

        const lit = entries.filter((entry) => seen.has(entry.id)).at(-1);
        if (lit) {
          setActive(lit.id);
        }
      },
      /* The band is just under the sticky header, and shallow, so the
         mark tracks the heading you have reached rather than the tallest
         section on screen. Pixels: `rootMargin` rejects any other unit. */
      { rootMargin: "-72px 0px -70% 0px" }
    );

    for (const heading of headings) {
      observer.observe(heading);
    }

    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) {
    return null;
  }

  return (
    <nav aria-label="On this page" className={className}>
      <p className="px-3 pb-2 font-bold font-mono text-[0.5625rem] text-phosphor-dim uppercase tracking-[0.18em]">
        On this page
      </p>
      <ul className="grid grid-cols-[minmax(0,1fr)]">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              className={cn(
                "block border-l-2 border-transparent py-1.5 pr-3 pl-[calc(0.75rem-2px)] text-xs outline-none transition-colors",
                active === entry.id
                  ? "border-phosphor text-phosphor-bright"
                  : "text-muted-foreground hover:border-line-strong hover:text-phosphor focus-visible:border-line-strong focus-visible:text-phosphor"
              )}
              href={`#${entry.id}`}
            >
              {entry.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
