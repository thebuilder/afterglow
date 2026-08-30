import type * as React from "react";

import { cn } from "@/lib/utils";

const TRAIL = [0, 1, 2, 5, 8, 7, 6, 3];
const LAP_MS = 800;
const CELLS = 9;
const GLYPHS = ["|", "/", "-", "\\"];

function Spinner({
  className,
  variant = "pixel",
  ...props
}: React.ComponentProps<"span"> & { variant?: "pixel" | "line" }) {
  if (variant === "line") {
    return (
      <span
        aria-label="Loading"
        className={cn(
          // One character wide and one line tall, held there rather than
          // measured from the glyph on screen. A bar is narrower than a
          // backslash, so a box that hugs its content would shift the text
          // beside it four times a second.
          "inline-block h-[1em] w-[1ch] shrink-0 overflow-hidden text-center align-[-0.15em] font-mono leading-none",
          className
        )}
        data-slot="spinner"
        data-variant="line"
        role="status"
        {...props}
      >
        {/* The strip is the animation. Each glyph gets a line of its own and
            the column is pulled up a line at a time, so the four frames land
            where they are written rather than where a browser decides. */}
        <span aria-hidden="true" className="grid animate-glyph">
          {GLYPHS.map((glyph) => (
            <span className="h-[1em] leading-none" key={glyph}>
              {glyph}
            </span>
          ))}
        </span>
      </span>
    );
  }

  return (
    <span
      aria-label="Loading"
      className={cn(
        "inline-grid size-4 grid-cols-3 grid-rows-3 gap-px",
        className
      )}
      data-slot="spinner"
      data-variant="pixel"
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
