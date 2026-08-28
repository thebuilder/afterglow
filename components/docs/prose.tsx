import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/*
  Backticks, because these sentences are also the body of the markdown routes.
  Storing them as markdown means one string serves the page and the `.md`, and
  the two cannot end up saying it differently.
*/
const SEGMENT = /`([^`]+)`/g;

function inline(text: string): ReactNode[] {
  return text.split(SEGMENT).map((part, index) =>
    /* Odd indices are what sat between the backticks. */
    index % 2 === 1 ? (
      // biome-ignore lint/suspicious/noArrayIndexKey: the split is positional, and the position is the identity.
      <code className="text-phosphor" key={index}>
        {part}
      </code>
    ) : (
      part
    )
  );
}

/** One line of documentation prose, with its inline code set as code. */
export function Prose({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "max-w-prose text-pretty text-muted-foreground text-sm",
        className
      )}
    >
      {inline(children)}
    </p>
  );
}
