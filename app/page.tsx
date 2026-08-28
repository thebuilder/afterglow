import Link from "next/link";

import { CopyCommand } from "@/components/copy-command";
import { ExampleStage } from "@/components/example-stage";
import { examplesFor } from "@/components/examples";
import {
  HOMEPAGE,
  itemsOfType,
  REGISTRY_NAME,
  type RegistryItem,
} from "@/lib/registry";
import { Connector } from "@/registry/terminal/components/connector";
import { Eyebrow } from "@/registry/terminal/components/eyebrow";
import { Led } from "@/registry/terminal/components/led";
import { Separator } from "@/registry/terminal/ui/separator";

const SECTIONS: {
  id: string;
  title: string;
  blurb: string;
  types: string[];
}[] = [
  {
    blurb:
      "One palette, no light mode. A phosphor tube has no daylight setting, so the light and dark blocks carry the same values and toggling a theme class is a no-op rather than a second, worse design.",
    id: "theme",
    title: "Theme",
    types: ["registry:theme"],
  },
  {
    blurb:
      "shadcn's components, redrawn. Same props, same slots, same accessibility work, set in mono with hairline borders and no corner radius. Stock shadcn components dropped into a project running the theme go sharp on their own.",
    id: "primitives",
    title: "Primitives",
    types: ["registry:ui"],
  },
  {
    blurb:
      "The parts that make it a tube rather than a dark theme: the glass, the lamp, the log that prints itself, the border that lights and runs.",
    id: "terminal",
    title: "Terminal",
    types: ["registry:component"],
  },
  {
    blurb:
      "A composed page to look at, and a style that installs the system in one go.",
    id: "whole",
    title: "The whole thing",
    types: ["registry:block", "registry:style"],
  },
];

const COMPONENTS_JSON = `{
  "registries": {
    "@${REGISTRY_NAME}": "${HOMEPAGE}/r/{name}.json"
  }
}`;

/**
 * A card in the gallery: the first example shown as a picture rather than as
 * something to operate, over the name and the one line that says what it is.
 *
 * Everything an item can do lives on its own page. A single page carrying every
 * variant of every component stops working somewhere around thirty items, and
 * there is no way to link anyone to one of them.
 *
 * The link is on the title and stretched over the card with a pseudo-element,
 * rather than wrapped around the whole thing. Half these previews contain a
 * button or an anchor of their own, and an anchor inside an anchor is invalid
 * markup that React will refuse to hydrate. It reads better too: the accessible
 * name of the link is the component's name, not a recital of its demo.
 */
function GalleryCard({ item }: { item: RegistryItem }) {
  const [first] = examplesFor(item.name);

  return (
    <article className="group relative grid grid-cols-[minmax(0,1fr)] gap-3">
      <ExampleStage
        className="transition-colors group-hover:border-line-strong group-focus-within:border-line-strong"
        clipped
        item={item.name}
      >
        {first.node}
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
          <code className="font-mono text-[0.625rem] text-phosphor-dim">
            {item.name}
          </code>
        </div>
        <p className="line-clamp-2 text-pretty text-muted-foreground text-xs">
          {item.description}
        </p>
      </div>
    </article>
  );
}

export default function Home() {
  const total = SECTIONS.reduce(
    (count, section) => count + itemsOfType(...section.types).length,
    0
  );

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-20 px-6 pb-24">
      <header className="-mx-6 sticky top-0 z-40 flex items-center gap-4 border-line border-b bg-void/85 px-6 py-3.5 backdrop-blur-md">
        <span className="flex items-baseline gap-2.5">
          <strong className="font-bold font-mono text-sm tracking-[0.16em]">
            AFTERGLOW
          </strong>
          <span className="font-mono text-[0.55rem] text-phosphor-dim uppercase tracking-[0.1em]">
            shadcn registry
          </span>
        </span>
        <span className="ml-auto flex items-center gap-2 font-mono text-[0.55rem] text-muted-foreground uppercase tracking-[0.1em]">
          <Led />
          {total} items
        </span>
      </header>

      <section className="grid grid-cols-[minmax(0,1fr)] gap-5 pt-10">
        <Eyebrow caret>Registry online</Eyebrow>
        <h1 className="max-w-3xl text-balance font-extrabold text-[clamp(2.4rem,8vw,4.5rem)] leading-[0.92] tracking-[-0.04em]">
          The old-school terminal look, as a registry.
        </h1>
        <Connector />
        <p className="max-w-[60ch] text-pretty text-foreground/85 text-lg">
          Phosphor green on unlit glass, a pink signal for the thing that is
          actually happening, hairline borders and no corner radius anywhere. A
          whole design system, cut into pieces you can install one at a time.
        </p>
        <p className="font-mono font-semibold text-[0.625rem] text-phosphor-dim uppercase tracking-[0.14em]">
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

        <div className="grid max-w-2xl grid-cols-[minmax(0,1fr)] gap-3 pt-4">
          <CopyCommand
            command={`npx shadcn@latest init ${HOMEPAGE}/r/terminal.json`}
          />
          <p className="font-mono text-[0.625rem] text-phosphor-dim uppercase tracking-[0.1em]">
            or add one piece at a time, below
          </p>
        </div>
      </section>

      <section className="grid grid-cols-[minmax(0,1fr)] gap-4" id="setup">
        <Eyebrow>Setup</Eyebrow>
        <h2 className="font-medium font-mono text-2xl text-phosphor-bright">
          One line in components.json
        </h2>
        <p className="max-w-prose text-muted-foreground text-sm">
          Register the namespace once and every item installs by name, pulling
          whatever it depends on with it. Without it you can still install by
          URL, but the dependencies between items will not resolve.
        </p>
        <pre className="overflow-x-auto border border-line bg-panel-sunken p-4 font-mono text-phosphor text-xs leading-relaxed">
          <code>{COMPONENTS_JSON}</code>
        </pre>
        <p className="max-w-prose text-muted-foreground text-sm">
          Install <code className="text-phosphor">@{REGISTRY_NAME}/theme</code>{" "}
          first. Everything else is drawn with its tokens and will render
          unstyled without it.
        </p>
      </section>

      {SECTIONS.map((section) => (
        <section
          className="grid grid-cols-[minmax(0,1fr)] gap-8"
          id={section.id}
          key={section.id}
        >
          <div className="grid grid-cols-[minmax(0,1fr)] gap-3">
            <Eyebrow>{section.title}</Eyebrow>
            <Connector />
            <p className="max-w-prose text-pretty text-muted-foreground text-sm">
              {section.blurb}
            </p>
          </div>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {itemsOfType(...section.types).map((item) => (
              <GalleryCard item={item} key={item.name} />
            ))}
          </div>
        </section>
      ))}

      <footer className="grid grid-cols-[minmax(0,1fr)] gap-4">
        <Separator />
        <p className="max-w-prose text-muted-foreground text-sm">
          afterglow is by{" "}
          <a
            className="text-phosphor underline decoration-line-strong underline-offset-4 hover:text-phosphor-bright"
            href="https://thebuilder.dk"
            rel="noopener"
            target="_blank"
          >
            thebuilder
          </a>
          . Built on{" "}
          <a
            className="text-phosphor underline decoration-line-strong underline-offset-4 hover:text-phosphor-bright"
            href="https://ui.shadcn.com/docs/registry"
            rel="noopener"
            target="_blank"
          >
            shadcn registries
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
