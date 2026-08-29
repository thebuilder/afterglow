import type * as React from "react";

import { cn } from "@/lib/utils";

function Kbd({
  className,
  glyph = false,
  ...props
}: React.ComponentProps<"kbd"> & { glyph?: boolean }) {
  return (
    <kbd
      className={cn(
        "pointer-events-none inline-flex h-[1.375rem] w-fit min-w-[1.375rem] select-none items-center justify-center gap-1 rounded-none border border-line border-b-line-strong bg-secondary px-1.5 pt-[1.5px] font-medium font-mono text-1xs text-phosphor-bright leading-none shadow-kbd",
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
