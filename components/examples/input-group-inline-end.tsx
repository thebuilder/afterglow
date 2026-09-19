import { EyeOffIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/terminal/ui/input-group";
import { Label } from "@/registry/terminal/ui/label";

export function InputGroupInlineEnd() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="inline-end-input">Input</Label>
      <InputGroup>
        <InputGroupInput
          id="inline-end-input"
          placeholder="Enter password"
          type="password"
        />
        <InputGroupAddon align="inline-end">
          <EyeOffIcon />
        </InputGroupAddon>
      </InputGroup>
      <p className="text-muted-foreground text-xs">
        Icon positioned at the end.
      </p>
    </div>
  );
}
