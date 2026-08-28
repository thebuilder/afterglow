"use client";

import { useState } from "react";

import { AlarmButton } from "@/registry/terminal/components/alarm-button";
import { BootLog } from "@/registry/terminal/components/boot-log";
import { Connector } from "@/registry/terminal/components/connector";
import { Eyebrow } from "@/registry/terminal/components/eyebrow";
import { Glyph } from "@/registry/terminal/components/glyph";
import { Led, Status } from "@/registry/terminal/components/led";
import { Prompt } from "@/registry/terminal/components/prompt";
import { Scanlines } from "@/registry/terminal/components/scanlines";
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
  { name: "core", tone: "code" as const, state: "mounted", blocks: "18 442" },
  {
    name: "archive",
    tone: "archive" as const,
    state: "mounted",
    blocks: "4 011",
  },
  {
    name: "capture",
    tone: "image" as const,
    state: "read-only",
    blocks: "92 780",
  },
  { name: "spool", tone: "system" as const, state: "offline", blocks: "0" },
];

/**
 * A console, assembled out of the registry rather than described.
 *
 * It is here to answer the question a screenshot cannot: what the pieces look
 * like next to each other. The green carries the interface, the pink appears
 * exactly twice (once on the control that wants pressing, once on the volume
 * that is down) and everything else is a hairline.
 */
export default function ConsolePage() {
  /**
   * Entries carry an id rather than being keyed by position. The same command
   * typed twice is two entries with identical text, and a key built from the
   * text or the index makes React reuse the wrong row the moment one is added.
   */
  const [log, setLog] = useState<{ id: number; text: string }[]>([]);

  return (
    <div className="relative isolate min-h-svh bg-void">
      <Scanlines density="soft" fixed vignette />

      <header className="flex items-center justify-between gap-6 border-line border-b px-6 py-4">
        <div className="flex items-baseline gap-3">
          <strong className="font-bold font-mono text-base tracking-[0.16em]">
            NODE-04
          </strong>
          <span className="font-mono text-[0.55rem] text-muted-foreground uppercase tracking-[0.1em]">
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
          <h1 className="max-w-2xl font-mono font-medium text-2xl text-phosphor-bright leading-tight text-balance">
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
                <div className="flex items-baseline justify-between font-mono text-[0.625rem] uppercase tracking-[0.1em]">
                  <span className="text-muted-foreground">Pass 1</span>
                  <span className="text-amber tabular-nums">68%</span>
                </div>
                <Progress value={68} />
              </div>
              <div className="grid gap-2">
                <div className="flex items-baseline justify-between font-mono text-[0.625rem] uppercase tracking-[0.1em]">
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
                  <TableHead className="w-12" />
                  <TableHead>Volume</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead className="text-right">Blocks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {VOLUMES.map((volume) => (
                  <TableRow key={volume.name}>
                    <TableCell>
                      <Glyph className="size-6" tone={volume.tone} />
                    </TableCell>
                    <TableCell className="text-phosphor-bright">
                      /{volume.name}
                    </TableCell>
                    <TableCell>
                      {volume.state === "offline" ? (
                        <Badge variant="signal">offline</Badge>
                      ) : (
                        <Badge
                          variant={
                            volume.state === "read-only" ? "amber" : "default"
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
          <Eyebrow>Console</Eyebrow>
          <Prompt
            onSubmit={(value) =>
              setLog((entries) => [
                ...entries,
                { id: entries.length, text: value },
              ])
            }
            placeholder="mount /spool --force"
          />
          {log.length > 0 && (
            <ol className="grid gap-1 font-mono text-phosphor-dim text-xs">
              {log.map((entry) => (
                <li key={entry.id}>
                  <span className="text-signal">$</span> {entry.text}
                </li>
              ))}
            </ol>
          )}
        </section>
      </main>

      <footer className="flex flex-wrap items-center gap-6 border-line border-t px-6 py-4">
        <Status>uplink nominal</Status>
        <Status tone="busy">indexing</Status>
        <Status tone="error">spool offline</Status>
        <span className="ml-auto flex items-center gap-2 font-mono text-[0.55rem] text-phosphor-dim uppercase tracking-[0.1em]">
          <Led tone="idle" /> node-04
        </span>
      </footer>
    </div>
  );
}
