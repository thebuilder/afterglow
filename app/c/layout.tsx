import type { ReactNode } from "react";

import { MobileNav } from "@/components/docs/mobile-nav";
import { NavTree } from "@/components/docs/nav-tree";
import { SiteHeader } from "@/components/docs/site-header";
import { navSections } from "@/lib/sections";

/**
 * The shell every item page is read inside.
 *
 * The nav is built here rather than in each page so it is one tree with one
 * scroll position, which is the whole point of a sidebar: moving between two
 * components should not throw away where you were in the list.
 *
 * The landing page does not use this layout. It is the gallery, it wants the
 * full width, and a sidebar on it would be a table of contents for a page you
 * are already looking at.
 */
export default function DocsLayout({ children }: { children: ReactNode }) {
  const sections = navSections();

  return (
    <div className="min-h-svh">
      <SiteHeader before={<MobileNav sections={sections} />} />

      <div className="mx-auto flex w-full max-w-[100rem]">
        {/* A plain overflow container, not the registry's `ScrollArea`. The
            theme already paints native scrollbars in the beam's colour, and
            `ScrollArea` applies its overflow in an effect, which puts the
            column one frame behind the nav trying to scroll inside it. */}
        <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-60 shrink-0 overflow-y-auto border-line border-r lg:block">
          <NavTree className="px-3 py-8" sections={sections} />
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
