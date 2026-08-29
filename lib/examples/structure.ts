import { AccordionDefault } from "@/components/examples/accordion-default";
import { AvatarDefault } from "@/components/examples/avatar-default";
import { BreadcrumbDefault } from "@/components/examples/breadcrumb-default";
import { CollapsibleDefault } from "@/components/examples/collapsible-default";
import { ContextMenuSystem } from "@/components/examples/context-menu-system-menu";
import { DropdownMenuDefault } from "@/components/examples/dropdown-menu-default";
import { HoverCardRelay } from "@/components/examples/hover-card-relay";
import { PaginationDefault } from "@/components/examples/pagination-default";
import { PopoverDefault } from "@/components/examples/popover-default";
import { ResizableDefault } from "@/components/examples/resizable-default";
import { ScrollAreaDefault } from "@/components/examples/scroll-area-default";
import { SheetDefault } from "@/components/examples/sheet-default";
import { TooltipDefault } from "@/components/examples/tooltip-default";

import type { ExampleMap } from "@/lib/example";

export const structureExamples: ExampleMap = {
  accordion: [
    {
      component: AccordionDefault,
      description:
        "A plus that becomes a minus. Only the vertical stroke moves, so the horizontal one never appears to shift as it turns.",
      name: "Default",
    },
  ],
  avatar: [
    {
      component: AvatarDefault,
      description: "Initials in mono inside a bordered square.",
      name: "Default",
    },
  ],
  breadcrumb: [
    {
      component: BreadcrumbDefault,
      description: "A monospace path separated by slashes.",
      name: "Default",
    },
  ],
  collapsible: [
    {
      component: CollapsibleDefault,
      name: "Default",
    },
  ],
  "context-menu": [
    {
      component: ContextMenuSystem,
      description:
        "Right click with a pointer or long press on touch. The menu includes a submenu, persistent choices and a destructive action.",
      name: "System menu",
    },
  ],
  "dropdown-menu": [
    {
      component: DropdownMenuDefault,
      name: "Default",
    },
  ],
  "hover-card": [
    {
      component: HoverCardRelay,
      description:
        "A compact equipment preview that stays open while the pointer crosses from the link into the card.",
      name: "Relay",
    },
  ],
  pagination: [
    {
      component: PaginationDefault,
      name: "Default",
    },
  ],
  popover: [
    {
      component: PopoverDefault,
      name: "Default",
    },
  ],
  resizable: [
    {
      component: ResizableDefault,
      description:
        "The hit area is four times the width of the visible line, so the thing you aim at is bigger than the thing you see.",
      name: "Default",
    },
  ],
  "scroll-area": [
    {
      component: ScrollAreaDefault,
      description: "A hairline track with a square thumb.",
      name: "Default",
    },
  ],
  sheet: [
    {
      component: SheetDefault,
      description: "The sheet keeps a lit border on the edge it enters from.",
      name: "Default",
    },
  ],
  tooltip: [
    {
      component: TooltipDefault,
      description: "A compact label with one lit edge and no arrow.",
      name: "Default",
    },
  ],
};
