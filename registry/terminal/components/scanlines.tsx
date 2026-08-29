import type * as React from "react";

import { cn } from "@/lib/utils";

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
