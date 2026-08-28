"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Accordion({ ...props }: AccordionPrimitive.Root.Props) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-line border-b last:border-b-0", className)}
      data-slot="accordion-item"
      {...props}
    />
  );
}

/**
 * A plus that becomes a minus, not a chevron that spins.
 *
 * A rotating chevron is a gesture; `+` and `−` are the two states written down,
 * which is what a row of collapsed sections in a terminal has always looked
 * like. Only the vertical stroke appears to move, so the horizontal one never
 * seems to shift as it turns.
 */
function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group/accordion flex flex-1 items-center justify-between gap-4 rounded-none py-3.5 text-left font-medium font-mono text-phosphor-bright text-sm outline-none transition-colors hover:text-phosphor focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-phosphor-bright disabled:pointer-events-none disabled:opacity-40",
          className
        )}
        data-slot="accordion-trigger"
        {...props}
      >
        {children}
        <PlusIcon className="pointer-events-none size-4 shrink-0 text-phosphor-dim transition-transform duration-200 ease-terminal group-data-panel-open/accordion:rotate-45" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      className="h-(--accordion-panel-height) overflow-hidden text-sm transition-[height] duration-200 ease-terminal data-ending-style:h-0 data-starting-style:h-0"
      data-slot="accordion-content"
      {...props}
    >
      <div className={cn("pt-0 pb-4 text-muted-foreground", className)}>
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
