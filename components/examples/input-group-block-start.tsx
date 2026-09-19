import { CopyIcon, FileCodeIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/registry/terminal/ui/input-group";
import { Label } from "@/registry/terminal/ui/label";

export function InputGroupBlockStart() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="block-start-input">Input</Label>
        <InputGroup className="h-auto">
          <InputGroupInput
            id="block-start-input"
            placeholder="Enter your name"
          />
          <InputGroupAddon align="block-start">
            <InputGroupText>Full Name</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <p className="text-muted-foreground text-xs">
          Header positioned above the input.
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="block-start-textarea">Textarea</Label>
        <InputGroup>
          <InputGroupTextarea
            id="block-start-textarea"
            placeholder="console.log('Hello, world!');"
          />
          <InputGroupAddon align="block-start">
            <FileCodeIcon />
            <InputGroupText>script.js</InputGroupText>
            <InputGroupButton className="ml-auto" size="icon-xs">
              <CopyIcon />
              <span className="sr-only">Copy</span>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <p className="text-muted-foreground text-xs">
          Header positioned above the textarea.
        </p>
      </div>
    </div>
  );
}
