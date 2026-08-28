import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A row that has not arrived yet. Sharp, faint, and the beam's colour rather
 * than grey: a neutral placeholder on this palette reads as a broken element
 * instead of an empty one.
 *
 * The pulse is Tailwind's, so the theme's reduced-motion block does not cover
 * it. That block is built from the theme's own `animate-*` tokens and cannot
 * see this one, so the component turns it off itself.
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-none bg-phosphor/10 motion-reduce:animate-none",
        className
      )}
      data-slot="skeleton"
      {...props}
    />
  );
}

export { Skeleton };
