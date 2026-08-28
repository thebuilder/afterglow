import type { ReactNode } from "react";

import { HeaderNav } from "@/components/docs/header-nav";
import { DocsSearch } from "@/components/docs/search";
import { SourceLink } from "@/components/docs/source-link";
import { DocsWordmark } from "@/components/docs/wordmark";
import { docsEntry } from "@/lib/sections";

/**
 * One header, on every page.
 *
 * The gallery and the item pages are the same site, and a bar that changes
 * shape between them reads as two. What differs is what each page genuinely
 * has: the item pages need a way at the drawer, because their sidebar is hidden
 * below `lg`, and the gallery has a count of what it is showing.
 */
export function SiteHeader({
  before,
  after,
}: {
  before?: ReactNode;
  after?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-line border-b bg-void/85 px-4 backdrop-blur-md sm:gap-6 sm:px-6">
      {before}
      <DocsWordmark />
      <HeaderNav
        links={[{ href: docsEntry(), label: "Docs", prefix: "/c/" }]}
      />
      <div className="ml-auto flex min-w-0 items-center gap-4">
        {after}
        <DocsSearch />
        <SourceLink />
      </div>
    </header>
  );
}
