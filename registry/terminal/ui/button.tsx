import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-none border border-transparent font-mono font-bold uppercase whitespace-nowrap outline-none transition duration-150 ease-terminal active:transition-none focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-phosphor-bright disabled:pointer-events-none disabled:opacity-40 data-disabled:pointer-events-none data-disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    compoundVariants: [
      {
        class: "hover:-translate-y-px active:translate-y-px active:shadow-none",
        variant: ["default", "destructive", "outline", "primary", "signal"],
      },
    ],
    defaultVariants: { size: "default", variant: "default" },
    variants: {
      size: {
        default: "h-9 px-3.5 text-1xs tracking-terminal-lg",
        icon: "size-9",
        "icon-sm": "size-8",
        lg: "h-11 px-6 text-xs tracking-terminal-3xl",
        sm: "h-8 gap-1.5 px-2.5 text-2xs tracking-terminal",
      },
      variant: {
        default:
          "border-line bg-secondary text-phosphor hover:border-line-strong hover:bg-accent hover:text-phosphor-bright hover:shadow-glow active:bg-accent active:text-phosphor",
        destructive:
          "border-destructive bg-destructive/15 text-destructive hover:bg-destructive hover:text-white active:bg-destructive/70 active:text-white",
        ghost:
          "text-muted-foreground hover:bg-accent/50 hover:text-phosphor active:bg-accent active:text-phosphor-bright",
        link: "text-phosphor underline-offset-4 hover:underline active:text-phosphor-bright",
        outline:
          "border-line text-phosphor hover:border-line-strong hover:bg-accent/60 hover:text-phosphor-bright active:border-line active:bg-accent/80 active:text-phosphor",
        primary:
          "border-primary bg-primary text-primary-foreground shadow-glow hover:bg-phosphor-bright hover:shadow-glow-strong active:bg-primary",
        signal:
          "bg-signal text-void shadow-signal-control hover:bg-signal-soft hover:shadow-glow-signal active:bg-signal",
      },
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      className={cn(buttonVariants({ className, size, variant }))}
      data-size={size}
      data-slot="button"
      data-variant={variant}
      {...props}
    />
  );
}

export { Button, buttonVariants };
