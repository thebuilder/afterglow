import { Label } from "@/registry/terminal/ui/label";
import { Switch } from "@/registry/terminal/ui/switch";

export function SwitchSizes() {
  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-3">
        <Switch defaultChecked id="ex-sw-1" />
        <Label htmlFor="ex-sw-1">Beacon</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="ex-sw-2" />
        <Label htmlFor="ex-sw-2">Verbose log</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch defaultChecked id="ex-sw-3" size="sm" />
        <Label htmlFor="ex-sw-3">Small</Label>
      </div>
    </div>
  );
}
