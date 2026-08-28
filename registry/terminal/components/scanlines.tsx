import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * The glass over the picture.
 *
 * One element, absolutely positioned, and inert. It goes inside anything with a
 * positioning context (a screen, a card, a canvas), or `fixed` puts it over the
 * whole document, which is what a page-level treatment wants.
 *
 * The lines multiply rather than overlay: they darken what is under them instead
 * of laying a grey film on top, which is the difference between a tube and a
 * screenshot of a tube with 16% black over it.
 *
 * `fine` is 2px on 1px and belongs on text, which is where a coarse line starts
 * eating letterforms. `soft` is the 3-on-1 the whole page can carry.
 */
function Scanlines({
  className,
  density = "fine",
  vignette = false,
  fixed = false,
  ...props
}: React.ComponentProps<"div"> & {
  density?: "fine" | "soft";
  vignette?: boolean;
  fixed?: boolean;
}) {
  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none z-100 inset-0",
          fixed ? "fixed" : "absolute",
          density === "fine" ? "scanlines" : "scanlines-soft",
          className
        )}
        data-slot="scanlines"
        {...props}
      />
      {vignette ? (
        <div
          aria-hidden="true"
          className={cn(
            "vignette pointer-events-none z-100 inset-0",
            fixed ? "fixed" : "absolute"
          )}
          data-slot="scanlines-vignette"
        />
      ) : null}
    </>
  );
}

export { Scanlines };
