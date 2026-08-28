import { BootLog } from "@/registry/terminal/components/boot-log";

export function BootLogDefault() {
  return (
    <BootLog
      className="w-full"
      lines={[
        { text: "power on self test", tone: "dim" },
        { text: "phosphor at 100%", tone: "ok" },
        { text: "3 volumes mounted, 1 read-only", tone: "default" },
        { text: "beacon unreachable, running local", tone: "warn" },
        { text: "ready", tone: "ok" },
      ]}
    />
  );
}
