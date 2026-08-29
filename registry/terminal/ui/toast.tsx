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
      theme="dark"
      toastOptions={{
        classNames: {
          actionButton: "!rounded-none !bg-phosphor !text-void",
          cancelButton: "!rounded-none !bg-secondary !text-phosphor",
          description: "!text-muted-foreground",
          title: "!font-medium !text-[var(--toast-accent)]",
          toast:
            "[--toast-accent:var(--line-strong)] !rounded-none !border-[var(--toast-accent)] !bg-[color-mix(in_oklab,var(--toast-accent)_9%,var(--popover))] !font-mono !text-xs !shadow-panel !transition-[opacity,height,box-shadow] data-[mounted=false]:![--y:translateY(0)] data-[mounted=true]:animate-toast-in data-[removed=true]:![--y:translateY(0)] data-[removed=true]:animate-toast-out data-[type=error]:[--toast-accent:var(--destructive)] data-[type=info]:[--toast-accent:var(--info)] data-[type=success]:[--toast-accent:var(--phosphor)] data-[type=warning]:[--toast-accent:var(--warning)]",
        },
      }}
      {...props}
    />
  );
}

export { toast } from "sonner";
export { Toaster };
