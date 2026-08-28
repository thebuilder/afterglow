import { compositionOf, type PartDoc } from "@/lib/doc";

/**
 * The parts of an item, drawn as a tree, in a `<pre>` because it is one.
 *
 * The drawing lives in `lib/doc.ts` beside the nesting it reads, so the
 * markdown routes render the same tree from the same call.
 */
export function CompositionTree({ parts }: { parts: PartDoc[] }) {
  return (
    <pre className="overflow-x-auto border border-line bg-panel-sunken p-4 font-mono text-phosphor text-xs leading-relaxed">
      <code>{compositionOf(parts)}</code>
    </pre>
  );
}
