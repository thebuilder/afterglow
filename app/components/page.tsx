import type { Metadata } from "next";

import { Prose } from "@/components/docs/prose";
import { GalleryCard } from "@/components/gallery-card";
import { DEFAULT_SOCIAL_IMAGE, socialTitle } from "@/lib/metadata";
import { HOMEPAGE } from "@/lib/registry";
import { itemCount, sectionsWithItems } from "@/lib/sections";
import { Connector } from "@/registry/terminal/components/connector";
import { Separator } from "@/registry/terminal/ui/separator";

const DESCRIPTION =
  "Browse every theme, component, and block in the Afterglow shadcn registry.";

export const metadata: Metadata = {
  alternates: { canonical: `${HOMEPAGE}/components` },
  description: DESCRIPTION,
  openGraph: {
    description: DESCRIPTION,
    images: [DEFAULT_SOCIAL_IMAGE],
    siteName: "Afterglow",
    title: socialTitle("Components"),
    type: "website",
    url: `${HOMEPAGE}/components`,
  },
  title: "Components",
  twitter: {
    card: "summary_large_image",
    description: DESCRIPTION,
    images: [DEFAULT_SOCIAL_IMAGE],
    title: socialTitle("Components"),
  },
};

export default function ComponentsPage() {
  const sections = sectionsWithItems();

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-20 px-6 pb-24">
      <header className="grid grid-cols-[minmax(0,1fr)] gap-5 pt-12">
        <h1 className="max-w-3xl text-balance font-extrabold text-5xl leading-none tracking-tight sm:text-6xl">
          Components
        </h1>
        <Connector />
        <Prose className="text-foreground/85 text-lg">
          Every theme, component, and composed block in the registry. Open an
          item for live examples, install commands, API notes, and source.
        </Prose>
      </header>

      {sections.map((section) => (
        <section
          className="grid scroll-mt-20 grid-cols-[minmax(0,1fr)] gap-8"
          id={section.id}
          key={section.id}
        >
          <div className="grid grid-cols-[minmax(0,1fr)] gap-3">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-medium font-mono text-2xl text-phosphor-bright">
                {section.title}
              </h2>
              <span className="font-mono text-3xs text-phosphor-dim tabular-nums uppercase tracking-terminal">
                {itemCount(section.items.length)}
              </span>
            </div>
            <Connector />
            <Prose>{section.blurb}</Prose>
          </div>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
            {section.items.map((item) => (
              <GalleryCard item={item} key={item.name} />
            ))}
          </div>
        </section>
      ))}

      <footer className="grid grid-cols-[minmax(0,1fr)] gap-4">
        <Separator />
        <Prose>
          Afterglow is built on Base UI and installed through shadcn registries.
        </Prose>
      </footer>
    </div>
  );
}
