import { Label } from "@/registry/terminal/ui/label";
import { Textarea } from "@/registry/terminal/ui/textarea";

export function TextareaDefault() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="ex-note">Operator note</Label>
      <Textarea
        defaultValue="Spool has been down since the last power cycle."
        id="ex-note"
      />
    </div>
  );
}
