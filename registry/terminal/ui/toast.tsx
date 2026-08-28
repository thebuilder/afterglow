"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

import { Spinner } from "@/registry/terminal/ui/spinner";

/**
 * Toasts, in the house palette.
 *
 * The theme is pinned to dark rather than read from a theme provider. This
 * system has one palette by design, so asking `next-themes` which of two looks
 * to use would be a dependency added to answer a question that has one answer.
 */
function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 text-phosphor" />,
        info: <InfoIcon className="size-4 text-azure" />,
        warning: <TriangleAlertIcon className="size-4 text-amber" />,
        error: <OctagonXIcon className="size-4 text-signal" />,
        loading: <Spinner className="size-4" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--line-strong)",
          "--border-radius": "0",
          "--font-family": "var(--font-mono)",
        } as React.CSSProperties
      }
      theme="dark"
      toastOptions={{
        classNames: {
          toast:
            "!rounded-none !border-line-strong !bg-popover !font-mono !text-xs !shadow-panel",
          title: "!text-phosphor-bright !font-medium",
          description: "!text-muted-foreground",
          actionButton: "!rounded-none !bg-phosphor !text-void",
          cancelButton: "!rounded-none !bg-secondary !text-phosphor",
        },
      }}
      {...props}
    />
  );
}

export { toast } from "sonner";
export { Toaster };
