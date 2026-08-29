import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-none border border-transparent font-mono font-bold uppercase whitespace-nowrap outline-none transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-terminal focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-[3px] focus-visible:outline-phosphor-bright disabled:pointer-events-none disabled:opacity-40 data-disabled:pointer-events-none data-disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
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
          "border-line bg-secondary text-phosphor hover:-translate-y-px hover:border-line-strong hover:bg-accent hover:text-phosphor-bright hover:shadow-glow",
        destructive:
          "border-destructive bg-destructive/15 text-destructive hover:bg-destructive hover:text-white",
        ghost: "text-muted-foreground hover:bg-accent/50 hover:text-phosphor",
        link: "text-phosphor underline-offset-4 hover:underline",
        outline:
          "border-line text-phosphor hover:border-line-strong hover:bg-accent/60 hover:text-phosphor-bright",
        primary:
          "border-primary bg-primary text-primary-foreground shadow-glow hover:-translate-y-px hover:bg-phosphor-bright hover:shadow-glow",
        signal:
          "bg-signal text-void shadow-signal-control hover:-translate-y-px hover:bg-signal-soft hover:shadow-glow-signal",
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
