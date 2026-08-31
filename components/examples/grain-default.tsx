"use client";

import { useCallback, useId, useState } from "react";

import { Grain } from "@/registry/terminal/components/grain";
import { Label } from "@/registry/terminal/ui/label";
import { Slider } from "@/registry/terminal/ui/slider";
import { Switch } from "@/registry/terminal/ui/switch";

export function GrainDefault() {
  const animatedId = useId();
  const opacityId = useId();
  const [animated, setAnimated] = useState(true);
  const [opacity, setOpacity] = useState(0.13);

  const changeOpacity = useCallback((value: number | readonly number[]) => {
    setOpacity(Array.isArray(value) ? value[0] : (value as number));
  }, []);

  return (
    <div className="grid w-full gap-5">
      <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
        <div className="flex items-center gap-3">
          <Switch
            checked={animated}
            id={animatedId}
            onCheckedChange={setAnimated}
          />
          <Label htmlFor={animatedId}>Animated</Label>
        </div>
        <div className="grid min-w-52 flex-1 gap-2">
          <div className="flex items-baseline justify-between">
            <Label htmlFor={opacityId}>Opacity</Label>
            <span className="font-mono text-2xs text-metric tabular-nums">
              {opacity.toFixed(2)}
            </span>
          </div>
          <Slider
            id={opacityId}
            max={0.4}
            min={0.02}
            onValueChange={changeOpacity}
            step={0.01}
            value={[opacity]}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <figure className="grid gap-2">
          <div className="relative isolate grid h-36 place-items-center overflow-hidden border border-line bg-void font-mono text-2xl text-phosphor">
            64 KB
          </div>
          <figcaption className="font-mono text-2xs text-phosphor-dim uppercase tracking-terminal-2xl">
            Clean
          </figcaption>
        </figure>
        <figure className="grid gap-2">
          <div className="relative isolate grid h-36 place-items-center overflow-hidden border border-line bg-void font-mono text-2xl text-phosphor">
            64 KB
            <Grain animated={animated} opacity={opacity} />
          </div>
          <figcaption className="font-mono text-2xs text-phosphor uppercase tracking-terminal-2xl">
            Grain
          </figcaption>
        </figure>
      </div>

      <p className="max-w-prose text-muted-foreground text-sm">
        The blend is <code>screen</code>, so the noise reads in the blacks
        rather than only over lit content.
      </p>
    </div>
  );
}
