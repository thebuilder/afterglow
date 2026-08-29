import Link from "next/link";

import { PageActions } from "@/components/docs/page-actions";
import { Prose } from "@/components/docs/prose";
import { internalName, isInternal, type RegistryItem } from "@/lib/registry";
import { Connector } from "@/registry/terminal/components/connector";
import { Badge } from "@/registry/terminal/ui/badge";

export function ItemHeader({
  bundled,
  item,
}: {
  bundled: boolean;
  item: RegistryItem;
}) {
  const dependencies = bundled
    ? []
    : [...(item.dependencies ?? []), ...(item.registryDependencies ?? [])];

  return (
    <header className="grid grid-cols-[minmax(0,1fr)] gap-4 pt-10">
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
        <h1 className="min-w-0 flex-1 text-balance font-extrabold text-5xl leading-none tracking-tight sm:text-6xl">
          {item.title}
        </h1>
        <PageActions
          markdownPath={`/c/${item.name}.md`}
          prompt="Read this Afterglow component reference and help me use the component."
        />
      </div>
      <Connector />
      <Prose className="max-w-2xl text-foreground/85 text-lg">
        {item.description}
      </Prose>
      {dependencies.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="font-mono text-4xs text-phosphor-dim uppercase tracking-terminal">
            pulls in
          </span>
          {dependencies.map((dependency) => (
            <Dependency key={dependency} name={dependency} />
          ))}
        </div>
      ) : null}
    </header>
  );
}

function Dependency({ name }: { name: string }) {
  if (!isInternal(name)) {
    return <Badge variant="outline">{name}</Badge>;
  }

  return (
    <Badge
      className="transition-colors hover:border-line-strong hover:text-phosphor"
      render={<Link href={`/c/${internalName(name)}`} />}
      variant="outline"
    >
      {name}
    </Badge>
  );
}
