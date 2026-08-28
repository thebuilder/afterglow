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
        error: <OctagonXIcon className="size-4 text-signal" />,
        info: <InfoIcon className="size-4 text-azure" />,
        loading: <Spinner className="size-4" />,
        success: <CircleCheckIcon className="size-4 text-phosphor" />,
        warning: <TriangleAlertIcon className="size-4 text-amber" />,
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
          title: "!text-phosphor-bright !font-medium",
          toast:
            "!rounded-none !border-line-strong !bg-popover !font-mono !text-xs !shadow-panel",
        },
      }}
      {...props}
    />
  );
}

export { toast } from "sonner";
export { Toaster };
