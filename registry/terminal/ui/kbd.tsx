import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A key, drawn as one. The bottom border is brighter than the other three and
 * there is a hard shadow under it, which is the whole trick: a flat rectangle
 * reads as a badge, and two pixels of implied depth read as something you press.
 *
 * `glyph` is for the keys that are a symbol rather than a letter, and it is not
 * optional dressing. Measured at the letter size, `K` paints 7.3px of ink and
 * `⌘` paints 6.5, `⇧` 5.6 and `↵` 4.2: these are drawn from strokes thin enough
 * that the eye cannot complete them from memory the way it completes a letter,
 * so at a letter's size they read as smudges rather than as keys. The symbol
 * takes a larger type scale with its line box held down to the letter's, which
 * buys back the ink without the key growing or its cap drifting off the row.
 */
function Kbd({
  className,
  glyph = false,
  ...props
}: React.ComponentProps<"kbd"> & { glyph?: boolean }) {
  return (
    <kbd
      className={cn(
        "pointer-events-none inline-flex h-[1.375rem] w-fit min-w-[1.375rem] select-none items-center justify-center gap-1 rounded-none border border-line border-b-line-strong bg-secondary px-1.5 pt-[1.5px] font-medium font-mono text-[0.6875rem] text-phosphor-bright leading-none shadow-[0_2px_0_rgb(0_0_0/0.45)]",
        glyph && "pt-0 text-[0.9375rem] leading-[0.72]",
        "[&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      data-glyph={glyph || undefined}
      data-slot="kbd"
      {...props}
    />
  );
}

function KbdGroup({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("inline-flex items-center gap-1", className)}
      data-slot="kbd-group"
      {...props}
    />
  );
}

export { Kbd, KbdGroup };
