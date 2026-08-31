import type { DocMap } from "@/lib/doc";

const TRIGGERS = '"mount" | "hover" | "view"';

export const effectDocs: DocMap = {
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
          "An overlay for the element it sits in. `fixed` pins it to the viewport instead, for a whole page behind one sheet of glass.",
      },
    ],
  },

  scramble: {
    notes: [
      "The finished string is in the accessibility tree the whole time, and selecting the element copies the value rather than the glyphs.",
      "`hover` runs on pointer entry only. There is no keyboard equivalent; reaching it with a keyboard shows the resolved text.",
    ],
    parts: [
      {
        name: "Scramble",
        props: [
          { name: "text", type: "string" },
          { default: '"mount"', name: "trigger", type: TRIGGERS },
          { default: "34", name: "speed", type: "number" },
          { default: "0.55", name: "rate", type: "number" },
          { default: "the teletype set", name: "charset", type: "string" },
        ],
        summary:
          "Resolves `text` out of random glyphs, left to right. `speed` is milliseconds a step and `rate` is characters resolved per step, so the two together set how long the whole string takes.",
      },
    ],
  },

  screen: {
    parts: [
      {
        name: "Screen",
        props: [
          { default: "true", name: "vignette", type: "boolean" },
          { default: '"fine"', name: "density", type: '"fine" | "soft"' },
        ],
        summary:
          "A bordered surface with the scanlines and the falloff already on it. Pass children; it draws the glass over them.",
      },
    ],
  },

  typewriter: {
    notes: [
      "The element is its finished size from the first frame and the whole string stays in the accessibility tree, so nothing around it moves as the text arrives.",
      "`jitter` varies each character's delay by that fraction of `speed`. Set it to `0` for an even cadence, which reads as a wipe rather than as typing.",
    ],
    parts: [
      {
        name: "Typewriter",
        props: [
          { name: "text", type: "string" },
          { default: "55", name: "speed", type: "number" },
          { default: "0.45", name: "jitter", type: "number" },
          { default: "0", name: "startDelay", type: "number" },
          { default: "true", name: "caret", type: "boolean" },
          { default: "false", name: "loop", type: "boolean" },
          { default: "1800", name: "loopDelay", type: "number" },
          { name: "onDone", type: "() => void" },
        ],
        summary:
          "Prints `text` a character at a time, roughly `speed` milliseconds apart. `onDone` fires when the line finishes, which is how you chain one into the next.",
      },
    ],
  },

  "use-reduced-motion": {
    notes: [
      "The theme already switches off every `animate-*` class under `prefers-reduced-motion`. Reach for this only for motion driven from JavaScript, which CSS cannot cover.",
    ],
    parts: [
      {
        name: "useReducedMotion",
        summary:
          "Returns whether the user asked for reduced motion, and re-renders if they change it. Subscribed through `useSyncExternalStore`, so it is a live value rather than a reading taken at mount.",
      },
    ],
  },
};
