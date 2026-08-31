import type * as React from "react";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

function Glitch({
  active = true,
  children,
  className,
  shift = 3,
  ...props
}: React.ComponentProps<"span"> & {
  active?: boolean;
  shift?: number;
}) {
  return (
    <span
      className={cn("relative isolate inline-block", className)}
      data-slot="glitch"
      {...props}
    >
      {children}
      {active ? (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 animate-glitch text-signal mix-blend-screen"
            data-slot="glitch-layer"
            inert
            style={{ "--glitch-shift": `${shift}px` } as CSSProperties}
          >
            {children}
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 animate-glitch text-azure mix-blend-screen"
            data-slot="glitch-layer"
            inert
            style={{ "--glitch-shift": `${-shift}px` } as CSSProperties}
          >
            {children}
          </span>
        </>
      ) : null}
    </span>
  );
}

export { Glitch };
