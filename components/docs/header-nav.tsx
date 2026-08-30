"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function HeaderNav({
  links,
}: {
  links: { href: string; label: string; prefixes: string[] }[];
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden items-center gap-4 lg:flex">
      {links.map((link) => {
        const active = link.prefixes.some((prefix) =>
          pathname.startsWith(prefix)
        );

        return (
          <Link
            aria-current={active ? "page" : undefined}
            className={cn(
              "font-mono font-semibold text-2xs uppercase tracking-terminal-lg outline-none transition-colors hover:text-phosphor focus-visible:text-phosphor",
              active ? "text-phosphor-bright" : "text-muted-foreground"
            )}
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
