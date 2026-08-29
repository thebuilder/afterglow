"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

import { Spinner } from "@/registry/terminal/ui/spinner";

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      className="toaster group"
      icons={{
        error: <OctagonXIcon className="size-4 text-signal" />,
        info: <InfoIcon className="size-4 text-info" />,
        loading: <Spinner className="size-4" />,
        success: <CircleCheckIcon className="size-4 text-phosphor" />,
        warning: <TriangleAlertIcon className="size-4 text-warning" />,
      }}
      style={
        {
          "--border-radius": "0",
          "--font-family": "var(--font-mono)",
          "--normal-bg": "var(--popover)",
          "--normal-border": "var(--line-strong)",
          "--normal-text": "var(--popover-foreground)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          actionButton:
            "ml-auto flex h-6 shrink-0 cursor-pointer items-center rounded-none border-0 bg-phosphor px-2 font-medium text-void",
          cancelButton:
            "ml-auto flex h-6 shrink-0 cursor-pointer items-center rounded-none border-0 bg-secondary px-2 font-medium text-phosphor",
          content: "flex min-w-0 flex-1 flex-col gap-0.5",
          description: "text-muted-foreground",
          icon: "flex size-4 shrink-0 items-center",
          title: "font-medium text-[var(--toast-accent)]",
          toast:
            "[--toast-accent:var(--line-strong)] flex w-[var(--width)] items-center gap-2 rounded-none border border-[var(--toast-accent)] bg-[color-mix(in_oklab,var(--toast-accent)_9%,var(--popover))] p-4 font-mono text-xs text-popover-foreground shadow-panel transition-[opacity,height,box-shadow] data-[mounted=true]:animate-toast-in data-[removed=true]:animate-toast-out data-[type=error]:[--toast-accent:var(--destructive)] data-[type=info]:[--toast-accent:var(--info)] data-[type=success]:[--toast-accent:var(--phosphor)] data-[type=warning]:[--toast-accent:var(--warning)]",
        },
        unstyled: true,
      }}
      {...props}
    />
  );
}

export { toast } from "sonner";
export { Toaster };
