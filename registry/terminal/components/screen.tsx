import type * as React from "react";
import { cn } from "@/lib/utils";
import { Scanlines } from "@/registry/terminal/components/scanlines";

/**
 * A framed piece of tube: the dark ground, the glass, and the darkening towards
 * the corners that a curved screen has and a flat rectangle does not.
 *
 * `isolate` is doing real work. The scanlines multiply, and without a stacking
 * context of their own they would multiply against whatever the screen happens
 * to be sitting on rather than against the screen's own contents.
 */
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
        className,
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
