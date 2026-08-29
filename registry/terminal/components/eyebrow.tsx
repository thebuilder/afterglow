import type * as React from "react";

import { cn } from "@/lib/utils";
import { Caret } from "@/registry/terminal/components/caret";

function Eyebrow({
  className,
  caret = false,
  children,
  ...props
}: React.ComponentProps<"p"> & { caret?: boolean }) {
  return (
    <p
      className={cn(
        "m-0 font-bold font-mono text-2xs text-phosphor uppercase leading-tight tracking-terminal-3xl",
        className
      )}
      data-slot="eyebrow"
      {...props}
    >
      {children}
      {caret ? <Caret className="ml-1" data-slot="eyebrow-caret" /> : null}
    </p>
  );
}

export { Eyebrow };
