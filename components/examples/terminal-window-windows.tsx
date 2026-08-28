import { TerminalWindow } from "@/registry/terminal/components/terminal-window";

const NOTE = `The spool went down at 04:12.
No entry in the log, no fault light.
Power cycled twice. Nothing.

Ordering a replacement controller.`;

export function TerminalWindowWindows() {
  return (
    <TerminalWindow
      className="h-52 w-full"
      collapsible
      subtitle="read-only"
      title="notes.txt"
      variant="windows"
    >
      <pre className="p-4 font-mono text-xs leading-relaxed">{NOTE}</pre>
    </TerminalWindow>
  );
}
