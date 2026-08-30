import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import { ThemePhosphorSelector } from "@/components/examples/theme-phosphor-selector";
import { HeroTerminal } from "@/components/hero/hero-terminal";
import { PhosphorField } from "@/components/hero/phosphor-field";
import { Caret } from "@/registry/terminal/components/caret";
import { Connector } from "@/registry/terminal/components/connector";
import { Led } from "@/registry/terminal/components/led";
import { Button } from "@/registry/terminal/ui/button";

export function Hero({
  items,
  phosphors,
}: {
  items: number;
  phosphors: number;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-8 pb-4 lg:pt-12 lg:pb-8">
      <PhosphorField className="-z-10 opacity-70 [mask-image:radial-gradient(115%_100%_at_50%_28%,black_5%,transparent_72%)]" />

      <div className="grid grid-cols-[minmax(0,1fr)] gap-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-line border-b pb-3 font-mono text-3xs text-phosphor-dim uppercase tracking-terminal-lg">
          <span className="flex items-center gap-2 text-phosphor">
            <Led pulse={false} />
            afterglow
          </span>
          <span>{items} registry items</span>
          <span>{phosphors} phosphors</span>
          <span className="ml-auto hidden sm:inline">base ui + shadcn</span>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="grid grid-cols-[minmax(0,1fr)] content-start gap-6 lg:col-span-7">
            <h1 className="text-balance font-extrabold text-5xl leading-none tracking-tight [text-shadow:0_0_32px_color-mix(in_oklab,var(--phosphor)_26%,transparent)] sm:text-6xl lg:text-7xl">
              A complete terminal UI for the modern web
              <Caret
                blink={false}
                className="ml-2 h-[0.72em] w-[0.3em] text-phosphor [vertical-align:0]"
              />
            </h1>
            <Connector />
            <p className="max-w-prose text-pretty text-foreground/85 text-lg">
              Installed through shadcn, Afterglow adds Base UI components,
              terminal-specific building blocks, and eight phosphor color
              themes. The source stays in your codebase.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                nativeButton={false}
                render={<Link href="/docs" />}
                size="lg"
                variant="primary"
              >
                Get started
                <ChevronRightIcon />
              </Button>
              <Button
                nativeButton={false}
                render={<Link href="/components" />}
                size="lg"
                variant="outline"
              >
                Browse components
              </Button>
            </div>
            <ThemePhosphorSelector />
          </div>

          <div aria-hidden="true" className="lg:col-span-5" inert>
            <HeroTerminal items={items} />
          </div>
        </div>
      </div>
    </section>
  );
}
