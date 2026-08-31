import type { Example, ExampleMap } from "@/lib/example";
import { effectExamples } from "@/lib/examples/effects";
import { feedbackExamples } from "@/lib/examples/feedback";
import { formExamples } from "@/lib/examples/forms";
import { primitiveExamples } from "@/lib/examples/primitives";
import { structureExamples } from "@/lib/examples/structure";
import { terminalExamples } from "@/lib/examples/terminal";
import { slug } from "@/lib/slug";

const EXAMPLES: ExampleMap = {
  ...terminalExamples,
  ...effectExamples,
  ...primitiveExamples,
  ...formExamples,
  ...feedbackExamples,
  ...structureExamples,
};

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
