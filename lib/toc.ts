import { examplesFor } from "@/components/examples";
import { nests, reference } from "@/lib/doc";
import { docFor } from "@/lib/docs";

/** One heading on a page, and the anchor that reaches it. */
export interface TocEntry {
  id: string;
  label: string;
}

/**
 * An anchor from a heading, since the headings here are data rather than
 * markdown and nothing else is going to mint one.
 */
export function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Every heading an item's page will have, in the order it has them.
 *
 * One list behind the table of contents on the right and the headings in the
 * search index, so a result can only ever point at an anchor the page renders.
 */
export function headingsFor(name: string): TocEntry[] {
  const doc = docFor(name);
  const notes = doc ? reference(doc) : undefined;

  return [
    { id: "installation", label: "Installation" },
    ...(doc && nests(doc.parts)
      ? [{ id: "composition", label: "Composition" }]
      : []),
    ...examplesFor(name)
      .slice(1)
      .map((example) => ({ id: slug(example.name), label: example.name })),
    ...(notes ? [notes] : []),
  ];
}
