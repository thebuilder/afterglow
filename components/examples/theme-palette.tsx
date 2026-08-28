const SWATCHES = [
  { note: "page background", token: "void" },
  { note: "surfaces", token: "panel" },
  { note: "text and controls", token: "phosphor" },
  { note: "emphasis and glow", token: "phosphor-bright" },
  { note: "muted text and borders", token: "phosphor-dim" },
  { note: "actions and live states", token: "signal" },
  { note: "metrics and warnings", token: "amber" },
  { note: "category accent", token: "azure" },
  { note: "category accent", token: "violet" },
  { note: "destructive states", token: "ember" },
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
          <span className="ml-auto font-mono text-2xs text-phosphor-dim uppercase tracking-terminal-sm">
            {swatch.note}
          </span>
        </div>
      ))}
    </div>
  );
}
