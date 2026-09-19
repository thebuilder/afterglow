"use client";

import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/terminal/ui/button";
import { Input } from "@/registry/terminal/ui/input";
import { Textarea } from "@/registry/terminal/ui/textarea";

// The group draws the border and the glow, so the control inside gives up its
// own. The group reads focus and `aria-invalid` off the control through
// `has-*`, and the whole field lights up while the caret is in it.
function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "group/input-group relative flex h-9 w-full min-w-0 items-center rounded-none border border-input bg-panel-sunken font-mono text-phosphor-bright outline-none transition duration-150 ease-terminal",
        "has-[[data-slot=input-group-control]:focus-visible]:border-line-strong has-[[data-slot=input-group-control]:focus-visible]:shadow-glow",
        "has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:shadow-glow-destructive",
        "has-disabled:opacity-40",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto",
        "has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5",
        "in-data-[slot=combobox-content]:shadow-none!",
        className
      )}
      data-slot="input-group"
      {...props}
    />
  );
}

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text select-none items-center justify-center gap-2 py-1.5 font-mono text-phosphor-dim text-sm group-has-disabled/input-group:opacity-40 [&>svg:not([class*='size-'])]:size-4",
  {
    defaultVariants: { align: "inline-start" },
    variants: {
      align: {
        "block-end":
          "order-last w-full justify-start px-3 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2",
        "block-start":
          "order-first w-full justify-start px-3 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
        "inline-end": "order-last pr-3 has-[>button]:-mr-1.5 has-[>kbd]:-mr-1",
        "inline-start":
          "order-first pl-3 has-[>button]:-ml-1.5 has-[>kbd]:-ml-1",
      },
    },
  }
);

// An addon comes after its control in the DOM, so tab order runs through the
// field first, and `align` moves it into place with `order`. A click on the
// addon's own padding hands focus to the field, the way a click on a label
// would.
function focusControl(event: React.MouseEvent<HTMLDivElement>) {
  if ((event.target as HTMLElement).closest("button")) {
    return;
  }
  event.currentTarget.parentElement
    ?.querySelector<HTMLElement>("[data-slot=input-group-control]")
    ?.focus();
}

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      className={cn(inputGroupAddonVariants({ align }), className)}
      data-align={align}
      data-slot="input-group-addon"
      onClick={focusControl}
      {...props}
    />
  );
}

const inputGroupButtonVariants = cva("flex items-center gap-2 shadow-none", {
  defaultVariants: { size: "xs" },
  variants: {
    size: {
      "icon-sm": "size-8 p-0",
      "icon-xs": "size-6 p-0",
      sm: "",
      xs: "h-6 gap-1 px-2 [&>svg:not([class*='size-'])]:size-3.5",
    },
  },
});

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: "button" | "submit" | "reset";
  }) {
  return (
    <Button
      className={cn(inputGroupButtonVariants({ size }), className)}
      data-size={size}
      size="sm"
      type={type}
      variant={variant}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 font-mono text-phosphor-dim text-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      className={cn(
        "flex-1 border-0 bg-transparent shadow-none focus-visible:shadow-none aria-invalid:shadow-none",
        className
      )}
      data-slot="input-group-control"
      {...props}
    />
  );
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      className={cn(
        "flex-1 resize-none border-0 bg-transparent py-2 shadow-none focus-visible:shadow-none aria-invalid:shadow-none",
        className
      )}
      data-slot="input-group-control"
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
};
