import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * The small tracked-out line above a heading that says what kind of thing you
 * are looking at.
 *
 * `caret` puts a solid block after it. Not a text character: a `▋` is a glyph
 * with the font's own sidebearings and its own idea of cap height, and it never
 * quite lines up with the text it follows. A styled empty box is the same mark
 * at exactly the size asked for.
 */
function Eyebrow({
  className,
  caret = false,
  children,
  ...props
}: React.ComponentProps<"p"> & { caret?: boolean }) {
  return (
    <p
      className={cn(
        "m-0 font-bold font-mono text-[0.625rem] text-phosphor uppercase leading-tight tracking-[0.18em]",
        className
      )}
      data-slot="eyebrow"
      {...props}
    >
      {children}
      {caret ? (
        <span
          aria-hidden="true"
          className="ml-[0.35em] inline-block h-[0.95em] w-[0.5em] animate-caret bg-phosphor align-[-0.12em]"
          data-slot="eyebrow-caret"
        />
      ) : null}
    </p>
  );
}

export { Eyebrow };
