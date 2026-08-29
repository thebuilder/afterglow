import type { ReactNode } from "react";

import { MobileNav } from "@/components/docs/mobile-nav";
import { NavTree } from "@/components/docs/nav-tree";
import { SiteHeader } from "@/components/docs/site-header";
import { navSections } from "@/lib/sections";

export default function DocsLayout({ children }: { children: ReactNode }) {
  const sections = navSections();

  return (
    <div className="min-h-svh">
      <SiteHeader before={<MobileNav sections={sections} />} />

      <div className="mx-auto flex w-full max-w-[100rem]">
        {/* ScrollArea applies overflow too late for the initial nav reveal. */}
        <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-60 shrink-0 overflow-y-auto border-line border-r lg:block">
          <NavTree className="px-3 py-8" sections={sections} />
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
