import type { PartDoc } from "@/lib/doc";

// The connectors are borders, not box-drawing glyphs. The mono webfont ships
// without U+2500, so the glyphs fell back to a font with other advances and the
// rows' leading broke the vertical runs. /c/<name>.md keeps the glyph version.
export function CompositionTree({ parts }: { parts: PartDoc[] }) {
  return (
    <div className="overflow-x-auto border border-line bg-panel-sunken p-4 font-mono text-phosphor text-xs leading-relaxed">
      {parts.map((root) => (
        <div key={root.name}>
          <span>{root.name}</span>
          <Branches parts={root.parts ?? []} />
        </div>
      ))}
    </div>
  );
}

function Branches({ parts }: { parts: PartDoc[] }) {
  if (parts.length === 0) {
    return null;
  }

  return (
    <ul className="composition-tree">
      {parts.map((part) => (
        <li key={part.name}>
          <span>{part.name}</span>
          <Branches parts={part.parts ?? []} />
        </li>
      ))}
    </ul>
  );
}
