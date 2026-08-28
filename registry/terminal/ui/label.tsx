import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A plain `<label>`. There is no primitive to wrap: the element already carries
 * the association to its control, and Base UI's field components manage the
 * wiring where a form needs more than `htmlFor`.
 */
function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: this is the wrapper, not the usage. `htmlFor` and the text both arrive through props, and the rule cannot see across the call site.
    <label
      className={cn(
        "flex select-none items-center gap-2 font-mono font-semibold text-[0.625rem] text-phosphor uppercase leading-none tracking-[0.14em]",
        "group-data-[disabled]:pointer-events-none group-data-[disabled]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      data-slot="label"
      {...props}
    />
  );
}

export { Label };
