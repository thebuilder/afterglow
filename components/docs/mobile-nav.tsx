"use client";

import { MenuIcon } from "lucide-react";
import { useCallback, useState } from "react";

import { NavTree } from "@/components/docs/nav-tree";
import type { NavSection } from "@/lib/sections";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/registry/terminal/ui/sheet";

/**
 * The same tree, in a drawer, below the width where a column fits.
 *
 * It closes on navigation. Base UI keeps the panel mounted until its closing
 * animation has run, so a drawer left open behind the page you just moved to is
 * a drawer that is still there when you come back.
 */
export function MobileNav({ sections }: { sections: NavSection[] }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger
        aria-label="Open the registry index"
        className="grid size-9 shrink-0 place-items-center border border-line text-phosphor-dim outline-none transition-colors hover:border-line-strong hover:text-phosphor-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-phosphor-bright lg:hidden"
      >
        <MenuIcon className="size-4" />
      </SheetTrigger>
      <SheetContent
        className="w-[min(20rem,85vw)] gap-6 overflow-y-auto p-0 pt-6 pb-10"
        side="left"
      >
        <SheetTitle className="px-6 font-bold font-mono text-[0.625rem] text-phosphor uppercase tracking-[0.18em]">
          Registry
        </SheetTitle>
        <SheetDescription className="sr-only">
          Every item in the afterglow registry, grouped by kind.
        </SheetDescription>
        <NavTree className="px-3" onNavigate={close} sections={sections} />
      </SheetContent>
    </Sheet>
  );
}
