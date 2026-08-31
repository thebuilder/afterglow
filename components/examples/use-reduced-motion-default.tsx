"use client";

import { Caret } from "@/registry/terminal/components/caret";
import { Status } from "@/registry/terminal/components/led";
import { useReducedMotion } from "@/registry/terminal/hooks/use-reduced-motion";

export function UseReducedMotionDefault() {
  const reduced = useReducedMotion();

  return (
    <div className="grid w-full gap-4">
      <Status tone={reduced ? "busy" : "ok"}>
        prefers-reduced-motion: {reduced ? "reduce" : "no-preference"}
      </Status>

      <div className="grid gap-3 border border-line bg-panel-sunken p-4 font-mono text-sm">
        <p className="flex items-center gap-2 text-phosphor-bright">
          <span aria-hidden="true" className="text-phosphor-dim">
            &gt;
          </span>
          {reduced ? "printed in one step" : "printed one line at a time"}
          <Caret blink={!reduced} />
        </p>
        <p className="text-muted-foreground text-xs">
          Change the setting in your operating system and this updates without a
          reload. The hook subscribes to the query rather than reading it once.
        </p>
      </div>
    </div>
  );
}
