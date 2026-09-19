"use client";

import { ChevronRightIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/terminal/ui/collapsible";

export function ExampleSource({
  children,
  className,
  file,
}: {
  // The highlighted body is rendered on the server and passed in, which keeps
  // Shiki out of the bundle this client component pulls.
  children: ReactNode;
  className?: string;
  file: string;
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
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
