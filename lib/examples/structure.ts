import { AccordionDefault } from "@/components/examples/accordion-default";
import { AvatarDefault } from "@/components/examples/avatar-default";
import { BreadcrumbDefault } from "@/components/examples/breadcrumb-default";
import { CollapsibleDefault } from "@/components/examples/collapsible-default";
import { DropdownMenuDefault } from "@/components/examples/dropdown-menu-default";
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
      description:
        "Square. A round avatar is the one element that would give a page of hairline rectangles away.",
      name: "Default",
    },
  ],
  breadcrumb: [
    {
      component: BreadcrumbDefault,
      description:
        "A chevron is a control's punctuation. A slash is what the thing being described actually contains.",
      name: "Default",
    },
  ],
  collapsible: [
    {
      component: CollapsibleDefault,
      name: "Default",
    },
  ],
  "dropdown-menu": [
    {
      component: DropdownMenuDefault,
      name: "Default",
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
      description:
        "A hairline track and a square thumb, so a scrolling panel does not grow the operating system's furniture down one side.",
      name: "Default",
    },
  ],
  sheet: [
    {
      component: SheetDefault,
      description:
        "The edge it slides from keeps a lit border, so an open drawer reads as a thing pulled out of the frame.",
      name: "Default",
    },
  ],
  tooltip: [
    {
      component: TooltipDefault,
      description:
        "A plate with one lit edge. It has no arrow, because an arrow is a rounded speech shape.",
      name: "Default",
    },
  ],
};
