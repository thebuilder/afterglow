import type * as React from "react";
import { cn } from "@/lib/utils";
import { Scanlines } from "@/registry/terminal/components/scanlines";

function Screen({
  className,
  children,
  vignette = true,
  density = "fine",
  ...props
}: React.ComponentProps<"div"> & {
  vignette?: boolean;
  density?: "fine" | "soft";
}) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden border border-line bg-void",
        className
      )}
      data-slot="screen"
      {...props}
    >
      {children}
      <Scanlines density={density} vignette={vignette} />
    </div>
  );
}

export { Screen };
