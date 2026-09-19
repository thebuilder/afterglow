"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";
import { useCopied } from "@/registry/terminal/hooks/use-copied";

function CodeBlockCopy({
  className,
  label = "Copy the code",
  text,
  ...props
}: Omit<React.ComponentProps<"button">, "children"> & {
  label?: string;
  text: string;
}) {
  const { copied, copy } = useCopied(text);

  return (
    <button
      aria-label={copied ? "Copied" : label}
      className={cn(
        "grid size-7 shrink-0 place-items-center border border-line bg-panel-sunken text-phosphor-dim outline-none transition-colors hover:border-line-strong hover:text-phosphor-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-phosphor-bright",
        className
      )}
      data-slot="code-block-copy"
      onClick={copy}
      type="button"
      {...props}
    >
      {copied ? (
        <CheckIcon className="size-3.5 text-phosphor" />
      ) : (
        <CopyIcon className="size-3.5" />
      )}
    </button>
  );
}

export { CodeBlockCopy };
