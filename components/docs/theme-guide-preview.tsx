import { ThemePalette } from "@/components/examples/theme-palette";
import { ThemePhosphorSelector } from "@/components/examples/theme-phosphor-selector";
import { Scanlines } from "@/registry/terminal/components/scanlines";

export function ThemeGuidePreview() {
  return (
    <section
      aria-label="Live theme preview"
      className="relative isolate grid gap-5 overflow-hidden border border-line bg-panel-sunken p-5 sm:p-6"
    >
      <ThemePhosphorSelector />
      <ThemePalette />
      <Scanlines />
    </section>
  );
}
