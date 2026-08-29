import type * as React from "react";

import { cn } from "@/lib/utils";

const TONES = {
  busy: "bg-amber shadow-[0_0_8px_var(--amber)]",
  error: "bg-signal shadow-[0_0_8px_var(--signal)]",
  idle: "bg-phosphor-dim shadow-none",
  ok: "bg-phosphor shadow-[0_0_8px_var(--phosphor)]",
} as const;

function Led({
  className,
  tone = "ok",
  pulse,
  ...props
}: React.ComponentProps<"span"> & {
  tone?: keyof typeof TONES;
  pulse?: boolean;
}) {
  const animated = pulse ?? tone !== "idle";

  return (
    <span
      className={cn(
        "inline-block size-[0.45rem] shrink-0 rounded-full",
        TONES[tone],
        animated && "animate-led",
        className
      )}
      data-slot="led"
      data-tone={tone}
      {...props}
    />
  );
}

function Status({
  className,
  tone = "ok",
  children,
  ...props
}: React.ComponentProps<"p"> & { tone?: keyof typeof TONES }) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 font-mono font-semibold text-2xs uppercase tracking-terminal-sm",
        tone === "error" ? "text-signal" : "text-muted-foreground",
        className
      )}
      data-slot="status"
      {...props}
    >
      <Led tone={tone} />
      {children}
    </p>
  );
}

export { Led, Status };
