import { HeaderNav } from "@/components/docs/header-nav";
import { MobileNav } from "@/components/docs/mobile-nav";
import { PhosphorMenu } from "@/components/docs/phosphor-menu";
import { DocsSearch } from "@/components/docs/search";
import { SourceLink } from "@/components/docs/source-link";
import { DocsWordmark } from "@/components/docs/wordmark";
import { docsEntry, navSections } from "@/lib/sections";

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-40 flex items-center gap-3 border-line border-b bg-void/85 px-4 backdrop-blur-md sm:gap-6 sm:px-6">
      <MobileNav sections={navSections()} />
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
      <div className="ml-auto flex min-w-0 items-center gap-3 sm:gap-4">
        <PhosphorMenu />
        <DocsSearch />
        <SourceLink />
      </div>
    </header>
  );
}
