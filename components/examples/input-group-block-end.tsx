import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/registry/terminal/ui/input-group";
import { Label } from "@/registry/terminal/ui/label";

export function InputGroupBlockEnd() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="block-end-input">Input</Label>
        <InputGroup className="h-auto">
          <InputGroupInput id="block-end-input" placeholder="Enter amount" />
          <InputGroupAddon align="block-end">
            <InputGroupText>USD</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <p className="text-muted-foreground text-xs">
          Footer positioned below the input.
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="block-end-textarea">Textarea</Label>
        <InputGroup>
          <InputGroupTextarea
            id="block-end-textarea"
            placeholder="Write a comment..."
          />
          <InputGroupAddon align="block-end">
            <InputGroupText>0/280</InputGroupText>
            <InputGroupButton className="ml-auto" size="sm" variant="primary">
              Post
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <p className="text-muted-foreground text-xs">
          Footer positioned below the textarea.
        </p>
      </div>
    </div>
  );
}
