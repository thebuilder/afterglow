import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A row that has not arrived yet. Sharp, faint, and the beam's colour rather
 * than grey: a neutral placeholder on this palette reads as a broken element
 * instead of an empty one.
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("animate-pulse rounded-none bg-phosphor/10", className)}
      data-slot="skeleton"
      {...props}
    />
  );
}

export { Skeleton };
