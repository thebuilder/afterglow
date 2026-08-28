"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

/**
 * The one link that is not the wordmark.
 *
 * It stays in the header on the pages it points at, marked rather than hidden.
 * A header that drops an item once you are inside it changes shape between two
 * pages of the same site, and the header is the one thing that should not.
 */
export function HeaderNav({
  links,
}: {
  links: { href: string; label: string; prefix: string }[];
}) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-4">
      {links.map((link) => (
        <Link
          aria-current={pathname.startsWith(link.prefix) ? "page" : undefined}
          className={cn(
            "font-mono font-semibold text-[0.625rem] uppercase tracking-[0.12em] outline-none transition-colors hover:text-phosphor focus-visible:text-phosphor",
            pathname.startsWith(link.prefix)
              ? "text-phosphor-bright"
              : "text-muted-foreground"
          )}
          href={link.href}
          key={link.href}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
