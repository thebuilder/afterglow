import { nests, reference } from "@/lib/doc";
import { docFor } from "@/lib/docs";
import { examplesFor } from "@/lib/examples";
import { slug } from "@/lib/slug";

/** One heading on a page, and the anchor that reaches it. */
export interface TocEntry {
  id: string;
  label: string;
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
