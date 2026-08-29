"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

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
            "font-mono font-semibold text-2xs uppercase tracking-terminal-lg outline-none transition-colors hover:text-phosphor focus-visible:text-phosphor",
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
