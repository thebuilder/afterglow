import { AlertDialogDefault } from "@/components/examples/alert-dialog-default";
import { AlertVariants } from "@/components/examples/alert-variants";
import { CommandPalette } from "@/components/examples/command-palette";
import { EmptyDefault } from "@/components/examples/empty-default";
import { SkeletonRows } from "@/components/examples/skeleton-rows";
import { SpinnerSizes } from "@/components/examples/spinner-sizes";
import { ToastTones } from "@/components/examples/toast-tones";

import type { ExampleMap } from "@/lib/example";

export const feedbackExamples: ExampleMap = {
  alert: [
    {
      component: AlertVariants,
      description:
        "Four tones. The left edge and icon carry the color while the text stays phosphor green.",
      name: "Variants",
    },
  ],
  "alert-dialog": [
    {
      component: AlertDialogDefault,
      description:
        "A pink confirmation dialog for destructive or irreversible actions.",
      name: "Default",
    },
  ],
  command: [
    {
      component: CommandPalette,
      description:
        "A palette is a prompt: a sigil, a line you type on, and a list that narrows as you type.",
      name: "Palette",
    },
  ],
  empty: [
    {
      component: EmptyDefault,
      description: "An empty state inside a dashed hairline border.",
      name: "Default",
    },
  ],
  skeleton: [
    {
      component: SkeletonRows,
      description:
        "The shape of a row that has not arrived, at the size it will arrive at. A block that does not match what replaces it moves the page twice.",
      name: "Rows",
    },
  ],
  spinner: [
    {
      component: SpinnerSizes,
      description:
        "A lit pixel travels through a 3x3 grid with a four-level trail behind it.",
      name: "Sizes",
    },
  ],
  toast: [
    {
      component: ToastTones,
      description:
        "Each tone sets the border, panel tint, title and built-in icon. A caller can replace the icon for a specific message.",
      name: "Tones",
    },
  ],
};
