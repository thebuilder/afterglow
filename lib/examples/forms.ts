import { CalendarSingleDate } from "@/components/examples/calendar-single-date";
import { CheckboxDefault } from "@/components/examples/checkbox-default";
import { ComboboxAutoHighlight } from "@/components/examples/combobox-auto-highlight";
import { ComboboxBasic } from "@/components/examples/combobox-basic";
import { ComboboxClearButton } from "@/components/examples/combobox-clear-button";
import { ComboboxCustomItems } from "@/components/examples/combobox-custom-items";
import { ComboboxDisabled } from "@/components/examples/combobox-disabled";
import { ComboboxGroups } from "@/components/examples/combobox-groups";
import { ComboboxInputGroup } from "@/components/examples/combobox-input-group";
import { ComboboxInvalid } from "@/components/examples/combobox-invalid";
import { ComboboxMultiple } from "@/components/examples/combobox-multiple";
import { ComboboxPopup } from "@/components/examples/combobox-popup";
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
  combobox: [
    {
      component: ComboboxBasic,
      description: "A field that filters a flat list as you type.",
      name: "Basic",
    },
    {
      component: ComboboxMultiple,
      description:
        "With `multiple`, each choice becomes a chip beside the input. The list anchors to the whole chip row.",
      name: "Multiple",
    },
    {
      component: ComboboxClearButton,
      description:
        "`showClear` swaps the chevron for a button that empties the field.",
      name: "Clear button",
    },
    {
      component: ComboboxGroups,
      description:
        "Each `ComboboxGroup` takes its own `items` and renders them through a `ComboboxCollection`.",
      name: "Groups",
    },
    {
      component: ComboboxCustomItems,
      description:
        "The items are objects, so `itemToStringValue` picks the string the filter matches against.",
      name: "Custom items",
    },
    {
      component: ComboboxInvalid,
      description: "`aria-invalid` on the input turns the whole field red.",
      name: "Invalid",
    },
    {
      component: ComboboxDisabled,
      name: "Disabled",
    },
    {
      component: ComboboxAutoHighlight,
      description:
        "`autoHighlight` lights the first match as you type, so Enter picks it.",
      name: "Auto highlight",
    },
    {
      component: ComboboxPopup,
      description:
        "A button opens the list, and the search field moves inside the popup.",
      name: "Popup",
    },
    {
      component: ComboboxInputGroup,
      description:
        "An `InputGroupAddon` passed to `ComboboxInput` puts an icon in front of the text. `alignOffset` pulls the list back so it starts under the icon.",
      name: "Input group",
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
