import { AlarmButtonDefault } from "@/components/examples/alarm-button-default";
import { BootLogDefault } from "@/components/examples/boot-log-default";
import { CaretSizes } from "@/components/examples/caret-sizes";
import { ConnectorBothDirections } from "@/components/examples/connector-both-directions";
import { EyebrowWithAndWithoutACaret } from "@/components/examples/eyebrow-with-and-without-a-caret";
import { LedTones } from "@/components/examples/led-tones";
import { OperatorDashboardFullPage } from "@/components/examples/operator-dashboard-full-page";
import { PromptDefault } from "@/components/examples/prompt-default";
import { ShellInteractive } from "@/components/examples/shell-interactive";
import { TerminalTheSystemAtAGlance } from "@/components/examples/terminal-the-system-at-a-glance";
import { TerminalWindowMacos } from "@/components/examples/terminal-window-macos";
import { TerminalWindowTerminal } from "@/components/examples/terminal-window-terminal";
import { TerminalWindowWindows } from "@/components/examples/terminal-window-windows";
import { ThemeMotion } from "@/components/examples/theme-motion";
import { ThemePalette } from "@/components/examples/theme-palette";
import { ThemePhosphorSelector } from "@/components/examples/theme-phosphor-selector";

import type { ExampleMap } from "@/lib/example";

export const terminalExamples: ExampleMap = {
  "alarm-button": [
    {
      component: AlarmButtonDefault,
      description:
        "Two flashes and a rest. Pointing at the button stops the alarm pattern.",
      name: "Default",
    },
  ],
  "boot-log": [
    {
      component: BootLogDefault,
      description:
        "Every line is in the DOM from the first frame and the unprinted ones are merely invisible, so the block is its final height before anything animates.",
      name: "Default",
    },
  ],
  caret: [
    {
      component: CaretSizes,
      description:
        "The block uses em dimensions, so it follows the surrounding font size.",
      name: "Sizes",
    },
  ],
  connector: [
    {
      component: ConnectorBothDirections,
      name: "Both directions",
    },
  ],
  eyebrow: [
    {
      component: EyebrowWithAndWithoutACaret,
      description:
        "The caret is a styled box rather than a ▋ glyph. A character carries the font's own sidebearings and never quite lines up with the text it follows.",
      name: "With and without a caret",
    },
  ],
  led: [
    {
      component: LedTones,
      description:
        "Four status tones. The idle lamp stays still while the other tones flicker in held steps.",
      name: "Tones",
    },
  ],
  "operator-dashboard": [
    {
      component: OperatorDashboardFullPage,
      description:
        "The installed block, embedded here at its real width. Scroll the preview to inspect the full layout.",
      name: "Full page",
    },
  ],
  prompt: [
    {
      component: PromptDefault,
      name: "Default",
    },
  ],
  shell: [
    {
      component: ShellInteractive,
      description:
        "Type `help`, `status` or `clear`. Arrow keys recall earlier commands.",
      name: "Interactive",
    },
  ],
  terminal: [
    {
      component: TerminalTheSystemAtAGlance,
      description:
        "A compact strip of the system's components, colors and hairline borders.",
      name: "The system at a glance",
    },
  ],
  "terminal-window": [
    {
      component: TerminalWindowTerminal,
      description:
        "One hairline instead of a double border, a slim bar instead of a pinstriped one, and the content flush rather than recessed. For a window that has to sit among the panels rather than in front of them.",
      name: "Terminal",
    },
    {
      component: TerminalWindowMacos,
      description:
        "Drag the corner or either edge. The yellow light rolls the window up to its titlebar, the corner takes arrow keys, and the content sits in a well with a margin of chrome round it so the grip is never over the scrollbar.",
      name: "macOS",
    },
    {
      component: TerminalWindowWindows,
      description:
        "Bevelled buttons: light on the top and left, shadow on the bottom and right, inverting on press. It is the whole reason the era's buttons read as pressable.",
      name: "Windows",
    },
  ],
  theme: [
    {
      component: ThemePalette,
      description:
        "Dark theme only. `:root` and `.dark` use identical token values.",
      name: "Palette",
    },
    {
      component: ThemePhosphorSelector,
      description:
        "Sets `data-phosphor` on the root. The docs site stores the selection with `next-themes`, and the installed CSS supplies each preset.",
      name: "Phosphor selector",
    },
    {
      component: ThemeMotion,
      description:
        "The five effects the theme adds for a tube misbehaving, running together. Every one is switched off under `prefers-reduced-motion`.",
      name: "Motion",
    },
  ],
};
