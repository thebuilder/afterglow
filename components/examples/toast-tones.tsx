"use client";

import { ArchiveIcon } from "lucide-react";
import { useCallback } from "react";

import { Button } from "@/registry/terminal/ui/button";
import { Toaster, toast } from "@/registry/terminal/ui/toast";

export function ToastTones() {
  const success = useCallback(
    () =>
      toast.success("Spool mounted", {
        description: "18 442 blocks, read-write.",
      }),
    []
  );
  const warning = useCallback(
    () =>
      toast.warning("Beacon unreachable", { description: "Running local." }),
    []
  );
  const info = useCallback(
    () =>
      toast.info("Downlink restored", {
        description: "Round trip 42 ms.",
      }),
    []
  );
  const failure = useCallback(
    () =>
      toast.error("Spool did not answer", {
        description: "Power cycle it and try again.",
      }),
    []
  );
  const custom = useCallback(
    () =>
      toast("Archive queued", {
        description: "Spool 07 will run after capture.",
        icon: <ArchiveIcon className="size-4 text-violet" />,
      }),
    []
  );

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toaster position="bottom-right" />
      <Button onClick={success} variant="outline">
        Success
      </Button>
      <Button onClick={warning} variant="outline">
        Warning
      </Button>
      <Button onClick={info} variant="outline">
        Info
      </Button>
      <Button onClick={failure} variant="signal">
        Error
      </Button>
      <Button onClick={custom} variant="ghost">
        Custom icon
      </Button>
    </div>
  );
}
