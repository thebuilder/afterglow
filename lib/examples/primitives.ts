import { BadgeVariants } from "@/components/examples/badge-variants";
import { ButtonSizes } from "@/components/examples/button-sizes";
import { ButtonVariants } from "@/components/examples/button-variants";
import { ButtonWithAnIconAndDisabled } from "@/components/examples/button-with-an-icon-and-disabled";
import { CardAccent } from "@/components/examples/card-accent";
import { CardDefault } from "@/components/examples/card-default";
import { CardStripe } from "@/components/examples/card-stripe";
import { ChartSignalHistory } from "@/components/examples/chart-signal-history";
import { DialogDefault } from "@/components/examples/dialog-default";
import { InputDefault } from "@/components/examples/input-default";
import { InputStates } from "@/components/examples/input-states";
import { KbdLettersAndSymbols } from "@/components/examples/kbd-letters-and-symbols";
import { LabelDefault } from "@/components/examples/label-default";
import { ProgressDeterminateAndIndeterminate } from "@/components/examples/progress-determinate-and-indeterminate";
import { SeparatorBothOrientations } from "@/components/examples/separator-both-orientations";
import { TableManifest } from "@/components/examples/table-manifest";
import { TableStickyHeader } from "@/components/examples/table-sticky-header";
import { TabsLine } from "@/components/examples/tabs-line";
import { TabsSegment } from "@/components/examples/tabs-segment";
import { TextareaDefault } from "@/components/examples/textarea-default";

import type { ExampleMap } from "@/lib/example";

export const primitiveExamples: ExampleMap = {
  badge: [
    {
      component: BadgeVariants,
      name: "Variants",
    },
  ],
  button: [
    {
      component: ButtonVariants,
      description:
        "The default is the beam. Signal is the pink, and a page should hold at most one.",
      name: "Variants",
    },
    {
      component: ButtonSizes,
      description:
        "Tracking opens up with the size, so a large button does not read as a small one enlarged.",
      name: "Sizes",
    },
    {
      component: ButtonWithAnIconAndDisabled,
      name: "With an icon, and disabled",
    },
  ],
  card: [
    {
      component: CardDefault,
      name: "Default",
    },
    {
      component: CardAccent,
      description:
        "One property drives the left edge and the title, so a category gets a colour without a variant per category.",
      name: "Accent",
    },
    {
      component: CardStripe,
      description:
        "`CardAccent` runs the accent across the first third of the card's top rule. Use it on the one card that has to be read first.",
      name: "Stripe",
    },
  ],
  chart: [
    {
      component: ChartSignalHistory,
      description:
        "The plot uses the chart tokens already in the theme. Its six-step reveal runs once when the chart mounts.",
      name: "Signal history",
    },
  ],
  dialog: [
    {
      component: DialogDefault,
      description:
        "Opens in four steps rather than on a curve, with one pass of the beam down the panel.",
      name: "Default",
    },
  ],
  input: [
    {
      component: InputDefault,
      description:
        "Focus brightens the border instead of adding a ring. At this contrast a ring reads as a second border, and the field looks selected rather than active.",
      name: "Default",
    },
    {
      component: InputStates,
      name: "States",
    },
  ],
  kbd: [
    {
      component: KbdLettersAndSymbols,
      description:
        "Measured at the letter size, K paints 7.3px of ink. ⌘ paints 6.5, ⇧ 5.6, ↵ 4.2. Those strokes are too thin for the eye to complete, so `glyph` sets them larger and lighter.",
      name: "Letters and symbols",
    },
  ],
  label: [
    {
      component: LabelDefault,
      name: "Default",
    },
  ],
  progress: [
    {
      component: ProgressDeterminateAndIndeterminate,
      description:
        "`indeterminate` sweeps a segment and lets it leave at the far edge. That is the honest shape for a wait of unknown length. A bar creeping to ninety percent and stopping there is telling a lie.",
      name: "Determinate and indeterminate",
    },
  ],
  separator: [
    {
      component: SeparatorBothOrientations,
      name: "Both orientations",
    },
  ],
  table: [
    {
      component: TableManifest,
      description:
        "`is-numeric` on a cell puts the value in amber with tabular figures, so measurements line up under each other.",
      name: "Manifest",
    },
    {
      component: TableStickyHeader,
      description:
        "Opt-in, and only once the container has a height to scroll inside. On by default it would stick to the page instead, so the header row would detach as the table left the viewport and float over whatever came next.",
      name: "Sticky header",
    },
  ],
  tabs: [
    {
      component: TabsSegment,
      description:
        "The rules between triggers are a one-pixel gap in the list's own background, so nothing has to be turned off at the ends to avoid doubling.",
      name: "Segment",
    },
    {
      component: TabsLine,
      description:
        "The quieter one, for when the tabs are navigation rather than a switch.",
      name: "Line",
    },
  ],
  textarea: [
    {
      component: TextareaDefault,
      description:
        "Sized to its content, so a growing draft does not sit in a fixed box with its own scrollbar.",
      name: "Default",
    },
  ],
};
