"use client";

import { ChevronRightIcon } from "lucide-react";

import { Highlighted } from "@/components/docs/highlighted";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/terminal/ui/collapsible";

/**
 * The source under an example, shut.
 *
 * An example is there to be looked at first, and the code is the second
 * question. Open by default it would push the next example off the screen, and
 * an item with four of them would be a page of source with pictures in it.
 *
 * The bar is the only chrome. A caret that turns, the word, and the file name
 * on the right. Nothing peeks out from under it, because three dimmed lines of
 * an import block say nothing the word does not.
 */
export function ExampleSource({
  className,
  file,
  html,
  text,
}: {
  className?: string;
  file: string;
  html: string;
  text: string;
}) {
  return (
    <Collapsible
      className={cn("border border-line border-t-0 bg-panel-sunken", className)}
    >
      <CollapsibleTrigger className="group/source flex w-full items-center justify-between gap-4 rounded-none px-3 py-2 font-mono text-2xs text-phosphor-dim uppercase tracking-terminal outline-none transition-colors hover:text-phosphor-bright focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-phosphor-bright">
        <span className="flex items-center gap-2">
          <ChevronRightIcon className="size-3 transition-transform duration-200 ease-terminal group-data-panel-open/source:rotate-90" />
          source
        </span>
        <span className="truncate normal-case tracking-normal">{file}</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-terminal data-ending-style:h-0 data-starting-style:h-0">
        <Highlighted
          className="border-line border-t"
          html={html}
          label={`Copy ${file}`}
          text={text}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}
