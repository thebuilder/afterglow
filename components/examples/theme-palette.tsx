const GROUPS = [
  {
    label: "Foundations",
    swatches: [
      { note: "page background", token: "void" },
      { note: "surfaces", token: "panel" },
      { note: "text and controls", token: "phosphor" },
      { note: "emphasis and glow", token: "phosphor-bright" },
      { note: "muted text and borders", token: "phosphor-dim" },
    ],
  },
  {
    label: "Semantic roles",
    swatches: [
      { note: "actions and live states", token: "signal" },
      { note: "informational states", token: "info" },
      { note: "warnings", token: "warning" },
      { note: "destructive states", token: "destructive" },
      { note: "numeric emphasis", token: "metric" },
    ],
  },
  {
    label: "Pigments",
    swatches: [
      { note: "warm accent", token: "amber" },
      { note: "cool accent", token: "azure" },
      { note: "purple accent", token: "violet" },
      { note: "red accent", token: "ember" },
    ],
  },
  {
    label: "Chart series",
    swatches: [1, 2, 3, 4, 5].map((index) => ({
      note: `series ${index}`,
      token: `chart-${index}`,
    })),
  },
];

export function ThemePalette() {
  return (
    <div className="grid w-full gap-4">
      {GROUPS.map((group) => (
        <section className="grid gap-2" key={group.label}>
          <h3 className="font-mono text-phosphor-dim text-xs uppercase tracking-terminal-lg">
            {group.label}
          </h3>
          <div className="grid gap-px bg-line sm:grid-cols-2">
            {group.swatches.map((swatch, index) => (
              <div
                className={`flex items-center gap-3 bg-panel px-3 py-2.5 ${
                  group.swatches.length % 2 === 1 &&
                  index === group.swatches.length - 1
                    ? "sm:col-span-2"
                    : ""
                }`}
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
        </section>
      ))}
    </div>
  );
}
