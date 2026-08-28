import type * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/terminal/ui/button";

/**
 * The one control on the page that is not text.
 *
 * The lamp is a layer over the button rather than the button itself. It sits at
 * `-inset-px` so the flash brightens the edge the button already has instead of
 * drawing a second one inside it, and behind the label so the wash never pulses
 * the one piece of copy that has to stay readable. `isolate` on the button is
 * what makes that negative z-index mean "above the border, below the words"
 * rather than "behind the whole section".
 *
 * Pointing at it answers the alarm, so the alarm stops: a lamp still flashing
 * under the cursor puts a second glow over the hover glow and the button
 * flickers while you are aiming at it.
 */
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
