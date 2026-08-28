"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";

import { cn } from "@/lib/utils";

/**
 * `( )` and `(•)`. Round, and deliberately so: it is the one shape in the set
 * that is not square, because the shape is what tells you that picking this one
 * unpicks the others. A terminal has always drawn radios with parentheses and
 * checkboxes with brackets, so the convention and the aesthetic agree here.
 */
function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      className={cn("grid gap-3", className)}
      data-slot="radio-group"
      {...props}
    />
  );
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      className={cn(
        "aspect-square size-4 shrink-0 rounded-full border border-input bg-panel-sunken text-phosphor outline-none transition-[border-color,box-shadow]",
        "focus-visible:border-line-strong focus-visible:shadow-glow",
        "data-disabled:cursor-not-allowed data-disabled:opacity-40",
        "aria-invalid:border-destructive",
        "data-checked:border-phosphor",
        className
      )}
      data-slot="radio-group-item"
      {...props}
    >
      <RadioPrimitive.Indicator
        className="relative flex size-full items-center justify-center"
        data-slot="radio-group-indicator"
      >
        <span className="size-2 rounded-full bg-phosphor shadow-[0_0_6px_var(--phosphor)]" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}

export { RadioGroup, RadioGroupItem };
