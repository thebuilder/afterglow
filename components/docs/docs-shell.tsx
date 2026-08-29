import type { ReactNode } from "react";

import { NavTree } from "@/components/docs/nav-tree";
import { SiteHeader } from "@/components/docs/site-header";
import { navSections } from "@/lib/sections";

export function DocsShell({ children }: { children: ReactNode }) {
  const sections = navSections();

  return (
    <div className="min-h-svh">
      <SiteHeader />

      <div className="mx-auto flex w-full max-w-screen-2xl">
        {/* ScrollArea applies overflow too late for the initial nav reveal. */}
        <aside className="docs-sidebar sticky hidden w-60 shrink-0 overflow-y-auto border-line border-r lg:block">
          <NavTree className="px-3 py-8" sections={sections} />
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
