import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Scanlines } from "@/registry/terminal/components/scanlines";

/**
 * The framed ground every example is shown on.
 *
 * It carries its own glass, because every component here is a piece of
 * interface meant to be seen on a tube and one shown on flat black is one shown
 * out of the context it was designed for. The two items whose subject *is* the
 * glass are the exception: a demo of the scanlines needs a clean ground, or the
 * "without" half of the comparison arrives with scanlines on it.
 */
const BARE = new Set(["scanlines", "screen"]);

export function ExampleStage({
  item,
  children,
  className,
  clipped = false,
}: {
  item: string;
  children: ReactNode;
  className?: string;
  clipped?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative isolate flex items-center justify-center overflow-hidden border border-line bg-[#070f0f]",
        clipped ? "pointer-events-none h-40 px-4 py-4" : "min-h-44 px-6 py-10",
        className,
      )}
    >
      {/* The gallery preview is a picture of the component, not a copy of it to
          operate: scaled down, inert, and clipped rather than made responsive. */}
      <div
        className={clipped ? "w-full origin-center scale-[0.72]" : "contents"}
      >
        {children}
      </div>
      {!BARE.has(item) && <Scanlines />}
    </div>
  );
}
