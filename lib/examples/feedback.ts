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
        "The left edge and the icon carry the colour. Washing it behind the text would leave a block of colour with green type on it, and the type is the part that has to stay readable.",
      name: "Variants",
    },
  ],
  "alert-dialog": [
    {
      component: AlertDialogDefault,
      description:
        "The signal colour throughout, because this is the dialog for a decision that cannot be taken back.",
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
      description:
        "The border is dashed. A solid box around emptiness reads as a panel that failed to load.",
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
        "A lit pixel travels a 3x3 grid with a four-level trail decaying behind it. A rotating ring would be a smooth analogue sweep, and this system draws with cells.",
      name: "Sizes",
    },
  ],
  toast: [
    {
      component: ToastTones,
      description:
        "The theme is pinned to dark instead of read from a provider, because this system has one palette by design.",
      name: "Tones",
    },
  ],
};
