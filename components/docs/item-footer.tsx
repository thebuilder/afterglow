import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import type { RegistryItem } from "@/lib/registry";
import { Separator } from "@/registry/terminal/ui/separator";

const LINK =
  "flex items-center gap-2 font-mono text-muted-foreground text-xs outline-none transition-colors hover:text-phosphor focus-visible:text-phosphor";

/** The way on, in the manifest's own order, so the whole registry is walkable. */
export function ItemFooter({
  next,
  previous,
}: {
  next?: RegistryItem;
  previous?: RegistryItem;
}) {
  return (
    <footer className="grid grid-cols-[minmax(0,1fr)] gap-4">
      <Separator />
      <nav className="flex flex-wrap items-center justify-between gap-4">
        {previous ? (
          <Link className={LINK} href={`/c/${previous.name}`}>
            <ChevronLeftIcon className="size-3.5" />
            {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link className={LINK} href={`/c/${next.name}`}>
            {next.title}
            <ChevronRightIcon className="size-3.5" />
          </Link>
        ) : null}
      </nav>
    </footer>
  );
}
