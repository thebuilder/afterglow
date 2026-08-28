import {
  ChevronsUpDownIcon,
  CopyIcon,
  EllipsisIcon,
  SettingsIcon,
  Trash2Icon,
} from "lucide-react";

import type { ExampleMap } from "@/lib/example";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/terminal/ui/accordion";
import { Avatar, AvatarFallback } from "@/registry/terminal/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/terminal/ui/breadcrumb";
import { Button } from "@/registry/terminal/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/terminal/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/registry/terminal/ui/dropdown-menu";
import { Input } from "@/registry/terminal/ui/input";
import { Label } from "@/registry/terminal/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/terminal/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/terminal/ui/popover";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/terminal/ui/resizable";
import { ScrollArea } from "@/registry/terminal/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/terminal/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/terminal/ui/tooltip";

const LOG = [
  "04:12:01 spool: no response",
  "04:12:04 spool: retry 1 of 3",
  "04:12:09 spool: retry 2 of 3",
  "04:12:14 spool: retry 3 of 3",
  "04:12:19 spool: giving up",
  "04:12:19 core: still mounted",
  "04:12:20 archive: still mounted",
  "04:12:21 capture: read-only",
  "04:12:30 beacon: unreachable",
  "04:12:31 running local",
];

export const structureExamples: ExampleMap = {
  accordion: [
    {
      description:
        "A plus that becomes a minus. Only the vertical stroke moves, so the horizontal one never appears to shift as it turns.",
      name: "Default",
      node: (
        <Accordion className="w-full max-w-md" multiple={false}>
          <AccordionItem value="a">
            <AccordionTrigger>What is on /core?</AccordionTrigger>
            <AccordionContent>
              Eighteen thousand blocks, mostly capture indexes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Why is /spool offline?</AccordionTrigger>
            <AccordionContent>
              No entry in the log and no fault light. A replacement controller
              is on order.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="c">
            <AccordionTrigger>Can it be forced?</AccordionTrigger>
            <AccordionContent>
              Yes, and it skips the consistency pass.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ),
    },
  ],

  avatar: [
    {
      description:
        "Square. A round avatar is the one element that would give a page of hairline rectangles away.",
      name: "Default",
      node: (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>DS</AvatarFallback>
          </Avatar>
          <Avatar className="size-10">
            <AvatarFallback>N4</AvatarFallback>
          </Avatar>
          <Avatar className="size-6">
            <AvatarFallback className="text-[0.5rem]">OP</AvatarFallback>
          </Avatar>
        </div>
      ),
    },
  ],

  breadcrumb: [
    {
      description:
        "A chevron is a control's punctuation. A slash is what the thing being described actually contains.",
      name: "Default",
      node: (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">node-04</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">capture</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>2026-08-28</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      ),
    },
  ],

  collapsible: [
    {
      name: "Default",
      node: (
        <Collapsible className="grid w-full max-w-sm gap-2">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-phosphor-bright text-sm">
              Three retries
            </span>
            <CollapsibleTrigger
              render={<Button size="icon-sm" variant="ghost" />}
            >
              <ChevronsUpDownIcon />
              <span className="sr-only">Toggle</span>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="grid gap-1 font-mono text-muted-foreground text-xs">
            <span>04:12:04 retry 1 of 3</span>
            <span>04:12:09 retry 2 of 3</span>
            <span>04:12:14 retry 3 of 3</span>
          </CollapsibleContent>
        </Collapsible>
      ),
    },
  ],

  "dropdown-menu": [
    {
      name: "Default",
      node: (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button size="icon" variant="outline" />}
          >
            <EllipsisIcon />
            <span className="sr-only">Actions</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-52">
            <DropdownMenuGroup>
              <DropdownMenuLabel>/capture</DropdownMenuLabel>
              <DropdownMenuItem>
                <CopyIcon />
                Copy path
                <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive">
                <Trash2Icon />
                Unmount
                <DropdownMenuShortcut>⇧⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ],

  pagination: [
    {
      name: "Default",
      node: (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ),
    },
  ],

  popover: [
    {
      name: "Default",
      node: (
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>
            Rename volume
          </PopoverTrigger>
          <PopoverContent className="grid gap-3">
            <div className="grid gap-1">
              <p className="font-medium font-mono text-phosphor-bright text-sm">
                Rename
              </p>
              <p className="text-muted-foreground text-xs">
                The label the manifest shows. The mount point does not change.
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ex-pop">Label</Label>
              <Input defaultValue="capture" id="ex-pop" />
            </div>
          </PopoverContent>
        </Popover>
      ),
    },
  ],

  resizable: [
    {
      description:
        "The hit area is four times the width of the visible line, so the thing you aim at is bigger than the thing you see.",
      name: "Default",
      node: (
        <ResizablePanelGroup className="h-40 w-full max-w-lg border border-line">
          <ResizablePanel defaultSize="40%">
            <div className="grid h-full place-items-center bg-panel font-mono text-phosphor text-xs">
              manifest
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <div className="grid h-full place-items-center bg-panel-sunken font-mono text-muted-foreground text-xs">
              preview
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      ),
    },
  ],

  "scroll-area": [
    {
      description:
        "A hairline track and a square thumb, so a scrolling panel does not grow the operating system's furniture down one side.",
      name: "Default",
      node: (
        <ScrollArea className="h-36 w-full max-w-sm border border-line bg-panel">
          <div className="grid gap-1 p-3 font-mono text-muted-foreground text-xs">
            {LOG.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </ScrollArea>
      ),
    },
  ],

  sheet: [
    {
      description:
        "The edge it slides from keeps a lit border, so an open drawer reads as a thing pulled out of the frame.",
      name: "Default",
      node: (
        <Sheet>
          <SheetTrigger render={<Button variant="outline" />}>
            Open drawer
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Volume detail</SheetTitle>
              <SheetDescription>
                Everything the manifest knows about /capture.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-2 font-mono text-muted-foreground text-xs">
              <span>92 780 blocks</span>
              <span>mounted read-only</span>
              <span>written by the frame grabber</span>
            </div>
          </SheetContent>
        </Sheet>
      ),
    },
  ],

  tooltip: [
    {
      description:
        "A plate with one lit edge. It has no arrow, because an arrow is a rounded speech shape.",
      name: "Default",
      node: (
        <Tooltip>
          <TooltipTrigger render={<Button size="icon" variant="outline" />}>
            <SettingsIcon />
            <span className="sr-only">Settings</span>
          </TooltipTrigger>
          <TooltipContent>Volume settings</TooltipContent>
        </Tooltip>
      ),
    },
  ],
};
