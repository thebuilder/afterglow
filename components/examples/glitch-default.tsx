"use client";

import { useCallback, useId, useState } from "react";

import { Glitch } from "@/registry/terminal/components/glitch";
import { Led } from "@/registry/terminal/components/led";
import { Label } from "@/registry/terminal/ui/label";
import { Slider } from "@/registry/terminal/ui/slider";
import { Switch } from "@/registry/terminal/ui/switch";

export function GlitchDefault() {
  const activeId = useId();
  const shiftId = useId();
  const [active, setActive] = useState(true);
  const [shift, setShift] = useState(3);

  const changeShift = useCallback((value: number | readonly number[]) => {
    setShift(Array.isArray(value) ? value[0] : (value as number));
  }, []);

  return (
    <div className="grid w-full gap-5">
      <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
        <div className="flex items-center gap-3">
          <Switch checked={active} id={activeId} onCheckedChange={setActive} />
          <Label htmlFor={activeId}>Active</Label>
        </div>
        <div className="grid min-w-52 flex-1 gap-2">
          <div className="flex items-baseline justify-between">
            <Label htmlFor={shiftId}>Shift</Label>
            <span className="font-mono text-2xs text-metric tabular-nums">
              {shift}px
            </span>
          </div>
          <Slider
            id={shiftId}
            max={12}
            min={1}
            onValueChange={changeShift}
            step={1}
            value={[shift]}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-8">
        <Glitch
          active={active}
          className="font-bold font-mono text-2xl text-phosphor-bright tracking-terminal"
          shift={shift}
        >
          SIGNAL LOST
        </Glitch>

        <Glitch active={active} shift={shift}>
          <div className="grid w-56 gap-2 border border-line bg-panel p-4">
            <p className="flex items-center justify-between font-mono text-2xs text-phosphor-dim uppercase tracking-terminal-lg">
              Uplink
              <Led tone={active ? "error" : "ok"} />
            </p>
            <p className="font-mono text-phosphor-bright text-xl">1.2 Gb/s</p>
            <div className="h-[3px] bg-phosphor/10">
              <div className="h-full w-2/3 bg-phosphor shadow-glow-progress" />
            </div>
          </div>
        </Glitch>
      </div>
    </div>
  );
}
