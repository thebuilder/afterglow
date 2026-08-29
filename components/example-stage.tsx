import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Scanlines } from "@/registry/terminal/components/scanlines";

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
        "relative isolate flex items-center justify-center overflow-hidden border border-line bg-panel-sunken",
        clipped ? "pointer-events-none h-40 px-4 py-4" : "min-h-44 px-6 py-10",
        className
      )}
    >
      <div
        className={clipped ? "w-full origin-center scale-[0.72]" : "contents"}
      >
        {children}
      </div>
      {!BARE.has(item) && <Scanlines />}
    </div>
  );
}
