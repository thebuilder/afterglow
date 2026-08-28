import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/registry/terminal/ui/button";

export function ConsoleTheBlock() {
  return (
    <div className="grid gap-4">
      <p className="max-w-prose text-muted-foreground text-sm">
        A complete operator console assembled from the registry.
      </p>
      <Button
        nativeButton={false}
        render={<Link href="/console" />}
        variant="outline"
      >
        Open the console
        <ChevronRightIcon />
      </Button>
    </div>
  );
}
