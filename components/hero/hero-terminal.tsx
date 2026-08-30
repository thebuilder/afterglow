"use client";

import { useTheme } from "next-themes";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useInView } from "react-intersection-observer";

import { PHOSPHOR_NAMES } from "@/lib/phosphor";
import { Caret } from "@/registry/terminal/components/caret";
import { Led } from "@/registry/terminal/components/led";
import {
  ShellCommand,
  ShellLine,
  ShellOutput,
  ShellPrompt,
} from "@/registry/terminal/components/shell";
import { TerminalWindow } from "@/registry/terminal/components/terminal-window";

type Tone = "default" | "muted" | "warning" | "error";

interface Entry {
  text: string;
  tone?: Tone;
}

interface Line extends Entry {
  duration?: number;
  id: string;
  typed?: boolean;
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

// A line's wipe runs for exactly as long as the step that mounted it, so one
// line finishes writing as the next appears. The command types itself, so it
// holds the line longer than the output the shell prints.
const TYPING = 620;
const PRINTING = 200;
const LINES = OUTPUT.length + 1;
// One step past the last line, so the prompt comes back once the shell has
// finished writing rather than racing the last wipe.
const STEPS = LINES + 1;

const WORDS = /\s+/;

const HELP = [
  "help              list commands",
  "status            read node status",
  "phosphor <name>   set the color preset",
  "clear             wipe the transcript",
];

interface Console {
  items: number;
  phosphor: string;
  setTheme: (value: string) => void;
}

function respond(name: string, argument: string, node: Console): Entry[] {
  if (name === "help") {
    return HELP.map((text) => ({ text, tone: "muted" as const }));
  }
  if (name === "status") {
    return [
      { text: "node-04     nominal" },
      { text: `registry    ${node.items} items linked` },
      { text: `phosphor    ${node.phosphor}` },
    ];
  }
  if (name !== "phosphor") {
    return [{ text: `sh: command not found: ${name}`, tone: "error" }];
  }
  if ((PHOSPHOR_NAMES as readonly string[]).includes(argument)) {
    node.setTheme(argument);
    return [{ text: `phosphor set to ${argument}`, tone: "muted" }];
  }
  return [
    {
      text: `phosphor: choose one of ${PHOSPHOR_NAMES.join(", ")}`,
      tone: "warning",
    },
  ];
}

function TranscriptLine({ line, caret }: { line: Line; caret: boolean }) {
  const motion: { className?: string; style?: React.CSSProperties } =
    line.duration
      ? {
          className: "animate-type",
          style: { animationDuration: `${line.duration}ms` },
        }
      : {};

  if (line.typed) {
    return (
      <ShellCommand prompt={PROMPT} {...motion}>
        {line.text}
        {caret ? <Caret className="ml-1" /> : null}
      </ShellCommand>
    );
  }
  return (
    <ShellLine tone={line.tone} {...motion}>
      {line.text}
    </ShellLine>
  );
}

// The terminal sits below the fold on a phone, so the install would play out
// to an empty room and be over before anyone scrolled to it.
function useInstallProgress() {
  const { inView, ref } = useInView({
    rootMargin: "-15% 0px",
    triggerOnce: true,
  });
  const [printed, setPrinted] = useState(1);

  useEffect(() => {
    if (!inView || printed >= STEPS) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPrinted(STEPS);
      return;
    }

    const timer = window.setTimeout(
      () => setPrinted((count) => count + 1),
      printed === 1 ? TYPING : PRINTING
    );
    return () => window.clearTimeout(timer);
  }, [inView, printed]);

  return { printed, ref };
}

function Readout({
  ready,
  items,
  phosphor,
}: {
  ready: boolean;
  items: number;
  phosphor: string;
}) {
  return (
    <>
      <span className="flex items-center gap-2">
        <Led pulse={!ready} tone={ready ? "ok" : "busy"} />
        {ready ? "ready" : "installing"}
      </span>
      <span>{items} items</span>
      <span>phosphor {phosphor}</span>
    </>
  );
}

const emptySubscribe = () => () => undefined;
const getClientSnapshot = (): boolean => true;
const getServerSnapshot = (): boolean => false;

export function HeroTerminal({ items }: { items: number }) {
  const { printed, ref: onscreen } = useInstallProgress();
  const [session, setSession] = useState<readonly Line[]>([]);
  const [cleared, setCleared] = useState(false);
  const nextId = useRef(0);
  const view = useRef<HTMLDivElement>(null);
  const ready = printed > LINES;

  // The footer echoes the selector beside it, so it has to wait for the client.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  );
  const { theme, setTheme } = useTheme();
  const phosphor = mounted ? (theme ?? "green") : "green";

  const transcript: Line[] = cleared
    ? [...session]
    : [
        { duration: TYPING, id: "install", text: COMMAND, typed: true },
        ...OUTPUT.slice(0, printed - 1).map((line, index) => ({
          duration: PRINTING,
          id: `install-${index}`,
          text: line.text,
          tone: line.tone,
        })),
        ...session,
      ];

  // A terminal keeps the newest line in view rather than the oldest.
  useEffect(() => {
    const box = view.current;
    if (transcript.length > 0) {
      box?.scrollTo({ top: box.scrollHeight });
    }
  }, [transcript]);

  const run = useCallback(
    (input: string) => {
      const [name = "", argument = ""] = input.toLowerCase().split(WORDS);
      if (name === "clear") {
        setSession([]);
        setCleared(true);
        return;
      }

      const lines = respond(name, argument, { items, phosphor, setTheme });
      const first = nextId.current;
      nextId.current += lines.length + 1;
      setSession((current) => [
        ...current,
        { id: `run-${first}`, text: input, typed: true },
        ...lines.map((line, index) => ({
          ...line,
          id: `run-${first}-${index}`,
        })),
      ]);
    },
    [items, phosphor, setTheme]
  );

  return (
    <TerminalWindow
      footer={<Readout items={items} phosphor={phosphor} ready={ready} />}
      subtitle="node-04"
      title="afterglow shell"
      variant="terminal"
    >
      {/* The prompt is pinned and the log grows upward into the space above it,
          the way a shell fills a screen, so the caret never moves. */}
      <div
        className="hero-shell flex flex-col p-4 font-mono text-xs"
        ref={onscreen}
      >
        <ShellOutput
          className="flex h-40 flex-none flex-col lg:h-60"
          ref={view}
        >
          <div className="mt-auto">
            {transcript.map((line) => (
              <TranscriptLine
                caret={line.id === "install" && printed === 1}
                key={line.id}
                line={line}
              />
            ))}
          </div>
        </ShellOutput>

        {/* The row is held open through the install so the window opens at the
            height it keeps, rather than growing a line when the prompt lands. */}
        <div className="min-h-5">
          {ready ? (
            <ShellPrompt
              className="min-h-5 border-0 pt-0"
              label="Afterglow shell"
              onSubmit={run}
              placeholder="type help"
              prompt={PROMPT}
            />
          ) : null}
        </div>
      </div>
    </TerminalWindow>
  );
}
