"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Select({ ...props }: SelectPrimitive.Root.Props<string>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({ ...props }: SelectPrimitive.Group.Props) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

/**
 * Base UI renders the selected *value* here, not the item's text. Where the two
 * differ, hand `items` to `Select` so the trigger can look the label up.
 */
function SelectValue({ ...props }: SelectPrimitive.Value.Props) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & { size?: "sm" | "default" }) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "flex w-fit items-center justify-between gap-2 whitespace-nowrap rounded-none border border-input bg-panel-sunken px-3 py-2 font-mono text-phosphor-bright text-sm outline-none transition-[border-color,box-shadow] data-[size=default]:h-9 data-[size=sm]:h-8",
        "focus-visible:border-line-strong focus-visible:shadow-glow",
        "data-disabled:cursor-not-allowed data-disabled:opacity-40",
        "aria-invalid:border-destructive",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      data-size={size}
      data-slot="select-trigger"
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        className="text-phosphor-dim"
        render={<ChevronDownIcon />}
      />
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  ...props
}: SelectPrimitive.Popup.Props) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        alignItemWithTrigger={false}
        className="isolate z-50"
        sideOffset={4}
      >
        <SelectPrimitive.Popup
          className={cn(
            "max-h-(--available-height) min-w-(--anchor-width) origin-(--transform-origin) overflow-y-auto rounded-none border border-line-strong bg-popover p-1 text-popover-foreground shadow-panel outline-none data-closed:animate-close data-open:animate-open",
            className
          )}
          data-slot="select-content"
          {...props}
        >
          <SelectScrollUpButton />
          {children}
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      className={cn(
        "px-2 py-1.5 font-bold font-mono text-[0.5625rem] text-phosphor-dim uppercase tracking-[0.14em]",
        className
      )}
      data-slot="select-label"
      {...props}
    />
  );
}

/**
 * The selected row is marked with a lit left edge as well as a tick. On a list
 * where every row is already green, a tick alone is one small glyph doing all
 * the work of saying which one you are on.
 */
function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex w-full cursor-default select-none items-center gap-2 rounded-none py-1.5 pr-8 pl-2 font-mono text-sm outline-none",
        "data-highlighted:bg-phosphor/10 data-highlighted:text-phosphor-bright",
        "data-disabled:pointer-events-none data-disabled:opacity-40",
        "data-selected:text-phosphor-bright data-selected:shadow-[inset_2px_0_0_var(--phosphor)]",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      data-slot="select-item"
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-2 flex size-3.5 items-center justify-center">
        <CheckIcon className="size-3.5 text-phosphor" strokeWidth={3} />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      className={cn("-mx-1 pointer-events-none my-1 h-px bg-line", className)}
      data-slot="select-separator"
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: SelectPrimitive.ScrollUpArrow.Props) {
  return (
    <SelectPrimitive.ScrollUpArrow
      className={cn(
        "flex cursor-default items-center justify-center bg-popover py-1 text-phosphor-dim",
        className
      )}
      data-slot="select-scroll-up-button"
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: SelectPrimitive.ScrollDownArrow.Props) {
  return (
    <SelectPrimitive.ScrollDownArrow
      className={cn(
        "flex cursor-default items-center justify-center bg-popover py-1 text-phosphor-dim",
        className
      )}
      data-slot="select-scroll-down-button"
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownArrow>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
