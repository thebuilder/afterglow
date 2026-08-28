"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * `[ ]` and `[x]`. Square, sharp, and filled with the beam when it is on, which
 * is the one state change worth making unmissable in a form.
 */
function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "peer size-4 shrink-0 rounded-none border border-input bg-panel-sunken outline-none transition-[background-color,border-color,box-shadow]",
        "focus-visible:border-line-strong focus-visible:shadow-glow",
        "data-disabled:cursor-not-allowed data-disabled:opacity-40",
        "aria-invalid:border-destructive",
        "data-checked:border-phosphor data-checked:bg-phosphor data-checked:text-void",
        "data-indeterminate:border-phosphor data-indeterminate:text-phosphor",
        className
      )}
      data-slot="checkbox"
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className="grid place-content-center text-current transition-none"
        data-slot="checkbox-indicator"
      >
        <CheckIcon className="size-3.5" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
