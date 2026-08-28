import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Half the marker, which is where its centre lands and so where the rule goes. */
const RULE = "left-[0.6875rem]";

/**
 * A numbered sequence hung off a single rule.
 *
 * The number sits in a box on the rule rather than out in the margin, so a step
 * whose body is a code block still reads as one of three things to do and not
 * as a heading that happens to have a digit in front of it.
 *
 * The rule is drawn inside the list rather than as its left border, and the
 * markers are indented to sit on it. Hanging them outside costs half a marker
 * of overhang, and the tab panel this renders inside keeps a `clip-path` from
 * its entrance animation, so anything that leaves the box loses its left edge.
 */
export function Steps({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <ol
      className={cn(
        "relative grid grid-cols-[minmax(0,1fr)] gap-7 pl-7",
        className
      )}
      data-slot="steps"
    >
      <span
        aria-hidden="true"
        className={cn("absolute top-0 bottom-0 w-px bg-line", RULE)}
      />
      {children}
    </ol>
  );
}

export function Step({
  children,
  index,
  title,
}: {
  children?: ReactNode;
  index: number;
  title: string;
}) {
  return (
    <li className="relative grid grid-cols-[minmax(0,1fr)] gap-3">
      <span
        aria-hidden="true"
        className="-left-7 absolute top-0 grid size-[1.375rem] place-items-center border border-line bg-void font-bold font-mono text-2xs text-phosphor tabular-nums"
      >
        {index}
      </span>
      <p className="text-pretty text-foreground/85 text-sm">{title}</p>
      {children}
    </li>
  );
}
