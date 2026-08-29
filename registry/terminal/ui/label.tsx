import type * as React from "react";

import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: call sites provide `htmlFor` and text.
    <label
      className={cn(
        "flex select-none items-center gap-2 font-mono font-semibold text-2xs text-phosphor uppercase leading-none tracking-terminal-xl",
        "group-data-[disabled]:pointer-events-none group-data-[disabled]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      data-slot="label"
      {...props}
    />
  );
}

export { Label };
