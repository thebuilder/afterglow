"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";

import { cn } from "@/lib/utils";

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
