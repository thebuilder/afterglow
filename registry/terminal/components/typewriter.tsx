"use client";

import type * as React from "react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Caret } from "@/registry/terminal/components/caret";
import { useReducedMotion } from "@/registry/terminal/hooks/use-reduced-motion";

function Typewriter({
  caret = true,
  className,
  jitter = 0.45,
  loop = false,
  loopDelay = 1800,
  onDone,
  speed = 55,
  startDelay = 0,
  text,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & {
  caret?: boolean;
  jitter?: number;
  loop?: boolean;
  loopDelay?: number;
  onDone?: () => void;
  speed?: number;
  startDelay?: number;
  text: string;
}) {
  const reduced = useReducedMotion();
  const [printed, setPrinted] = useState(0);
  const [source, setSource] = useState(text);
  const finished = useRef(onDone);

  if (source !== text) {
    setSource(text);
    setPrinted(0);
  }

  const total = text.length;
  const done = printed >= total;

  useEffect(() => {
    finished.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (reduced) {
      setPrinted(total);
      return;
    }
    if (done) {
      return;
    }
    const spread = speed * (1 + (Math.random() - 0.5) * 2 * jitter);
    const delay = Math.max(8, printed === 0 ? startDelay + spread : spread);
    const timer = window.setTimeout(
      () => setPrinted((count) => count + 1),
      delay
    );
    return () => window.clearTimeout(timer);
  }, [done, jitter, printed, reduced, speed, startDelay, total]);

  useEffect(() => {
    if (!done) {
      return;
    }
    finished.current?.();
    if (!loop || reduced) {
      return;
    }
    const restart = window.setTimeout(() => setPrinted(0), loopDelay);
    return () => window.clearTimeout(restart);
  }, [done, loop, loopDelay, reduced]);

  return (
    <span
      className={cn("font-mono", className)}
      data-slot="typewriter"
      {...props}
    >
      <span data-slot="typewriter-printed">{text.slice(0, printed)}</span>
      {caret ? <Caret data-slot="typewriter-caret" /> : null}
      <span className="opacity-0" data-slot="typewriter-pending">
        {text.slice(printed)}
      </span>
    </span>
  );
}

export { Typewriter };
