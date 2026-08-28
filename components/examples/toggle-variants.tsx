import { AlignLeftIcon, BoldIcon, ItalicIcon } from "lucide-react";
import { Toggle } from "@/registry/terminal/ui/toggle";

export function ToggleVariants() {
  return (
    <div className="flex items-center gap-3">
      <Toggle aria-label="Bold" defaultPressed>
        <BoldIcon />
      </Toggle>
      <Toggle aria-label="Italic">
        <ItalicIcon />
      </Toggle>
      <Toggle aria-label="Align" variant="outline">
        <AlignLeftIcon />
        Align
      </Toggle>
    </div>
  );
}
