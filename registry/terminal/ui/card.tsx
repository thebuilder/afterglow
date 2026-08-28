import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A panel on the glass: hairline box, no corner, and a blur behind it so it
 * reads as something laid over the scene rather than a hole cut in it.
 *
 * `accent` is the card's own colour and defaults to the beam. It drives the
 * left edge, the title and anything else that reaches for `--card-accent`, so a
 * category gets a colour without a variant per category.
 *
 * Hover brightens the three hairline sides and re-states the accent on the
 * fourth. `border-color` is one property covering all four edges, so a bare
 * `hover:border-line-strong` silently repaints the accent edge grey-green: the
 * card's one piece of colour disappears at the moment you point at it.
 */
function Card({
  className,
  accent,
  children,
  style,
  ...props
}: React.ComponentProps<"div"> & { accent?: string }) {
  return (
    <div
      className={cn(
        "relative isolate flex flex-col gap-4 rounded-none border border-line border-l-2 border-l-[var(--card-accent,var(--phosphor))] bg-card/90 py-5 text-card-foreground backdrop-blur-md transition-[border-color,background-color] duration-[260ms] ease-terminal",
        "hover:border-line-strong hover:border-l-[var(--card-accent,var(--phosphor))] hover:bg-card",
        className
      )}
      data-slot="card"
      style={
        accent
          ? ({ ...style, "--card-accent": accent } as React.CSSProperties)
          : style
      }
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * The card's top rule, with the accent running its first third.
 *
 * It carries on in the border colour rather than stopping at transparent. A bar
 * that ends part-way across leaves the top edge looking broken off, where a
 * rule that reaches the far side reads as the frame with a coloured lead-in.
 *
 * The lead-in is the card's own accent, so a card marked with amber does not
 * get a pink stripe. The bright tick after it is the mark itself: three pixels
 * of the beam at full strength, which is the whole reason to reach for this
 * over a heavier heading.
 */
function CardAccent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "-mt-5 h-[3px] bg-[linear-gradient(90deg,var(--card-accent,var(--phosphor))_0_28%,var(--phosphor-bright)_28%_33%,var(--line)_33%)]",
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
