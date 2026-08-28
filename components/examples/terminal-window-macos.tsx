import { TerminalWindow } from "@/registry/terminal/components/terminal-window";

const LONG_NOTE = `The spool went down at 04:12.
No entry in the log, no fault light.
Power cycled twice. Nothing.

04:12:04 retry 1 of 3
04:12:09 retry 2 of 3
04:12:14 retry 3 of 3
04:12:19 giving up

Controller reports firmware 2.1.4, which is
the version the release notes say fixed this.

Ordering a replacement controller.
Ticket NODE-04-118 raised with the vendor.`;

export function TerminalWindowMacos() {
  return (
    <TerminalWindow
      className="h-64 w-[30rem] max-w-full shrink-0"
      collapsible
      resizable
      title="notes.txt"
    >
      <pre className="p-4 font-mono text-xs leading-relaxed">{LONG_NOTE}</pre>
    </TerminalWindow>
  );
}
