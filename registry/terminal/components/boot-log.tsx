"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type BootTone = "default" | "dim" | "ok" | "warn" | "error";

type BootLine = string | { text: string; tone?: BootTone };

const TONE_CLASS: Record<BootTone, string> = {
  default: "text-phosphor-bright",
  dim: "text-phosphor-dim",
  error: "text-signal",
  ok: "text-phosphor",
  warn: "text-amber",
};

function toLine(line: BootLine): { text: string; tone: BootTone } {
  return typeof line === "string"
    ? { text: line, tone: "default" }
    : { text: line.text, tone: line.tone ?? "default" };
}

/**
 * A self test printing itself, one line at a time.
 *
 * Every line is in the DOM from the first frame and the unprinted ones are
 * merely invisible, which buys two things: the block is its final height before
 * anything animates, so nothing below it is pushed down four times on the way
 * in, and the server and the client render the same markup, so there is nothing
 * for hydration to disagree about.
 *
 * The caret follows the last printed line and stops at the end. A cursor still
 * blinking under a finished log is a machine claiming to be waiting for input it
 * is not going to read.
 */
function BootLog({
  className,
  lines,
  interval = 240,
  prefix = ">",
  onComplete,
  ...props
}: Omit<React.ComponentProps<"ol">, "children"> & {
  lines: BootLine[];
  interval?: number;
  prefix?: string;
  onComplete?: () => void;
}) {
  const [printed, setPrinted] = useState(0);
  const total = lines.length;

  useEffect(() => {
    if (printed >= total) {
      onComplete?.();
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      setPrinted(total);
      return;
    }

    const timer = window.setTimeout(() => setPrinted((n) => n + 1), interval);
    return () => window.clearTimeout(timer);
  }, [printed, total, interval, onComplete]);

  return (
    <ol
      className={cn(
        "m-0 grid list-none gap-1 p-0 font-mono text-xs",
        className
      )}
      data-slot="boot-log"
      {...props}
    >
      {lines.map(toLine).map((line, index) => {
        const shown = index < printed;

        return (
          <li
            aria-hidden={shown ? undefined : "true"}
            className={cn(
              "flex gap-2 leading-relaxed",
              TONE_CLASS[line.tone],
              shown ? "animate-type" : "invisible"
            )}
            key={line.text}
          >
            <span className="shrink-0 text-phosphor-dim">{prefix}</span>
            <span className="min-w-0">{line.text}</span>
            {shown && index === printed - 1 && printed < total && (
              <span
                aria-hidden="true"
                className="inline-block h-[1em] w-[0.5em] shrink-0 animate-caret self-center bg-phosphor"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export type { BootLine, BootTone };
export { BootLog };
