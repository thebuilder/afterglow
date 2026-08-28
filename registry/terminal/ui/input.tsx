import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A field is a line you type on, so it is drawn as one: a hairline box, mono
 * text, and a caret in the bright phosphor rather than the browser's white.
 *
 * The focus treatment moves the border instead of adding a ring. A ring at this
 * palette's contrast reads as a second border around the first, and the field
 * ends up looking selected rather than active.
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-9 w-full min-w-0 rounded-none border border-input bg-panel-sunken px-3 py-1 font-mono text-sm text-phosphor-bright caret-phosphor-bright outline-none transition-[border-color,box-shadow] duration-150 ease-terminal",
        "placeholder:text-phosphor-dim selection:bg-signal selection:text-white",
        "focus-visible:border-line-strong focus-visible:shadow-glow",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40",
        "aria-invalid:border-destructive aria-invalid:shadow-[0_0_18px_rgb(255_90_101/0.2)]",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:font-mono file:text-foreground file:text-xs",
        className
      )}
      data-slot="input"
      type={type}
      {...props}
    />
  );
}

export { Input };
