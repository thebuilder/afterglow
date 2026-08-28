import { PowerIcon } from "lucide-react";
import { Button } from "@/registry/terminal/ui/button";

export function ButtonWithAnIconAndDisabled() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="signal">
        <PowerIcon />
        Restart spool
      </Button>
      <Button disabled>Offline</Button>
      <Button disabled variant="outline">
        Offline
      </Button>
    </div>
  );
}
