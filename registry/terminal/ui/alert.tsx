import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A notice, drawn as a panel with a lit edge rather than a tinted box.
 *
 * The colour is carried by the left border and the icon, not by a wash behind
 * the text. On this palette a filled alert is a block of colour with green type
 * on it, and the type is the part that has to stay readable.
 */
const alertVariants = cva(
  "relative grid w-full grid-cols-[0_1fr] items-start gap-y-1 rounded-none border border-line border-l-2 bg-card/90 px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5",
  {
    defaultVariants: { variant: "default" },
    variants: {
      variant: {
        default: "border-l-phosphor [&>svg]:text-phosphor",
        destructive:
          "border-l-destructive *:data-[slot=alert-title]:text-destructive *:data-[slot=alert-description]:text-destructive/80 [&>svg]:text-destructive",
        signal:
          "border-l-signal *:data-[slot=alert-title]:text-signal [&>svg]:text-signal",
        warn: "border-l-amber *:data-[slot=alert-title]:text-amber [&>svg]:text-amber",
      },
    },
  }
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      className={cn(alertVariants({ variant }), className)}
      data-slot="alert"
      role="alert"
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-mono font-semibold text-[0.6875rem] text-phosphor-bright uppercase tracking-[0.12em]",
        className
      )}
      data-slot="alert-title"
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "col-start-2 grid justify-items-start gap-1 text-muted-foreground text-sm [&_p]:leading-relaxed",
        className
      )}
      data-slot="alert-description"
      {...props}
    />
  );
}

export { Alert, AlertDescription, AlertTitle, alertVariants };
