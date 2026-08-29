import Link from "next/link";

import { Prose } from "@/components/docs/prose";
import { ExampleStage } from "@/components/example-stage";
import { examplesFor } from "@/lib/examples";
import type { RegistryItem } from "@/lib/registry";

export function GalleryCard({ item }: { item: RegistryItem }) {
  const [first] = examplesFor(item.name);
  const Preview = first.component;

  return (
    <article className="group relative grid grid-cols-[minmax(0,1fr)] gap-3">
      <ExampleStage
        className="transition-colors group-hover:border-line-strong group-focus-within:border-line-strong"
        clipped
        item={item.name}
      >
        <Preview />
      </ExampleStage>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-1">
        <div className="flex items-baseline gap-2">
          <h3 className="font-medium font-mono text-phosphor-bright text-sm transition-colors group-hover:text-phosphor">
            <Link
              className="rounded-none outline-none after:absolute after:inset-0 focus-visible:text-phosphor"
              href={`/c/${item.name}`}
            >
              {item.title}
            </Link>
          </h3>
          <code className="font-mono text-2xs text-phosphor-dim">
            {item.name}
          </code>
        </div>
        <Prose className="line-clamp-2 text-xs">{item.description}</Prose>
      </div>
    </article>
  );
}
