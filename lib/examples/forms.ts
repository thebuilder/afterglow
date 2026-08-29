import { CalendarSingleDate } from "@/components/examples/calendar-single-date";
import { CheckboxDefault } from "@/components/examples/checkbox-default";
import { DatePickerBasic } from "@/components/examples/date-picker-basic";
import { InputOtpSixDigits } from "@/components/examples/input-otp-six-digits";
import { RadioGroupDefault } from "@/components/examples/radio-group-default";
import { SelectDefault } from "@/components/examples/select-default";
import { SliderSingleAndRange } from "@/components/examples/slider-single-and-range";
import { SwitchSizes } from "@/components/examples/switch-sizes";
import { ToggleGroupJoined } from "@/components/examples/toggle-group-joined";
import { ToggleVariants } from "@/components/examples/toggle-variants";

import type { ExampleMap } from "@/lib/example";

export const formExamples: ExampleMap = {
  calendar: [
    {
      component: CalendarSingleDate,
      description: "A controlled calendar with one selected day.",
      name: "Single date",
    },
  ],
  checkbox: [
    {
      component: CheckboxDefault,
      description: "A square that fills with phosphor when checked.",
      name: "Default",
    },
  ],
  "date-picker": [
    {
      component: DatePickerBasic,
      description:
        "An installable composition of the calendar, popover and button. Choosing a day closes the panel and updates the trigger.",
      name: "Basic",
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
