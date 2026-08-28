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
  { title: "Blocks", types: ["registry:block"] },
];

/**
 * What a bundle actually contains, grouped.
 *
 * The style pulls in forty-nine items and nine packages. Rendered the way a
 * single component's dependencies are, that is fifty-eight badges in one row:
 * a wall that says "a lot" and nothing else. Grouped and counted, the same data
 * answers the question somebody opening this page is asking, which is what they
 * get for the one command above.
 */
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
          group.types.includes(entry.type),
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
              <span className="font-mono text-[0.625rem] text-phosphor-dim tabular-nums">
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
            <span className="font-mono text-[0.625rem] text-phosphor-dim tabular-nums">
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
