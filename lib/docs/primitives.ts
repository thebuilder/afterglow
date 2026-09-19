import { baseUi } from "@/lib/doc";
import type { DocMap } from "@/lib/doc";

export const primitiveDocs: DocMap = {
  badge: {
    notes: [
      'Pass `render` to change the element. A badge that links is `render={<Link href="/x" />}`, not a badge wrapped in an anchor.',
    ],
    parts: [
      {
        name: "Badge",
        props: [
          {
            default: '"default"',
            name: "variant",
            type: '"default" | "signal" | "solid" | "outline" | "info" | "warning" | "amber" | "azure" | "violet" | "destructive"',
          },
        ],
      },
    ],
  },

  button: {
    notes: [
      'To render something other than a `<button>`, pass `render` and turn off `nativeButton`: `<Button render={<Link href="/x" />} nativeButton={false}>Go</Button>`.',
    ],
    parts: [
      {
        name: "Button",
        props: [
          {
            default: '"default"',
            name: "variant",
            type: '"default" | "primary" | "signal" | "outline" | "ghost" | "destructive" | "link"',
          },
          {
            default: '"default"',
            name: "size",
            type: '"default" | "sm" | "lg" | "icon" | "icon-sm"',
          },
        ],
        summary:
          "`primary` is the filled phosphor action. Keep `signal` for alarms and urgent states.",
      },
    ],
    upstream: [baseUi("button")],
  },

  card: {
    notes: [
      "A card has no hover of its own, because a hover promises a click and most cards are not one. Put a `CardLink` in it and the card becomes the link's target. Hovering or tabbing to it then sends the accent across the top, down the right and back along the bottom, and leaving runs the same three in reverse. A link card with `accent={false}` has nothing to send, and its hairline lifts instead.",
    ],
    parts: [
      {
        name: "Card",
        parts: [
          {
            name: "CardAccent",
            summary:
              "The card's top edge, with the accent running its first third. It lies over the border on the trace's path, so a link card's trace finishes it in the accent. Place it inside `Card`.",
          },
          {
            name: "CardHeader",
            parts: [
              {
                name: "CardTitle",
                parts: [
                  {
                    name: "CardLink",
                    summary:
                      'An anchor stretched over the whole card, so the card is the target and the title is what a screen reader hears. Pass `render` for a router link: `render={<Link href="/x" />}`. Anything else interactive in the card needs `relative z-10` to stay above it, as `CardAction` has.',
                  },
                ],
              },
              { name: "CardDescription" },
              {
                name: "CardAction",
                summary:
                  "A control in the header's top right. The header switches to a two-column grid when one is present. It sits above a `CardLink`'s stretch, so it stays clickable in a card that is also a link.",
              },
            ],
          },
          { name: "CardContent" },
          { name: "CardFooter" },
        ],
        props: [
          {
            default: "var(--phosphor)",
            name: "accent",
            type: "string | false",
          },
        ],
        summary:
          "`accent` sets `--card-accent`, which drives the left edge, the title and the top rule. It is how a category gets a color without a variant per category. `accent={false}` drops the edge and leaves the title in the card's own color, for a grid of panels where none of them is the one to read first.",
      },
    ],
  },

  chart: {
    notes: [
      "Recharts still owns the plot. These parts connect it to Afterglow's colors, tooltip, legend and mount motion.",
    ],
    parts: [
      {
        name: "ChartContainer",
        parts: [
          { name: "ChartStyle" },
          {
            name: "ChartTooltip",
            parts: [{ name: "ChartTooltipContent" }],
          },
          {
            name: "ChartLegend",
            parts: [{ name: "ChartLegendContent" }],
          },
        ],
        props: [
          { name: "config", type: "ChartConfig" },
          {
            default: "{ width: 320, height: 200 }",
            name: "initialDimension",
            type: "{ width: number; height: number }",
          },
        ],
        summary:
          "Provides the series config and a responsive container. The chart draws in with a short stepped reveal when it mounts.",
      },
    ],
    upstream: [{ href: "https://recharts.org", label: "Recharts" }],
  },

  "code-block": {
    notes: [
      "The highlighter runs on the server, so `CodeBlock` is an async component and Shiki never reaches the browser. Only the copy button ships as client code.",
      "Shiki writes the theme's CSS variables onto the tokens instead of hex, so a block follows whichever phosphor the page is set to.",
      "`lang` takes any language Shiki bundles. Its grammar loads the first time a block asks for it.",
    ],
    parts: [
      {
        name: "CodeBlock",
        parts: [
          {
            name: "CodeBlockTitle",
            summary:
              "The file name or caption above the code. `CodeBlock` renders one when you pass a `title`.",
          },
          {
            name: "CodeBlockBody",
            parts: [{ name: "CodeBlockCopy" }],
            summary:
              "The highlighted code and the copy button. Use it directly when you already hold Shiki's HTML, which is what a site that highlights once at build time will have.",
          },
        ],
        props: [
          { name: "code", type: "string" },
          { default: '"tsx"', name: "lang", type: "BundledLanguage" },
          { name: "title", type: "string" },
          { name: "label", type: "string" },
        ],
        summary:
          "Highlights `code` and draws it in a bordered panel. `label` names the copy button for a screen reader, and defaults to the title.",
      },
    ],
    upstream: [{ href: "https://shiki.style", label: "Shiki" }],
  },

  dialog: {
    parts: [
      {
        name: "Dialog",
        parts: [
          { name: "DialogTrigger" },
          {
            name: "DialogContent",
            parts: [
              {
                name: "DialogHeader",
                parts: [{ name: "DialogTitle" }, { name: "DialogDescription" }],
              },
              { name: "DialogFooter" },
              { name: "DialogClose" },
            ],
            props: [
              { default: "true", name: "showCloseButton", type: "boolean" },
            ],
            summary:
              "The portal, the backdrop and the popup in one part, so the usual three levels of nesting are not repeated at every call site.",
          },
        ],
      },
      {
        name: "DialogPortal",
        summary:
          "Exported for the case where the backdrop or the popup has to be placed by hand. `DialogContent` renders both already.",
      },
      {
        name: "DialogOverlay",
        summary: "Base UI's `Backdrop`, under our name.",
      },
    ],
    upstream: [baseUi("dialog")],
  },

  input: {
    parts: [{ name: "Input" }],
  },

  "input-group": {
    notes: [
      "Put each `InputGroupAddon` after the control in the markup and move it with `align`. Tab order then reaches the field before anything in the addon.",
    ],
    parts: [
      {
        name: "InputGroup",
        parts: [
          { name: "InputGroupInput" },
          { name: "InputGroupTextarea" },
          {
            name: "InputGroupAddon",
            parts: [{ name: "InputGroupText" }, { name: "InputGroupButton" }],
            props: [
              {
                default: '"inline-start"',
                name: "align",
                type: '"inline-start" | "inline-end" | "block-start" | "block-end"',
              },
            ],
            summary:
              "A click on the addon outside any button focuses the control.",
          },
        ],
        summary:
          'Draws the border, and reads focus and `aria-invalid` off whichever child has `data-slot="input-group-control"`.',
      },
    ],
  },

  kbd: {
    parts: [
      {
        name: "Kbd",
        props: [{ default: "false", name: "glyph", type: "boolean" }],
        summary:
          "`glyph` sets the key in the symbol font, for the modifiers that are drawn rather than spelled.",
      },
      {
        name: "KbdGroup",
        summary: "A chord. Spaces the keys and keeps them on one line.",
      },
    ],
  },

  label: {
    parts: [{ name: "Label" }],
  },

  progress: {
    parts: [
      {
        name: "Progress",
        props: [
          { name: "value", type: "number | null" },
          { default: "false", name: "indeterminate", type: "boolean" },
          { name: "cells", type: "number" },
        ],
        summary:
          "`indeterminate` is the sweep for work with no known length. It is a separate prop rather than a null `value`, because a bar at zero and a bar with no number are different things to look at. `cells` cuts the bar into that many blocks, the way a front panel meter reads. The blocks are a mask over the same fill, so a segmented bar sweeps like a plain one.",
      },
    ],
    upstream: [baseUi("progress")],
  },

  separator: {
    parts: [{ name: "Separator" }],
    upstream: [baseUi("separator")],
  },

  table: {
    parts: [
      {
        name: "Table",
        parts: [
          { name: "TableHeader", parts: [{ name: "TableHead" }] },
          {
            name: "TableBody",
            parts: [{ name: "TableRow" }, { name: "TableCell" }],
          },
          { name: "TableFooter" },
          { name: "TableCaption" },
        ],
        props: [
          { default: "false", name: "stickyHeader", type: "boolean" },
          { name: "containerClassName", type: "string" },
        ],
        summary:
          "The table renders inside a scrolling container. `containerClassName` styles that container, since the height a table scrolls within belongs to it rather than to the table.",
      },
    ],
  },

  tabs: {
    parts: [
      {
        name: "Tabs",
        parts: [
          {
            name: "TabsList",
            parts: [{ name: "TabsTrigger" }],
            props: [
              {
                default: '"segment"',
                name: "variant",
                type: '"segment" | "line"',
              },
            ],
            summary:
              "`segment` is the house shape, a switch. `line` is the quieter one, for tabs that are navigation and should not read as a control.",
          },
          { name: "TabsContent" },
        ],
      },
    ],
    upstream: [baseUi("tabs")],
  },

  textarea: {
    parts: [{ name: "Textarea" }],
  },
};
