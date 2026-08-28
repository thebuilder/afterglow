import { Input } from "@/registry/terminal/ui/input";

export function InputStates() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <Input placeholder="placeholder" />
      <Input aria-invalid defaultValue="not a hostname" />
      <Input defaultValue="locked" disabled />
    </div>
  );
}
