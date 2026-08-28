"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none border border-transparent font-mono font-semibold uppercase tracking-[0.1em] outline-none transition-[color,background-color,border-color] duration-150 ease-terminal focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-phosphor-bright disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  {
    defaultVariants: { size: "default", variant: "default" },
    variants: {
      size: {
        default: "h-9 min-w-9 px-2.5 text-[0.625rem]",
        lg: "h-10 min-w-10 px-3 text-[0.6875rem]",
        sm: "h-8 min-w-8 px-2 text-[0.5625rem]",
      },
      variant: {
        default:
          "text-muted-foreground hover:bg-accent/60 hover:text-phosphor data-pressed:bg-accent data-pressed:text-phosphor-bright",
        outline:
          "border-line text-muted-foreground hover:border-line-strong hover:text-phosphor data-pressed:border-phosphor data-pressed:bg-accent data-pressed:text-phosphor-bright",
      },
    },
  }
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      className={cn(toggleVariants({ className, size, variant }))}
      data-slot="toggle"
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
