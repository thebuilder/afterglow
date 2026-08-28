import { Glyph, glyphTones } from "@/registry/terminal/components/glyph";

export function GlyphCategories() {
  return (
    <div className="flex flex-wrap gap-4">
      {(Object.keys(glyphTones) as (keyof typeof glyphTones)[]).map((tone) => (
        <div className="grid justify-items-center gap-2" key={tone}>
          <Glyph tone={tone} />
          <span className="font-mono text-[0.55rem] text-phosphor-dim uppercase tracking-[0.08em]">
            {tone}
          </span>
        </div>
      ))}
    </div>
  );
}
