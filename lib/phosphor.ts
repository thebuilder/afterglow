import { phosphorPresets } from "@/registry/terminal/theme.mjs";

export const PHOSPHORS = [
  { color: phosphorPresets.green.phosphor, label: "Green", value: "green" },
  {
    color: phosphorPresets.orange.phosphor,
    label: "Orange",
    value: "orange",
  },
  { color: phosphorPresets.yellow.phosphor, label: "Yellow", value: "yellow" },
  { color: phosphorPresets.cyan.phosphor, label: "Cyan", value: "cyan" },
  { color: phosphorPresets.blue.phosphor, label: "Blue", value: "blue" },
  {
    color: phosphorPresets.magenta.phosphor,
    label: "Magenta",
    value: "magenta",
  },
  { color: phosphorPresets.grey.phosphor, label: "Grey", value: "grey" },
] as const;

export const PHOSPHOR_NAMES = PHOSPHORS.map(({ value }) => value);
