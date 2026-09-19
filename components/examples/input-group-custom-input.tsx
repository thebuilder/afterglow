import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/registry/terminal/ui/input-group";

export function InputGroupCustomInput() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <textarea
          className="field-sizing-content flex min-h-16 w-full resize-none bg-transparent px-3 py-2.5 font-mono text-base text-phosphor-bright caret-phosphor-bright outline-none placeholder:text-phosphor-dim md:text-sm"
          data-slot="input-group-control"
          placeholder="Autoresize textarea..."
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton className="ml-auto" size="sm" variant="primary">
            Submit
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
