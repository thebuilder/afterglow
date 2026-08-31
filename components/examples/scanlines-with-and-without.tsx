"use client";

import { useCallback, useId, useState } from "react";

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

function TestCard() {
  return (
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
  );
}

export function ScanlinesWithAndWithout() {
  const vignetteId = useId();
  const [density, setDensity] = useState<Density>("fine");
  const [vignette, setVignette] = useState(true);

  const pick = useCallback((value: unknown) => {
    const next = Array.isArray(value) ? value[0] : value;
    if (typeof next === "string") {
      setDensity(next as Density);
    }
  }, []);

  return (
    <div className="grid w-full gap-5">
      <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
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
            checked={vignette}
            id={vignetteId}
            onCheckedChange={setVignette}
          />
          <Label htmlFor={vignetteId}>Vignette</Label>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <figure className="grid gap-2">
          <div className="relative isolate h-36 overflow-hidden border border-line">
            <TestCard />
          </div>
          <figcaption className="font-mono text-2xs text-phosphor-dim uppercase tracking-terminal-2xl">
            Without
          </figcaption>
        </figure>
        <figure className="grid gap-2">
          <div className="relative isolate h-36 overflow-hidden border border-line">
            <TestCard />
            <Scanlines density={density} vignette={vignette} />
          </div>
          <figcaption className="font-mono text-2xs text-phosphor uppercase tracking-terminal-2xl">
            With
          </figcaption>
        </figure>
      </div>

      <p className="max-w-prose text-muted-foreground text-sm">
        This site is behind a sheet of its own. Turn the page glass off from the
        display menu in the header to see the left panel bare.
      </p>
    </div>
  );
}
