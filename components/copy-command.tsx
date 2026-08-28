"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * The install line, and a button that puts it on the clipboard.
 *
 * The confirmation replaces the icon rather than sitting beside it, so the row
 * does not change width at the moment you click it. It clears itself after two
 * seconds; a tick that stays lit is a tick about a copy you made a while ago.
 */
export function CopyCommand({
  command,
  className,
}: {
  command: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(command).then(() => setCopied(true));
  }, [command]);

  return (
    <div
      className={cn(
        "flex min-w-0 items-center gap-3 border border-line bg-panel-sunken py-2 pr-2 pl-3",
        className
      )}
    >
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-phosphor text-xs">
        <span className="select-none text-phosphor-dim">$ </span>
        {command}
      </code>
      <button
        aria-label={copied ? "Copied" : `Copy: ${command}`}
        className="grid size-7 shrink-0 place-items-center border border-line text-phosphor-dim outline-none transition-colors hover:border-line-strong hover:text-phosphor-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-phosphor-bright"
        onClick={copy}
        type="button"
      >
        {copied ? (
          <CheckIcon className="size-3.5 text-phosphor" />
        ) : (
          <CopyIcon className="size-3.5" />
        )}
      </button>
    </div>
  );
}
