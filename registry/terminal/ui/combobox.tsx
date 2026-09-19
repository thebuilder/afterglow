"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react";
import { type ComponentPropsWithRef, useRef } from "react";

import { cn } from "@/lib/utils";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/terminal/ui/input-group";

const Combobox = ComboboxPrimitive.Root;

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}

function ComboboxTrigger({
  className,
  children,
  ...props
}: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
      data-slot="combobox-trigger"
      {...props}
    >
      {children}
      <ChevronDownIcon className="pointer-events-none size-4 text-phosphor-dim" />
    </ComboboxPrimitive.Trigger>
  );
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      className={cn(className)}
      data-slot="combobox-clear"
      render={<InputGroupButton size="icon-xs" variant="ghost" />}
      {...props}
    >
      <XIcon className="pointer-events-none" />
    </ComboboxPrimitive.Clear>
  );
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean;
  showClear?: boolean;
}) {
  return (
    <InputGroup className={cn("w-auto", className)}>
      <ComboboxPrimitive.Input
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {showTrigger ? (
          <InputGroupButton
            className="data-pressed:bg-transparent group-has-data-[slot=combobox-clear]/input-group:hidden"
            data-slot="input-group-button"
            disabled={disabled}
            render={<ComboboxTrigger />}
            size="icon-xs"
            variant="ghost"
          />
        ) : null}
        {showClear ? <ComboboxClear disabled={disabled} /> : null}
      </InputGroupAddon>
      {children}
    </InputGroup>
  );
}

function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 4,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="isolate z-50"
        side={side}
        sideOffset={sideOffset}
      >
        <ComboboxPrimitive.Popup
          className={cn(
            "group/combobox-content relative max-h-(--available-height) w-(--anchor-width) min-w-[calc(var(--anchor-width)+--spacing(7))] max-w-(--available-width) overflow-hidden rounded-none border border-line-strong bg-popover text-popover-foreground shadow-panel outline-none data-[chips=true]:min-w-(--anchor-width) motion-reduce:!animate-none",
            "data-[side=bottom]:data-open:animate-select-fold-in-down data-[side=top]:data-open:animate-select-fold-in-up",
            "data-[side=bottom]:data-closed:animate-select-fold-out-up data-[side=top]:data-closed:animate-select-fold-out-down",
            "*:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:w-auto",
            className
          )}
          data-chips={!!anchor}
          data-slot="combobox-content"
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      className={cn(
        "max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0",
        className
      )}
      data-slot="combobox-list"
      {...props}
    />
  );
}

function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      className={cn(
        "relative flex w-full cursor-default select-none items-center gap-2 rounded-none py-1.5 pr-8 pl-2 font-mono text-sm outline-none",
        "data-highlighted:bg-phosphor/10 data-highlighted:text-phosphor-bright",
        "data-disabled:pointer-events-none data-disabled:opacity-40",
        "data-selected:text-phosphor-bright data-selected:shadow-[inset_2px_0_0_var(--phosphor)]",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      data-slot="combobox-item"
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-3.5 items-center justify-center" />
        }
      >
        <CheckIcon className="size-3.5 text-phosphor" strokeWidth={3} />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      className={cn(className)}
      data-slot="combobox-group"
      {...props}
    />
  );
}

function ComboboxLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      className={cn(
        "px-2 py-1.5 font-bold font-mono text-3xs text-phosphor-dim uppercase tracking-terminal-xl",
        className
      )}
      data-slot="combobox-label"
      {...props}
    />
  );
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  );
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      className={cn(
        "hidden w-full justify-center py-3 text-center font-mono text-phosphor-dim text-sm group-data-empty/combobox-content:flex",
        className
      )}
      data-slot="combobox-empty"
      {...props}
    />
  );
}

function ComboboxSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      className={cn("-mx-1 my-1 h-px bg-line", className)}
      data-slot="combobox-separator"
      {...props}
    />
  );
}

function ComboboxChips({
  className,
  ...props
}: ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
  ComboboxPrimitive.Chips.Props) {
  return (
    <ComboboxPrimitive.Chips
      className={cn(
        "flex min-h-9 flex-wrap items-center gap-1 rounded-none border border-input bg-panel-sunken px-3 py-1 font-mono text-phosphor-bright text-sm transition duration-150 ease-terminal has-data-[slot=combobox-chip]:px-1",
        "focus-within:border-line-strong focus-within:shadow-glow",
        "has-aria-invalid:border-destructive has-aria-invalid:shadow-glow-destructive",
        className
      )}
      data-slot="combobox-chips"
      {...props}
    />
  );
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean;
}) {
  return (
    <ComboboxPrimitive.Chip
      className={cn(
        "flex h-6 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-none border border-line-strong bg-phosphor/10 px-1.5 font-mono text-phosphor text-xs has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-data-[slot=combobox-chip-remove]:pr-0 has-disabled:opacity-40",
        "data-highlighted:border-phosphor data-highlighted:text-phosphor-bright",
        className
      )}
      data-slot="combobox-chip"
      {...props}
    >
      {children}
      {showRemove ? (
        <ComboboxPrimitive.ChipRemove
          className="-ml-0.5 flex size-5 cursor-pointer items-center justify-center text-phosphor-dim transition duration-150 ease-terminal hover:text-phosphor-bright [&_svg:not([class*='size-'])]:size-3"
          data-slot="combobox-chip-remove"
        >
          <XIcon className="pointer-events-none" />
        </ComboboxPrimitive.ChipRemove>
      ) : null}
    </ComboboxPrimitive.Chip>
  );
}

function ComboboxChipsInput({
  className,
  ...props
}: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      className={cn(
        "h-7 min-w-16 flex-1 bg-transparent px-1 caret-phosphor-bright outline-none placeholder:text-phosphor-dim",
        className
      )}
      data-slot="combobox-chip-input"
      {...props}
    />
  );
}

function useComboboxAnchor() {
  return useRef<HTMLDivElement | null>(null);
}

export {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxClear,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
};
