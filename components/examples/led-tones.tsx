import { Status } from "@/registry/terminal/components/led";

export function LedTones() {
  return (
    <div className="grid gap-2.5">
      <Status>uplink nominal</Status>
      <Status tone="busy">indexing</Status>
      <Status tone="error">spool offline</Status>
      <Status tone="idle">standby</Status>
    </div>
  );
}
