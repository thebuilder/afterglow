import type * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/terminal/ui/button";

function AlarmButton({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      className={cn(
        "relative isolate border-signal bg-signal/10 text-signal shadow-none",
        "hover:translate-y-0 hover:bg-signal/30 hover:text-white hover:shadow-glow-signal",
        "active:bg-signal/45",
        "after:pointer-events-none after:absolute after:-inset-px after:-z-10 after:animate-alarm after:border after:border-transparent after:content-['']",
        "hover:after:animate-none focus-visible:after:animate-none active:after:animate-none",
        className
      )}
      data-slot="alarm-button"
      variant="signal"
      {...props}
    >
      {children}
    </Button>
  );
}

export { AlarmButton };
