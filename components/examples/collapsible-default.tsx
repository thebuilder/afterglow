import { ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@/registry/terminal/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/terminal/ui/collapsible";

export function CollapsibleDefault() {
  return (
    <Collapsible className="grid w-full max-w-sm gap-2">
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-phosphor-bright text-sm">
          Three retries
        </span>
        <CollapsibleTrigger render={<Button size="icon-sm" variant="ghost" />}>
          <ChevronsUpDownIcon />
          <span className="sr-only">Toggle</span>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="grid gap-1 font-mono text-muted-foreground text-xs">
        <span>04:12:04 retry 1 of 3</span>
        <span>04:12:09 retry 2 of 3</span>
        <span>04:12:14 retry 3 of 3</span>
      </CollapsibleContent>
    </Collapsible>
  );
}
