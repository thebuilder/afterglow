import { baseUi, type DocMap } from "@/lib/doc";

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
    parts: [
      {
        name: "Card",
        parts: [
          {
            name: "CardAccent",
            summary:
              "The top rule, with the card's accent running its first third. Goes first, inside `Card` and above `CardHeader`.",
          },
          {
            name: "CardHeader",
            parts: [
              { name: "CardTitle" },
              { name: "CardDescription" },
              {
                name: "CardAction",
                summary:
                  "A control in the header's top right. The header switches to a two-column grid when one is present.",
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
            type: "string",
          },
        ],
        summary:
          "`accent` sets `--card-accent`, which drives the left edge, the title and the top rule. It is how a category gets a colour without a variant per category.",
      },
    ],
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
        ],
        summary:
          "`indeterminate` is the sweep for work with no known length. It is a separate prop rather than a null `value`, because a bar at zero and a bar with no number are different things to look at.",
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
