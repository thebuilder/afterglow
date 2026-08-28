import { Kbd, KbdGroup } from "@/registry/terminal/ui/kbd";

export function KbdLettersAndSymbols() {
  return (
    <div className="flex flex-wrap items-center gap-6 font-mono text-muted-foreground text-xs">
      <span className="flex items-center gap-2">
        <KbdGroup>
          <Kbd glyph>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        search
      </span>
      <span className="flex items-center gap-2">
        <Kbd glyph>⇧</Kbd>
        <Kbd glyph>↵</Kbd>
        run
      </span>
      <span className="flex items-center gap-2">
        <Kbd>ESC</Kbd>
        dismiss
      </span>
    </div>
  );
}
