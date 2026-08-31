import { ScanlinesWithAndWithout } from "@/components/examples/scanlines-with-and-without";
import { ScrambleDefault } from "@/components/examples/scramble-default";
import { ScreenDefault } from "@/components/examples/screen-default";
import { TypewriterDefault } from "@/components/examples/typewriter-default";
import { UseReducedMotionDefault } from "@/components/examples/use-reduced-motion-default";

import type { ExampleMap } from "@/lib/example";

export const effectExamples: ExampleMap = {
  scanlines: [
    {
      component: ScanlinesWithAndWithout,
      description:
        "The lines multiply rather than overlay, so they darken what is under them instead of laying a grey film on top.",
      name: "With and without",
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
