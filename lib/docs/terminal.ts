import type { DocMap } from "@/lib/doc";

const TONES = '"ok" | "busy" | "error" | "idle"';

export const terminalDocs: DocMap = {
  "alarm-button": {
    parts: [
      {
        name: "AlarmButton",
        summary:
          "A `Button` locked to the signal variant with a lamp behind it. Every other button prop still applies; `variant` is the one it sets for you.",
      },
    ],
  },

  "boot-log": {
    parts: [
      {
        name: "BootLog",
        props: [
          {
            name: "lines",
            type: "(string | { text: string; tone?: BootTone })[]",
          },
          { default: "240", name: "interval", type: "number" },
          { default: '">"', name: "prefix", type: "string" },
          { name: "onComplete", type: "() => void" },
        ],
        summary:
          "Prints its lines one at a time, `interval` milliseconds apart. A line can carry a tone: `default`, `dim`, `ok`, `warn` or `error`.",
      },
    ],
  },

  connector: {
    parts: [
      {
        name: "Connector",
        props: [
          {
            default: '"right"',
            name: "direction",
            type: '"left" | "right"',
          },
        ],
        summary:
          "The square end is where the rule starts. Point the other end at whatever the heading is about.",
      },
    ],
  },

  eyebrow: {
    parts: [
      {
        name: "Eyebrow",
        props: [{ default: "false", name: "caret", type: "boolean" }],
        summary:
          "`caret` puts a blinking block after the text. A styled box rather than a `▋`, which is a glyph with its own sidebearings and never quite lines up.",
      },
    ],
  },

  led: {
    parts: [
      {
        name: "Led",
        props: [
          { default: '"ok"', name: "tone", type: TONES },
          { default: 'tone !== "idle"', name: "pulse", type: "boolean" },
        ],
        summary:
          "It flickers between held brightness levels by default. The idle tone holds still.",
      },
      {
        name: "Status",
        props: [{ default: '"ok"', name: "tone", type: TONES }],
        summary:
          "A lamp and the word beside it, which is how a status line is always built.",
      },
    ],
  },

  "operator-dashboard": {
    parts: [
      {
        name: "OperatorDashboard",
        summary:
          "The composed dashboard. It accepts `div` props, so the full-page route and embedded previews use the same component.",
      },
      {
        name: "default",
        summary:
          "The page wrapper installed at `app/operator-dashboard/page.tsx`.",
      },
    ],
  },

  prompt: {
    parts: [
      {
        name: "Prompt",
        props: [
          { default: '">"', name: "sigil", type: "string" },
          { default: '"Command"', name: "label", type: "string" },
          { name: "placeholder", type: "string" },
          { name: "onSubmit", type: "(value: string) => void" },
        ],
        summary:
          "`onSubmit` is handed the typed string rather than the form event, and the field clears itself. `label` is the accessible name, so it is read out and never drawn.",
      },
    ],
  },

  scanlines: {
    parts: [
      {
        name: "Scanlines",
        props: [
          { default: '"fine"', name: "density", type: '"fine" | "soft"' },
          { default: "false", name: "vignette", type: "boolean" },
          { default: "false", name: "fixed", type: "boolean" },
        ],
        summary:
          "Goes inside anything with a positioning context. `fixed` puts it over the whole document instead. `fine` is 2px on 1px and starts eating letterforms at page scale, which is what `soft` is for.",
      },
    ],
  },

  screen: {
    parts: [
      {
        name: "Screen",
        props: [
          { default: '"fine"', name: "density", type: '"fine" | "soft"' },
          { default: "true", name: "vignette", type: "boolean" },
        ],
        summary:
          "The frame, glass and corner darkening in one. Use `Scanlines` alone when the underlying element already has a frame.",
      },
    ],
  },

  shell: {
    parts: [
      {
        name: "Shell",
        parts: [
          {
            name: "ShellOutput",
            parts: [
              {
                name: "ShellCommand",
                props: [{ default: '"$"', name: "prompt", type: "string" }],
                summary: "A submitted command with its prompt.",
              },
              {
                name: "ShellLine",
                props: [
                  {
                    default: '"default"',
                    name: "tone",
                    type: '"command" | "default" | "error" | "muted" | "warning"',
                  },
                ],
                summary: "One output line with an optional status tone.",
              },
            ],
            summary:
              "A scrolling `role=log` transcript that announces added lines politely.",
          },
          {
            name: "ShellPrompt",
            props: [
              { default: '"Command"', name: "label", type: "string" },
              { name: "onSubmit", type: "(command: string) => void" },
              { name: "placeholder", type: "string" },
              { default: '"$"', name: "prompt", type: "string" },
            ],
            summary:
              "The command field. It trims submitted text, clears after submission and recalls the last 40 commands with Arrow Up and Arrow Down.",
          },
        ],
        summary:
          "The bordered shell surface. It accepts section props and labels itself `Shell` unless `aria-label` says otherwise.",
      },
    ],
  },

  terminal: {
    notes: [
      "Install the `terminal` style preset with `shadcn init`. It includes the theme, every primitive and every terminal component.",
    ],
    parts: [],
  },

  "terminal-window": {
    parts: [
      {
        name: "TerminalWindow",
        props: [
          { name: "title", type: "string" },
          { name: "subtitle", type: "string" },
          { name: "footer", type: "ReactNode" },
          {
            default: '"macos"',
            name: "variant",
            type: '"macos" | "windows" | "terminal"',
          },
          { default: "false", name: "resizable", type: "boolean" },
          { default: "false", name: "collapsible", type: "boolean" },
          { name: "onClose", type: "() => void" },
          { name: "onZoom", type: "() => void" },
        ],
        summary:
          "`title` is required, because a window chrome with nothing in its bar is a rectangle. `collapsible` rolls the window up into its own titlebar; `resizable` puts a grip on the corner and the edges, and it takes arrow keys.",
      },
    ],
  },

  theme: {
    notes: [
      "Variables rather than files. It installs into a stylesheet, so there is nothing to import and nothing to copy but the CSS itself.",
      "Dark theme only. `:root` and `.dark` use identical token values.",
    ],
    parts: [],
  },
};
