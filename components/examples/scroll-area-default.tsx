import { ScrollArea } from "@/registry/terminal/ui/scroll-area";

const LOG = [
  "04:12:01 spool: no response",
  "04:12:04 spool: retry 1 of 3",
  "04:12:09 spool: retry 2 of 3",
  "04:12:14 spool: retry 3 of 3",
  "04:12:19 spool: giving up",
  "04:12:19 core: still mounted",
  "04:12:20 archive: still mounted",
  "04:12:21 capture: read-only",
  "04:12:30 beacon: unreachable",
  "04:12:31 running local",
];

export function ScrollAreaDefault() {
  return (
    <ScrollArea className="h-36 w-full max-w-sm border border-line bg-panel">
      <div className="grid gap-1 p-3 font-mono text-muted-foreground text-xs">
        {LOG.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
    </ScrollArea>
  );
}
