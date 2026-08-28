import { PowerIcon } from "lucide-react";
import { AlarmButton } from "@/registry/terminal/components/alarm-button";

export function AlarmButtonDefault() {
  return (
    <AlarmButton>
      <PowerIcon />
      Restart spool
    </AlarmButton>
  );
}
