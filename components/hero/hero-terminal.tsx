"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useSyncExternalStore } from "react";

import { Caret } from "@/registry/terminal/components/caret";
import { Led } from "@/registry/terminal/components/led";
import {
  ShellCommand,
  ShellLine,
  ShellOutput,
} from "@/registry/terminal/components/shell";
import { TerminalWindow } from "@/registry/terminal/components/terminal-window";

interface Entry {
  text: string;
  tone?: "default" | "muted" | "warning";
}

// The wordmark is a chevron followed by a cursor bar. The chevron is the
// prompt, and the bar is the caret, which only rests on the line still waiting.
const PROMPT = ">";
const COMMAND = "shadcn add @afterglow/preset";

const OUTPUT: Entry[] = [
  { text: "resolving registry ......... ok" },
  { text: "theme.css merged ........... ok" },
  { text: "base ui primitives ......... ok" },
  { text: "terminal components ........ ok" },
  { text: "tw-animate-css ............. not needed", tone: "warning" },
  { text: "source written to ./components", tone: "muted" },
];

// The command types itself, so it holds the line longer than the output the
// shell then dumps in one burst.
const TYPING = 620;
const PRINTING = 170;
const TOTAL = OUTPUT.length + 1;

const emptySubscribe = () => () => undefined;
const getClientSnapshot = (): boolean => true;
const getServerSnapshot = (): boolean => false;

export function HeroTerminal({ items }: { items: number }) {
  const [printed, setPrinted] = useState(1);
  const ready = printed >= TOTAL;

  useEffect(() => {
    if (ready) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPrinted(TOTAL);
      return;
    }

    const timer = window.setTimeout(
      () => setPrinted((count) => count + 1),
      printed === 1 ? TYPING : PRINTING
    );
    return () => window.clearTimeout(timer);
  }, [printed, ready]);

  // The footer echoes the selector beside it, so it has to wait for the client.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  );
  const { theme } = useTheme();
  const phosphor = mounted ? (theme ?? "green") : "green";

  return (
    <TerminalWindow
      footer={
        <>
          <span className="flex items-center gap-2">
            <Led pulse={!ready} tone={ready ? "ok" : "busy"} />
            {ready ? "ready" : "installing"}
          </span>
          <span>{items} items</span>
          <span>phosphor {phosphor}</span>
        </>
      }
      subtitle="node-04"
      title="afterglow install"
      variant="terminal"
    >
      <div className="grid min-h-56 content-start gap-4 p-4 font-mono text-xs lg:min-h-76">
        <ShellOutput className="hero-shell">
          <ShellCommand className="animate-type" prompt={PROMPT}>
            {COMMAND}
            {printed === 1 ? <Caret className="ml-1" /> : null}
          </ShellCommand>
          {OUTPUT.slice(0, printed - 1).map((line) => (
            <ShellLine
              className="animate-type"
              key={line.text}
              tone={line.tone}
            >
              {line.text}
            </ShellLine>
          ))}
          {ready ? (
            <ShellCommand prompt={PROMPT}>
              <Caret />
            </ShellCommand>
          ) : null}
        </ShellOutput>
      </div>
    </TerminalWindow>
  );
}
