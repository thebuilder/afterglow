import { compositionOf, type PartDoc } from "@/lib/doc";

export function CompositionTree({ parts }: { parts: PartDoc[] }) {
  return (
    <pre className="overflow-x-auto border border-line bg-panel-sunken p-4 font-mono text-phosphor text-xs leading-relaxed">
      <code>{compositionOf(parts)}</code>
    </pre>
  );
}
