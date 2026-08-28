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
        className,
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
 * The stripe: a hard-edged run of signal, a short tick of phosphor, then
 * nothing. It does the job a rounded coloured header would do in a softer
 * system, at three pixels tall.
 *
 * Opt-in, and worth being deliberate about. It is a masthead, not decoration:
 * on a card that is one of several it reads as an unexplained red line.
 */
function CardAccent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "-mt-5 mb-1 h-[3px] bg-[linear-gradient(90deg,var(--signal)_0_28%,var(--phosphor)_28%_34%,transparent_34%)]",
        className,
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
        className,
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
        className,
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
        className,
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
        className,
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
