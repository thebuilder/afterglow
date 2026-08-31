import { GlitchDefault } from "@/components/examples/glitch-default";
import { GrainDefault } from "@/components/examples/grain-default";
import { ScanlinesDefault } from "@/components/examples/scanlines-default";
import { ScrambleDefault } from "@/components/examples/scramble-default";
import { ScreenDefault } from "@/components/examples/screen-default";
import { TypewriterDefault } from "@/components/examples/typewriter-default";
import { UseReducedMotionDefault } from "@/components/examples/use-reduced-motion-default";

import type { ExampleMap } from "@/lib/example";

export const effectExamples: ExampleMap = {
  glitch: [
    {
      component: GlitchDefault,
      description:
        "Wraps a string or a whole panel. The clones are inert and aria-hidden, so a link or a button inside it stays a single tab stop.",
      name: "Default",
    },
  ],
  grain: [
    {
      component: GrainDefault,
      description:
        "Static by default, which costs one paint. Turn on `animated` for a capped canvas loop that stops while it is off screen.",
      name: "Default",
    },
  ],
  scanlines: [
    {
      component: ScanlinesDefault,
      description:
        "The lines multiply, so they can only darken what is already lit. Over a black panel the change is about two values in 255.",
      name: "Default",
    },
  ],
  scramble: [
    {
      component: ScrambleDefault,
      description:
        "The scrambled glyphs are aria-hidden and unselectable, and the finished string sits beside them for anything reading rather than watching. Copying the value gets the value.",
      name: "Default",
    },
  ],
  screen: [
    {
      component: ScreenDefault,
      description:
        "The scanlines and the falloff are on by default. The grille, bloom, hold bar and grain are opt in, and stack in that order under the glass.",
      name: "Default",
    },
  ],
  typewriter: [
    {
      component: TypewriterDefault,
      description:
        "Each character lands at a slightly different interval. An even cadence reads as a wipe; set `jitter` to `0` on the component to see the difference.",
      name: "Default",
    },
  ],
  "use-reduced-motion": [
    {
      component: UseReducedMotionDefault,
      description:
        "The value is live. useSyncExternalStore subscribes to the query, so a component re-renders when the setting changes rather than holding whatever was true at mount.",
      name: "Default",
    },
  ],
};
