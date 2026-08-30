import { baseUi, type DocMap } from "@/lib/doc";

export const feedbackDocs: DocMap = {
  alert: {
    parts: [
      {
        name: "Alert",
        parts: [{ name: "AlertTitle" }, { name: "AlertDescription" }],
        props: [
          {
            default: '"default"',
            name: "variant",
            type: '"default" | "signal" | "warn" | "destructive"',
          },
        ],
      },
    ],
  },

  "alert-dialog": {
    notes: [
      "There is no close button and no dismiss on the backdrop. An alert dialog is a question, and the two answers are the two buttons.",
    ],
    parts: [
      {
        name: "AlertDialog",
        parts: [
          { name: "AlertDialogTrigger" },
          {
            name: "AlertDialogContent",
            parts: [
              {
                name: "AlertDialogHeader",
                parts: [
                  { name: "AlertDialogTitle" },
                  { name: "AlertDialogDescription" },
                ],
              },
              {
                name: "AlertDialogFooter",
                parts: [
                  { name: "AlertDialogCancel" },
                  {
                    name: "AlertDialogAction",
                    summary:
                      "Both of these close the dialog. Only the drawing separates them, so whichever one is destructive has to be the one that looks it.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    upstream: [baseUi("alert-dialog")],
  },

  command: {
    parts: [
      {
        name: "Command",
        parts: [
          { name: "CommandInput" },
          {
            name: "CommandList",
            parts: [
              { name: "CommandEmpty" },
              {
                name: "CommandGroup",
                parts: [
                  {
                    name: "CommandItem",
                    parts: [{ name: "CommandShortcut" }],
                  },
                ],
              },
              { name: "CommandSeparator" },
            ],
          },
        ],
        summary: "The palette itself, laid into a page.",
      },
      {
        name: "CommandDialog",
        props: [
          { default: '"Command palette"', name: "title", type: "string" },
          {
            default: '"Search for a command to run."',
            name: "description",
            type: "string",
          },
          { default: "false", name: "showCloseButton", type: "boolean" },
        ],
        summary:
          "The same palette in a dialog. `title` and `description` are its accessible name, read out rather than drawn, so they are worth setting to what the palette actually searches.",
      },
    ],
    upstream: [{ href: "https://cmdk.paco.me", label: "cmdk" }],
  },

  empty: {
    parts: [
      {
        name: "Empty",
        parts: [
          {
            name: "EmptyHeader",
            parts: [
              {
                name: "EmptyMedia",
                props: [
                  {
                    default: '"default"',
                    name: "variant",
                    type: '"default" | "icon"',
                  },
                ],
              },
              { name: "EmptyTitle" },
              { name: "EmptyDescription" },
            ],
          },
          {
            name: "EmptyContent",
            summary:
              "Whatever gets you out of the empty state. Usually a button.",
          },
        ],
      },
    ],
  },

  skeleton: {
    parts: [{ name: "Skeleton" }],
  },

  spinner: {
    parts: [
      {
        name: "Spinner",
        props: [
          { default: '"pixel"', name: "variant", type: '"pixel" | "line"' },
        ],
        summary:
          "`pixel` runs a lit cell around a 3x3 grid and sizes with the box. `line` cycles the four teletype glyphs and sizes with the text, so it sits on a line of output at whatever size that line is set in.",
      },
    ],
  },

  toast: {
    parts: [
      {
        name: "Toaster",
        summary:
          "Mount once near the root. Each tone sets its own border, tint and icon, then blinks into place without sliding.",
      },
      {
        name: "toast",
        summary:
          "sonner's function, re-exported so both halves arrive from one module and a consumer does not have to know that half of this component is sonner.",
      },
    ],
    upstream: [{ href: "https://sonner.emilkowal.ski", label: "sonner" }],
  },
};
