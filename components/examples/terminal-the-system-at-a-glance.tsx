import { Connector } from "@/registry/terminal/components/connector";
import { Eyebrow } from "@/registry/terminal/components/eyebrow";
import { Glyph } from "@/registry/terminal/components/glyph";
import { Status } from "@/registry/terminal/components/led";
import { Badge } from "@/registry/terminal/ui/badge";
import { Button } from "@/registry/terminal/ui/button";
import { Checkbox } from "@/registry/terminal/ui/checkbox";
import { Input } from "@/registry/terminal/ui/input";
import { Kbd } from "@/registry/terminal/ui/kbd";
import { Label } from "@/registry/terminal/ui/label";
import { Progress } from "@/registry/terminal/ui/progress";
import { Spinner } from "@/registry/terminal/ui/spinner";
import { Switch } from "@/registry/terminal/ui/switch";

export function TerminalTheSystemAtAGlance() {
  return (
    <div className="grid w-full max-w-xl grid-cols-[minmax(0,1fr)] gap-5 border border-line bg-card/90 p-5">
      <div className="flex items-center justify-between gap-4">
        <Eyebrow caret>Node-04</Eyebrow>
        <Status>nominal</Status>
      </div>

      <Connector />

      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm">Mount</Button>
        <Button size="sm" variant="signal">
          Restart
        </Button>
        <Button size="sm" variant="outline">
          Inspect
        </Button>
        <Spinner />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <span className="flex items-center gap-2.5">
          <Checkbox defaultChecked id="ex-sys-cb" />
          <Label htmlFor="ex-sys-cb">Read-write</Label>
        </span>
        <span className="flex items-center gap-2.5">
          <Switch defaultChecked id="ex-sys-sw" size="sm" />
          <Label htmlFor="ex-sys-sw">Beacon</Label>
        </span>
        <span className="flex items-center gap-1.5">
          <Kbd glyph>⌘</Kbd>
          <Kbd>K</Kbd>
        </span>
      </div>

      <Input defaultValue="node-04.local" />

      <div className="grid gap-2">
        <div className="flex items-baseline justify-between font-mono text-[0.625rem] uppercase tracking-[0.1em]">
          <span className="text-muted-foreground">Indexing</span>
          <span className="text-amber tabular-nums">68%</span>
        </div>
        <Progress value={68} />
      </div>

      <div className="flex flex-wrap items-center gap-2 border-line border-t pt-4">
        <Badge>mounted</Badge>
        <Badge variant="amber">read-only</Badge>
        <Badge variant="signal">offline</Badge>
        <Glyph className="ml-auto size-5" tone="code" />
        <Glyph className="size-5" tone="image" />
        <Glyph className="size-5" tone="directory" />
      </div>
    </div>
  );
}
