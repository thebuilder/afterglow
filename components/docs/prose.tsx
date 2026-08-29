import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const SEGMENT = /`([^`]+)`/g;

function inline(text: string): ReactNode[] {
  return text.split(SEGMENT).map((part, index) =>
    index % 2 === 1 ? (
      // biome-ignore lint/suspicious/noArrayIndexKey: split position is the identity.
      <code className="text-phosphor" key={index}>
        {part}
      </code>
    ) : (
      part
    )
  );
}

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
