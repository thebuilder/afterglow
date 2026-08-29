"use client";

import { useCallback, useRef, useState } from "react";

import {
  Shell,
  ShellCommand,
  ShellLine,
  ShellOutput,
  ShellPrompt,
} from "@/registry/terminal/components/shell";

interface Entry {
  id: number;
  kind: "command" | "error" | "output";
  text: string;
}

const INITIAL: Entry[] = [
  { id: -2, kind: "output", text: "afterglow shell" },
  { id: -1, kind: "output", text: "Type help, status, or clear." },
];

const RESPONSES: Record<string, readonly string[]> = {
  help: [
    "help     list commands",
    "status   read node status",
    "clear    wipe the transcript",
  ],
  status: ["node-04   nominal", "uplink    connected", "spool     offline"],
};

export function ShellInteractive() {
  const nextId = useRef(0);
  const [entries, setEntries] = useState<readonly Entry[]>(INITIAL);

  const run = useCallback((command: string) => {
    const name = command.toLowerCase();
    if (name === "clear") {
      setEntries([]);
      return;
    }

    const response = RESPONSES[name] ?? [`sh: command not found: ${command}`];
    const kind: Entry["kind"] = RESPONSES[name] ? "output" : "error";
    const firstId = nextId.current;
    const additions: Entry[] = [
      { id: firstId, kind: "command", text: command },
      ...response.map((text, index) => ({
        id: firstId + index + 1,
        kind,
        text,
      })),
    ];
    nextId.current += additions.length;
    setEntries((current) => [...current, ...additions]);
  }, []);

  return (
    <Shell aria-label="Afterglow demo shell" className="w-full max-w-2xl">
      <ShellOutput>
        {entries.map((entry) =>
          entry.kind === "command" ? (
            <ShellCommand key={entry.id} prompt="afterglow@node-04:~$">
              {entry.text}
            </ShellCommand>
          ) : (
            <ShellLine
              key={entry.id}
              tone={entry.kind === "error" ? "error" : "default"}
            >
              {entry.text}
            </ShellLine>
          )
        )}
      </ShellOutput>
      <ShellPrompt onSubmit={run} prompt="afterglow@node-04:~$" />
    </Shell>
  );
}
