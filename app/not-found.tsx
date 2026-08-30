import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import { SiteHeader } from "@/components/docs/site-header";
import { Caret } from "@/registry/terminal/components/caret";
import { Connector } from "@/registry/terminal/components/connector";
import { Button } from "@/registry/terminal/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-svh">
      <SiteHeader />
      <main
        className="mx-auto grid min-h-[calc(100svh-3.5rem)] max-w-6xl place-content-center gap-6 px-6 py-20"
        id="main-content"
        tabIndex={-1}
      >
        <p className="font-bold font-mono text-3xs text-signal uppercase tracking-terminal-3xl">
          Error 404
        </p>
        <h1 className="max-w-3xl text-balance font-extrabold text-5xl leading-none tracking-tight sm:text-6xl">
          This route returned no signal
          <Caret className="ml-2 h-[0.72em] w-[0.3em] [vertical-align:0]" />
        </h1>
        <Connector />
        <p className="max-w-prose text-pretty text-foreground/85 text-lg">
          The page may have moved. Continue with the component registry or the
          setup guides.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            nativeButton={false}
            render={<Link href="/components" />}
            size="lg"
            variant="primary"
          >
            Browse components
            <ChevronRightIcon />
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/docs" />}
            size="lg"
            variant="outline"
          >
            Read the docs
          </Button>
        </div>
      </main>
    </div>
  );
}
