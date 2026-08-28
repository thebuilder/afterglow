import { baseUi, type DocMap, type PropDoc } from "@/lib/doc";

/**
 * The three overlays each lift the same positioning props off Base UI's
 * positioner and onto the one part a caller writes. The defaults differ, so
 * they are passed in rather than shared.
 */
function placement(align: string, side: string, offset: number): PropDoc[] {
  return [
    {
      default: `"${align}"`,
      name: "align",
      type: '"start" | "center" | "end"',
    },
    {
      default: `"${side}"`,
      name: "side",
      type: '"top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"',
    },
    { default: String(offset), name: "sideOffset", type: "number" },
  ];
}

export const structureDocs: DocMap = {
  accordion: {
    parts: [
      {
        name: "Accordion",
        parts: [
          {
            name: "AccordionItem",
            parts: [
              { name: "AccordionTrigger" },
              {
                name: "AccordionContent",
                summary:
                  "Base UI's `Panel`. It measures itself, so the open and close both animate to the height of the content rather than to a number written down somewhere.",
              },
            ],
          },
        ],
      },
    ],
    upstream: [baseUi("accordion")],
  },

  avatar: {
    parts: [
      {
        name: "Avatar",
        parts: [
          { name: "AvatarImage" },
          {
            name: "AvatarFallback",
            summary:
              "Shown until the image loads, and instead of it if the image fails.",
          },
        ],
      },
    ],
    upstream: [baseUi("avatar")],
  },

  breadcrumb: {
    parts: [
      {
        name: "Breadcrumb",
        parts: [
          {
            name: "BreadcrumbList",
            parts: [
              {
                name: "BreadcrumbItem",
                parts: [
                  {
                    name: "BreadcrumbLink",
                    summary:
                      'Pass `render` to use a router link: `render={<Link href="/x" />}`.',
                  },
                  {
                    name: "BreadcrumbPage",
                    summary:
                      "The last crumb, which is where you already are and so is not a link.",
                  },
                ],
              },
              { name: "BreadcrumbSeparator" },
              { name: "BreadcrumbEllipsis" },
            ],
          },
        ],
      },
    ],
  },

  collapsible: {
    parts: [
      {
        name: "Collapsible",
        parts: [{ name: "CollapsibleTrigger" }, { name: "CollapsibleContent" }],
      },
    ],
    upstream: [baseUi("collapsible")],
  },

  "dropdown-menu": {
    notes: [
      "A label has to sit inside a `DropdownMenuGroup`. Base UI throws when it does not, and the throw arrives the first time the menu opens, long after it compiled.",
    ],
    parts: [
      {
        name: "DropdownMenu",
        parts: [
          { name: "DropdownMenuTrigger" },
          {
            name: "DropdownMenuContent",
            parts: [
              {
                name: "DropdownMenuGroup",
                parts: [
                  {
                    name: "DropdownMenuLabel",
                    props: [
                      { default: "false", name: "inset", type: "boolean" },
                    ],
                  },
                  {
                    name: "DropdownMenuItem",
                    parts: [{ name: "DropdownMenuShortcut" }],
                    props: [
                      { default: "false", name: "inset", type: "boolean" },
                      {
                        default: '"default"',
                        name: "variant",
                        type: '"default" | "destructive"',
                      },
                    ],
                    summary:
                      "`inset` indents past the column the checkmarks live in, so a plain item lines up with the checkable ones above it.",
                  },
                ],
              },
              { name: "DropdownMenuCheckboxItem" },
              {
                name: "DropdownMenuRadioGroup",
                parts: [{ name: "DropdownMenuRadioItem" }],
              },
              { name: "DropdownMenuSeparator" },
              {
                name: "DropdownMenuSub",
                parts: [
                  {
                    name: "DropdownMenuSubTrigger",
                    props: [
                      { default: "false", name: "inset", type: "boolean" },
                    ],
                  },
                  { name: "DropdownMenuSubContent" },
                ],
              },
            ],
            props: placement("start", "bottom", 4),
            summary:
              "The portal, the positioner and the popup in one part, with the three positioning props lifted onto it.",
          },
        ],
      },
    ],
    upstream: [baseUi("menu")],
  },

  pagination: {
    parts: [
      {
        name: "Pagination",
        parts: [
          {
            name: "PaginationContent",
            parts: [
              {
                name: "PaginationItem",
                parts: [
                  {
                    name: "PaginationLink",
                    props: [
                      { default: "false", name: "isActive", type: "boolean" },
                      {
                        default: '"icon"',
                        name: "size",
                        type: '"default" | "sm" | "lg" | "icon" | "icon-sm"',
                      },
                    ],
                    summary:
                      '`isActive` sets `aria-current="page"` as well as the styling, so the current page is announced and not only drawn.',
                  },
                  { name: "PaginationPrevious" },
                  { name: "PaginationNext" },
                  { name: "PaginationEllipsis" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  popover: {
    parts: [
      {
        name: "Popover",
        parts: [
          { name: "PopoverTrigger" },
          { name: "PopoverContent", props: placement("center", "bottom", 6) },
        ],
      },
    ],
    upstream: [baseUi("popover")],
  },

  resizable: {
    parts: [
      {
        name: "ResizablePanelGroup",
        parts: [
          { name: "ResizablePanel" },
          {
            name: "ResizableHandle",
            props: [{ default: "false", name: "withHandle", type: "boolean" }],
            summary:
              "`withHandle` puts a grip on the rule. Without it the whole hairline is still draggable, it just does not say so.",
          },
        ],
      },
    ],
    upstream: [
      {
        href: "https://github.com/bvaughn/react-resizable-panels",
        label: "react-resizable-panels",
      },
    ],
  },

  "scroll-area": {
    parts: [
      {
        name: "ScrollArea",
        parts: [
          {
            name: "ScrollBar",
            summary:
              "`ScrollArea` renders the vertical one already. Reach for this to add the horizontal one.",
          },
        ],
      },
    ],
    upstream: [baseUi("scroll-area")],
  },

  sheet: {
    parts: [
      {
        name: "Sheet",
        parts: [
          { name: "SheetTrigger" },
          {
            name: "SheetContent",
            parts: [
              {
                name: "SheetHeader",
                parts: [{ name: "SheetTitle" }, { name: "SheetDescription" }],
              },
              { name: "SheetFooter" },
              { name: "SheetClose" },
            ],
            props: [
              {
                default: '"right"',
                name: "side",
                type: '"top" | "right" | "bottom" | "left"',
              },
            ],
            summary:
              "The edge it slides from keeps a lit border, so an open drawer reads as something pulled out of the frame.",
          },
        ],
      },
    ],
    upstream: [baseUi("dialog")],
  },

  tooltip: {
    parts: [
      {
        name: "TooltipProvider",
        summary:
          "`Tooltip` mounts one of these for itself, so reach for it only to set a shared `delay` across a group of tooltips. The default is 0.",
      },
      {
        name: "Tooltip",
        parts: [
          { name: "TooltipTrigger" },
          { name: "TooltipContent", props: placement("center", "top", 6) },
        ],
      },
    ],
    upstream: [baseUi("tooltip")],
  },
};
