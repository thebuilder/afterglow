import type * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "field-sizing-content flex min-h-16 w-full rounded-none border border-input bg-panel-sunken px-3 py-2 font-mono text-sm text-phosphor-bright caret-phosphor-bright outline-none transition-[border-color,box-shadow] duration-150 ease-terminal",
        "placeholder:text-phosphor-dim selection:bg-signal selection:text-white",
        "focus-visible:border-line-strong focus-visible:shadow-glow",
        "disabled:cursor-not-allowed disabled:opacity-40",
        "aria-invalid:border-destructive",
        className
      )}
      data-slot="textarea"
      {...props}
    />
  );
}

export { Textarea };
