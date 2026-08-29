import type * as React from "react";

import { cn } from "@/lib/utils";

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

              step === -1 ? "opacity-[0.16]" : "animate-pixel"
            )}
            // biome-ignore lint/suspicious/noArrayIndexKey: the cell index is its position.
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
