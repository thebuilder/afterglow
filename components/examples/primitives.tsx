import { PowerIcon, SearchIcon } from "lucide-react";

import type { ExampleMap } from "@/lib/example";
import { Eyebrow } from "@/registry/terminal/components/eyebrow";
import { Badge } from "@/registry/terminal/ui/badge";
import { Button } from "@/registry/terminal/ui/button";
import {
  Card,
  CardAccent,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/terminal/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/terminal/ui/dialog";
import { Input } from "@/registry/terminal/ui/input";
import { Kbd, KbdGroup } from "@/registry/terminal/ui/kbd";
import { Label } from "@/registry/terminal/ui/label";
import { Progress } from "@/registry/terminal/ui/progress";
import { Separator } from "@/registry/terminal/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/terminal/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/terminal/ui/tabs";
import { Textarea } from "@/registry/terminal/ui/textarea";

const VOLUMES = [
  { name: "core", state: "mounted", blocks: "18 442" },
  { name: "archive", state: "mounted", blocks: "4 011" },
  { name: "capture", state: "read-only", blocks: "92 780" },
  { name: "scratch", state: "mounted", blocks: "612" },
  { name: "spool", state: "offline", blocks: "0" },
];

const STATE_VARIANT: Record<string, "default" | "signal" | "amber"> = {
  mounted: "default",
  "read-only": "amber",
  offline: "signal",
};

export const primitiveExamples: ExampleMap = {
  button: [
    {
      name: "Variants",
      description:
        "The default is the beam. Signal is the pink, and a page should hold at most one.",
      node: (
        <div className="flex flex-wrap items-center gap-3">
          <Button>Mount</Button>
          <Button variant="signal">Restart</Button>
          <Button variant="outline">Inspect</Button>
          <Button variant="ghost">Cancel</Button>
          <Button variant="destructive">Unmount</Button>
          <Button variant="link">Read the log</Button>
        </div>
      ),
    },
    {
      name: "Sizes",
      description:
        "Tracking opens up as the button gets bigger, not just the type.",
      node: (
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" variant="outline">
            <SearchIcon />
            <span className="sr-only">Search</span>
          </Button>
          <Button size="icon-sm" variant="outline">
            <PowerIcon />
            <span className="sr-only">Power</span>
          </Button>
        </div>
      ),
    },
    {
      name: "With an icon, and disabled",
      node: (
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="signal">
            <PowerIcon />
            Restart spool
          </Button>
          <Button disabled>Offline</Button>
          <Button disabled variant="outline">
            Offline
          </Button>
        </div>
      ),
    },
  ],

  input: [
    {
      name: "Default",
      description:
        "Focus moves the border rather than adding a ring: at this contrast a ring reads as a second border and the field looks selected rather than active.",
      node: (
        <div className="grid w-full max-w-sm gap-2">
          <Label htmlFor="ex-host">Host</Label>
          <Input defaultValue="node-04.local" id="ex-host" />
        </div>
      ),
    },
    {
      name: "States",
      node: (
        <div className="grid w-full max-w-sm gap-3">
          <Input placeholder="placeholder" />
          <Input aria-invalid defaultValue="not a hostname" />
          <Input disabled defaultValue="locked" />
        </div>
      ),
    },
  ],

  textarea: [
    {
      name: "Default",
      description:
        "Sized to its content, so a growing draft does not sit in a fixed box with its own scrollbar.",
      node: (
        <div className="grid w-full max-w-sm gap-2">
          <Label htmlFor="ex-note">Operator note</Label>
          <Textarea
            defaultValue="Spool has been down since the last power cycle."
            id="ex-note"
          />
        </div>
      ),
    },
  ],

  label: [
    {
      name: "Default",
      node: (
        <div className="grid w-full max-w-sm gap-2">
          <Label htmlFor="ex-label">Volume label</Label>
          <Input id="ex-label" placeholder="/capture" />
        </div>
      ),
    },
  ],

  card: [
    {
      name: "Default",
      node: (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>/capture</CardTitle>
            <CardDescription>92 780 blocks, mounted read-only.</CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Written by the frame grabber. Nothing else has a handle on it.
          </CardContent>
          <CardFooter className="border-line border-t">
            <Button size="sm" variant="outline">
              Remount
            </Button>
          </CardFooter>
        </Card>
      ),
    },
    {
      name: "Accent",
      description:
        "One property drives the left edge and the title, so a category gets a colour without a variant per category.",
      node: (
        <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Beam</CardTitle>
              <CardDescription>The default.</CardDescription>
            </CardHeader>
          </Card>
          <Card accent="var(--signal)">
            <CardHeader>
              <CardTitle>Signal</CardTitle>
              <CardDescription>Something is happening.</CardDescription>
            </CardHeader>
          </Card>
          <Card accent="var(--amber)">
            <CardHeader>
              <CardTitle>Amber</CardTitle>
              <CardDescription>Measured, not named.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      ),
    },
    {
      name: "Stripe",
      description:
        "`CardAccent` is a masthead, and is deliberate rather than decorative: on a card that is one of several it reads as an unexplained red line.",
      node: (
        <Card accent="var(--signal)" className="w-full max-w-sm">
          <CardAccent />
          <CardHeader>
            <CardTitle>/spool</CardTitle>
            <CardDescription>
              Offline since the last power cycle.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            The one card on the page that has to be looked at first.
          </CardContent>
        </Card>
      ),
    },
  ],

  badge: [
    {
      name: "Variants",
      node: (
        <div className="flex flex-wrap items-center gap-2">
          <Badge>mounted</Badge>
          <Badge variant="signal">offline</Badge>
          <Badge variant="solid">primary</Badge>
          <Badge variant="outline">idle</Badge>
          <Badge variant="amber">read-only</Badge>
          <Badge variant="azure">document</Badge>
          <Badge variant="violet">audio</Badge>
          <Badge variant="destructive">corrupt</Badge>
        </div>
      ),
    },
  ],

  dialog: [
    {
      name: "Default",
      description:
        "Opens in four steps rather than on a curve, with one pass of the beam down the panel.",
      node: (
        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>
            Open panel
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <Eyebrow>Confirm</Eyebrow>
              <DialogTitle>Force-mount /spool?</DialogTitle>
              <DialogDescription>
                The volume has not answered since the last power cycle. Forcing
                it skips the consistency pass.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="ghost" />}>
                Cancel
              </DialogClose>
              <DialogClose render={<Button variant="signal" />}>
                Force mount
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ),
    },
  ],

  table: [
    {
      name: "Manifest",
      description:
        "`is-numeric` on a cell puts the value in amber with tabular figures, so measurements line up under each other.",
      node: (
        <div className="w-full border border-line bg-panel">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Volume</TableHead>
                <TableHead>State</TableHead>
                <TableHead className="text-right">Blocks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {VOLUMES.slice(0, 3).map((volume) => (
                <TableRow key={volume.name}>
                  <TableCell className="text-phosphor-bright">
                    /{volume.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant={STATE_VARIANT[volume.state] ?? "default"}>
                      {volume.state}
                    </Badge>
                  </TableCell>
                  <TableCell className="is-numeric">{volume.blocks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ),
    },
    {
      name: "Sticky header",
      description:
        "Opt-in, and only once the container has a height to scroll inside. Sticky by default would be sticky to the page: the header row detaches as the table leaves the viewport and floats over whatever is below it.",
      node: (
        <div className="w-full border border-line bg-panel">
          <Table containerClassName="max-h-32" stickyHeader>
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
                    <Badge variant={STATE_VARIANT[volume.state] ?? "default"}>
                      {volume.state}
                    </Badge>
                  </TableCell>
                  <TableCell className="is-numeric">{volume.blocks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ),
    },
  ],

  tabs: [
    {
      name: "Segment",
      description:
        "The rules between triggers are a one-pixel gap in the list's own background, so nothing has to be turned off at the ends to avoid doubling.",
      node: (
        <Tabs defaultValue="manifest">
          <TabsList>
            <TabsTrigger value="manifest">Manifest</TabsTrigger>
            <TabsTrigger value="hex">Hex</TabsTrigger>
            <TabsTrigger value="meta">Meta</TabsTrigger>
          </TabsList>
          <TabsContent
            className="font-mono text-muted-foreground text-xs"
            value="manifest"
          >
            412 entries, 3 locked.
          </TabsContent>
          <TabsContent
            className="font-mono text-muted-foreground text-xs"
            value="hex"
          >
            00000000 7f 45 4c 46 02 01 01 00
          </TabsContent>
          <TabsContent
            className="font-mono text-muted-foreground text-xs"
            value="meta"
          >
            Written 04:12, never read.
          </TabsContent>
        </Tabs>
      ),
    },
    {
      name: "Line",
      description:
        "The quieter one, for when the tabs are navigation rather than a switch.",
      node: (
        <Tabs defaultValue="all">
          <TabsList variant="line">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="mounted">Mounted</TabsTrigger>
            <TabsTrigger value="down">Down</TabsTrigger>
          </TabsList>
          <TabsContent
            className="font-mono text-muted-foreground text-xs"
            value="all"
          >
            Four volumes.
          </TabsContent>
          <TabsContent
            className="font-mono text-muted-foreground text-xs"
            value="mounted"
          >
            Three volumes.
          </TabsContent>
          <TabsContent
            className="font-mono text-muted-foreground text-xs"
            value="down"
          >
            One volume.
          </TabsContent>
        </Tabs>
      ),
    },
  ],

  separator: [
    {
      name: "Both orientations",
      node: (
        <div className="grid w-full max-w-sm gap-3 font-mono text-xs">
          <span className="text-phosphor-bright">Uplink</span>
          <Separator />
          <div className="flex h-5 items-center gap-3 text-muted-foreground">
            <span>rx 41ms</span>
            <Separator orientation="vertical" />
            <span>tx 38ms</span>
            <Separator orientation="vertical" />
            <span>0 dropped</span>
          </div>
        </div>
      ),
    },
  ],

  kbd: [
    {
      name: "Letters and symbols",
      description:
        "`glyph` is not dressing. Measured at the letter size, K paints 7.3px of ink and ⌘ paints 6.5, ⇧ 5.6 and ↵ 4.2: strokes too thin for the eye to complete, so at a letter's size they read as smudges.",
      node: (
        <div className="flex flex-wrap items-center gap-6 font-mono text-muted-foreground text-xs">
          <span className="flex items-center gap-2">
            <KbdGroup>
              <Kbd glyph>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
            search
          </span>
          <span className="flex items-center gap-2">
            <Kbd glyph>⇧</Kbd>
            <Kbd glyph>↵</Kbd>
            run
          </span>
          <span className="flex items-center gap-2">
            <Kbd>ESC</Kbd>
            dismiss
          </span>
        </div>
      ),
    },
  ],

  progress: [
    {
      name: "Determinate and indeterminate",
      description:
        "`indeterminate` sweeps a segment and lets it leave at the far edge, which is the honest shape for a wait of unknown length: a bar creeping to ninety percent and stopping is a progress bar telling a lie.",
      node: (
        <div className="grid w-full max-w-sm gap-5">
          <div className="grid gap-2">
            <div className="flex items-baseline justify-between font-mono text-[0.625rem] uppercase tracking-[0.1em]">
              <span className="text-muted-foreground">Determinate</span>
              <span className="text-amber tabular-nums">68%</span>
            </div>
            <Progress value={68} />
          </div>
          <div className="grid gap-2">
            <div className="flex items-baseline justify-between font-mono text-[0.625rem] uppercase tracking-[0.1em]">
              <span className="text-muted-foreground">Indeterminate</span>
              <span className="text-phosphor-dim">unknown</span>
            </div>
            <Progress indeterminate />
          </div>
        </div>
      ),
    },
  ],
};
