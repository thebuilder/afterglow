import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ApiReference } from "@/components/docs/api-reference";
import { CompositionTree } from "@/components/docs/composition-tree";
import { InstallTabs } from "@/components/docs/install-tabs";
import { ItemFooter } from "@/components/docs/item-footer";
import { ItemHeader } from "@/components/docs/item-header";
import { Prose } from "@/components/docs/prose";
import { Toc } from "@/components/docs/toc";
import { ExamplePreview } from "@/components/example-preview";
import { ItemIncludes } from "@/components/item-includes";
import { nests, reference } from "@/lib/doc";
import { docFor } from "@/lib/docs";
import { examplesFor } from "@/lib/examples";
import { allItems, findItem, HOMEPAGE } from "@/lib/registry";
import { slug } from "@/lib/slug";
import { packagesFor, sourcesFor } from "@/lib/source";
import { headingsFor } from "@/lib/toc";

interface Params {
  params: Promise<{ name: string }>;
}

const BUNDLE = 12;

export function generateStaticParams() {
  return allItems()
    .filter((item) => item.name !== "theme")
    .map((item) => ({ name: item.name }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { name } = await params;
  const item = findItem(name);
  if (!item || item.name === "theme") {
    return {};
  }

  const socialTitle = `${item.title}, afterglow`;

  return {
    alternates: { canonical: `${HOMEPAGE}/c/${item.name}` },
    description: item.description,
    openGraph: {
      description: item.description,
      siteName: "afterglow",
      title: socialTitle,
      type: "website",
      url: `${HOMEPAGE}/c/${item.name}`,
    },
    title: item.title,
    twitter: {
      card: "summary_large_image",
      description: item.description,
      title: socialTitle,
    },
  };
}

export default async function ItemPage({ params }: Params) {
  const { name } = await params;
  const item = findItem(name);

  if (!item || item.name === "theme") {
    notFound();
  }

  const [hero, ...rest] = examplesFor(item.name);
  const doc = docFor(item.name);
  const notes = doc ? reference(doc) : undefined;
  const bundled = (item.registryDependencies ?? []).length > BUNDLE;

  const items = allItems().filter((entry) => entry.name !== "theme");
  const index = items.findIndex((entry) => entry.name === item.name);

  return (
    <div className="mx-auto flex w-full max-w-6xl gap-10 px-6">
      <article className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)] gap-14 pb-24">
        <ItemHeader bundled={bundled} item={item} />

        <ExamplePreview example={hero} item={item.name} />

        <Section id="installation" title="Installation">
          <InstallTabs
            item={item}
            packages={await packagesFor(item.name)}
            sources={await sourcesFor(item.name)}
          />
        </Section>

        {bundled ? <ItemIncludes item={item} /> : null}

        {doc && nests(doc.parts) ? (
          <Section id="composition" title="Composition">
            <Prose>Component structure.</Prose>
            <CompositionTree parts={doc.parts} />
          </Section>
        ) : null}

        {rest.map((example) => (
          <Section
            id={slug(example.name)}
            key={example.name}
            title={example.name}
          >
            {example.description ? <Prose>{example.description}</Prose> : null}
            <ExamplePreview
              className="mt-1"
              example={example}
              item={item.name}
            />
          </Section>
        ))}

        {doc && notes ? (
          <Section id={notes.id} title={notes.label}>
            <ApiReference doc={doc} />
          </Section>
        ) : null}

        <ItemFooter next={items[index + 1]} previous={items[index - 1]} />
      </article>

      <div className="hidden w-52 shrink-0 xl:block">
        <Toc
          className="sticky top-14 max-h-[calc(100svh-3.5rem)] overflow-y-auto py-10"
          entries={headingsFor(item.name)}
        />
      </div>
    </div>
  );
}

function Section({
  children,
  id,
  title,
}: {
  children: React.ReactNode;
  id: string;
  title: string;
}) {
  return (
    <section className="grid grid-cols-[minmax(0,1fr)] gap-3">
      {/* The heading owns the anchor offset for the sticky header. */}
      <h2
        className="scroll-mt-20 font-medium font-mono text-lg text-phosphor-bright"
        id={id}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
