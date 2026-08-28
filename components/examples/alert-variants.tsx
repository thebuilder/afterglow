import { InfoIcon, OctagonXIcon, TriangleAlertIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/terminal/ui/alert";

export function AlertVariants() {
  return (
    <div className="grid w-full max-w-md gap-3">
      <Alert>
        <InfoIcon />
        <AlertTitle>Self test passed</AlertTitle>
        <AlertDescription>
          Three volumes mounted, one read-only.
        </AlertDescription>
      </Alert>
      <Alert variant="warn">
        <TriangleAlertIcon />
        <AlertTitle>Beacon unreachable</AlertTitle>
        <AlertDescription>Running local until it answers.</AlertDescription>
      </Alert>
      <Alert variant="signal">
        <OctagonXIcon />
        <AlertTitle>Spool offline</AlertTitle>
        <AlertDescription>
          No entry in the log and no fault light.
        </AlertDescription>
      </Alert>
    </div>
  );
}
