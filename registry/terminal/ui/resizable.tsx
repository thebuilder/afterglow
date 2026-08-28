"use client";

import { GripVerticalIcon } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";

function ResizablePanelGroup({
  className,
  ...props
}: ResizablePrimitive.GroupProps) {
  return (
    <ResizablePrimitive.Group
      className={cn(
        "flex h-full w-full aria-[orientation=vertical]:flex-col",
        className
      )}
      data-slot="resizable-panel-group"
      {...props}
    />
  );
}

function ResizablePanel({ ...props }: ResizablePrimitive.PanelProps) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
}

/**
 * A hairline that lights when you take hold of it, which is what every other
 * border in the system does. The grip is optional and off by default: a divider
 * that already brightens under the cursor does not need a texture on it to say
 * it can be moved.
 *
 * The hit area is a pseudo-element four times the width of the visible line, so
 * the thing you have to aim at is bigger than the thing you can see.
 */
function ResizableHandle({
  withHandle,
  className,
  ...props
}: ResizablePrimitive.SeparatorProps & { withHandle?: boolean }) {
  return (
    <ResizablePrimitive.Separator
      className={cn(
        "relative flex w-px items-center justify-center bg-line transition-colors",
        "after:-translate-x-1/2 after:absolute after:inset-y-0 after:left-1/2 after:w-1",
        "hover:bg-phosphor focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-phosphor-bright",
        "aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full",
        "aria-[orientation=horizontal]:after:-translate-y-1/2 aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0",
        "[&[aria-orientation=horizontal]>div]:rotate-90",
        className
      )}
      data-slot="resizable-handle"
      {...props}
    >
      {withHandle ? (
        <div className="z-10 flex h-5 w-2.5 items-center justify-center border border-line bg-secondary">
          <GripVerticalIcon className="size-2.5 text-phosphor-dim" />
        </div>
      ) : null}
    </ResizablePrimitive.Separator>
  );
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
