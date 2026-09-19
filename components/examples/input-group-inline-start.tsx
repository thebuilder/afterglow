import { SearchIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/terminal/ui/input-group";
import { Label } from "@/registry/terminal/ui/label";

export function InputGroupInlineStart() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="inline-start-input">Input</Label>
      <InputGroup>
        <InputGroupInput id="inline-start-input" placeholder="Search..." />
        <InputGroupAddon align="inline-start">
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
      <p className="text-muted-foreground text-xs">
        Icon positioned at the start.
      </p>
    </div>
  );
}
