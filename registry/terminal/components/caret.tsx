import type * as React from "react";

import { cn } from "@/lib/utils";

function Caret({
  blink = true,
  className,
  ...props
}: React.ComponentProps<"span"> & { blink?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "terminal-caret text-phosphor",
        blink && "animate-caret",
        className
      )}
      data-slot="caret"
      {...props}
    />
  );
}

export { Caret };
