import { CheckboxDefault } from "@/components/examples/checkbox-default";
import { InputOtpSixDigits } from "@/components/examples/input-otp-six-digits";
import { RadioGroupDefault } from "@/components/examples/radio-group-default";
import { SelectDefault } from "@/components/examples/select-default";
import { SliderSingleAndRange } from "@/components/examples/slider-single-and-range";
import { SwitchSizes } from "@/components/examples/switch-sizes";
import { ToggleGroupJoined } from "@/components/examples/toggle-group-joined";
import { ToggleVariants } from "@/components/examples/toggle-variants";

import type { ExampleMap } from "@/lib/example";

export const formExamples: ExampleMap = {
  checkbox: [
    {
      component: CheckboxDefault,
      description: "A square that fills with phosphor when checked.",
      name: "Default",
    },
  ],
  "input-otp": [
    {
      component: InputOtpSixDigits,
      description:
        "Each cell draws its own caret. The field behind them is a single invisible input and has none to lend.",
      name: "Six digits",
    },
  ],
  "radio-group": [
    {
      component: RadioGroupDefault,
      description:
        "Terminal-style radio marks in their unchecked and checked states: `( )` and `(•)`.",
      name: "Default",
    },
  ],
  select: [
    {
      component: SelectDefault,
      name: "Default",
    },
  ],
  slider: [
    {
      component: SliderSingleAndRange,
      name: "Single and range",
    },
  ],
  switch: [
    {
      component: SwitchSizes,
      description: "A squared-off rocker in two sizes.",
      name: "Sizes",
    },
  ],
  toggle: [
    {
      component: ToggleVariants,
      name: "Variants",
    },
  ],
  "toggle-group": [
    {
      component: ToggleGroupJoined,
      description:
        "The rules between items are a one-pixel gap in the group's own background, the same trick the segmented tabs use.",
      name: "Joined",
    },
  ],
};
