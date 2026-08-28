"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";

import { cn } from "@/lib/utils";

/**
 * Three pixels of track and a light in it.
 *
 * Determinate by default. Passing `indeterminate` hands the primitive a null
 * value and swaps the fill for a segment that sweeps the track and leaves at
 * the far edge, which is the honest shape for a wait of unknown length: a bar
 * creeping to ninety percent and stopping is a progress bar telling a lie.
 *
 * The segment is held flat across its middle rather than faded from both ends,
 * because at three pixels a two-stop gradient is so rarely at full strength that
 * the sweep reads as a smudge instead of a light.
 */
function Progress({
  className,
  value,
  indeterminate = false,
  ...props
}: Omit<ProgressPrimitive.Root.Props, "value"> & {
  value?: number | null;
  indeterminate?: boolean;
}) {
  return (
    <ProgressPrimitive.Root
      className={cn("w-full", className)}
      data-slot="progress"
      value={indeterminate ? null : (value ?? null)}
      {...props}
    >
      <ProgressPrimitive.Track
        className="relative h-[3px] w-full overflow-hidden rounded-none bg-phosphor/10"
        data-slot="progress-track"
      >
        {indeterminate ? (
          <div
            className="absolute inset-y-0 left-0 w-1/3 animate-sweep bg-[linear-gradient(90deg,transparent,var(--phosphor)_35%_65%,transparent)] shadow-[0_0_12px_rgb(134_250_221/0.5)]"
            data-slot="progress-indicator"
          />
        ) : (
          <ProgressPrimitive.Indicator
            className="h-full bg-phosphor shadow-[0_0_12px_rgb(134_250_221/0.5)] transition-all duration-300 ease-terminal"
            data-slot="progress-indicator"
          />
        )}
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  );
}

export { Progress };
