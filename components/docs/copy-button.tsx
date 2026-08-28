"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useCallback } from "react";

import { useCopied } from "@/components/docs/use-copied";
import { cn } from "@/lib/utils";

/**
 * The copy affordance on a code block.
 *
 * The confirmation replaces the icon instead of sitting beside it, so the
 * button does not change width at the moment you click it.
 */
export function CopyButton({
  className,
  label,
  text,
}: {
  className?: string;
  label: string;
  text: string;
}) {
  const read = useCallback(() => Promise.resolve(text), [text]);
  const { copied, copy } = useCopied(read);

  return (
    <button
      aria-label={copied ? "Copied" : label}
      className={cn(
        "grid size-7 shrink-0 place-items-center border border-line bg-panel-sunken text-phosphor-dim outline-none transition-colors hover:border-line-strong hover:text-phosphor-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-phosphor-bright",
        className
      )}
      onClick={copy}
      type="button"
    >
      {copied ? (
        <CheckIcon className="size-3.5 text-phosphor" />
      ) : (
        <CopyIcon className="size-3.5" />
      )}
    </button>
  );
}
