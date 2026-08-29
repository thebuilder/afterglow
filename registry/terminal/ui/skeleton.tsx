import type * as React from "react";

import { cn } from "@/lib/utils";

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
