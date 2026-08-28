"use client";

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
  const failure = useCallback(
    () =>
      toast.error("Spool did not answer", {
        description: "Power cycle it and try again.",
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
      <Button onClick={failure} variant="signal">
        Error
      </Button>
    </div>
  );
}
