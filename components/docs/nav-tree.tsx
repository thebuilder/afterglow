"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

import type { NavSection } from "@/lib/sections";
import { cn } from "@/lib/utils";

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

  const revealActive = useCallback((node: HTMLAnchorElement | null) => {
    if (node && !reveal(node)) {
      // Retry after the drawer or stylesheet gives the panel a height.
      requestAnimationFrame(() => reveal(node));
    }
  }, []);

  return (
    <nav
      aria-label="Documentation"
      className={cn("grid grid-cols-[minmax(0,1fr)] gap-7", className)}
    >
      {sections.map((section) => (
        <div className="grid grid-cols-[minmax(0,1fr)] gap-2" key={section.id}>
          <p className="px-3 font-bold font-mono text-3xs text-phosphor-dim uppercase tracking-terminal-3xl">
            {section.title}
          </p>
          <ul className="grid grid-cols-[minmax(0,1fr)]">
            {section.items.map((item) => {
              const active = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block border-l-2 border-transparent py-1.5 pr-3 pl-2.5 font-mono text-xs outline-none transition-colors",
                      active
                        ? "border-phosphor bg-accent/40 text-phosphor-bright"
                        : "text-muted-foreground hover:border-line-strong hover:text-phosphor focus-visible:border-line-strong focus-visible:text-phosphor"
                    )}
                    href={item.href}
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
