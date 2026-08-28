import type { Example, ExampleMap } from "@/lib/example";
import { feedbackExamples } from "@/lib/examples/feedback";
import { formExamples } from "@/lib/examples/forms";
import { primitiveExamples } from "@/lib/examples/primitives";
import { structureExamples } from "@/lib/examples/structure";
import { terminalExamples } from "@/lib/examples/terminal";
import { slug } from "@/lib/slug";

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

/**
 * An example and the file it lives in, under `components/examples/`.
 *
 * `fileFor` builds the name from the item and the example, so the heading on
 * the page, the anchor that reaches it and the file it prints are one string.
 * Rename an example, leave the file behind, and the build stops on the missing
 * path.
 */
export interface LocatedExample extends Example {
  file: string;
}

function fileFor(item: string, example: Example): string {
  return `${item}-${slug(example.name)}.tsx`;
}

export function examplesFor(name: string): LocatedExample[] {
  const found = EXAMPLES[name];
  if (!found?.length) {
    throw new Error(`Registry item '${name}' has no examples.`);
  }
  return found.map((example) => ({ ...example, file: fileFor(name, example) }));
}
