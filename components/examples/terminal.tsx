import { ChevronRightIcon, PowerIcon } from "lucide-react";
import Link from "next/link";

import type { ExampleMap } from "@/lib/example";
import { AlarmButton } from "@/registry/terminal/components/alarm-button";
import { BootLog } from "@/registry/terminal/components/boot-log";
import { Connector } from "@/registry/terminal/components/connector";
import { Eyebrow } from "@/registry/terminal/components/eyebrow";
import { Glyph, glyphTones } from "@/registry/terminal/components/glyph";
import { Status } from "@/registry/terminal/components/led";
import { Prompt } from "@/registry/terminal/components/prompt";
import { Screen } from "@/registry/terminal/components/screen";
import { TerminalWindow } from "@/registry/terminal/components/terminal-window";
import { Badge } from "@/registry/terminal/ui/badge";
import { Button } from "@/registry/terminal/ui/button";
import { Checkbox } from "@/registry/terminal/ui/checkbox";
import { Input } from "@/registry/terminal/ui/input";
import { Kbd } from "@/registry/terminal/ui/kbd";
import { Label } from "@/registry/terminal/ui/label";
import { Progress } from "@/registry/terminal/ui/progress";
import { Spinner } from "@/registry/terminal/ui/spinner";
import { Switch } from "@/registry/terminal/ui/switch";

const SWATCHES = [
  { note: "unlit glass", token: "void" },
  { note: "a surface on it", token: "panel" },
  { note: "the beam", token: "phosphor" },
  { note: "where it blooms", token: "phosphor-bright" },
  { note: "furniture", token: "phosphor-dim" },
  { note: "an event", token: "signal" },
  { note: "measured", token: "amber" },
  { note: "a category", token: "azure" },
  { note: "and another", token: "violet" },
  { note: "destructive", token: "ember" },
];

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

const NOTE = `The spool went down at 04:12.
No entry in the log, no fault light.
Power cycled twice. Nothing.

Ordering a replacement controller.`;

