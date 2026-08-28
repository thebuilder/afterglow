import { Label } from "@/registry/terminal/ui/label";
import { RadioGroup, RadioGroupItem } from "@/registry/terminal/ui/radio-group";

export function RadioGroupDefault() {
  return (
    <RadioGroup defaultValue="fast">
      <div className="flex items-center gap-2.5">
        <RadioGroupItem id="ex-r-1" value="fast" />
        <Label htmlFor="ex-r-1">Fast mount</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <RadioGroupItem id="ex-r-2" value="checked" />
        <Label htmlFor="ex-r-2">Mount with check</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <RadioGroupItem id="ex-r-3" value="readonly" />
        <Label htmlFor="ex-r-3">Read-only</Label>
      </div>
    </RadioGroup>
  );
}
