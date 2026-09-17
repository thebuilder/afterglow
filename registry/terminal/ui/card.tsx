import type * as React from "react";

import { cn } from "@/lib/utils";

const EDGES = {
  // The accent is the border's own left edge.
  accent:
    "border-l-2 border-l-[var(--card-accent,var(--phosphor))] hover:border-l-[var(--card-accent,var(--phosphor))]",
  // Four hairlines, and no one panel asking to be read first.
  plain: "",
  // The trace paints the left edge itself, so the border only reserves it.
  trace:
    "card-trace border-l-2 border-l-transparent hover:border-l-transparent",
} as const;

// The trace needs an accent to draw, so a card without one has no third mode.
function edgeOf(
  accent: string | false | undefined,
  trace: boolean | undefined
): keyof typeof EDGES {
  if (accent === false) {
    return "plain";
  }
  return trace ? "trace" : "accent";
}

function Card({
  className,
  accent,
  children,
  style,
  trace,
  ...props
}: React.ComponentProps<"div"> & {
  accent?: string | false;
  trace?: boolean;
}) {
  // The title and the top rule read `--card-accent`, so a card told to drop its
  // accent still sets the variable, to the color the rest of the card is in.
  const color = accent === false ? "var(--card-foreground)" : accent;

  return (
    <div
      className={cn(
        "relative isolate flex flex-col gap-4 rounded-none border border-line bg-card/90 py-5 text-card-foreground backdrop-blur-md transition duration-[260ms] ease-terminal",
        // The top rule reads `--card-rule`, so `CardAccent` brightens with the
        // border instead of staying at rest while the other three sides lift.
        "hover:border-line-strong hover:bg-card hover:[--card-rule:var(--line-strong)]",
        EDGES[edgeOf(accent, trace)],
        className
      )}
      data-slot="card"
      style={
        color
          ? ({ ...style, "--card-accent": color } as React.CSSProperties)
          : style
      }
      {...props}
    >
      {children}
    </div>
  );
}

function CardAccent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "-mt-5 h-[3px] bg-[linear-gradient(90deg,var(--card-accent,var(--phosphor))_0_28%,var(--phosphor-bright)_28%_33%,transparent_33%)]",
        // The rule past the accent is the background under the gradient, not
        // its last stop. A gradient built from a variable jumps when the
        // variable changes, where a background color eases with the border.
        "[background-color:var(--card-rule,var(--line))] transition-colors duration-[260ms] ease-terminal",
        className
      )}
      data-slot="card-accent"
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-5 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-4",
        className
      )}
      data-slot="card-header"
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "font-medium font-mono text-[var(--card-accent,var(--phosphor))] text-base leading-tight",
        className
      )}
      data-slot="card-title"
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="card-description"
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      data-slot="card-action"
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("px-5", className)}
      data-slot="card-content"
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 px-5 [.border-t]:mt-1 [.border-t]:pt-4",
        className
      )}
      data-slot="card-footer"
      {...props}
    />
  );
}

export {
  Card,
  CardAccent,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
