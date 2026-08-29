import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import { Prose } from "@/components/docs/prose";
import { SiteHeader } from "@/components/docs/site-header";
import { TerminalTheSystemAtAGlance } from "@/components/examples/terminal-the-system-at-a-glance";
import { sectionsWithItems } from "@/lib/sections";
import { Connector } from "@/registry/terminal/components/connector";
import { Led } from "@/registry/terminal/components/led";
import { Button } from "@/registry/terminal/ui/button";
import { Separator } from "@/registry/terminal/ui/separator";

const BENEFITS = [
  {
    description:
      "Palette, typography, motion, CRT effects, shadows, and square geometry come from one registry theme.",
    title: "One shared theme",
  },
  {
    description:
      "Familiar shadcn composition backed by Base UI, with source copied into your own project.",
    title: "Components you own",
  },
  {
    description:
      "Screens, scanlines, status lights, prompts, boot logs, and window chrome extend the standard component set.",
    title: "Terminal-specific parts",
  },
];

export default function Home() {
  const sections = sectionsWithItems();
  const total = sections.reduce(
    (count, section) => count + section.items.length,
    0
  );

  return (
    <>
      <SiteHeader
        after={
          <span className="hidden items-center gap-2 whitespace-nowrap font-mono text-4xs text-muted-foreground uppercase tracking-terminal md:flex">
            <Led />
            Registry online
          </span>
        }
      />
      <main className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-24 px-6 pb-24">
        <section className="grid items-center gap-12 pt-12 lg:grid-cols-5 lg:pt-20">
          <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:col-span-3">
            <h1 className="text-balance font-extrabold text-5xl leading-none tracking-tight sm:text-6xl lg:text-7xl">
              A complete terminal interface for shadcn
            </h1>
            <Connector />
            <p className="max-w-prose text-pretty text-foreground/85 text-lg">
              Afterglow installs one dark theme, Base UI components, and
              terminal-specific building blocks into your project. The source
              stays in your codebase.
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
            <p className="font-mono font-semibold text-2xs text-phosphor-dim uppercase tracking-terminal-xl">
              By{" "}
              <a
                className="text-phosphor underline decoration-line-strong underline-offset-4 transition-colors hover:text-phosphor-bright"
                href="https://thebuilder.dk"
                rel="noopener"
                target="_blank"
              >
                thebuilder
              </a>
            </p>
          </div>

          <div
            aria-hidden="true"
            className="flex items-center justify-center lg:col-span-2"
            inert
          >
            <TerminalTheSystemAtAGlance />
          </div>
        </section>

        <section className="grid grid-cols-[minmax(0,1fr)] gap-8">
          <div className="grid max-w-3xl grid-cols-[minmax(0,1fr)] gap-4">
            <h2 className="text-balance font-medium font-mono text-3xl text-phosphor-bright">
              {total} registry items, one terminal system
            </h2>
            <Connector />
            <Prose>
              Install the complete preset or let registry dependencies pull in
              only what each component needs.
            </Prose>
          </div>
          <div className="grid gap-8 border-line border-t pt-8 md:grid-cols-3">
            {BENEFITS.map((benefit) => (
              <div
                className="grid grid-cols-[minmax(0,1fr)] content-start gap-3"
                key={benefit.title}
              >
                <h3 className="font-medium font-mono text-lg text-phosphor-bright">
                  {benefit.title}
                </h3>
                <Prose>{benefit.description}</Prose>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-[minmax(0,1fr)] gap-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="grid max-w-2xl grid-cols-[minmax(0,1fr)] gap-4">
              <h2 className="text-balance font-medium font-mono text-3xl text-phosphor-bright">
                Explore the registry
              </h2>
              <Prose>
                Each item has a live example, exact install command, API notes,
                and the source that shadcn copies.
              </Prose>
            </div>
            <Button
              nativeButton={false}
              render={<Link href="/components" />}
              variant="outline"
            >
              View all components
              <ChevronRightIcon />
            </Button>
          </div>

          <div className="grid border-line border-t">
            {sections.map((section) => (
              <Link
                className="group -mx-4 grid gap-2 border-line border-b px-4 py-5 outline-none transition-colors hover:bg-accent/30 focus-visible:bg-accent/30 sm:grid-cols-4 sm:items-baseline"
                href={`/components#${section.id}`}
                key={section.id}
              >
                <span className="font-medium font-mono text-lg text-phosphor-bright transition-colors group-hover:text-phosphor group-focus-visible:text-phosphor">
                  {section.title}
                </span>
                <span className="font-mono text-3xs text-phosphor-dim tabular-nums uppercase tracking-terminal sm:col-start-2">
                  {section.items.length} items
                </span>
                <span className="max-w-prose text-pretty text-muted-foreground text-sm sm:col-span-2">
                  {section.blurb}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-6 border border-line bg-panel-sunken p-6 sm:grid-cols-2 sm:items-center sm:p-8">
          <div className="grid gap-3">
            <h2 className="font-medium font-mono text-2xl text-phosphor-bright">
              Put the first component on screen
            </h2>
            <Prose>
              The setup guide covers the full preset, individual components,
              theming, and the Base UI details that differ from Radix.
            </Prose>
          </div>
          <Button
            className="sm:justify-self-end"
            nativeButton={false}
            render={<Link href="/docs" />}
            size="lg"
            variant="primary"
          >
            Get started
            <ChevronRightIcon />
          </Button>
        </section>

        <footer className="grid grid-cols-[minmax(0,1fr)] gap-4">
          <Separator />
          <Prose>
            Afterglow is built on Base UI and installed through shadcn
            registries.
          </Prose>
        </footer>
      </main>
    </>
  );
}
