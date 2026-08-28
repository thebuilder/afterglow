"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

import type { NavSection } from "@/lib/sections";
import { cn } from "@/lib/utils";

/** The panel this list is scrolling inside, whichever of the two it is. */
function scrollParent(node: HTMLElement): HTMLElement | null {
  let parent = node.parentElement;

  while (parent) {
    const { overflowY } = getComputedStyle(parent);
    const scrolls = overflowY === "auto" || overflowY === "scroll";

    if (scrolls && parent.scrollHeight > parent.clientHeight) {
      return parent;
    }
    parent = parent.parentElement;
  }

  return null;
}

/**
 * Bring a row into its panel, and leave the panel alone if it is already there.
 *
 * The second half is what stops this being annoying. Clicking a row you can see
 * would otherwise pull the list out from under the click; only a row that is
 * off screen, which is how you arrive from a link or a search result, is worth
 * moving for.
 *
 * `scrollIntoView` is the obvious call and it is the wrong one here: in the
 * drawer this list sits inside a popup that is still sliding, and the browser
 * declines to scroll a transformed subtree to a position it is about to leave.
 * Two rects are unaffected by that, because the transform applies to both.
 *
 * Reports whether it found a panel at all, so the caller can try again once
 * there is one.
 */
function reveal(node: HTMLElement): boolean {
  const panel = scrollParent(node);
  if (!panel) {
    return false;
  }

  const row = node.getBoundingClientRect();
  const frame = panel.getBoundingClientRect();

  if (row.top >= frame.top && row.bottom <= frame.bottom) {
    return true;
  }

  panel.scrollTop +=
    row.top - frame.top - (panel.clientHeight - row.height) / 2;
  return true;
}

/**
 * The list of every item, grouped, with the one you are reading marked.
 *
 * The mark is a lit bar in the left gutter rather than a filled row. A row that
 * fills is a row that has been selected; a bar beside it is a position in a
 * list, which is what the sidebar is actually reporting.
 */
export function NavTree({
  className,
  onNavigate,
  sections,
}: {
  className?: string;
  onNavigate?: () => void;
  sections: NavSection[];
}) {
  const pathname = usePathname();

  /*
    Fifty-one items is taller than the column, so landing on one near the bottom
    otherwise shows a list with no visible mark in it.

    A second attempt a frame later covers the case where the column has no
    height yet, and so nothing to scroll: `next dev` serves the stylesheet after
    hydration, and a fresh page load lands in that window every time.
  */
  const revealActive = useCallback((node: HTMLAnchorElement | null) => {
    if (node && !reveal(node)) {
      requestAnimationFrame(() => reveal(node));
    }
  }, []);

  return (
    <nav
      aria-label="Registry"
      className={cn("grid grid-cols-[minmax(0,1fr)] gap-7", className)}
    >
      {sections.map((section) => (
        <div className="grid grid-cols-[minmax(0,1fr)] gap-2" key={section.id}>
          <p className="px-3 font-bold font-mono text-[0.5625rem] text-phosphor-dim uppercase tracking-[0.18em]">
            {section.title}
          </p>
          <ul className="grid grid-cols-[minmax(0,1fr)]">
            {section.items.map((item) => {
              const href = `/c/${item.name}`;
              const active = pathname === href;

              return (
                <li key={item.name}>
                  <Link
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block border-l-2 border-transparent py-1.5 pr-3 pl-[calc(0.75rem-2px)] font-mono text-xs outline-none transition-colors",
                      active
                        ? "border-phosphor bg-accent/40 text-phosphor-bright"
                        : "text-muted-foreground hover:border-line-strong hover:text-phosphor focus-visible:border-line-strong focus-visible:text-phosphor"
                    )}
                    href={href}
                    onClick={onNavigate}
                    ref={active ? revealActive : undefined}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
