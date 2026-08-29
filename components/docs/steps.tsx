import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const RULE = "left-[0.6875rem]";

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
