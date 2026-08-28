import { Input } from "@/registry/terminal/ui/input";
import { Label } from "@/registry/terminal/ui/label";

export function InputDefault() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="ex-host">Host</Label>
      <Input defaultValue="node-04.local" id="ex-host" />
    </div>
  );
}
