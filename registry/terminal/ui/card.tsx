import type * as React from "react";

import { cn } from "@/lib/utils";

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
