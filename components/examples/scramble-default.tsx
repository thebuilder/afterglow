"use client";

import { useCallback, useId, useState } from "react";

import { Scramble } from "@/registry/terminal/components/scramble";
import { Button } from "@/registry/terminal/ui/button";
import { Label } from "@/registry/terminal/ui/label";
import { Slider } from "@/registry/terminal/ui/slider";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/terminal/ui/toggle-group";

const TRIGGERS = ["mount", "hover", "view"] as const;

type Trigger = (typeof TRIGGERS)[number];

const ROWS: [string, string][] = [
  ["key", "A93F-77C1-0E4B"],
  ["host", "node-04.afterglow"],
  ["state", "DECRYPTED"],
];

export function ScrambleDefault() {
  const speedId = useId();
  const [trigger, setTrigger] = useState<Trigger>("mount");
  const [speed, setSpeed] = useState(34);
  const [run, setRun] = useState(0);

  const replay = useCallback(() => setRun((count) => count + 1), []);

  const pick = useCallback((value: unknown) => {
    const next = Array.isArray(value) ? value[0] : value;
    if (typeof next === "string") {
      setTrigger(next as Trigger);
      setRun((count) => count + 1);
    }
  }, []);

  const changeSpeed = useCallback((value: number | readonly number[]) => {
    setSpeed(Array.isArray(value) ? value[0] : (value as number));
    setRun((count) => count + 1);
  }, []);

  return (
    <div className="grid w-full gap-5">
      <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
        <div className="grid gap-2">
          <Label>Trigger</Label>
          <ToggleGroup onValueChange={pick} value={[trigger]}>
            {TRIGGERS.map((name) => (
              <ToggleGroupItem key={name} value={name}>
                {name}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="grid min-w-52 flex-1 gap-2">
          <div className="flex items-baseline justify-between">
            <Label htmlFor={speedId}>Speed</Label>
            <span className="font-mono text-2xs text-metric tabular-nums">
              {speed}ms a step
            </span>
          </div>
          <Slider
            id={speedId}
            max={120}
            min={10}
            onValueChange={changeSpeed}
            step={2}
            value={[speed]}
          />
        </div>
        <Button onClick={replay} size="sm" variant="outline">
          Replay
        </Button>
      </div>

      <div
        className="grid gap-2 border border-line bg-panel-sunken p-4 font-mono text-sm"
        key={run}
      >
        {ROWS.map(([label, value]) => (
          <p className="flex gap-4" key={label}>
            <span className="w-14 shrink-0 text-phosphor-dim">{label}</span>
            <Scramble
              className="text-phosphor-bright"
              speed={speed}
              text={value}
              trigger={trigger}
            />
          </p>
        ))}
      </div>

      {trigger === "hover" ? (
        <p className="font-mono text-2xs text-muted-foreground uppercase tracking-terminal">
          Point at a value to run it
        </p>
      ) : null}
    </div>
  );
}
