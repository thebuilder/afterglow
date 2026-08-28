import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A light going round a 3x3 grid of pixels.
 *
 * A rotating ring is the wrong object here. It is a smooth analogue sweep, and
 * this system draws with cells: the honest loader for a character display is a
 * lit pixel travelling a fixed path with a trail decaying behind it.
 *
 * Every cell runs the same decay animation and the only difference between them
 * is when it started, so the trail is one keyframe phase-shifted eight ways
 * rather than eight keyframes kept in agreement. The delays are negative, which
 * starts each cell part-way through its cycle instead of waiting a full lap
 * before the pattern is complete.
 */

/** Grid indices in travel order, clockwise from the top-left. The centre is not on the path. */
const TRAIL = [0, 1, 2, 5, 8, 7, 6, 3];
const LAP_MS = 800;
const CELLS = 9;

function Spinner({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-label="Loading"
      className={cn(
        "inline-grid size-4 grid-cols-3 grid-rows-3 gap-px",
        className
      )}
      data-slot="spinner"
      role="status"
      {...props}
    >
      {Array.from({ length: CELLS }, (_, index) => {
        const step = TRAIL.indexOf(index);

        return (
          <span
            className={cn(
              "bg-phosphor",
              /* The centre is off the path, and sits at the tail's floor so the
                 grid still reads as nine pixels rather than a broken ring. */
              step === -1 ? "opacity-[0.16]" : "animate-pixel"
            )}
            // biome-ignore lint/suspicious/noArrayIndexKey: the cells are a fixed grid, and the index is the position.
            key={index}
            style={
              step === -1
                ? undefined
                : { animationDelay: `${-(step * LAP_MS) / TRAIL.length}ms` }
            }
          />
        );
      })}
    </span>
  );
}

export { Spinner };
