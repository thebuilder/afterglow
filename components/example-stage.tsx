import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Scanlines } from "@/registry/terminal/components/scanlines";

const BARE = new Set(["operator-dashboard", "scanlines", "screen"]);

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
        // Sonner renders in place, so its fixed toaster stays in this stacking context.
        item === "toast" && "z-10",
        clipped && "pointer-events-none h-40 px-4 py-4",
        !clipped &&
          item === "operator-dashboard" &&
          "max-h-96 items-start overflow-y-auto",
        !clipped && item !== "operator-dashboard" && "min-h-44 px-6 py-10",
        className
      )}
    >
      <div
        className={cn(
          clipped && "w-full origin-center scale-75",
          !clipped && item === "operator-dashboard" && "w-full",
          !(clipped || item === "operator-dashboard") && "contents"
        )}
      >
        {children}
      </div>
      {!BARE.has(item) && <Scanlines />}
    </div>
  );
}
