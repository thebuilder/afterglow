"use client";

import { useCallback, useState } from "react";

import { cn } from "@/lib/utils";
import { AlarmButton } from "@/registry/terminal/components/alarm-button";
import { BootLog } from "@/registry/terminal/components/boot-log";
import { Connector } from "@/registry/terminal/components/connector";
import { Eyebrow } from "@/registry/terminal/components/eyebrow";
import { Led, Status } from "@/registry/terminal/components/led";
import { Scanlines } from "@/registry/terminal/components/scanlines";
import {
  Shell,
  ShellCommand,
  ShellLine,
  ShellOutput,
  ShellPrompt,
} from "@/registry/terminal/components/shell";
import { Badge } from "@/registry/terminal/ui/badge";
import { Button } from "@/registry/terminal/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/terminal/ui/card";
import { Kbd, KbdGroup } from "@/registry/terminal/ui/kbd";
import { Progress } from "@/registry/terminal/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/terminal/ui/table";

const BOOT = [
  { text: "power on self test", tone: "dim" as const },
  { text: "phosphor at 100%", tone: "ok" as const },
  { text: "3 volumes mounted, 1 read-only", tone: "default" as const },
  { text: "beacon unreachable, running local", tone: "warn" as const },
  { text: "ready", tone: "ok" as const },
];

const VOLUMES = [
  { blocks: "18 442", name: "core", state: "mounted" },
  { blocks: "4 011", name: "archive", state: "mounted" },
  { blocks: "92 780", name: "capture", state: "read-only" },
  { blocks: "0", name: "spool", state: "offline" },
];

export function OperatorDashboard({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [commands, setCommands] = useState<{ id: number; text: string }[]>([]);

  const record = useCallback((value: string) => {
    setCommands((entries) => [...entries, { id: entries.length, text: value }]);
  }, []);

  return (
    <div className={cn("relative isolate bg-void", className)} {...props}>
      <Scanlines density="soft" />

      <header className="flex items-center justify-between gap-6 border-line border-b px-6 py-4">
        <div className="flex items-baseline gap-3">
          <strong className="font-bold font-mono text-base tracking-terminal-2xl">
            NODE-04
          </strong>
          <span className="font-mono text-4xs text-muted-foreground uppercase tracking-terminal">
            local operator
          </span>
        </div>
        <KbdGroup>
          <Kbd glyph>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </header>

      <main className="mx-auto grid max-w-5xl gap-10 px-6 py-12">
        <section className="grid gap-3">
          <Eyebrow caret>Session</Eyebrow>
          <h1 className="max-w-2xl text-balance font-mono font-medium text-2xl text-phosphor-bright leading-tight">
            Four volumes, one of them not answering.
          </h1>
          <Connector />
          <p className="max-w-prose text-muted-foreground text-sm">
            The spool has been down since the last power cycle. Everything else
            mounted clean.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <AlarmButton>Restart spool</AlarmButton>
            <Button variant="outline">Run diagnostics</Button>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Self test</CardTitle>
              <CardDescription>Last run, 40 seconds ago.</CardDescription>
            </CardHeader>
            <CardContent>
              <BootLog lines={BOOT} />
            </CardContent>
          </Card>

          <Card accent="var(--signal)">
            <CardHeader>
              <CardTitle>Rebuild</CardTitle>
              <CardDescription>Indexing capture volume.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <div className="flex items-baseline justify-between font-mono text-2xs uppercase tracking-terminal">
                  <span className="text-muted-foreground">Pass 1</span>
                  <span className="text-metric tabular-nums">68%</span>
                </div>
                <Progress value={68} />
              </div>
              <div className="grid gap-2">
                <div className="flex items-baseline justify-between font-mono text-2xs uppercase tracking-terminal">
                  <span className="text-muted-foreground">Pass 2</span>
                  <span className="text-phosphor-dim">waiting</span>
                </div>
                <Progress indeterminate />
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4">
          <Eyebrow>Volumes</Eyebrow>
          <div className="border border-line bg-card/90">
            <Table containerClassName="max-h-56" stickyHeader>
              <TableHeader>
                <TableRow>
                  <TableHead>Volume</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead className="text-right">Blocks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {VOLUMES.map((volume) => (
                  <TableRow key={volume.name}>
                    <TableCell className="text-phosphor-bright">
                      /{volume.name}
                    </TableCell>
                    <TableCell>
                      {volume.state === "offline" ? (
                        <Badge variant="signal">offline</Badge>
                      ) : (
                        <Badge
                          variant={
                            volume.state === "read-only" ? "warning" : "default"
                          }
                        >
                          {volume.state}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="is-numeric">
                      {volume.blocks}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        <section className="grid gap-3">
          <Eyebrow>Shell</Eyebrow>
          <Shell aria-label="Node command shell">
            <ShellOutput>
              <ShellLine tone="muted">session ready</ShellLine>
              {commands.map((command) => (
                <ShellCommand key={command.id} prompt="node-04:~$">
                  {command.text}
                </ShellCommand>
              ))}
            </ShellOutput>
            <ShellPrompt
              onSubmit={record}
              placeholder="mount /spool --force"
              prompt="node-04:~$"
            />
          </Shell>
        </section>
      </main>

      <footer className="flex flex-wrap items-center gap-6 border-line border-t px-6 py-4">
        <Status>uplink nominal</Status>
        <Status tone="busy">indexing</Status>
        <Status tone="error">spool offline</Status>
        <span className="ml-auto flex items-center gap-2 font-mono text-4xs text-phosphor-dim uppercase tracking-terminal">
          <Led tone="idle" /> node-04
        </span>
      </footer>
    </div>
  );
}
