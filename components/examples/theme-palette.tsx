const SWATCHES = [
  { note: "unlit glass", token: "void" },
  { note: "a surface on it", token: "panel" },
  { note: "the beam", token: "phosphor" },
  { note: "where it blooms", token: "phosphor-bright" },
  { note: "furniture", token: "phosphor-dim" },
  { note: "an event", token: "signal" },
  { note: "measured", token: "amber" },
  { note: "a category", token: "azure" },
  { note: "and another", token: "violet" },
  { note: "destructive", token: "ember" },
];

export function ThemePalette() {
  return (
    <div className="grid w-full gap-px bg-line sm:grid-cols-2">
      {SWATCHES.map((swatch) => (
        <div
          className="flex items-center gap-3 bg-panel px-3 py-2.5"
          key={swatch.token}
        >
          <span
            className="size-6 shrink-0 border border-line"
            style={{ background: `var(--${swatch.token})` }}
          />
          <code className="font-mono text-phosphor-bright text-xs">
            --{swatch.token}
          </code>
          <span className="ml-auto font-mono text-[0.625rem] text-phosphor-dim uppercase tracking-[0.08em]">
            {swatch.note}
          </span>
        </div>
      ))}
    </div>
  );
}
