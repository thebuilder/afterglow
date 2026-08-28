"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      className={cn(
        "group/tabs flex gap-3 data-[orientation=horizontal]:flex-col",
        className
      )}
      data-slot="tabs"
      orientation={orientation}
      {...props}
    />
  );
}

/**
 * `segment` is the house shape: the list is a single-pixel sheet of the border
 * colour and the tabs sit on it with a one-pixel gap, so the rules between them
 * are the background showing through rather than borders that have to be turned
 * off at the ends to avoid doubling.
 *
 * `line` is the quieter one, for when the tabs are navigation rather than a
 * switch and should not read as a control.
 */
const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-none group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col",
  {
    defaultVariants: { variant: "segment" },
    variants: {
      variant: {
        line: "gap-5 border-line border-b bg-transparent",
        segment: "gap-px bg-line p-px",
      },
    },
  }
);

function TabsList({
  className,
  variant = "segment",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      className={cn(tabsListVariants({ variant }), className)}
      data-slot="tabs-list"
      data-variant={variant}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      className={cn(
        "relative inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-none font-mono font-semibold text-[0.625rem] text-muted-foreground uppercase tracking-[0.12em] outline-none transition-colors duration-150 ease-terminal",
        "hover:text-phosphor focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-phosphor-bright",
        "data-disabled:pointer-events-none data-disabled:opacity-40",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
        "group-data-[variant=segment]/tabs-list:bg-secondary group-data-[variant=segment]/tabs-list:px-3 group-data-[variant=segment]/tabs-list:py-2 group-data-[variant=segment]/tabs-list:data-active:bg-accent group-data-[variant=segment]/tabs-list:data-active:text-phosphor-bright",
        "group-data-[variant=line]/tabs-list:-mb-px group-data-[variant=line]/tabs-list:border-transparent group-data-[variant=line]/tabs-list:border-b-2 group-data-[variant=line]/tabs-list:pb-2.5 group-data-[variant=line]/tabs-list:data-active:border-phosphor group-data-[variant=line]/tabs-list:data-active:text-phosphor-bright",
        className
      )}
      data-slot="tabs-trigger"
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      className={cn("flex-1 animate-line-in outline-none", className)}
      data-slot="tabs-content"
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger, tabsListVariants };
