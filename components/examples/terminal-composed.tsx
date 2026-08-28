import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/registry/terminal/ui/button";

export function TerminalComposed() {
  return (
    <Button
      nativeButton={false}
      render={<Link href="/console" />}
      variant="outline"
    >
      Open the console
      <ChevronRightIcon />
    </Button>
  );
}
