import { feedbackExamples } from "@/components/examples/feedback";
import { formExamples } from "@/components/examples/forms";
import { primitiveExamples } from "@/components/examples/primitives";
import { structureExamples } from "@/components/examples/structure";
import { terminalExamples } from "@/components/examples/terminal";
import type { Example, ExampleMap } from "@/lib/example";

/**
 * Keyed by registry item name, so the gallery and the item pages are both
 * driven straight off the manifest. An item that ships without an example
 * fails loudly on the page it was meant to appear on, which is the point.
 *
 * Assembled from a file per section rather than re-exported from a barrel: the
 * map is the thing being built, and one file holding every example in the
 * registry is a file nobody can find anything in.
 */
const EXAMPLES: ExampleMap = {
  ...terminalExamples,
  ...primitiveExamples,
  ...formExamples,
  ...feedbackExamples,
  ...structureExamples,
};

export function examplesFor(name: string): Example[] {
  const found = EXAMPLES[name];
  if (!found?.length) {
    throw new Error(`Registry item '${name}' has no examples.`);
  }
  return found;
}
