"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & { size?: "sm" | "default" }) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "peer group/switch inline-flex shrink-0 items-center rounded-none border border-line bg-panel-sunken p-px outline-none transition-[background-color,border-color,box-shadow]",
        "data-[size=default]:h-5 data-[size=default]:w-9 data-[size=sm]:h-4 data-[size=sm]:w-7",
        "focus-visible:border-line-strong focus-visible:shadow-glow",
        "data-disabled:cursor-not-allowed data-disabled:opacity-40",
        "data-checked:border-phosphor data-checked:bg-phosphor/20",
        className
      )}
      data-size={size}
      data-slot="switch"
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block rounded-none bg-phosphor-dim transition-[transform,background-color] duration-150 ease-terminal",
          "group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3",
          "data-checked:translate-x-full data-checked:bg-phosphor data-checked:shadow-[0_0_8px_var(--phosphor)] data-unchecked:translate-x-0"
        )}
        data-slot="switch-thumb"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
