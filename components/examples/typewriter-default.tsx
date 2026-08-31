"use client";

import { useCallback, useId, useState } from "react";

import { Typewriter } from "@/registry/terminal/components/typewriter";
import { Button } from "@/registry/terminal/ui/button";
import { Label } from "@/registry/terminal/ui/label";
import { Slider } from "@/registry/terminal/ui/slider";
import { Switch } from "@/registry/terminal/ui/switch";

const COMMAND = "shadcn add @afterglow/typewriter";
const RESULT = "writing components/ui/typewriter.tsx ... ok";

export function TypewriterDefault() {
  const speedId = useId();
  const loopId = useId();
  const [speed, setSpeed] = useState(55);
  const [loop, setLoop] = useState(false);
  const [run, setRun] = useState(0);
  const [done, setDone] = useState(false);

  const replay = useCallback(() => {
    setDone(false);
    setRun((count) => count + 1);
  }, []);

  const reveal = useCallback(() => setDone(true), []);

  const changeSpeed = useCallback((value: number | readonly number[]) => {
    setSpeed(Array.isArray(value) ? value[0] : (value as number));
  }, []);

  return (
    <div className="grid w-full gap-5">
      <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
        <div className="grid min-w-52 flex-1 gap-2">
          <div className="flex items-baseline justify-between">
            <Label htmlFor={speedId}>Speed</Label>
            <span className="font-mono text-2xs text-metric tabular-nums">
              {speed}ms a character
            </span>
          </div>
          <Slider
            id={speedId}
            max={140}
            min={8}
            onValueChange={changeSpeed}
            step={4}
            value={[speed]}
          />
        </div>
        <div className="flex items-center gap-3">
          <Switch checked={loop} id={loopId} onCheckedChange={setLoop} />
          <Label htmlFor={loopId}>Loop</Label>
        </div>
        <Button onClick={replay} size="sm" variant="outline">
          Replay
        </Button>
      </div>

      <div
        className="grid gap-1 border border-line bg-panel-sunken p-4 font-mono text-sm"
        key={run}
      >
        <p className="flex min-w-0 gap-2">
          <span aria-hidden="true" className="text-signal">
            $
          </span>
          <Typewriter
            className="min-w-0 text-phosphor-bright"
            loop={loop}
            onDone={reveal}
            speed={speed}
            text={COMMAND}
          />
        </p>
        <p className={done ? "text-phosphor-dim" : "invisible"}>{RESULT}</p>
      </div>
    </div>
  );
}