export const terminalExamples: ExampleMap = {
  "alarm-button": [
    {
      description:
        "Two flashes and a rest, which is what a warning lamp does and a steady sine does not. Pointing at it answers the alarm, so the flashing stops.",
      name: "Default",
      node: (
        <AlarmButton>
          <PowerIcon />
          Restart spool
        </AlarmButton>
      ),
    },
  ],

  "boot-log": [
    {
      description:
        "Every line is in the DOM from the first frame and the unprinted ones are merely invisible, so the block is its final height before anything animates.",
      name: "Default",
      node: (
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
      ),
    },
  ],

  connector: [
    {
      name: "Both directions",
      node: (
        <div className="grid w-full gap-6">
          <div className="grid gap-2">
            <h3 className="font-medium font-mono text-phosphor-bright">
              Points right
            </h3>
            <Connector />
          </div>
          <div className="grid justify-items-end gap-2">
            <h3 className="font-medium font-mono text-phosphor-bright">
              Points left
            </h3>
            <Connector direction="left" />
          </div>
        </div>
      ),
    },
  ],

  console: [
    {
      description:
        "Boot log, volume manifest, progress, status line and a live prompt, on one page.",
      name: "The block",
      node: (
        <div className="grid gap-4">
          <p className="max-w-prose text-muted-foreground text-sm">
            The answer to what the pieces look like next to each other.
          </p>
          <Button
            nativeButton={false}
            render={<Link href="/console" />}
            variant="outline"
          >
            Open the console
            <ChevronRightIcon />
          </Button>
        </div>
      ),
    },
  ],

  eyebrow: [
    {
      description:
        "The caret is a styled box rather than a ▋ glyph. A character carries the font's own sidebearings and never quite lines up with the text it follows.",
      name: "With and without a caret",
      node: (
        <div className="grid gap-4">
          <Eyebrow>Section label</Eyebrow>
          <Eyebrow caret>Awaiting input</Eyebrow>
        </div>
      ),
    },
  ],

  glyph: [
    {
      description:
        "Everything is derived from one hex value with color-mix, so a new category is one token rather than a border, a fill, an inset shade and a glow that have to be kept in agreement.",
      name: "Categories",
      node: (
        <div className="flex flex-wrap gap-4">
          {(Object.keys(glyphTones) as (keyof typeof glyphTones)[]).map(
            (tone) => (
              <div className="grid justify-items-center gap-2" key={tone}>
                <Glyph tone={tone} />
                <span className="font-mono text-[0.55rem] text-phosphor-dim uppercase tracking-[0.08em]">
                  {tone}
                </span>
              </div>
            )
          )}
        </div>
      ),
    },
  ],

  led: [
    {
      description:
        "The idle lamp holds still. A dark indicator that is also animating says nothing twice.",
      name: "Tones",
      node: (
        <div className="grid gap-2.5">
          <Status>uplink nominal</Status>
          <Status tone="busy">indexing</Status>
          <Status tone="error">spool offline</Status>
          <Status tone="idle">standby</Status>
        </div>
      ),
    },
  ],

  prompt: [
    {
      name: "Default",
      node: <Prompt className="w-full" placeholder="mount /spool --force" />,
    },
  ],

  scanlines: [
    {
      description:
        "The lines multiply rather than overlay, so they darken what is under them instead of laying a grey film on top.",
      name: "With and without",
      node: (
        <div className="grid w-full gap-3 sm:grid-cols-2">
          <div className="relative isolate grid h-28 place-items-center border border-line bg-panel font-mono text-phosphor text-sm">
            without
          </div>
          <Screen className="grid h-28 place-items-center bg-panel font-mono text-phosphor text-sm">
            with
          </Screen>
        </div>
      ),
    },
  ],

  screen: [
    {
      name: "Default",
      node: (
        <Screen className="grid w-full place-items-center gap-2 px-6 py-10">
          <Eyebrow caret>Standby</Eyebrow>
          <p className="font-mono text-lg text-phosphor-bright">NO SIGNAL</p>
        </Screen>
      ),
    },
  ],

  terminal: [
    {
      description:
        "One of most things, on one strip. Green carries the interface, pink is reserved for whatever is actually happening, and every edge is a hairline.",
      name: "The system at a glance",
      node: (
        <div className="grid w-full max-w-xl grid-cols-[minmax(0,1fr)] gap-5 border border-line bg-card/90 p-5">
          <div className="flex items-center justify-between gap-4">
            <Eyebrow caret>Node-04</Eyebrow>
            <Status>nominal</Status>
          </div>

          <Connector />

          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Mount</Button>
            <Button size="sm" variant="signal">
              Restart
            </Button>
            <Button size="sm" variant="outline">
              Inspect
            </Button>
            <Spinner />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-2.5">
              <Checkbox defaultChecked id="ex-sys-cb" />
              <Label htmlFor="ex-sys-cb">Read-write</Label>
            </span>
            <span className="flex items-center gap-2.5">
              <Switch defaultChecked id="ex-sys-sw" size="sm" />
              <Label htmlFor="ex-sys-sw">Beacon</Label>
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd glyph>⌘</Kbd>
              <Kbd>K</Kbd>
            </span>
          </div>

          <Input defaultValue="node-04.local" />

          <div className="grid gap-2">
            <div className="flex items-baseline justify-between font-mono text-[0.625rem] uppercase tracking-[0.1em]">
              <span className="text-muted-foreground">Indexing</span>
              <span className="text-amber tabular-nums">68%</span>
            </div>
            <Progress value={68} />
          </div>

          <div className="flex flex-wrap items-center gap-2 border-line border-t pt-4">
            <Badge>mounted</Badge>
            <Badge variant="amber">read-only</Badge>
            <Badge variant="signal">offline</Badge>
            <Glyph className="ml-auto size-5" tone="code" />
            <Glyph className="size-5" tone="image" />
            <Glyph className="size-5" tone="directory" />
          </div>
        </div>
      ),
    },
    {
      description:
        "The console block is the same parts arranged as a page somebody would actually operate.",
      name: "Composed",
      node: (
        <Button
          nativeButton={false}
          render={<Link href="/console" />}
          variant="outline"
        >
          Open the console
          <ChevronRightIcon />
        </Button>
      ),
    },
  ],

  "terminal-window": [
    {
      description:
        "One hairline instead of a double border, a slim bar instead of a pinstriped one, and the content flush rather than recessed. For a window that has to sit among the panels rather than in front of them.",
      name: "Terminal",
      node: (
        <TerminalWindow
          className="h-56 w-[30rem] max-w-full shrink-0"
          collapsible
          footer={
            <>
              <span>14 lines</span>
              <span>read-write</span>
            </>
          }
          resizable
          title="notes.txt"
          variant="terminal"
        >
          <pre className="p-4 font-mono text-xs leading-relaxed">
            {LONG_NOTE}
          </pre>
        </TerminalWindow>
      ),
    },
    {
      description:
        "Drag the corner or either edge. The yellow light rolls the window up to its titlebar, the corner takes arrow keys, and the content sits in a well with a margin of chrome round it so the grip is never over the scrollbar.",
      name: "macOS",
      node: (
        <TerminalWindow
          className="h-64 w-[30rem] max-w-full shrink-0"
          collapsible
          resizable
          title="notes.txt"
        >
          <pre className="p-4 font-mono text-xs leading-relaxed">
            {LONG_NOTE}
          </pre>
        </TerminalWindow>
      ),
    },
    {
      description:
        "Bevelled buttons: light on the top and left, shadow on the bottom and right, inverting on press. It is the whole reason the era's buttons read as pressable.",
      name: "Windows",
      node: (
        <TerminalWindow
          className="h-52 w-full"
          collapsible
          subtitle="read-only"
          title="notes.txt"
          variant="windows"
        >
          <pre className="p-4 font-mono text-xs leading-relaxed">{NOTE}</pre>
        </TerminalWindow>
      ),
    },
  ],
  theme: [
    {
      description:
        "One palette, no light mode. A phosphor tube has no daylight setting, so the light and dark blocks carry the same values.",
      name: "Palette",
      node: (
        <div className="grid w-full gap-px bg-line sm:grid-cols-2">
          {SWATCHES.map((swatch) => (
            <div
              className="flex items-center gap-3 bg-panel px-3 py-2.5"
              key={swatch.token}
            >
              <span
                className="size-6 shrink-0 border border-line"
                style={{ background: `var(--${swatch.token})` }}
              />
              <code className="font-mono text-phosphor-bright text-xs">
                --{swatch.token}
              </code>
              <span className="ml-auto font-mono text-[0.625rem] text-phosphor-dim uppercase tracking-[0.08em]">
                {swatch.note}
              </span>
            </div>
          ))}
        </div>
      ),
    },
  ],
};
