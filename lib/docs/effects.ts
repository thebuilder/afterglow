import type { DocMap } from "@/lib/doc";

const TRIGGERS = '"mount" | "hover" | "view"';

export const effectDocs: DocMap = {
  glitch: {
    notes: [
      "The two layers are `inert`, `aria-hidden` clones of the children, so a subtree with a link or a field in it keeps one of each in the focus order.",
      "The layers inherit `color`. Anything drawn in `currentColor` takes the separation; a subtree with colours of its own reads as a ghost of itself instead.",
    ],
    parts: [
      {
        name: "Glitch",
        props: [
          { default: "true", name: "active", type: "boolean" },
          { default: "3", name: "shift", type: "number" },
        ],
        summary:
          "Wraps children and runs `animate-glitch` over two colour-separated copies of them. `shift` is how far each one travels, in pixels, in opposite directions.",
      },
    ],
  },

  grain: {
    notes: [
      "The blend is `screen`, so the noise reads in the blacks. Over a light surface it all but disappears; raise `opacity` to bring it back.",
      "`animated` caps its frame rate at `fps`, stops painting while it is off screen, and falls back to the static filter under reduced motion.",
    ],
    parts: [
      {
        name: "Grain",
        props: [
          { default: "false", name: "animated", type: "boolean" },
          { default: "24", name: "fps", type: "number" },
          { default: "0.13", name: "opacity", type: "number" },
        ],
        summary:
          "An absolutely positioned overlay for the element it sits in. Static by default, which is one `feTurbulence` paint and no JavaScript.",
      },
    ],
  },

  scanlines: {
    parts: [
      {
        name: "Scanlines",
        props: [
          { default: '"fine"', name: "density", type: '"fine" | "soft"' },
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
    notes: [
      "Every layer darkens or tints what is under it, so none of them show over an empty black panel. They need lit content to act on.",
      "`grille` is a mask rather than a tint. It blocks two of the three channels under each stripe, so lit areas take the striping and black stays black.",
      "`bloom` crushes the darks before it blurs, so black stays black under the screen blend and text keeps its contrast while lit areas spill into the dark around them.",
    ],
    parts: [
      {
        name: "Screen",
        props: [
          { default: '"fine"', name: "density", type: '"fine" | "soft"' },
          { default: "false", name: "grille", type: "boolean" },
          { default: "false", name: "bloom", type: "boolean" },
          { default: "false", name: "roll", type: "boolean" },
          { default: "false", name: "grain", type: "boolean" },
        ],
        summary:
          "A bordered surface with the scanlines already on it. The aperture grille, the bloom, the hold bar and the grain are opt in.",
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
