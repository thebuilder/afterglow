import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import { Prose } from "@/components/docs/prose";
import { SiteHeader } from "@/components/docs/site-header";
import { Hero } from "@/components/hero/hero";
import { PHOSPHORS } from "@/lib/phosphor";
import { sectionsWithItems } from "@/lib/sections";
import { Connector } from "@/registry/terminal/components/connector";
import { Button } from "@/registry/terminal/ui/button";
import { Separator } from "@/registry/terminal/ui/separator";

const BENEFITS = [
  {
    description:
      "Green, orange, yellow, cyan, blue, magenta, red and grey. The rest of the palette derives from the phosphor, and the alert colours shift to stay legible against it.",
    title: "Eight phosphor themes",
  },
  {
    description:
      "Familiar shadcn composition, with Base UI underneath where you would expect Radix. The install writes the source into your project, so every component is a file you edit.",
    title: "Components you own",
  },
  {
    description:
      "Screens, scanlines, status lights, prompts, boot logs and window chrome. A general-purpose registry has no reason to ship any of them.",
    title: "Terminal-specific parts",
  },
];

const FOOTER_LINK_CLASS =
  "font-medium text-phosphor underline decoration-line-strong underline-offset-4 transition-colors hover:text-phosphor-bright";

export default function Home() {
  const sections = sectionsWithItems();
  const total = sections.reduce(
    (count, section) => count + section.items.length,
    0
  );

  return (
    <>
      <SiteHeader />
      <main className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-24 px-6 pb-24">
        <Hero items={total} phosphors={PHOSPHORS.length} />

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
          <ul className="grid grid-cols-[minmax(0,1fr)] gap-y-7 md:grid-cols-3 md:gap-y-0">
            {BENEFITS.map((benefit, index) => (
              <li
                className="grid grid-cols-[minmax(0,1fr)] content-start gap-3 border-line border-t pt-6 md:border-l md:px-6 md:pt-8 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
                key={benefit.title}
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-3xs text-phosphor-dim tabular-nums tracking-terminal"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-medium font-mono text-lg text-phosphor-bright">
                  {benefit.title}
                </h3>
                <Prose>{benefit.description}</Prose>
              </li>
            ))}
          </ul>
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

          <div className="-mx-4 grid border-line border-t">
            {sections.map((section) => (
              <Link
                className="group grid gap-2 border-line border-b px-4 py-5 outline-none transition-colors hover:bg-accent/30 focus-visible:bg-accent/30 sm:grid-cols-4 sm:items-baseline"
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
              theming, and troubleshooting.
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
          <p className="max-w-prose text-pretty text-muted-foreground text-sm">
            Afterglow is built on{" "}
            <a className={FOOTER_LINK_CLASS} href="https://base-ui.com">
              Base UI
            </a>{" "}
            and installed through{" "}
            <a
              className={FOOTER_LINK_CLASS}
              href="https://ui.shadcn.com/docs/registry"
            >
              shadcn registries
            </a>
            . Made by{" "}
            <a className={FOOTER_LINK_CLASS} href="https://thebuilder.dk">
              thebuilder
            </a>
            , with the{" "}
            <a
              className={FOOTER_LINK_CLASS}
              href="https://github.com/thebuilder/afterglow"
            >
              source on GitHub.
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}
