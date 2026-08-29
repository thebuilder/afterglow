import Link from "next/link";

import { PageActions } from "@/components/docs/page-actions";
import { Prose } from "@/components/docs/prose";
import {
  HOMEPAGE,
  internalName,
  isInternal,
  type RegistryItem,
} from "@/lib/registry";
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
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h1 className="min-w-0 flex-1 text-balance font-extrabold text-[clamp(2rem,6vw,3.25rem)] leading-[0.95] tracking-[-0.03em]">
          {item.title}
        </h1>
        <PageActions name={item.name} url={HOMEPAGE} />
      </div>
      <Connector />
      <Prose className="max-w-[52ch] text-foreground/85 text-lg">
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
