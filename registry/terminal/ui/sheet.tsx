"use client";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

/**
 * The panel slides; the edge it slides from keeps a lit border, so a drawer
 * open on the right reads as a thing pulled out of the frame rather than a
 * rectangle that happens to be over there.
 */
const SIDES = {
  bottom:
    "inset-x-0 bottom-0 h-auto border-line-strong border-t data-closed:animate-slide-out-bottom data-open:animate-slide-in-bottom",
  left: "inset-y-0 left-0 h-full w-3/4 border-line-strong border-r sm:max-w-sm data-closed:animate-slide-out-left data-open:animate-slide-in-left",
  right:
    "inset-y-0 right-0 h-full w-3/4 border-line-strong border-l sm:max-w-sm data-closed:animate-slide-out-right data-open:animate-slide-in-right",
  top: "inset-x-0 top-0 h-auto border-line-strong border-b data-closed:animate-slide-out-top data-open:animate-slide-in-top",
} as const;

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: SheetPrimitive.Popup.Props & { side?: keyof typeof SIDES }) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Backdrop
        className="fixed inset-0 z-50 bg-[rgb(1_5_6/0.72)] backdrop-blur-[5px] backdrop-saturate-[0.65] data-closed:animate-fade-out data-open:animate-fade-in"
        data-slot="sheet-overlay"
      />
      <SheetPrimitive.Popup
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-popover p-6 text-popover-foreground shadow-panel outline-none",
          SIDES[side],
          className
        )}
        data-slot="sheet-content"
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="absolute top-4 right-4 rounded-none text-phosphor-dim outline-none transition-colors hover:text-phosphor-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-phosphor-bright">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Popup>
    </SheetPrimitive.Portal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-1.5", className)}
      data-slot="sheet-header"
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mt-auto flex flex-col gap-2", className)}
      data-slot="sheet-footer"
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      className={cn(
        "font-medium font-mono text-lg text-phosphor-bright leading-none",
        className
      )}
      data-slot="sheet-title"
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="sheet-description"
      {...props}
    />
  );
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
