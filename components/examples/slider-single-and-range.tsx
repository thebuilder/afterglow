import { Slider } from "@/registry/terminal/ui/slider";

export function SliderSingleAndRange() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      <div className="grid gap-3">
        <div className="flex items-baseline justify-between font-mono text-2xs uppercase tracking-terminal">
          <span className="text-muted-foreground">Beam</span>
          <span className="text-amber tabular-nums">72</span>
        </div>
        <Slider defaultValue={[72]} max={100} step={1} />
      </div>
      <div className="grid gap-3">
        <div className="flex items-baseline justify-between font-mono text-2xs uppercase tracking-terminal">
          <span className="text-muted-foreground">Window</span>
          <span className="text-amber tabular-nums">20 to 80</span>
        </div>
        <Slider defaultValue={[20, 80]} max={100} step={1} />
      </div>
    </div>
  );
}
