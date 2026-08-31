"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/terminal/ui/button";

const CYCLE = 2600;

function shift(value: string): CSSProperties {
  return { "--glitch-shift": value } as CSSProperties;
}

function Cell({
  children,
  className,
  token,
}: {
  children: React.ReactNode;
  className?: string;
  token: string;
}) {
  return (
    <div className={cn("grid content-start gap-3 bg-void p-4", className)}>
      <p className="font-mono text-3xs text-phosphor-dim uppercase tracking-terminal-2xl">
        {token}
      </p>
      <div className="relative isolate grid h-24 place-items-center overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export function ThemeMotion() {
  const [run, setRun] = useState(0);
  const [powered, setPowered] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const timer = window.setInterval(() => setPowered((on) => !on), CYCLE);
    return () => window.clearInterval(timer);
  }, []);

  const replay = useCallback(() => setRun((count) => count + 1), []);

  return (
    <div className="grid w-full gap-4">
      <div className="flex justify-end">
        <Button onClick={replay} size="sm" variant="outline">
          Replay
        </Button>
      </div>

      <div
        className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3"
        key={run}
      >
        <Cell token="animate-glitch">
          <span className="relative inline-block font-bold font-mono text-lg text-phosphor-bright tracking-terminal">
            SIGNAL LOST
            <span
              aria-hidden="true"
              className="absolute inset-0 animate-glitch text-signal"
              style={shift("3px")}
            >
              SIGNAL LOST
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-0 animate-glitch text-azure"
              style={shift("-3px")}
            >
              SIGNAL LOST
            </span>
          </span>
        </Cell>

        <Cell token="animate-flicker">
          <span className="animate-flicker font-bold font-mono text-lg text-phosphor-bright tracking-terminal text-shadow-phosphor">
            READY
          </span>
        </Cell>

        <Cell token="animate-jitter">
          <span className="animate-jitter font-mono text-2xl text-phosphor tabular-nums">
            01:24:07
          </span>
        </Cell>

        <Cell token="animate-roll">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 h-1/2 animate-roll bg-linear-to-b from-transparent via-white/8 to-transparent mix-blend-screen"
          />
          <div className="grid gap-1 font-mono text-phosphor text-xs">
            <p>volume ....... mounted</p>
            <p>parity ........ ok</p>
            <p>rebuild ....... queued</p>
          </div>
        </Cell>

        <Cell className="sm:col-span-2" token="animate-power-off / -on">
          <span
            className={cn(
              "absolute inset-0 grid place-items-center bg-void font-bold font-mono text-lg text-phosphor tracking-terminal",
              powered ? "animate-power-on" : "animate-power-off"
            )}
          >
            NODE-04
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-x-0 top-1/2 h-0.5 bg-linear-to-r from-transparent via-phosphor-bright to-transparent shadow-glow-line",
              powered ? "animate-power-line-in" : "animate-power-line-out"
            )}
          />
        </Cell>
      </div>
    </div>
  );
}
