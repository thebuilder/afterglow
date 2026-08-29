import type * as React from "react";

import { cn } from "@/lib/utils";

function Connector({
  className,
  direction = "right",
  ...props
}: React.ComponentProps<"span"> & { direction?: "left" | "right" }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative block h-px w-full max-w-104",
        direction === "right"
          ? "bg-[linear-gradient(90deg,var(--line-strong),transparent)]"
          : "bg-[linear-gradient(270deg,var(--line-strong),transparent)]",
        className
      )}
      data-direction={direction}
      data-slot="connector"
      {...props}
    >
      <span
        className={cn(
          "-top-0.5 absolute size-[5px] bg-phosphor",
          direction === "right" ? "left-0" : "right-0"
        )}
      />
    </span>
  );
}

export { Connector };
