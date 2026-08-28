import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CopyCommand } from "@/components/copy-command";
import { ExampleStage } from "@/components/example-stage";
import { examplesFor } from "@/components/examples";
import { ItemIncludes } from "@/components/item-includes";
import {
  allItems,
  findItem,
  installCommand,
  internalName,
  isInternal,
} from "@/lib/registry";
import { Connector } from "@/registry/terminal/components/connector";
import { Eyebrow } from "@/registry/terminal/components/eyebrow";
import { Badge } from "@/registry/terminal/ui/badge";
import { Separator } from "@/registry/terminal/ui/separator";

type Params = { params: Promise<{ name: string }> };

export function generateStaticParams() {
  return allItems().map((item) => ({ name: item.name }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { name } = await params;
  const item = findItem(name);
  return item
    ? { title: `${item.title}, afterglow`, description: item.description }
    : {};
}

export default async function ItemPage({ params }: Params) {
  const { name } = await params;
  const item = findItem(name);

  if (!item) {
    notFound();
  }

  const examples = examplesFor(item.name);
  const items = allItems();
  const index = items.findIndex((entry) => entry.name === item.name);
  const previous = items[index - 1];
  const next = items[index + 1];
  const dependencies = [
    ...(item.dependencies ?? []),
    ...(item.registryDependencies ?? []),
  ];
  /* A bundle's dependency list is its contents, and a flat row of fifty-eight
     badges is a wall rather than an answer. It gets grouped and counted below
     instead of inlined under the heading. */
  const isBundle = (item.registryDependencies ?? []).length > 12;

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)] gap-14 px-6 pb-24">
      <header className="-mx-6 sticky top-0 z-40 flex items-center gap-4 border-line border-b bg-void/85 px-6 py-3.5 backdrop-blur-md">
        <Link
          className="flex items-center gap-2 font-bold font-mono text-[0.625rem] text-phosphor uppercase tracking-[0.14em] outline-none transition-colors hover:text-phosphor-bright focus-visible:text-phosphor-bright"
          href="/"
        >
          <ChevronLeftIcon className="size-3.5" />
          afterglow
        </Link>
        <span className="ml-auto font-mono text-[0.55rem] text-phosphor-dim uppercase tracking-[0.1em]">
          {item.type.replace("registry:", "")}
        </span>
      </header>

      <section className="grid grid-cols-[minmax(0,1fr)] gap-4 pt-8">
        <Eyebrow caret>{item.name}</Eyebrow>
        <h1 className="text-balance font-extrabold text-[clamp(2rem,6vw,3.25rem)] leading-[0.95] tracking-[-0.03em]">
          {item.title}
        </h1>
        <Connector />
        <p className="max-w-[52ch] text-pretty text-foreground/85 text-lg">
          {item.description}
        </p>
        <CopyCommand className="mt-2" command={installCommand(item)} />
        {dependencies.length > 0 && !isBundle && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="font-mono text-[0.55rem] text-phosphor-dim uppercase tracking-[0.1em]">
              pulls in
            </span>
            {dependencies.map((dependency) =>
              isInternal(dependency) ? (
                <Badge
                  className="transition-colors hover:border-line-strong hover:text-phosphor"
                  key={dependency}
                  render={<Link href={`/c/${internalName(dependency)}`} />}
                  variant="outline"
                >
                  {dependency}
                </Badge>
              ) : (
                <Badge key={dependency} variant="outline">
                  {dependency}
                </Badge>
              ),
            )}
          </div>
        )}
      </section>

      {isBundle && <ItemIncludes item={item} />}

      <div className="grid grid-cols-[minmax(0,1fr)] gap-12">
        {examples.map((example) => (
          <section
            className="grid grid-cols-[minmax(0,1fr)] gap-3"
            key={example.name}
          >
            <h2 className="font-medium font-mono text-lg text-phosphor-bright">
              {example.name}
            </h2>
            {example.description && (
              <p className="max-w-prose text-pretty text-muted-foreground text-sm">
                {example.description}
              </p>
            )}
            <ExampleStage className="mt-1" item={item.name}>
              {example.node}
            </ExampleStage>
          </section>
        ))}
      </div>

      <footer className="grid grid-cols-[minmax(0,1fr)] gap-4">
        <Separator />
        <nav className="flex flex-wrap items-center justify-between gap-4">
          {previous ? (
            <Link
              className="flex items-center gap-2 font-mono text-muted-foreground text-xs outline-none transition-colors hover:text-phosphor focus-visible:text-phosphor"
              href={`/c/${previous.name}`}
            >
              <ChevronLeftIcon className="size-3.5" />
              {previous.title}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              className="flex items-center gap-2 font-mono text-muted-foreground text-xs outline-none transition-colors hover:text-phosphor focus-visible:text-phosphor"
              href={`/c/${next.name}`}
            >
              {next.title}
              <ChevronRightIcon className="size-3.5" />
            </Link>
          )}
        </nav>
      </footer>
    </div>
  );
}
