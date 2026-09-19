import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type * as React from "react";

import { cn } from "@/lib/utils";

function Card({
  className,
  accent,
  children,
  style,
  ...props
}: React.ComponentProps<"div"> & { accent?: string | false }) {
  // The title and the top rule read `--card-accent`, so a card told to drop its
  // accent still sets the variable, to the color the rest of the card is in.
  const color = accent === false ? "var(--card-foreground)" : accent;

  return (
    <div
      className={cn(
        "relative isolate flex flex-col gap-4 rounded-none border border-line bg-card/90 py-5 text-card-foreground backdrop-blur-md",
        // The accent is the left border. `card-trace` stays dormant until the
        // card holds a `CardLink`, then sends the accent around it on hover.
        // A card without an accent has nothing to send, so as a link its
        // hairline lifts under the pointer instead.
        accent === false
          ? "transition-colors duration-[260ms] ease-terminal has-[[data-slot=card-link]:hover]:border-line-strong"
          : "card-trace border-l-2 border-l-[var(--card-accent,var(--phosphor))]",
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
        // Laid over the top border, at the trace's weight and on its path, so
        // the stripe is the card's top edge and a link card's trace finishes
        // it in the accent. Below zero it sits over the border, under the trace.
        "absolute inset-x-0 -top-px -z-1 h-[2px] bg-[linear-gradient(90deg,var(--card-accent,var(--phosphor))_0_28%,var(--phosphor-bright)_28%_33%,var(--line)_33%)]",
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

function CardLink({
  className,
  render,
  ...props
}: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(
          // Stretched over the whole card, so the card is the target and the
          // title is what a screen reader announces. The focus ring goes on
          // the stretch, around the card, and the theme keeps the baseline
          // outline off the words.
          "rounded-none after:absolute after:inset-0 focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-phosphor-bright",
          className
        ),
      },
      props
    ),
    render,
    state: { slot: "card-link" },
  });
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
        // Raised over a `CardLink`'s stretch, so the control stays its own
        // target in a card that is also a link.
        "relative z-10 col-start-2 row-span-2 row-start-1 self-start justify-self-end",
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
  CardLink,
  CardTitle,
};
