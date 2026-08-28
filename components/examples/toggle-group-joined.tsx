import { AlignLeftIcon, BoldIcon, ItalicIcon } from "lucide-react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/terminal/ui/toggle-group";

export function ToggleGroupJoined() {
  return (
    <div className="grid gap-4">
      <ToggleGroup defaultValue={["manifest"]}>
        <ToggleGroupItem value="manifest">Manifest</ToggleGroupItem>
        <ToggleGroupItem value="hex">Hex</ToggleGroupItem>
        <ToggleGroupItem value="meta">Meta</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup defaultValue={["bold"]} multiple>
        <ToggleGroupItem aria-label="Bold" value="bold">
          <BoldIcon />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Italic" value="italic">
          <ItalicIcon />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Align" value="align">
          <AlignLeftIcon />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
