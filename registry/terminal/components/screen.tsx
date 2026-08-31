import type * as React from "react";
import { cn } from "@/lib/utils";
import { Grain } from "@/registry/terminal/components/grain";
import { Scanlines } from "@/registry/terminal/components/scanlines";

function Screen({
  bloom = false,
  children,
  className,
  density = "fine",
  grain = false,
  grille = false,
  roll = false,
  vignette = true,
  ...props
}: React.ComponentProps<"div"> & {
  bloom?: boolean;
  density?: "fine" | "soft";
  grain?: boolean;
  grille?: boolean;
  roll?: boolean;
  vignette?: boolean;
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
      {bloom ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-90 opacity-70 backdrop-blur-[9px] backdrop-brightness-[1.4] backdrop-saturate-[1.4] mix-blend-screen"
          data-slot="screen-bloom"
        />
      ) : null}
      {grille ? (
        <div
          aria-hidden="true"
          className="screen-grille pointer-events-none absolute inset-0 z-100"
          data-slot="screen-grille"
        />
      ) : null}
      {roll ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 z-100 h-1/2 animate-roll bg-linear-to-b from-transparent via-white/15 to-transparent mix-blend-screen"
          data-slot="screen-roll"
        />
      ) : null}
      {grain ? <Grain animated className="z-100" /> : null}
      <Scanlines density={density} vignette={vignette} />
    </div>
  );
}

export { Screen };
