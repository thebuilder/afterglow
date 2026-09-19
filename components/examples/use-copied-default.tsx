"use client";

import { CheckIcon, CopyIcon } from "lucide-react";

import { useCopied } from "@/registry/terminal/hooks/use-copied";
import { Button } from "@/registry/terminal/ui/button";

const KEY = "sk_relay_7f21c0e4b98a3d55";

export function UseCopiedDefault() {
  const { copied, copy } = useCopied(KEY);

  return (
    <div className="grid w-full max-w-md gap-3">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border border-line bg-panel-sunken p-2">
        <code className="min-w-0 truncate font-mono text-phosphor-bright text-xs">
          {KEY}
        </code>
        <Button
          aria-label={copied ? "Copied" : "Copy the relay key"}
          onClick={copy}
          size="sm"
          variant="outline"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <p className="text-muted-foreground text-xs">
        The flag clears itself two seconds after the write lands, so the button
        goes back to asking rather than staying answered.
      </p>
    </div>
  );
}
