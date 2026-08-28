import { Checkbox } from "@/registry/terminal/ui/checkbox";
import { Label } from "@/registry/terminal/ui/label";

export function CheckboxDefault() {
  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-2.5">
        <Checkbox defaultChecked id="ex-cb-1" />
        <Label htmlFor="ex-cb-1">Mount read-write</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <Checkbox id="ex-cb-2" />
        <Label htmlFor="ex-cb-2">Skip consistency pass</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <Checkbox disabled id="ex-cb-3" />
        <Label htmlFor="ex-cb-3">Rebuild index</Label>
      </div>
    </div>
  );
}
