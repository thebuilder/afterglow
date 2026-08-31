import type * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-9 w-full min-w-0 rounded-none border border-input bg-panel-sunken px-3 py-1 font-mono text-base text-phosphor-bright caret-phosphor-bright outline-none transition duration-150 ease-terminal md:text-sm",
        "placeholder:text-phosphor-dim selection:bg-signal selection:text-white",
        "focus-visible:border-line-strong focus-visible:shadow-glow",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40",
        "aria-invalid:border-destructive aria-invalid:shadow-glow-destructive",
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
