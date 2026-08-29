import { nests, reference } from "@/lib/doc";
import { docFor } from "@/lib/docs";
import { examplesFor } from "@/lib/examples";
import { slug } from "@/lib/slug";

export interface TocEntry {
  id: string;
  label: string;
}

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
