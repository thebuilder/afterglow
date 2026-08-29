import type { Metadata } from "next";

import { Prose } from "@/components/docs/prose";
import { SiteHeader } from "@/components/docs/site-header";
import { TypesetBuilder } from "@/components/typeset-builder";
import { HOMEPAGE } from "@/lib/registry";
import { Connector } from "@/registry/terminal/components/connector";

const DESCRIPTION =
  "Preview and tune Afterglow's typography for rendered HTML and markdown.";

export const metadata: Metadata = {
  alternates: { canonical: `${HOMEPAGE}/typeset` },
  description: DESCRIPTION,
  openGraph: {
    description: DESCRIPTION,
    siteName: "Afterglow",
    title: "Typeset, Afterglow",
    type: "website",
    url: `${HOMEPAGE}/typeset`,
  },
  title: "Typeset",
  twitter: {
    card: "summary_large_image",
    description: DESCRIPTION,
    title: "Typeset, Afterglow",
  },
};

export default function TypesetPage() {
  return (
    <div className="min-h-svh">
      <SiteHeader />
      <main className="mx-auto grid max-w-screen-2xl gap-10 px-4 pb-20 sm:px-6">
        <header className="grid max-w-3xl gap-5 pt-10">
          <h1 className="text-balance font-extrabold text-5xl leading-none tracking-tight sm:text-6xl">
            Typeset
          </h1>
          <Connector />
          <Prose className="text-foreground/85 text-lg">
            One class for headings, paragraphs, lists, code, quotes, and tables.
            Adjust the four inherited variables to fit documentation, release
            notes, or rendered markdown.
          </Prose>
        </header>
        <TypesetBuilder />
      </main>
    </div>
  );
}
