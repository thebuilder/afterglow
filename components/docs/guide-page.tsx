import type { ReactNode } from "react";

import { PageActions } from "@/components/docs/page-actions";
import { Prose } from "@/components/docs/prose";
import { Toc } from "@/components/docs/toc";
import type { Guide } from "@/lib/guides";
import { Connector } from "@/registry/terminal/components/connector";

export function GuidePage({
  children,
  guide,
}: {
  children: ReactNode;
  guide: Guide;
}) {
  return (
    <div className="mx-auto flex w-full max-w-6xl gap-10 px-6">
      <article className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)] gap-10 pb-24">
        <header className="grid grid-cols-[minmax(0,1fr)] gap-4 pt-10">
          <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
            <h1 className="min-w-0 flex-1 text-balance font-extrabold text-5xl leading-none tracking-tight sm:text-6xl">
              {guide.title}
            </h1>
            <PageActions
              markdownPath={guide.markdownHref}
              prompt="Read this Afterglow guide and help me apply it to my project."
            />
          </div>
          <Connector />
          <Prose className="text-foreground/85 text-lg">
            {guide.description}
          </Prose>
        </header>

        <div className="grid grid-cols-[minmax(0,1fr)] gap-4">{children}</div>
      </article>

      <div className="hidden w-52 shrink-0 xl:block">
        <Toc
          className="sticky top-14 max-h-[calc(100svh-3.5rem)] overflow-y-auto py-10"
          entries={guide.toc}
        />
      </div>
    </div>
  );
}
