import { baseUi, type DocMap } from "@/lib/doc";

const TOGGLE_PROPS = [
  { default: '"default"', name: "variant", type: '"default" | "outline"' },
  { default: '"default"', name: "size", type: '"default" | "sm" | "lg"' },
];

export const formDocs: DocMap = {
  calendar: {
    parts: [
      {
        name: "Calendar",
        parts: [{ name: "CalendarDayButton" }],
        props: [
          { default: "true", name: "showOutsideDays", type: "boolean" },
          {
            default: '"label"',
            name: "captionLayout",
            type: '"label" | "dropdown" | "dropdown-months" | "dropdown-years"',
          },
          {
            default: '"ghost"',
            name: "buttonVariant",
            type: "Button variant",
          },
        ],
        summary:
          "Wraps React DayPicker and replaces its navigation and day controls with Afterglow buttons.",
      },
    ],
    upstream: [
      {
        href: "https://daypicker.dev",
        label: "React DayPicker",
      },
    ],
  },

  checkbox: {
    parts: [{ name: "Checkbox" }],
    upstream: [baseUi("checkbox")],
  },

  "input-otp": {
    parts: [
      {
        name: "InputOTP",
        parts: [
          {
            name: "InputOTPGroup",
            parts: [
              {
                name: "InputOTPSlot",
                props: [{ name: "index", type: "number" }],
                summary:
                  "One character cell. `index` is which position of the code it draws, so a group of four is four slots numbered 0 to 3.",
              },
            ],
          },
          { name: "InputOTPSeparator" },
        ],
        props: [{ name: "containerClassName", type: "string" }],
      },
    ],
    upstream: [{ href: "https://input-otp.rodz.dev", label: "input-otp" }],
  },

  "radio-group": {
    parts: [{ name: "RadioGroup", parts: [{ name: "RadioGroupItem" }] }],
    upstream: [baseUi("radio-group")],
  },

  select: {
    notes: [
      "A label has to sit inside its `SelectGroup`. Base UI throws when it does not, and it throws at open time rather than at compile time.",
    ],
    parts: [
      {
        name: "Select",
        parts: [
          {
            name: "SelectTrigger",
            parts: [{ name: "SelectValue" }],
            props: [
              {
                default: '"default"',
                name: "size",
                type: '"default" | "sm"',
              },
            ],
          },
          {
            name: "SelectContent",
            parts: [
              {
                name: "SelectGroup",
                parts: [{ name: "SelectLabel" }, { name: "SelectItem" }],
              },
              { name: "SelectSeparator" },
              { name: "SelectScrollUpButton" },
              { name: "SelectScrollDownButton" },
            ],
            summary:
              "Base UI's `Portal`, `Positioner` and `Popup` in one part, so the list is one element at the call site rather than three.",
          },
        ],
      },
    ],
    upstream: [baseUi("select")],
  },

  slider: {
    parts: [{ name: "Slider" }],
    upstream: [baseUi("slider")],
  },

  switch: {
    parts: [
      {
        name: "Switch",
        props: [
          { default: '"default"', name: "size", type: '"default" | "sm"' },
        ],
      },
    ],
    upstream: [baseUi("switch")],
  },

  toggle: {
    parts: [{ name: "Toggle", props: TOGGLE_PROPS }],
    upstream: [baseUi("toggle")],
  },

  "toggle-group": {
    parts: [
      {
        name: "ToggleGroup",
        parts: [
          {
            name: "ToggleGroupItem",
            props: TOGGLE_PROPS,
            summary:
              "Its own variant and size are the fallback. Whatever the group sets wins.",
          },
        ],
        props: TOGGLE_PROPS,
        summary:
          "The variant and size reach the items through context, so a group is styled once rather than at every item.",
      },
    ],
    upstream: [baseUi("toggle-group")],
  },
};
