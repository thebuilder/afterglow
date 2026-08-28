import { Input } from "@/registry/terminal/ui/input";
import { Label } from "@/registry/terminal/ui/label";

export function LabelDefault() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="ex-label">Volume label</Label>
      <Input id="ex-label" placeholder="/capture" />
    </div>
  );
}
