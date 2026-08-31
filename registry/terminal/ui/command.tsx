"use client";

import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/registry/terminal/ui/dialog";

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      className={cn(
        "flex size-full flex-col overflow-hidden rounded-none bg-popover text-popover-foreground",
        className
      )}
      data-slot="command"
      {...props}
    />
  );
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  initialFocus,
  showCloseButton = false,
  ...props
}: Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  title?: string;
  description?: string;
  className?: string;

  initialFocus?: React.ComponentProps<typeof DialogContent>["initialFocus"];
  showCloseButton?: boolean;

  children: React.ReactNode;
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn("overflow-hidden p-0 sm:max-w-xl", className)}
        initialFocus={initialFocus}
        showCloseButton={showCloseButton}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      className="flex h-11 items-center gap-2.5 border-line border-b px-3 transition duration-150 ease-terminal has-[:focus-visible]:border-line-strong has-[:focus-visible]:shadow-glow"
      data-slot="command-input-wrapper"
    >
      <SearchIcon className="size-4 shrink-0 text-phosphor" />
      <CommandPrimitive.Input
        className={cn(
          "flex h-10 w-full rounded-none bg-transparent py-3 font-mono text-base text-phosphor-bright caret-phosphor-bright outline-none placeholder:text-phosphor-dim focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-40 md:text-sm",
          className
        )}
        data-slot="command-input"
        {...props}
      />
    </div>
  );
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      className={cn(
        "max-h-80 scroll-py-1 overflow-y-auto overflow-x-hidden p-1",
        className
      )}
      data-slot="command-list"
      {...props}
    />
  );
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      className={cn(
        "py-10 text-center font-mono font-semibold text-1xs text-phosphor-dim uppercase tracking-terminal-lg",
        className
      )}
      data-slot="command-empty"
      {...props}
    />
  );
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      className={cn(
        "overflow-hidden text-foreground",
        "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-3xs [&_[cmdk-group-heading]]:text-phosphor-dim [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-terminal-xl",

        "[[cmdk-group]:not([hidden])~&]:mt-1 [[cmdk-group]:not([hidden])~&]:border-line [[cmdk-group]:not([hidden])~&]:border-t [[cmdk-group]:not([hidden])~&]:pt-1",
        className
      )}
      data-slot="command-group"
      {...props}
    />
  );
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      className={cn("-mx-1 h-px bg-line", className)}
      data-slot="command-separator"
      {...props}
    />
  );
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      className={cn(
        "relative flex cursor-default select-none items-center gap-2.5 rounded-none px-2 py-2 font-mono text-sm outline-none",
        "data-[selected=true]:bg-phosphor/10 data-[selected=true]:text-phosphor-bright data-[selected=true]:shadow-[inset_2px_0_0_var(--phosphor)]",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-40",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-phosphor-dim",
        className
      )}
      data-slot="command-item"
      {...props}
    />
  );
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "ml-auto font-mono text-2xs text-phosphor-dim tracking-terminal",
        className
      )}
      data-slot="command-shortcut"
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};
