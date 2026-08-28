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

  console: {
    parts: [
      {
        name: "default",
        summary:
          "A page, installed at `app/console/page.tsx`. It is a starting point to edit rather than a component to compose, so it exports one default and takes no props.",
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

  glyph: {
    parts: [
      {
        name: "Glyph",
        props: [
          {
            default: '"unknown"',
            name: "tone",
            type: '"archive" | "audio" | "code" | "directory" | "document" | "image" | "system" | "unknown"',
          },
          { name: "color", type: "string" },
        ],
        summary:
          "`color` overrides the tone's colour for a kind of file the eight tones do not cover.",
      },
      {
        name: "glyphTones",
        summary:
          "The tone-to-colour map, exported so a legend can be built from the same values the icons are drawn with.",
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
          "It pulses by default and holds still when idle, because a dark indicator that is also animating is a light saying nothing twice.",
      },
      {
        name: "Status",
        props: [{ default: '"ok"', name: "tone", type: TONES }],
        summary:
          "A lamp and the word beside it, which is how a status line is always built.",
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
          "The frame, the glass and the corner darkening in one. Reach for `Scanlines` on its own when the thing underneath already has a frame.",
      },
    ],
  },

  terminal: {
    notes: [
      "A style, so it goes to `init` and not `add`. It installs the theme, every primitive, every terminal part and the block, then sets a project up around them.",
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
      "Install it first. Everything else in the registry is drawn with its tokens and renders unstyled without it.",
    ],
    parts: [],
  },
};
