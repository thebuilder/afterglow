import type { ReactNode } from "react";

import { HeaderNav } from "@/components/docs/header-nav";
import { DocsSearch } from "@/components/docs/search";
import { SourceLink } from "@/components/docs/source-link";
import { DocsWordmark } from "@/components/docs/wordmark";
import { docsEntry } from "@/lib/sections";

export function SiteHeader({
  before,
  after,
}: {
  before?: ReactNode;
  after?: ReactNode;
}) {
  return (
    <header className="site-header sticky top-0 z-40 flex items-center gap-4 border-line border-b bg-void/85 px-4 backdrop-blur-md sm:gap-6 sm:px-6">
      {before}
      <DocsWordmark />
      <HeaderNav
        links={[
          { href: docsEntry(), label: "Docs", prefixes: ["/docs"] },
          {
            href: "/components",
            label: "Components",
            prefixes: ["/components", "/c/"],
          },
          { href: "/typeset", label: "Typeset", prefixes: ["/typeset"] },
        ]}
      />
      <div className="ml-auto flex min-w-0 items-center gap-4">
        {after}
        <DocsSearch />
        <SourceLink />
      </div>
    </header>
  );
}
