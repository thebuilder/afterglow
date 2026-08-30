"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";

import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  indeterminate = false,
  cells,
  ...props
}: Omit<ProgressPrimitive.Root.Props, "value"> & {
  value?: number | null;
  indeterminate?: boolean;
  cells?: number;
}) {
  return (
    <ProgressPrimitive.Root
      className={cn("w-full", className)}
      data-slot="progress"
      value={indeterminate ? null : (value ?? null)}
      {...props}
    >
      <ProgressPrimitive.Track
        className={cn(
          "relative w-full overflow-hidden rounded-none bg-phosphor/10",
          cells ? "h-2" : "h-[3px]"
        )}
        data-slot="progress-track"
        // The blocks are cut out of the track rather than laid over it, so the
        // fill underneath stays one continuous bar. Only the mask decides where
        // the gaps fall, which is why the sweep survives being segmented.
        style={
          cells
            ? {
                maskImage: `repeating-linear-gradient(to right, #000 0 calc(100% / ${cells} - 2px), transparent calc(100% / ${cells} - 2px) calc(100% / ${cells}))`,
              }
            : undefined
        }
      >
        {indeterminate ? (
          <div
            className="absolute inset-y-0 left-0 w-1/3 animate-sweep bg-[linear-gradient(90deg,transparent,var(--phosphor)_35%_65%,transparent)] shadow-glow-progress"
            data-slot="progress-indicator"
          />
        ) : (
          <ProgressPrimitive.Indicator
            className="h-full bg-phosphor shadow-glow-progress transition-all duration-300 ease-terminal"
            data-slot="progress-indicator"
          />
        )}
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  );
}

export { Progress };
