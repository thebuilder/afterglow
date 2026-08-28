import {
  FolderOpenIcon,
  InfoIcon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";

import {
  CommandDialogDemo,
  ToastDemo,
} from "@/components/examples/interactive";
import type { ExampleMap } from "@/lib/example";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/terminal/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/terminal/ui/alert-dialog";
import { Button } from "@/registry/terminal/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/terminal/ui/empty";
import { Skeleton } from "@/registry/terminal/ui/skeleton";
import { Spinner } from "@/registry/terminal/ui/spinner";

export const feedbackExamples: ExampleMap = {
  alert: [
    {
      description:
        "The left edge and the icon carry the colour. Washing it behind the text would leave a block of colour with green type on it, and the type is the part that has to stay readable.",
      name: "Variants",
      node: (
        <div className="grid w-full max-w-md gap-3">
          <Alert>
            <InfoIcon />
            <AlertTitle>Self test passed</AlertTitle>
            <AlertDescription>
              Three volumes mounted, one read-only.
            </AlertDescription>
          </Alert>
          <Alert variant="warn">
            <TriangleAlertIcon />
            <AlertTitle>Beacon unreachable</AlertTitle>
            <AlertDescription>Running local until it answers.</AlertDescription>
          </Alert>
          <Alert variant="signal">
            <OctagonXIcon />
            <AlertTitle>Spool offline</AlertTitle>
            <AlertDescription>
              No entry in the log and no fault light.
            </AlertDescription>
          </Alert>
        </div>
      ),
    },
  ],

  "alert-dialog": [
    {
      description:
        "The signal colour throughout, because this is the dialog for a decision that cannot be taken back.",
      name: "Default",
      node: (
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="outline" />}>
            Unmount /core
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Unmount /core?</AlertDialogTitle>
              <AlertDialogDescription>
                Eighteen thousand blocks are open for write. Unmounting now
                discards whatever has not been flushed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Unmount</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ),
    },
  ],

  command: [
    {
      description:
        "A palette is a prompt: a sigil, a line you type on, and a list that narrows as you type.",
      name: "Palette",
      node: <CommandDialogDemo />,
    },
  ],

  empty: [
    {
      description:
        "The border is dashed. A solid box around emptiness reads as a panel that failed to load.",
      name: "Default",
      node: (
        <Empty className="w-full max-w-md">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderOpenIcon />
            </EmptyMedia>
            <EmptyTitle>No volumes mounted</EmptyTitle>
            <EmptyDescription>
              Nothing has answered since the last power cycle.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm" variant="outline">
              Rescan
            </Button>
          </EmptyContent>
        </Empty>
      ),
    },
  ],

  skeleton: [
    {
      name: "A row that has not arrived",
      node: (
        <div className="grid w-full max-w-sm gap-3">
          <div className="flex items-center gap-3">
            <Skeleton className="size-8" />
            <div className="grid flex-1 gap-2">
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>
      ),
    },
  ],

  spinner: [
    {
      description:
        "A lit pixel travels a 3x3 grid with a four-level trail decaying behind it. A rotating ring would be a smooth analogue sweep, and this system draws with cells.",
      name: "Sizes",
      node: (
        <div className="flex items-center gap-6">
          <Spinner className="size-3" />
          <Spinner />
          <Spinner className="size-6" />
          <Spinner className="size-10 gap-0.5" />
          <span className="flex items-center gap-2.5 font-mono text-muted-foreground text-xs">
            <Spinner />
            indexing
          </span>
        </div>
      ),
    },
  ],

  toast: [
    {
      description:
        "The theme is pinned to dark instead of read from a provider, because this system has one palette by design.",
      name: "Tones",
      node: <ToastDemo />,
    },
  ],
};
