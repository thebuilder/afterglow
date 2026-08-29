import { AlarmButtonDefault } from "@/components/examples/alarm-button-default";
import { BootLogDefault } from "@/components/examples/boot-log-default";
import { ConnectorBothDirections } from "@/components/examples/connector-both-directions";
import { ConsoleTheBlock } from "@/components/examples/console-the-block";
import { EyebrowWithAndWithoutACaret } from "@/components/examples/eyebrow-with-and-without-a-caret";
import { LedTones } from "@/components/examples/led-tones";
import { PromptDefault } from "@/components/examples/prompt-default";
import { ScanlinesWithAndWithout } from "@/components/examples/scanlines-with-and-without";
import { ScreenDefault } from "@/components/examples/screen-default";
import { TerminalComposed } from "@/components/examples/terminal-composed";
import { TerminalTheSystemAtAGlance } from "@/components/examples/terminal-the-system-at-a-glance";
import { TerminalWindowMacos } from "@/components/examples/terminal-window-macos";
import { TerminalWindowTerminal } from "@/components/examples/terminal-window-terminal";
import { TerminalWindowWindows } from "@/components/examples/terminal-window-windows";
import { ThemePalette } from "@/components/examples/theme-palette";
import { ThemeScreenColors } from "@/components/examples/theme-screen-colors";

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
  connector: [
    {
      component: ConnectorBothDirections,
      name: "Both directions",
    },
  ],
  console: [
    {
      component: ConsoleTheBlock,
      description:
        "Boot log, volume manifest, progress, status line and a live prompt, on one page.",
      name: "The block",
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
        "Four status tones. The idle lamp stays still while the other tones pulse.",
      name: "Tones",
    },
  ],
  prompt: [
    {
      component: PromptDefault,
      name: "Default",
    },
  ],
  scanlines: [
    {
      component: ScanlinesWithAndWithout,
      description:
        "The lines multiply rather than overlay, so they darken what is under them instead of laying a grey film on top.",
      name: "With and without",
    },
  ],
  screen: [
    {
      component: ScreenDefault,
      name: "Default",
    },
  ],
  terminal: [
    {
      component: TerminalTheSystemAtAGlance,
      description:
        "A compact strip of the system's components, colours and hairline borders.",
      name: "The system at a glance",
    },
    {
      component: TerminalComposed,
      description:
        "The console block is the same parts arranged as a page somebody would actually operate.",
      name: "Composed",
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
      component: ThemeScreenColors,
      description:
        "The docs selector remaps its phosphor variables for a live preview. The installed theme stays green until you edit those variables.",
      name: "Screen colors",
    },
  ],
};
