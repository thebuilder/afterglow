import Link from "next/link";

import {
  findItem,
  internalName,
  isInternal,
  type RegistryItem,
} from "@/lib/registry";
import { Eyebrow } from "@/registry/terminal/components/eyebrow";
import { Badge } from "@/registry/terminal/ui/badge";

const GROUPS: { title: string; types: string[] }[] = [
  { title: "Theme", types: ["registry:theme"] },
  { title: "Primitives", types: ["registry:ui"] },
  { title: "Terminal", types: ["registry:component"] },
  { title: "Hooks", types: ["registry:hook"] },
  { title: "Blocks", types: ["registry:block"] },
];

export function ItemIncludes({ item }: { item: RegistryItem }) {
  const included = (item.registryDependencies ?? [])
    .filter(isInternal)
    .map((dependency) => findItem(internalName(dependency)))
    .filter((entry): entry is RegistryItem => Boolean(entry));

  const packages = item.dependencies ?? [];

  return (
    <section className="grid grid-cols-[minmax(0,1fr)] gap-6">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-2">
        <Eyebrow>Includes</Eyebrow>
        <p className="text-muted-foreground text-sm">
          {included.length} items and {packages.length} packages, installed by
          the one command above.
        </p>
      </div>

      {GROUPS.map((group) => {
        const members = included.filter((entry) =>
          group.types.includes(entry.type)
        );

        if (members.length === 0) {
          return null;
        }

        return (
          <div
            className="grid grid-cols-[minmax(0,1fr)] gap-2.5"
            key={group.title}
          >
            <div className="flex items-baseline gap-2.5">
              <h2 className="font-medium font-mono text-phosphor-bright text-sm">
                {group.title}
              </h2>
              <span className="font-mono text-2xs text-phosphor-dim tabular-nums">
                {members.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {members.map((member) => (
                <Badge
                  className="transition-colors hover:border-line-strong hover:text-phosphor"
                  key={member.name}
                  render={<Link href={`/c/${member.name}`} />}
                  variant="outline"
                >
                  {member.name}
                </Badge>
              ))}
            </div>
          </div>
        );
      })}

      {packages.length > 0 && (
        <div className="grid grid-cols-[minmax(0,1fr)] gap-2.5">
          <div className="flex items-baseline gap-2.5">
            <h2 className="font-medium font-mono text-phosphor-bright text-sm">
              Packages
            </h2>
            <span className="font-mono text-2xs text-phosphor-dim tabular-nums">
              {packages.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {packages.map((dependency) => (
              <Badge key={dependency} variant="outline">
                {dependency}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
