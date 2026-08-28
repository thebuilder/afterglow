import { Separator } from "@/registry/terminal/ui/separator";

export function SeparatorBothOrientations() {
  return (
    <div className="grid w-full max-w-sm gap-3 font-mono text-xs">
      <span className="text-phosphor-bright">Uplink</span>
      <Separator />
      <div className="flex h-5 items-center gap-3 text-muted-foreground">
        <span>rx 41ms</span>
        <Separator orientation="vertical" />
        <span>tx 38ms</span>
        <Separator orientation="vertical" />
        <span>0 dropped</span>
      </div>
    </div>
  );
}
