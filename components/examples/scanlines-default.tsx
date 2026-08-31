"use client";

import { useCallback, useId, useState } from "react";

import { setSiteGlass, useSiteGlass } from "@/components/docs/site-glass";
import { Scanlines } from "@/registry/terminal/components/scanlines";
import { Label } from "@/registry/terminal/ui/label";
import { Switch } from "@/registry/terminal/ui/switch";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/terminal/ui/toggle-group";

const DENSITIES = ["fine", "soft"] as const;

type Density = (typeof DENSITIES)[number];

const BARS = [
  "bg-phosphor-bright",
  "bg-amber",
  "bg-phosphor",
  "bg-azure",
  "bg-violet",
  "bg-signal",
  "bg-ember",
];

const WEDGE = [
  "bg-white",
  "bg-white/70",
  "bg-white/45",
  "bg-white/20",
  "bg-void",
];

export function ScanlinesDefault() {
  const linesId = useId();
  const glassId = useId();
  const [lines, setLines] = useState(true);
  const [density, setDensity] = useState<Density>("fine");
  const pageGlass = useSiteGlass();

  const pick = useCallback((value: unknown) => {
    const next = Array.isArray(value) ? value[0] : value;
    if (typeof next === "string") {
      setDensity(next as Density);
    }
  }, []);

  return (
    <div className="grid w-full gap-5">
      <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
        <div className="flex items-center gap-3">
          <Switch checked={lines} id={linesId} onCheckedChange={setLines} />
          <Label htmlFor={linesId}>Scanlines</Label>
        </div>
        <div className="grid gap-2">
          <Label>Density</Label>
          <ToggleGroup onValueChange={pick} value={[density]}>
            {DENSITIES.map((name) => (
              <ToggleGroupItem key={name} value={name}>
                {name}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="flex items-center gap-3">
          <Switch
            checked={pageGlass}
            id={glassId}
            onCheckedChange={setSiteGlass}
          />
          <Label htmlFor={glassId}>Page glass</Label>
        </div>
      </div>

      <div className="relative isolate h-44 overflow-hidden border border-line">
        <div className="grid h-full grid-rows-[3fr_1fr]">
          <div className="grid grid-cols-7">
            {BARS.map((bar) => (
              <div className={bar} key={bar} />
            ))}
          </div>
          <div className="grid grid-cols-5">
            {WEDGE.map((step) => (
              <div className={step} key={step} />
            ))}
          </div>
        </div>
        {lines ? <Scanlines density={density} /> : null}
      </div>

      <p className="max-w-prose text-muted-foreground text-sm">
        Page glass is this site's own sheet, not part of the component. It sits
        over everything including the panel above, so turn it off to see the
        scanlines switch on its own.
      </p>
    </div>
  );
}
