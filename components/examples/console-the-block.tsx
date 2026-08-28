import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/registry/terminal/ui/button";

export function ConsoleTheBlock() {
  return (
    <div className="grid gap-4">
      <p className="max-w-prose text-muted-foreground text-sm">
        The answer to what the pieces look like next to each other.
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
