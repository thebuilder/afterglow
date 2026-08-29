import type * as React from "react";

import { cn } from "@/lib/utils";

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
      {caret ? (
        <span
          aria-hidden="true"
          className="ml-[0.35em] inline-block h-[0.95em] w-[0.5em] animate-caret bg-phosphor align-[-0.12em]"
          data-slot="eyebrow-caret"
        />
      ) : null}
    </p>
  );
}

export { Eyebrow };
