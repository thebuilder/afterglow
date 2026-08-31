import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex h-[1.125rem] w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-none border px-1.5 pt-[1.5px] font-mono font-semibold text-2xs uppercase leading-none tracking-terminal-lg transition [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    defaultVariants: { variant: "default" },
    variants: {
      variant: {
        amber: "border-amber/60 bg-amber/10 text-amber",
        azure: "border-azure/60 bg-azure/10 text-azure",
        default: "border-line-strong bg-phosphor/10 text-phosphor",
        destructive: "border-destructive bg-destructive/12 text-destructive",
        info: "border-info/60 bg-info/10 text-info",
        outline: "border-line text-muted-foreground",
        signal: "border-signal bg-signal/12 text-signal",
        solid: "border-phosphor bg-phosphor text-void",
        violet: "border-violet/60 bg-violet/10 text-violet",
        warning: "border-warning/60 bg-warning/10 text-warning",
      },
    },
  }
);

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      { className: cn(badgeVariants({ variant }), className) },
      props
    ),
    render,

    state: { slot: "badge", variant },
  });
}

export { Badge, badgeVariants };
