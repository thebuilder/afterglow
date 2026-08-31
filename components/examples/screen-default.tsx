"use client";

import { useId, useState } from "react";

import { Eyebrow } from "@/registry/terminal/components/eyebrow";
import { Screen } from "@/registry/terminal/components/screen";
import { Label } from "@/registry/terminal/ui/label";
import { Switch } from "@/registry/terminal/ui/switch";

const BARS = [
  "bg-phosphor-bright",
  "bg-amber",
  "bg-phosphor",
  "bg-azure",
  "bg-violet",
  "bg-signal",
  "bg-ember",
];

export function ScreenDefault() {
  const bloomId = useId();
  const grilleId = useId();
  const rollId = useId();
  const grainId = useId();

  const [bloom, setBloom] = useState(true);
  const [grille, setGrille] = useState(true);
  const [roll, setRoll] = useState(true);
  const [grain, setGrain] = useState(true);

  const layers: [string, boolean, (on: boolean) => void, string][] = [
    ["Grille", grille, setGrille, grilleId],
    ["Bloom", bloom, setBloom, bloomId],
    ["Roll", roll, setRoll, rollId],
    ["Grain", grain, setGrain, grainId],
  ];

  return (
    <div className="grid w-full gap-5">
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {layers.map(([label, on, set, id]) => (
          <div className="flex items-center gap-3" key={label}>
            <Switch checked={on} id={id} onCheckedChange={set} size="sm" />
            <Label htmlFor={id}>{label}</Label>
          </div>
        ))}
      </div>

      <Screen
        bloom={bloom}
        className="grid h-56 grid-rows-[1fr_auto]"
        grain={grain}
        grille={grille}
        roll={roll}
      >
        <div className="grid grid-cols-7">
          {BARS.map((bar) => (
            <div className={bar} key={bar} />
          ))}
        </div>
        <div className="grid gap-1 px-6 py-5">
          <Eyebrow caret>Standby</Eyebrow>
          <p className="font-mono text-lg text-phosphor-bright">NO SIGNAL</p>
        </div>
      </Screen>

      <p className="max-w-prose text-muted-foreground text-sm">
        Every layer darkens or tints what is under it, so all four need lit
        content to act on.
      </p>
    </div>
  );
}
